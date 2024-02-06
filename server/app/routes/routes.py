from flask import request, jsonify, send_file
from app import app, db
from app.models import Emailmql
from datetime import datetime

from simple_salesforce import Salesforce
from openpyxl import Workbook
import os
from pathlib import Path

@app.route('/')
def hello_charlie():
    return "Hello, Charlie!"

@app.route('/favicon.ico')
def favicon():
    return ''

@app.route('/api/update', methods=['GET', 'POST'])
def update_records():
    if request.method == 'GET':
        id = request.args.get('id') # Retrieve id from query paramter
        if id:
            record = Emailmql.query.get(id)
            if record:
                record_dict = record.__dict__
                record_dict = {key: value for key, value in record_dict.items() if key != '_sa_instance_state'}
                return jsonify(record_dict), 200
            else:
                return jsonify({'message': 'Record not found'}), 404
        else:
            records = Emailmql.query.all()
            record_dicts = [record.__dict__ for record in records]
            record_dicts = [{key: value for key, value in record_dict.items() if key != '_sa_instance_state'} for record_dict in record_dicts]
            return jsonify(record_dicts), 200
    elif request.method == 'POST':
        #id = request.args.get('id')  # Retrieve id from query parameter
        #status = request.json.get('status') # Get status from JSON payload
        #oppty_number = request.json.get('oppty_number')
        #feedback = request.json.get('feedback')
        #amount_cny = request.json.get('amount_cny')
        data = request.get_json()
        status = data.get('status')
        feedback = data.get('feedback')
        
        id = data.get('id')  # Retrieve id from JSON payload
        record = Emailmql.query.get(id)
        if record:
            record.status = status
            record.feedback = feedback
            record.oppty_number = data.get('oppty_number', None)
            record.amount_cny = data.get('amount_cny', 0)
            db.session.commit()
            return jsonify({'message': f'Record {record.id} Updated Successfully'}), 200
        else:
            return jsonify({'message': 'Record not found'}), 404

@app.route('/api/track', methods=['GET'])
def get_emailmql():
    start_date_str = request.args.get('start_date')
    end_date_str = request.args.get('end_date')
    status = request.args.get('status')
    wg_amt = request.args.get('wg_amt')
    brands = request.args.get('brands')

    # sample URL: http://localhost:5000/api/emailmql?status=xxx&start_date=2023-04-01&end_date=2023-04-28

    query = Emailmql.query.filter_by(status=status)

    if start_date_str and end_date_str:
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
        query = query.filter(Emailmql.start_date >= start_date, Emailmql.start_date <= end_date)
    
    if wg_amt:
        query = query.filter(Emailmql.wg_amt == wg_amt)
    if brands:
        query = query.filter(Emailmql.brands == brands)

    emailmqls = query.all()
    return jsonify([emailmql.to_dict() for emailmql in emailmqls])

@app.route('/api/salesforce/query', methods=['GET'])
def get_salesforce_data():
    # Salesforce credentials
    username = ''
    password = ''
    consumer_key='', 
    consumer_secret=''

    # Create a Salesforce connection
    sf = Salesforce(username=username, password=password, consumer_key=consumer_key, consumer_secret=consumer_secret)

    # Salesforce SOQL query
    project_name = request.args.get('project_name')
    query = f"SELECT Id,Status,Company,ClosedReason__c,RejectReason__c FROM Lead WHERE Company IN ('{project_name}')"
    queryData = sf.query_all_iter(query)

    # Extract the queried data
    rowData = []
    try:
        for row in queryData:
            rowData.append({
                'Id': row['Id'],
                'Status': row['Status'],
                'Company': row['Company'],
                'ClosedReason': row['ClosedReason__c'],
                'RejectReason': row['RejectReason__c']
            })
    except Exception as e:
        print(f"Error occurred during query iteration: {str(e)}")
    return jsonify(rowData), 200

@app.route('/api/insert', methods=['POST'])
def insert_records():
    data = request.get_json()
    # Extract the values from the request data
    start_date = data.get('start_date')
    project_name = data.get('project_name')
    customer_name = data.get('customer_name')
    customer_phone = data.get('customer_phone')
    wg_amt = data.get('wg_amt')
    brands = data.get('brands')
    product_category = data.get('product_category')
    country = data.get('country')
    state = data.get('state')
    city = data.get('city')
    lead_source1 = data.get('lead_source1')
    mail_to = data.get('mail_to')
    project_desp = data.get('project_desp')
    status = data.get('status')

    # Create an instance of the Emailmql model and assign the values
    emailmql = Emailmql(
        start_date=start_date,
        project_name=project_name,
        customer_name=customer_name,
        customer_phone=customer_phone,
        wg_amt=wg_amt,
        brands=brands,
        product_category=product_category,
        country=country,
        state=state,
        city=city,
        lead_source1=lead_source1,
        mail_to=mail_to,
        project_desp=project_desp,
        status=status,
        oppty_number=data.get('oppty_number', None),
        feedback=data.get('feedback', None),
        amount_cny=data.get('amount_cny', 0)
    )

    # Add the instance to the database session
    db.session.add(emailmql)

    # Commit the changes to the database
    db.session.commit()

    # Optionally, you can return a response indicating the success of the insertion
    return {'message': 'Records inserted successfully'}

@app.route('/api/download', methods=['GET'])
def download_data():
    start_date_str = request.args.get('start_date')
    end_date_str = request.args.get('end_date')
    lead_source1 = request.args.get('lead_source1')

    query = Emailmql.query.filter_by(lead_source1=lead_source1)

    if start_date_str and end_date_str:
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
        query = query.filter(Emailmql.start_date >= start_date, Emailmql.start_date <= end_date)
    emailmqls = query.all()
    workbook = Workbook()
    sheet = workbook.active
    sheet.append(['id', 'start_date','project_name','customer_name', 'customer_phone',
    'wg_amt','brands','product_category','country','state','city','lead_source1','mail_to','project_desp',
    'status','oppty_number','feedback','amount_cny'])
    for emailmql in emailmqls:
        sheet.append([emailmql.id, emailmql.start_date, emailmql.project_name, emailmql.customer_name, emailmql.customer_phone, 
        emailmql.wg_amt, emailmql.brands, emailmql.product_category,emailmql.country,emailmql.state, emailmql.city,
        emailmql.lead_source1, emailmql.mail_to, emailmql.project_desp,emailmql.status, emailmql.oppty_number, emailmql.feedback,
        emailmql.amount_cny])

    temp_file = 'emailmql.xlsx'
    downloads_dir = Path.home() / 'Downloads'
    temp_path = downloads_dir / temp_file

    workbook.save(temp_path)
    return send_file(temp_path, as_attachment=True)

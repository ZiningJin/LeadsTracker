from datetime import datetime
from app import db

class Emailmql(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    start_date = db.Column(db.DateTime,default=datetime.utcnow)
    project_name = db.Column(db.String(255))
    customer_name = db.Column(db.String(255))
    customer_phone = db.Column(db.String(255))
    wg_amt = db.Column(db.String(20))
    brands = db.Column(db.String(20))
    product_category = db.Column(db.String(255))
    country = db.Column(db.String(10))
    state = db.Column(db.String(10))
    city = db.Column(db.String(10))
    lead_source1 = db.Column(db.String(20))
    mail_to = db.Column(db.String(255))
    project_desp = db.Column(db.String(255))
    status = db.Column(db.String(20))
    oppty_number = db.Column(db.String(20))
    feedback = db.Column(db.String(255))
    amount_cny = db.Column(db.Double)

    def to_dict(self):
        return {
            'id': self.id,
            'start_date': self.start_date, 
            'project_name': self.project_name,
            'customer_name': self.customer_name,
            'customer_phone': self.customer_phone,
            'wg_amt': self.wg_amt,
            'brands': self.brands,
            'product_category': self.product_category,
            'country': self.country,
            'state': self.state,
            'city': self.city,
            'lead_source1':self.lead_source1,
            'mail_to': self.mail_to,
            'project_desp': self.project_desp,
            'status': self.status,
            'oppty_number': self.oppty_number,
            'feedback': self.feedback,
            'amount_cny': self.amount_cny
        }

    def __repr__(self):
        return f'<Emailmql {self.id}>'

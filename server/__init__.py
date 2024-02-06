from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize Flask app and SQLAlchemy database
app = Flask(__name__)
CORS(app)
# app.config.from_pyfile('../config.py')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/ecommerce?charset=utf8mb4'
app.debug = True
app.config['JSON_SORT_KEYS'] = False # no sorting
app.config['JSON_AS_ASCII'] = False # lang encoding issues
db = SQLAlchemy(app)
# Import routes

from app.routes.routes import *

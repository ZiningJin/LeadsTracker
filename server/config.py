import os
import pymysql

class Config:
    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'mysql+pymysql://username:password@localhost/ecommerce'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Security configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'my-secret-key'

    # Email configuration
    MAIL_SERVER = 'your server domain'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')

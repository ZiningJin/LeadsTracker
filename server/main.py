import os
from flask import Flask
from dotenv import load_dotenv
from app import app

load_dotenv()  # Load environment variables from .env file
load_dotenv('.flaskenv')  # Load environment variables from .flaskenv file

# Access environment variables using os.environ.get('VAR_NAME')
if __name__ == '__main__':
    app.run(debug=True,port=5000)

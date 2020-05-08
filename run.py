# FLASK_APP=run.py FLASK_DEBUG=1 flask run
from flask import Flask, render_template,request,jsonify
import json
app = Flask(__name__)

@app.route('/')
def main():
	return render_template('index.html')

@app.route('/countries/',methods=['POST'])
def get_req():
	lox = ['pidr','pidr2','pidr3']
	return jsonify({'data':render_template('response.html',lox=lox)})
# FLASK_APP=run.py FLASK_DEBUG=1 flask run
from flask import Flask, render_template,request,jsonify
import json
app = Flask(__name__)

@app.route('/')
def main():
	return render_template('index.html')

@app.route('/countries/',methods=["POST","GET"])
def get_req():
	if request.method == 'POST':
		year = request.json['year']
		country = request.json['country']
		
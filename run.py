# FLASK_APP=run.py FLASK_DEBUG=1 flask run
from flask import Flask, render_template,request,jsonify 
import json
import bs4
import os
import sys

app = Flask(__name__)

@app.route('/')
def main():
	print(sys.version)
	return render_template('index.html')

@app.route('/countries/',methods=["POST"])
def get_req():
	if request.method == 'POST':
		year = request.json['year']
		country = request.json['country']
		if country == 'Ukraine':
			country = 'UA'
		elif country == 'Russia':
			country = 'RU'
		elif country == 'Belarus':
			country = 'BY'
		elif country == 'Uzbekistan':
			country = 'UZ'
		elif country == 'USA':
			country = 'US'
		url = f"https://calendarific.com/holidays/{year}/{country}"
		#os.system(f"wget {url} -O templates/parse_data.html")
		parse_file = "templates/parse_data.html"
		with open(parse_file,"r") as f:
			content = f.read()
			soup = bs4.BeautifulSoup(content, 'lxml')
			response_content = soup.find("table")
			response_content.find("tbody")['id'] = "event_tbody"

			return jsonify({
				"data":str(response_content)
				})	
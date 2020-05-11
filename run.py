# FLASK_APP=run.py FLASK_DEBUG=1 flask run
from flask import Flask, render_template,request,jsonify
import json
import bs4
from lxml import html
import os

app = Flask(__name__)

@app.route('/')
def main():
	return render_template('index.html')

@app.route('/countries/',methods=["POST","GET"])
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
		os.system(f"wget {url} -O templates/parse_data.html")
		#soup = bs4.BeautifulSoup(parse_req, 'lxml')
		#print(soup.findAll())
		print(html.fromstring(parse_req.content))
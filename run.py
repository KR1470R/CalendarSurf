# FLASK_APP=run.py FLASK_DEBUG=1 flask run
from flask import Flask, render_template,request,jsonify
import json
import bs4
import os
import sys
from PIL import Image, ImageDraw, ImageFont


app = Flask(__name__)

@app.route('/')
def main():
	for i in range(1,32):
		if os.path.exists("static/img/IcoTab/icons/") == True:
			pass
		else:
			os.mkdir("static/img/IcoTab/icons/")
		input_path_img = str(os.path.abspath('static/img/IcoTab/defaultIcoTab.png'))
		output_path_img = str(os.path.abspath(f'static/img/IcoTab/icons/icoTab_{i}.png'))
		img = Image.open(input_path_img)
		draw = ImageDraw.Draw(img)
		font = ImageFont.truetype(os.path.abspath('static/fonts/IOS13/IOS13.ttf'),190)
		if len(str(i)) > 1:
			draw.text((17, 40),str(i),font=font,fill=(0,0,0))
		else:
			draw.text((70, 40),str(i),font=font,fill=(0,0,0))
		if os.path.exists(output_path_img) == True:
			continue
		else:
			img.save(output_path_img)
	return render_template('index.html')

@app.route('/countries/',methods=["POST"])
def sendDataByCountry():
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
		parse_file = "templates/parse_data.html"
		os.system(f"wget {url} -O {parse_file}")
		with open(parse_file,"r") as f:
			content = f.read()
			soup = bs4.BeautifulSoup(content, 'lxml')
			response_content = soup.find("table")
			response_content.find("tbody")['id'] = "event_tbody"

			return jsonify({
				"data":str(response_content)
			})

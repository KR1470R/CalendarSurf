# FLASK_APP=run.py FLASK_DEBUG=1 flask run
import os
import urllib.request

import bs4
from PIL import Image, ImageDraw, ImageFont
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
def main():
    for i in range(1, 32):
        if os.path.exists("static/img/IcoTab/icons/"):
            pass
        else:
            os.mkdir("static/img/IcoTab/icons/")
        input_path_img = str(os.path.abspath('static/img/IcoTab/defaultIcoTab.png'))
        output_path_img = str(os.path.abspath(f'static/img/IcoTab/icons/icoTab_{i}.png'))
        img = Image.open(input_path_img)
        draw = ImageDraw.Draw(img)
        font = ImageFont.truetype(os.path.abspath('static/fonts/IOS13/IOS13.ttf'), 190)
        if len(str(i)) > 1:
            draw.text((17, 40), str(i), font=font, fill=(0, 0, 0))
        else:
            draw.text((70, 40), str(i), font=font, fill=(0, 0, 0))
        if os.path.exists(output_path_img):
            continue
        else:
            img.save(output_path_img)
    return render_template('index.html')


@app.route('/countries/', methods=["POST"])
def send_data_by_country():
    if request.method == "POST":
        year = request.json['year']
        country = request.json['country'].upper()
        url = f"https://calendarific.com/holidays/{year}/{country}"
        req = urllib.request.Request(
            url,
            data=None,
            headers={
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) "
                              "Chrome/35.0.1916.47 Safari/537.36 "
            }
        )
        f = urllib.request.urlopen(req)
        content = f.read().decode("utf-8")
        soup = bs4.BeautifulSoup(content, 'lxml')
        response_content = soup.find("table")
        response_content.find("thead")["id"] = "event_thead"
        response_content.find("tbody")["id"] = "event_tbody"
        get_td = response_content.findAll("td")
        for i in get_td:
            i["id"] = "event_td"
        get_th = response_content.findAll("th")
        for j in get_th:
            j["id"] = "event_th"
        if len(response_content.find("tbody").text) <= 1:
            response_content = "Data not found. 404"
        return jsonify({
            "data": str(response_content)
        })

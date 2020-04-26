//LOGIC PAGE
let menu = document.getElementById('nav_menu')
let one_selected = false
let number_selected = null
let div_picker_selected_number = null
let div_picker_selected = false
document.addEventListener('click', function(e){
	let c = e.target.getAttribute('class')
	let i = e.target.getAttribute('id')
	if (c === 'nav_menu_li'){return}else if (i == 'menu'){
		menu.style.display = 'block';
		menu.style.opacity=0;
		menu.animate([{opacity:0},{opacity:1}],{duration:100,fill:'both'});setTimeout(()=>menu.style.display='block',100)}else{
		menu.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>menu.style.display='none',100)};
	if (c === 'cell_div'){
		//cell = document.getElementsByClassName('cell_div')[0]
		//cell.style.cssText = 'background-color:red;'
			if (one_selected === false){
				let cell = document.getElementById(i.replace(/\D/g,''))
				cell_span = document.getElementById('span_'+i.replace(/\D/g,''))
				cell_span.style.cssText = 'z-index:1;color:white;text-align:center;margin-top:30px;padding-right:5px;'
				cell.style.cssText = 'background-color:#C1C1C1;width:100px;height:100px;position:absolute;border-radius:10px;margin-left:130px;z-index:2;margin-top:10px;'
				one_selected = true
				number_selected = i.replace(/\D/g,'')
				//-----
				let get_selected_td = document.getElementById(div_picker_selected_number)
				get_selected_td.style.cssText = "padding: 50px 50px 50px 165px; text-align: center;"
				let get_selected_div = document.getElementById('span_'+div_picker_selected_number).remove()
				let create_selected_div = document.createElement('div')
				create_selected_div.innerHTML = div_picker_selected_number
				create_selected_div.setAttribute('id','span_'+div_picker_selected_number)
				create_selected_div.setAttribute('class','cell_div_selected')
				create_selected_div.style.cssText = 'color:#E73A3C;font-weight:bold;'
				get_selected_td.appendChild(create_selected_div)
			}else{
				let get_selected = document.getElementById(number_selected)
				let get_selected_span = document.getElementById('span_'+number_selected)
				get_selected.style.cssText = 'padding: 50px 50px 50px 165px; text-align: center;'
				get_selected_span.style.cssText = 'color:black;'
				// ------
				let cell = document.getElementById(i.replace(/\D/g,''))
				cell_span = document.getElementById('span_'+i.replace(/\D/g,''))
				cell_span.style.cssText = 'z-index:1;color:white;text-align:center;margin-top:30px;padding-right:5px;'
				cell.style.cssText = 'background-color:#C1C1C1;width:100px;height:100px;position:absolute;border-radius:10px;margin-left:130px;z-index:2;margin-top:10px;'
				one_selected = true
				number_selected = i.replace(/\D/g,'')
			}
		}else if (c === 'date-picker selected' || c === 'cell_div_selected'){
			try{
				let get_selected_td = document.getElementById(div_picker_selected_number)
				get_selected_td.style.cssText = "padding: 50px 50px 50px 165px; text-align: center;"
				let get_selected_div = document.getElementById('span_'+div_picker_selected_number)
				get_selected_div.style.cssText = 'z-index:1;color:white;text-align:center;margin-top:30px;padding-right:5px;'
				get_selected_td.style.cssText = 'background-color:#E73A3C;width:100px;height:100px;position:absolute;border-radius:10px;margin-left:130px;z-index:2;margin-top:10px;'
				let get_selected = document.getElementById(number_selected)
				let get_selected_span = document.getElementById('span_'+number_selected)
				get_selected.style.cssText = 'padding: 50px 50px 50px 165px; text-align: center;'
				get_selected_span.style.cssText = 'color:black;'
				one_selected = false
			}catch(e){
				return
			}
		}
});

menu.addEventListener('click',function(){
	menu.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>menu.style.display='none',100)});

//PART LOGIC OF CALENDAR

let months_days_count = [31,29,31,30,31,30,31,31,30,31,30,31]
let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

let now = new Date()
let current_month = months[now.getMonth()]
document.getElementById('month_name').innerHTML = current_month
document.getElementById('month_day').innerHTML = now.getDate()

let currentMonth = now.getMonth()
let currentYear = now.getFullYear()
let container_days = document.getElementById('nav_days_ul')
let element_month = document.getElementById('month_name')
let element_year = document.getElementById('year')

for (count in days){
	let newElem = document.createElement('th')
	newElem.innerHTML = days[count]
	newElem.id = days[count]
	newElem.className = 'day'
	newElem.style.cssText = 'text-decoration: none;display: block;float: left;padding: 145px 100px;text-decoration: none;font-size:30px;font-family: "Roboto", sans-serif;width: auto;'
	container_days.style.cssText = 'position:absolute;margin-top:10px;margin-left:-230px;'
	container_days.appendChild(newElem)
}

function generate_year_range(start, end) {
  var years = "";
  for (var year = start; year <= end; year++) {
      years += "<option value='" + year + "'>" + year + "</option>";
  }
  return years;
}

var createYear = generate_year_range(1970,2050)
showCalendar(currentMonth,currentYear)

function showCalendar(month,year){
	let firstDay = (new Date(year,month)).getDay()

	let tbl = document.getElementById('calendar_body')
	tbl.innerHTML = ''

	element_month.innerHTML=months[month];element_year.innerHTML=year

	//CREATING CELLS
	let date = 1
	for (var i=0;i<6;i++){
		let body = document.getElementById('body')
		let row = document.createElement('tr')
		body.appendChild(row)
		row.style.cssText = "font-size: 30px;font-family: 'Lato', sans-serif;"
		for (var j=0;j<7;j++){
			if (i===0 && j<firstDay){
				let cell = document.createElement('td')
				let cellText = document.createTextNode("")
				cell.appendChild(cellText)
				row.appendChild(cell)
			}else if (date>daysInMonth(month,year)){
				break;
			}else{
				let cell = document.createElement('td')
				cell.setAttribute("data-date",date)
				cell.setAttribute('data-month',month+1)
				cell.setAttribute('data-year', year)
				cell.setAttribute('data-month_name',months[month])
				cell.setAttribute('id',date)
				cell.className='date-picker'
				cell_span = document.createElement('div')
				cell_span.innerHTML = date
				cell_span.setAttribute('id','span_'+date)
				cell_span.setAttribute('class','cell_div')
				cell.appendChild(cell_span)
				cell.style.cssText = 'padding:50px;padding-left:165px;text-align:center;'

				if (date === now.getDate() && year === now.getFullYear() && month === now.getMonth()){
					div_picker_selected_number = date
					cell.className = 'date-picker selected'
					cell_span.className = 'cell_div_selected'
					cell_span.style.cssText = 'z-index:1;color:white;text-align:center;margin-top:30px;padding-right:5px;'
					cell.style.cssText = 'background-color:#E73A3C;width:100px;height:100px;position:absolute;border-radius:10px;margin-left:130px;z-index:2;margin-top:10px;'
				}
				row.appendChild(cell)
				date++
			}
		}
	tbl.appendChild(row)
	}
}
function daysInMonth(iMonth,iYear){
	return 32 - new Date(iYear, iMonth, 32).getDate()
}

let get_div_about = document.getElementById('about')
let get_background = document.getElementById('canvas_cal')
let get_div_bg = document.getElementById('background')

function closeAll(){
	get_div_about.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>get_div_about.style.cssText='opacity:0;display:none;',100)
	get_background.style.cssText = 'animation:0.1s linear sharp_background;';setTimeout(()=>get_background.style.cssText = 'filter:blur(0rem);')
	get_div_bg.style.display = 'none'
}

function aboutWindow(){
	get_div_bg.style.display = 'block'
	get_background.style.cssText = 'display:block;animation:0.1s linear blur_background;';setTimeout(()=>get_background.style.cssText='filter:blur(1rem);')
	get_div_about.style.display = 'block'
	get_div_about.animate([{opacity:0},{opacity:1}],{duration:100,fill:'both'});setTimeout(()=>get_div_about.cssText='opacity:1;')
}

let month_div = document.getElementById('month_div')
let month_days_div = document.getElementById('day_div')
let year_div = document.getElementById('year_div')

for (m in months){
	let create_div_month = document.createElement('div')
	create_div_month.innerHTML = months[m]
	create_div_month.setAttribute('class','option-choose')
	month_div.appendChild(create_div_month)
}
for (m_c in months_days_count){
	let create_div_month_days_count = document.createElement('div')
	create_div_month_days_count.innerHTML = months_days_count[m_c]
	create_div_month_days_count.setAttribute('class','option-choose')
	month_days_div.appendChild(create_div_month_days_count)
}
for (let yc=1970;yc<=2050;yc++){
	let create_div_year = document.createElement('div')
	create_div_year.innerHTML = yc
	create_div_year.setAttribute('class','option-choose')
	year_div.appendChild(create_div_year)
}
//Dates DB 
let months_days_count = [31,28,31,30,31,30,31,31,30,31,30,31]
let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
let has_been_clicked = false //for count day 
let now = new Date()
let current_month = months[now.getMonth()]
document.getElementById('month_name').innerHTML = current_month
document.getElementById('month_day').innerHTML = now.getDate()

/* Label current choosed DATE in /mainWindow/GoToWindow
document.getElementById('selected_month').innerHTML = current_month
document.getElementById('selected_day').innerHTML = now.getDate()
document.getElementById('selected_year').innerHTML =  now.getFullYear()

*/
document.getElementById('text_current_date_center').innerHTML = now.getDate()
let currentMonth = now.getMonth()
let currentYear = now.getFullYear()
let container_days = document.getElementById('nav_days_ul')
let element_month = document.getElementById('month_name')
let element_year = document.getElementById('year')

let month_div = document.getElementById('month_div')

let year_div = document.getElementById('year_div')

let month_days_div = document.getElementById('day_div')

//PRELOADER PART

let preloader_play = true
let preloader_div = document.getElementById('preloader-div')
window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
    preloader_div.animate([{opacity:1},{opacity:0}],{duration:1000,fill:'both'});setTimeout(()=>preloader_div.style.display='none',1000)
  }, 1000);
}
	
//LOGIC PAGE
let menu = document.getElementById('nav_menu')
let one_selected = false
let number_selected = null
let div_picker_selected_number = null
let div_picker_selected = false
setTimeout(()=>document.getElementById('got_to_div').style.cssText='display:none;',1100)
let removed = false
document.addEventListener('click', function(e){
	//let month_days_div = document.getElementById('day_div').children[0].children[0]
	let c = e.target.getAttribute('class')
	let i = e.target.getAttribute('id')

	let get_selected_month = document.querySelector('.option-choose-month.is-selected')
	let get_index_month = months.indexOf(get_selected_month.innerHTML)
	let get_month_count = months_days_count[get_index_month]

	let wtn = 31 - get_month_count 
	if (wtn === 0){
		for (let el=1;el<=31;el++){
			if (String(el).length<2){el = '0'+el}
			document.getElementById('selector_'+el).style.display = 'block'
		}
	}else{
		for (let el=1;el<=31;el++){
			if (String(el).length<2){el = '0'+el}
			document.getElementById('selector_'+el).style.display = 'block'
		}
		for (let s=1;s<=wtn;s++){
			try{
				document.getElementById('selector_'+(32-s)).style.display = 'none'
				removed = true
			}catch(e){
				return
			}
		}
	}

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
		}/*else if ( c === 'option-choose'){
			console.log('clicked')
			console.log(i)
			let get_selector = document.getElementById(i)
			get_selector.style.cssText = 'font-weight:bold;font-size:60px;transition:0.1s;'
		}*/
		//if ()

});

menu.addEventListener('click',function(){
	menu.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>menu.style.display='none',100)});

//PART LOGIC OF CALENDAR

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
showCalendar(currentMonth,currentYear,'None')

function showCalendar(month,year,swiped){
	let firstDay = (new Date(year,month)).getDay()

	element_month.innerHTML=months[month];element_year.innerHTML=year
	if (swiped === 'next'){
		render_cal('right_calendar_body')
		let get_container_right = document.getElementById('right_calendar_body')
		let get_container_left = document.getElementById('left_calendar_body')
		let get_container_center = document.getElementById('calendar_body')
		get_container_right.style.cssText = 'animation:1s linear right_to_center;';setTimeout(()=>get_container_right.style.cssText='margin-left:200%;margin-top: 180px;position: absolute;',100)
		get_container_center.style.cssText = 'animation:1s linear center_container_to_left;';setTimeout(()=>get_container_center.style.cssText='margin-left:-280px;margin-top: 180px;position: absolute;',100)
		get_container_center.innerHTML = get_container_right.innerHTML
	}else if (swiped === 'back'){
		render_cal('left_calendar_body')
		let get_container_right = document.getElementById('right_calendar_body')
		let get_container_left = document.getElementById('left_calendar_body')
		let get_container_center = document.getElementById('calendar_body')
		get_container_left.style.cssText = 'animation:1s linear left_to_center;';setTimeout(()=>get_container_left.style.cssText='margin-left: -200%;margin-top: 180px;position: absolute;',100)
		get_container_center.style.cssText = 'animation:1s linear center_container_to_right;';setTimeout(()=>get_container_center.style.cssText='margin-left:-280px;margin-top: 180px;position: absolute;',100)
		get_container_center.innerHTML = get_container_left.innerHTML
	}else{render_cal('calendar_body')}
	//CREATING CELLS
	function render_cal(id){
		let tbl = document.getElementById(id)
		tbl.innerHTML = ''
		let date = 1
		for (var i=0;i<6;i++){
			let row = document.createElement('tr')
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
}

el = document.getElementById('calendar')
  el.addEventListener("touchstart", startTouch, false);
  el.addEventListener("touchmove", moveTouch, false);

// Swipe Left / Right
var initialX = null;
var initialY = null;

function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};

function moveTouch(e) {
  if (initialX === null) {
    return;
  }

  if (initialY === null) {
    return;
  }

  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;

  var diffX = initialX - currentX;
  var diffY = initialY - currentY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
      // swiped left
      next()
      
    } else {
      // swiped right
     	back()
    }  
  }
  initialX = null;
  initialY = null;

  e.preventDefault();
};

function back(){
	let selectedCurrentMonth = months.indexOf(document.getElementById("month_name").innerHTML)
	let selectedCurrentYear = Number(document.getElementById("year").innerHTML)
	currentYear = (selectedCurrentMonth === 0) ? selectedCurrentYear - 1 : selectedCurrentYear;
	currentMonth = (selectedCurrentMonth === 0) ? 11 : selectedCurrentMonth - 1;
	showCalendar(currentMonth, currentYear,'back');
}

function next(){
	let selectedCurrentMonth = months.indexOf(document.getElementById("month_name").innerHTML)
	let selectedCurrentYear = Number(document.getElementById("year").innerHTML)
	currentYear = (selectedCurrentMonth === 11) ? selectedCurrentYear + 1 : selectedCurrentYear;
	currentMonth = (selectedCurrentMonth + 1) % 12;
	showCalendar(currentMonth, currentYear,'next');
}

function goto(){
  showCalendar(months.indexOf(document.getElementsByClassName('option-choose-month is-selected')[0].innerHTML), document.getElementsByClassName('option-choose-year is-selected')[0].innerHTML,'None');
  closeAll()
}

function switchToCurrentDate(){
	showCalendar(now.getMonth(),now.getFullYear())
}

function daysInMonth(iMonth,iYear){
	return 32 - new Date(iYear, iMonth, 32).getDate()
}

let get_div_about = document.getElementById('about')
let get_background = document.getElementById('canvas_cal')
let get_background_arrow_buttons = document.getElementById('div_back_next')
let get_div_bg = document.getElementById('background')
let get_go_to_div = document.getElementById('got_to_div')
let get_button_for_switch_to_current_date = document.getElementById('get_current_date')


function closeAll(){
	get_div_about.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>get_div_about.style.cssText='opacity:0;display:none;',100)
	get_background.style.cssText = 'animation:0.1s linear sharp_background;';setTimeout(()=>get_background.style.cssText = 'filter:blur(0rem);')
	get_background_arrow_buttons.style.cssText = 'animation:0.1s linear sharp_background;';setTimeout(()=>get_background_arrow_buttons.style.cssText = 'filter:blur(0rem);')
	get_button_for_switch_to_current_date.style.cssText = 'animation:0.1s linear sharp_background;';setTimeout(()=>get_button_for_switch_to_current_date.style.cssText = 'filter:blur(0rem);')
	get_div_bg.style.display = 'none'
	//=-=-=-=-=-=-=-=-
	get_go_to_div.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>get_go_to_div.style.cssText='opacity:0;display:none',100)
}

function aboutWindow(){
	get_div_bg.style.display = 'block'
	get_background.style.cssText = 'display:block;animation:0.1s linear blur_background;';setTimeout(()=>get_background.style.cssText='filter:blur(1rem);')
	get_background_arrow_buttons.style.cssText = 'animation:0.1s linear blur_background;';setTimeout(()=>get_background_arrow_buttons.style.cssText = 'filter:blur(1rem);')
	get_button_for_switch_to_current_date.style.cssText = 'animation:0.1s linear blur_background;';setTimeout(()=>get_button_for_switch_to_current_date.style.cssText = 'filter:blur(1rem);')
	get_div_about.style.display = 'block'
	get_div_about.animate([{opacity:0},{opacity:1}],{duration:100,fill:'both'});setTimeout(()=>get_div_about.style.cssText='opacity:1;display:block;')
}

function goToWindow(){
	get_div_bg.style.display = 'block'
	get_background.style.cssText = 'display:block;animation:0.1s linear blur_background;';setTimeout(()=>get_background.style.cssText='filter:blur(1rem);')
	get_background_arrow_buttons.style.cssText = 'animation:0.1s linear blur_background;';setTimeout(()=>get_background_arrow_buttons.style.cssText = 'filter:blur(1rem);')
	get_button_for_switch_to_current_date.style.cssText = 'animation:0.1s linear blur_background;';setTimeout(()=>get_button_for_switch_to_current_date.style.cssText = 'filter:blur(1rem);')
	get_go_to_div.style.display = 'block'
	get_go_to_div.animate([{opacity:0},{opacity:1}],{duration:100,fill:'both'});setTimeout(()=>get_go_to_div.style.cssText='opacity:1;display:block;')
}





for (m in months){
	let create_div_month = document.createElement('div')
	create_div_month.innerHTML = months[m]
	create_div_month.setAttribute('class','option-choose-month')
	create_div_month.setAttribute('id','selector_'+months[m])
	month_div.appendChild(create_div_month)
}
/*
for (m_c in months_days_count){
	let create_div_month_days_count = document.createElement('div')
	create_div_month_days_count.innerHTML = months_days_count[m_c]
	create_div_month_days_count.setAttribute('class','option-choose-monthday')
	create_div_month_days_count.setAttribute('id','selector_'+months_days_count[m_c])
	month_days_div.appendChild(create_div_month_days_count)
}
*/
for (let d=1;d<32;d++){
	if (String(d).length < 2){d = "0"+d}
	let create_div_month_days_count = document.createElement('div')
	create_div_month_days_count.innerHTML = d
	create_div_month_days_count.setAttribute('class','option-choose-monthday')
	create_div_month_days_count.setAttribute('id','selector_'+d)
	month_days_div.appendChild(create_div_month_days_count)
}
for (let yc=1970;yc<=2050;yc++){
	let create_div_year = document.createElement('div')
	create_div_year.innerHTML = yc
	create_div_year.setAttribute('class','option-choose-year')
	create_div_year.setAttribute('id','selector_'+yc)
	year_div.appendChild(create_div_year)
}


//GETTING DATA FOR CALENDAR
/*
let url = "https://calendarific.com/"

async function parcing(){
	try{
		const response = await fetch(url)
		const data = await response.json()
		console.log(data)
	}catch (err){
		console.log(err)
	}
}
parcing()
*/
document.addEventListener('DOMContentLoaded',()=>{
	let events_btn = document.querySelector('#events_list')
	let event_container = document.querySelector('#events_container')
	events_btn.addEventListener("click",()=>{
		let get_container_center = document.getElementById('calendar_body')
		let get_calendar_head = document.getElementById('nav_days_ul')
		get_calendar_head.style.cssText = "animation:calendar_body_swipe_to_left 1s ease-in-out;";setTimeout(()=>get_calendar_head.style.cssText='margin-top:10px;margin-left:-200%;position:absolute;',1000)
		get_container_center.style.cssText = 'animation:center_container_to_left 1s ease-in-out;';setTimeout(()=>get_container_center.style.cssText='margin-left:-200%;margin-top: 180px;position: absolute;',1000)
		events_container.style.cssText = "animation: slide_events_container 1s ease-in-out;";setTimeout(()=>events_container.style.cssText = "margin-left:50px;",1000)
		let year = document.getElementById('year').innerHTML
		let country_choosed = document.getElementById('country_select').options[document.getElementById('country_select').selectedIndex].text
		let data = {
		    'year' : year,
		    'country' : country_choosed,
		}
		$.ajax({
			type:"POST",
			url:'/countries/',
			data:JSON.stringify(data,null,'\t'),
			contentType: 'application/json;charset=UTF-8',
			success:(result)=>{
				console.log(result)
			}
		})
	})
})

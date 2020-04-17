//ALIVING OF POP UP MENU

let menu_close = 'disabled'
$(document).on('click', function(e){
	let $menu = $('#nav_menu')
	let c = $(e.target).attr('class')
	let i = $(e.target).attr('id')
	if (c === 'nav_menu_li'){return};
	if (i == 'menu'){menu_close='disabled'}else{menu_close='enabled'};
	if (menu_close==='enabled'){$menu.animate({opacity:'0'},100,function(){$menu.hide()})}else{$menu.show().animate({opacity:'1'},100)}
})

//PART LOGIC OF CALENDAR

let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
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
	container_days.appendChild(newElem)
	container_days.style.cssText = 'position:absolute;margin-top:10px;margin-left:-230px;'

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
				cell.className='date-picker'
				cell.innerHTML = '<span>'+date+'</span>'
				cell.style.cssText = 'padding:50px;padding-left:165px;text-align:center;'

				if (date === now.getDate() && year === now.getFullYear() && month === now.getMonth()){
					cell.className = 'date-picker selected'

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
let menu_close = 'disabled'
$(document).on('click', function(e){
	let $menu = $('#nav_menu')
	let c = $(e.target).attr('class')
	let i = $(e.target).attr('id')
	if (c === 'nav_menu_li'){return};
	if (i == 'menu'){menu_close='disabled'}else{menu_close='enabled'};
	if (menu_close==='enabled'){$menu.animate({opacity:'0'},100,function(){$menu.hide()})}else{$menu.show().animate({opacity:'1'},100)}
})

let now = new Date()
let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
let current_month = months[now.getMonth()]
document.getElementById('month_name').innerHTML = current_month
document.getElementById('month_day').innerHTML = now.getDate()

let container_days = document.getElementById('nav_days_ul')
for (let count=0;count<=6;count++){
	let newElem = document.createElement('th')
	newElem.innerHTML = days[count]
	newElem.setAttribute('id',days[count]);newElem.setAttribute('class','day')
	newElem.style.cssText = 'text-decoration: none;display: block;float: left;padding: 130px 100px;text-decoration: none;font-size:30px;font-family: "Roboto", sans-serif;width: auto;'
	container_days.appendChild(newElem)
	container_days.style.cssText = 'position:absolute;margin-top:10px;margin-left:-230px;'
}
/*
let container_days_numbs = document.getElementById('nav_days_ul_numbs')
for (let countd=0;countd<=31;countd++){
	let newElem2 = document.createElement('th')
	newElem2.innerHTML = countd
	newElem2.setAttribute('id',countd);newElem2.setAttribute('class','day_numbs')
	newElem2.style.cssText = 'text-decoration: none;display: block;float: left;padding: 150px 100px;text-decoration: none;font-size: 30px;font-family: "Roboto", sans-serif;width: auto;'
	container_days_numbs.appendChild(newElem2)
}*/
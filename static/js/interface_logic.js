(()=>{
	let calendar = null;

	(() => {
	    let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	    let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	    class Preloader {
	        // var el

	        constructor(el) {
	            if (typeof el === "undefined" || el === null) {
	                throw new Error("No element to mount");
	            }
	            this.el = el;
	        }

	        start(timeout) {
	            this.show();
	            setTimeout(this.hide.bind(this), timeout);
	        }

	        show() {
	            this.el.classList.add("loaded_hiding");
	            this.el.classList.remove("loaded");
	            this.el.style.display = "initial";
	        }

	        hide() {
	            this.el.classList.add("loaded");
	            this.el.classList.remove("loaded_hiding");
	            this.el.animate([
	                { opacity: 1 },
	                { opacity: 0 },
	            ], {
	                duration: 1000,
	            });
	            setTimeout(() => this.el.style.display = "none", 1000);
	        }
	    }

	    class Menu {
	        // var el
	        // var shown = false

	        constructor(el) {
	            if (typeof el === "undefined" || el === null) {
	                throw new Error("No element to mount");
	            }

	            this.el = el;
	            this.shown = false;

	            this.el.addEventListener("click", this.clickHandler.bind(this));
	        }

	        show() {
	            this.el.style.display = "block";
	            this.el.style.opacity = 0;
	            this.el.animate([
	                { opacity: 0 },
	                { opacity: 1 },
	            ], {
	                duration: 100,
	                fill: "both",
	            });
	            setTimeout(() => this.el.style.display = "block", 100);

	            this.shown = true;
	        }

	        hide() {
	            this.el.animate([
	                { opacity: 1 },
	                { opacity: 0 },
	            ], {
	                duration: 100,
	                fill: "both",
	            });
	            setTimeout(() => this.el.style.display = "none", 100);

	            this.shown = false;
	        }

	        toggle() {
	            if (this.shown) {
	                this.hide();
	            } else {
	                this.show();
	            }
	        }

	        clickHandler() {
	            this.hide();
	        }
	    }

	    class MenuButton {
	        // var el
	        // var menu: Menu

	        constructor(el, menu) {
	            if (typeof el === "undefined" || el === null) {
	                throw new Error("No element to mount");
	            }
	            if (typeof menu !== "object") {
	                throw new Error("No menu element to control");
	            }

	            this.el = el;
	            this.menu = menu;
	            this.el.addEventListener("click", this.clickHandler.bind(this));
	            document.addEventListener("click", this.documentClickHandler.bind(this));
	        }

	        clickHandler() {
	            this.menu.toggle();
	        }

	        documentClickHandler(event) {
	            if (event.target !== this.el && event.target !== this.menu.el) {
	                this.menu.hide();
	            }
	        }
	    }

	    class iconController {
	        // var el

	        constructor(el) {
	            if (typeof el === "undefined" || el === null) {
	                throw new Error("No element to mount");
	            }

	            this.el = el;
	            this.el.setAttribute("rel", "icon");
	        }

	        set(monthDay) {
	            this.el.setAttribute("href", `static/img/IcoTab/icons/icoTab_${monthDay}.png`);
	        }
	    }

	    class Calendar {
	        // var preloader: Preloader
	        // var menu: Menu
	        // var menuButton: MenuButton
	        // var iconController: IconController

	        constructor() {
	            this.preloader = new Preloader(document.getElementById("preloader-div"));
	            this.menu = new Menu(document.getElementById("nav_menu"));
	            this.menuButton = new MenuButton(document.getElementById("menu"), this.menu);
	            this.iconController = new iconController(document.getElementById("link-icon"));

	            this.preloader.hide(false, 1000);
	            this.iconController.set((new Date()).getDate());
	        }
	    }

	    document.addEventListener("DOMContentLoaded", () => {
	        calendar = new Calendar();
	    });
	})();

		document.addEventListener('DOMContentLoaded', () => {
		    //Dates DB
		    let months_days_count = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		    let has_been_clicked = false //for count day
		    let now = new Date()
		    let current_month = months[now.getMonth()]

		    document.getElementById('month_name').innerHTML = current_month
		    document.getElementById('month_day').innerHTML = now.getDate()

		    document.getElementById('text_current_date_content').innerHTML = now.getDate()
		    let currentMonth = now.getMonth()
		    let currentYear = now.getFullYear()
		    let container_days = document.getElementById('nav_days_ul')
		    let element_month = document.getElementById('month_name')
		    let element_month_day = document.getElementById('month_day')
		    let element_year = document.getElementById('year')

		    let month_div = document.getElementById('month_div')

		    let year_div = document.getElementById('year_div')

		    let month_days_div = document.getElementById('day_div')

		    //LOGIC PAGE
		    let menu = document.getElementById('nav_menu')

		    let one_selected = false
		    let div_picker_selected_number = null
		    let div_picker_selected = false
		    let removed = false

		    let get_button_about = document.getElementById('settings')
		    let get_button_go_to = document.getElementById('go_to')

		    let get_button_ok_go_to = document.getElementById('ok')
		    let get_button_cancel_go_to = document.getElementById('cancel')

		    let get_button_back = document.getElementById('back')
		    let get_button_next = document.getElementById('next')

		    let get_div_about = document.getElementById('about')
		    let get_background_main = document.getElementById('background')
		    let get_background = document.getElementById('canvas_cal')
		    let get_background_arrow_buttons = document.getElementById('div_back_next')
		    let get_div_bg = document.getElementById('background')
		    let get_go_to_div = document.getElementById('go-to-div')
		    let get_button_for_switch_to_current_date = document.getElementById('get_current_date')
		    let dropdown_list_country = document.getElementById("dropdown_country")
		    dropdown_list_country.style.display = 'none'
		    let get_event_list = document.getElementById("events_container")

		    let get_current_date_btn = document.getElementById('get_current_date')

		    document.getElementById('ico_country_current').setAttribute('draggable', false);
		    let number_selected = null

		    let mode = 'numbers'

		    document.addEventListener('click', function (e) {
		        let c = e.target.getAttribute('class')
		        let i = e.target.getAttribute('id')
		        let opened_dropdown_country = false
		        let get_selected_month = document.querySelector('.option-choose-month.is-selected')
		        let get_index_month = months.indexOf(get_selected_month.innerHTML)
		        let get_month_count = months_days_count[get_index_month]
		        let wtn = 31 - get_month_count

		        if (element_month.innerHTML == current_month && element_month_day.innerHTML == now.getDate() && element_year.innerHTML == currentYear) {
		            get_current_date_btn.style.display = 'none'

		        } else {
		            get_current_date_btn.style.cssText = 'background-color: #D5D5D5;width: 100px;height: 100px;border-radius: 99999px;position: relative;display: flex;flex-direction: column;float: right;position: fixed;bottom: 3%;left: 92%;align-self: flex-end;cursor: pointer;z-index: 10;'
		        }

		        if (wtn === 0) {
		            for (let el = 1; el <= 31; el++) {
		                if (String(el).length < 2) {
		                    el = '0' + el
		                }
		                document.getElementById('selector_' + el).style.display = 'block'
		            }
		        } else {
		            for (let el = 1; el <= 31; el++) {
		                if (String(el).length < 2) {
		                    el = '0' + el
		                }
		                document.getElementById('selector_' + el).style.display = 'block'
		            }
		            for (let s = 1; s <= wtn; s++) {
		                try {
		                    document.getElementById('selector_' + (32 - s)).style.display = 'none'
		                    removed = true
		                } catch (e) {
		                    return
		                }
		            }
		        }

		        if (c === 'nav_menu_li') {
		            return;
		        }

		        if (c === 'cell_div') {
		            if (one_selected === false) {
		                let cell = document.getElementById(i.replace(/\D/g, ''))
		                cell_span = document.getElementById('span_' + i.replace(/\D/g, ''))
		                cell_span.style.cssText = 'z-index:1;color:white;text-align:center;margin-top:30px;padding-right:5px;'
		                cell.style.cssText = 'background-color:#C1C1C1;width:100px;height:100px;position:absolute;border-radius:10px;margin-left:130px;z-index:2;margin-top:10px;'
		                one_selected = true
		                number_selected = i.replace(/\D/g, '')
		            } else {
		                let get_selected = document.getElementById(number_selected)
		                let get_selected_span = document.getElementById('span_' + number_selected)
		                get_selected.style.cssText = 'padding: 50px 50px 50px 165px; text-align: center;'
		                get_selected_span.style.cssText = 'color:black;'
		                // ------
		                let cell = document.getElementById(i.replace(/\D/g, ''))
		                cell_span = document.getElementById('span_' + i.replace(/\D/g, ''))
		                cell_span.style.cssText = 'z-index:1;color:white;text-align:center;margin-top:30px;padding-right:5px;'
		                cell.style.cssText = 'background-color:#C1C1C1;width:100px;height:100px;position:absolute;border-radius:10px;margin-left:130px;z-index:2;margin-top:10px;'
		                one_selected = true
		                number_selected = i.replace(/\D/g, '')
		            }
		        } else if (c === 'date-picker selected' || c === 'cell_div_selected') {
		            try {
		                let get_selected_td = document.getElementById(div_picker_selected_number)
		                get_selected_td.style.cssText = "padding: 50px 50px 50px 165px; text-align: center;"
		                let get_selected_div = document.getElementById('span_' + div_picker_selected_number)
		                get_selected_div.style.cssText = 'z-index:1;color:white;text-align:center;margin-top:30px;padding-right:5px;'
		                get_selected_td.style.cssText = 'background-color:#E73A3C;width:100px;height:100px;position:absolute;border-radius:10px;margin-left:130px;z-index:2;margin-top:10px;'
		                let get_selected = document.getElementById(number_selected)
		                let get_selected_span = document.getElementById('span_' + number_selected)
		                get_selected.style.cssText = 'padding: 50px 50px 50px 165px; text-align: center;'
		                get_selected_span.style.cssText = 'color:black;'
		                one_selected = false
		            } catch (e) {return}
		        }else if (i === 'dropdown_country' || i === 'dropdown_list_ul' || i === 'country_dropdown_list' || i === 'dropdown_country_title_list' || i === 'selected_country' || i === 'ico_country_current'){

		                if (opened_dropdown_country === false){
		                    if (document.getElementById("dropdown_list_countries") != null === true){
		                        if (opened_dropdown_country === false && i != 'selected_country' == true){
		                            let get_value_clicked_item = e.target
		                            if (get_value_clicked_item.getAttribute('id') === 'dropdown_list_ul' || get_value_clicked_item.getAttribute('id') === 'dropdown_country'){return}else{
		                                let get_content_from_title = get_value_clicked_item.querySelector('#dropdown_country_title_list')
		                                let get_ico_from_item = get_value_clicked_item.querySelector('#ico_country')

		                                let get_current_item_ico = document.getElementById('ico_country_current')
		                                let get_current_item_title = document.getElementById('dropdown_country_title')

		                                let previous_current_title_country = get_current_item_title.innerHTML
		                                let previus_current_ico_country = get_current_item_ico.getAttribute("src")
		                                //try{
		                                get_current_item_title.innerHTML = get_content_from_title.innerHTML;get_content_from_title.innerHTML = previous_current_title_country
		                                get_current_item_ico.setAttribute("src",String(get_ico_from_item.getAttribute("src")));get_ico_from_item.setAttribute("src",String(previus_current_ico_country))
		                                
		                                let get_dropdown_list = document.getElementById('dropdown_list_countries')
		                                let get_dropdown_list_ul = document.getElementById('dropdown_list_ul')
		                                get_dropdown_list.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>get_dropdown_list.style.cssText='opacity:0;display:none;',100)
		                                get_dropdown_list_ul.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>get_dropdown_list_ul.style.cssText='opacity:0;display:none;',100)
		                                opened_dropdown_country = true  
		                                document.getElementById('dropdown_country').style.cssText = 'display:block;opacity:1;background-color:transparent;'
		                                //}catch(e){return}
														        let year = document.getElementById('year').innerHTML
														        let country_choosed = document.getElementById('dropdown_country_title').innerHTML
														        // let table_event_container = document.getElementById('table_event_container')
														        let data = {	
														            'year': year,
														            'country': country_choosed,
														        }

	                                  calendar.preloader.show();
			          										$.ajax({
														            type: "POST",
														            url: '/countries/',
														            data: JSON.stringify(data, null, '\t'),
														            contentType: 'application/json;charset=UTF-8',
														            success: function (response) {
														            		//get_event_list.innerHTML = ''
														                let add_content_container = document.createElement("div")
														                add_content_container.setAttribute("id", "table_event_container")
														                add_content_container.innerHTML = response["data"]
														                get_event_list.appendChild(add_content_container)
														                //get_event_list.removeChild(add_loading_container)
														                calendar.preloader.hide();
														            },
														            error: (error) => {
														                throw error
														            }
														        })
		                            }
		                        }else{
		                            let create_dropdown_list_ul = document.getElementById('dropdown_list_countries')
		                            let get_dropdown_list_ul = document.getElementById('dropdown_list_ul')
		                            get_dropdown_list_ul.style.cssText = 'display:block;opacity:0;'
		                            create_dropdown_list_ul.style.cssText = 'display:block;opacity:0;'
		                            create_dropdown_list_ul.animate([{opacity:0},{opacity:1}],{duration:100,fill:"both"});setTimeout(()=>create_dropdown_list_ul.cssText="opacity:1;")
		                            get_dropdown_list_ul.animate([{opacity:0},{opacity:1}],{duration:100,fill:"both"});setTimeout(()=>get_dropdown_list_ul.cssText="opacity:1;")
		                            document.getElementById('dropdown_country').style.cssText = "background-color:white;min-height:50px;height:auto;-webkit-box-shadow: 0px 0px 23px -5px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 23px -5px rgba(0,0,0,0.75);box-shadow: 0px 0px 23px -5px rgba(0,0,0,0.75);" 
		                        }

		                    }else if (document.getElementById("dropdown_list_countries") === null){
		                        let create_dropdown_list_ul = document.createElement('div')
		                        create_dropdown_list_ul.setAttribute('id', "dropdown_list_countries")
		                        create_dropdown_list_ul.innerHTML = '\
		                                        <ul id="dropdown_list_ul">\
		                                            <li class="nav_ul"><div id="country_dropdown_list" id="country_dropdown_list_li">\
		                                                <img id="ico_country" src="https://image.flaticon.com/icons/png/512/330/330437.png" width="80" height="80">\
		                                                <p id="dropdown_country_title_list" class="ru">Russia</p>\
		                                            </div></li>\
		                                            <li class="nav_ul"><div id="country_dropdown_list" id="country_dropdown_list_li">\
		                                                <img id="ico_country" src="https://image.flaticon.com/icons/svg/330/330550.svg" width="80" height="80">\
		                                                <p id="dropdown_country_title_list" class="by">Belarus</p>\
		                                            </div></li>\
		                                            <li class="nav_ul"><div id="country_dropdown_list" id="country_dropdown_list_li">\
		                                                <img id="ico_country" src="https://image.flaticon.com/icons/png/512/330/330459.png" width="80" height="80">\
		                                                <p id="dropdown_country_title_list" class="us">USA</p>\
		                                            </div></li>\
		                                            <li class="nav_ul"><div id="country_dropdown_list" id="country_dropdown_list_li">\
		                                                <img id="ico_country" src="https://image.flaticon.com/icons/png/512/330/330495.png" width="80" height="80">\
		                                                <p id="dropdown_country_title_list" class="uz">Uzbekistan</p>\
		                                            </div></li>\
		                                        </ul>'
		                        document.getElementById('dropdown_country').appendChild(create_dropdown_list_ul)
		                        create_dropdown_list_ul.style.cssText = 'display:block;opacity:0;'
		                        create_dropdown_list_ul.animate([{opacity:0},{opacity:1}],{duration:100,fill:"both"});setTimeout(()=>create_dropdown_list_ul.cssText="opacity:1;",100)
		                        document.getElementById('dropdown_country').style.cssText = "background-color:white;min-height:50px;height:auto;z-index:10;-webkit-box-shadow: 0px 0px 23px -5px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 23px -5px rgba(0,0,0,0.75);box-shadow: 0px 0px 23px -5px rgba(0,0,0,0.75);"
		                        document.getElementById('ico_country').setAttribute('draggable', false);
		                    }
		                    opened_dropdown_country = true
		                }
		            }else{if (opened_dropdown_country === false){
		                    try{
		                        let get_dropdown_list = document.getElementById('dropdown_list_countries')
		                        let get_dropdown_list_ul = document.getElementById('dropdown_list_ul')
		                        get_dropdown_list.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>get_dropdown_list.style.cssText='opacity:0;display:none;',100)
		                        get_dropdown_list_ul.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>get_dropdown_list_ul.style.cssText='opacity:0;display:none;',100)
		                        opened_dropdown_country = true  
		                        document.getElementById('dropdown_country').style.cssText = 'display:block;opacity:1;background-color:transparent;'
		                    }catch(e){return}
		                }

		            }
		    });

		    //PART LOGIC OF CALENDAR

		    for (let count in days) {
		        let newElem = document.createElement('th')
		        newElem.innerHTML = days[count]
		        newElem.id = days[count]
		        newElem.className = 'day'
		        newElem.style.cssText = 'text-decoration: none;display: block;float: left;padding: 145px 100px;text-decoration: none;font-size:30px;font-family: "Roboto", sans-serif;width: auto;'
		        container_days.style.cssText = 'position:absolute;margin-top:10px;margin-left:-230px;'
		        container_days.appendChild(newElem)
		    }

		    function generate_year_range(start, end) {
		        let years = "";
		        for (let year = start; year <= end; year++) {
		            years += "<option value='" + year + "'>" + year + "</option>";
		        }
		        return years;
		    }

		    const createYear = generate_year_range(1970, 2050);
		    showCalendar(currentMonth, currentYear, 'None')

		    function showCalendar(month, year, swiped, swiped_mode, marginValueLeft, marginValueCenter, marginValueRight){
		        let firstDay = (new Date(year, month)).getDay()

		        element_month.innerHTML = months[month];
		        element_year.innerHTML = year
		        if (swiped === "next") {
		        	if (swiped_mode === "preview"){
		        		render_cal('right_calendar_body')
		        	}else{
		        			console.log("next")
			            render_cal('right_calendar_body')
			            let get_container_right = document.getElementById('right_calendar_body')
			            let get_container_left = document.getElementById('left_calendar_body')
			            let get_container_center = document.getElementById('calendar_body')
			            //get_container_right.style.cssText = 'animation:1s linear right_to_center;';
			            console.log(marginValueRight,marginValueCenter)
			            get_container_right.animate([{marginLeft:String(marginValueRight)+"px"},{marginLeft:"-280px"}],{duration:100})
			            setTimeout(()=>{get_container_right.style.cssText = 'margin-left:1650px;margin-top: 180px;position: absolute;'}, 100)
			            //get_container_center.style.cssText = 'animation:1s linear center_container_to_left;';
			            get_container_center.animate([{marginLeft:String(marginValueCenter)+"px"},{marginLeft:"2200px"}],{duration:100})
			            setTimeout(()=>{get_container_center.style.cssText = 'margin-left:-280px;margin-top: 180px;position: absolute;'}, 100)
			            get_container_center.innerHTML = get_container_right.innerHTML
			            get_container_right.innerHTML = ""	        		
		        	}
		        } else if (swiped === "back") {	
		        	if (swiped_mode === "preview"){
		        		render_cal('left_calendar_body')
		        	}else{
		        		console.log('back')
								render_cal('left_calendar_body')
								let get_container_right = document.getElementById('right_calendar_body')
								let get_container_left = document.getElementById('left_calendar_body')
								let get_container_center = document.getElementById('calendar_body')
								//get_container_left.style.cssText = 'animation:1s linear left_to_center;';
								get_container_left.animate([{marginLeft:String(marginValueLeft)+"px"},{marginLeft:"-280px"}],{duration:100})
								setTimeout(() => get_container_left.style.cssText = 'margin-left:-2200px;margin-top: 180px;position: absolute;', 100)
								//get_container_center.style.cssText = 'animation:1s linear center_container_to_right;';
								get_container_center.animate([{marginLeft:String(marginValueCenter)+"px"},{marginLeft:"-2200px"}],{duration:100})
								setTimeout(() => get_container_center.style.cssText = 'margin-left:-280px;margin-top: 180px;position: absolute;', 100)
								get_container_center.innerHTML = get_container_left.innerHTML
								get_container_left.innerHTML = ""
		        	}
		        } else {
		            render_cal('calendar_body')
		        }

		        //CREATING CELLS
		        function render_cal(id) {
		            let tbl = document.getElementById(id)
		            tbl.innerHTML = ''
		            let date = 1
		            for (let i = 0; i < 6; i++) {
		                let row = document.createElement('tr')
		                row.style.cssText = "font-size: 30px;font-family: 'Lato', sans-serif;"
		                for (var j = 0; j < 7; j++) {
		                    if (i === 0 && j < firstDay) {
		                        let cell = document.createElement('td')
		                        let cellText = document.createTextNode("")
		                        cell.appendChild(cellText)
		                        row.appendChild(cell)
		                    } else if (date > daysInMonth(month, year)) {
		                        break;
		                    } else {
		                        let cell = document.createElement('td'), cell_span
		                        cell.setAttribute("data-date", date)
		                        cell.setAttribute('data-month', month + 1)
		                        cell.setAttribute('data-year', year)
		                        cell.setAttribute('data-month_name', months[month])
		                        cell.setAttribute('id', date)
		                        cell.className = 'date-picker'
		                        cell_span = document.createElement('div')
		                        cell_span.innerHTML = date
		                        cell_span.setAttribute('id', 'span_' + date)
		                        cell_span.setAttribute('class', 'cell_div')
		                        cell.appendChild(cell_span)
		                        cell.style.cssText = 'padding:50px;padding-left:165px;text-align:center;'

		                        if (date === now.getDate() && year === now.getFullYear() && month === now.getMonth()) {
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

		    let x = 0
		    let y = 0
		    let initialX = null
		    let initialY = null
		    let diffX = null
		    let diffY = null

		    lel = document.getElementById("left_calendar_body")
		    el = document.getElementById("calendar_body")
		    rel = document.getElementById("right_calendar_body")

				document.getElementById("left_calendar_body").style.cssText = "display:block;margin-left:-2200px;"
				document.getElementById("right_calendar_body").style.cssText = "display:block;margin-left:1650px;"

		    let lgetCurrentPos = -Math.abs(Number(lel.style.marginLeft.replace(/\D/g, '')))
		    let getCurrentPos = -Math.abs(Number(el.style.marginLeft.replace(/\D/g, '')))
		    let rgetCurrentPos = Math.abs(Number(rel.style.marginLeft.replace(/\D/g, '')))
		    console.log(lgetCurrentPos)
		    el.addEventListener("touchstart",(e)=>{
	        initialX = e.touches[0].clientX;
	        initialY = e.touches[0].clientY;

					let selectedCurrentMonth = months.indexOf(document.getElementById("month_name").innerHTML)
					let selectedCurrentYear = Number(document.getElementById("year").innerHTML)

					//currentYear = (selectedCurrentMonth === 0) ? selectedCurrentYear - 1 : selectedCurrentYear;
					//currentMonth = (selectedCurrentMonth === 0) ? 11 : selectedCurrentMonth - 1;
					showCalendar(currentMonth, currentYear, "back", "preview");

					//currentYear = (selectedCurrentMonth === 11) ? selectedCurrentYear + 1 : selectedCurrentYear;
					//currentMonth = (selectedCurrentMonth + 1) % 12;
					showCalendar(currentMonth, currentYear, "next", "preview");	
			    	//console.log("TOUCHSTART:","X - "+String(x),"; Y - "+String(y))
		    },false)
		    el.addEventListener("touchmove",(e)=>{
					if (initialX === null) {
						return
					}

					if (initialY === null) {
						return
					}

					const currentX = e.touches[0].clientX;
					const currentY = e.touches[0].clientY;

					diffX = initialX - currentX;
					diffY = initialY - currentY;

					if (Math.abs(diffX) > Math.abs(diffY)) {
					//back
						if (getCurrentPos >= 200){
							if (diffX >= 0){
								lgetCurrentPos-=20
								getCurrentPos-=20
								rgetCurrentPos-=20

								lel.style.marginLeft = String(lgetCurrentPos)+"px"
								el.style.marginLeft = String(getCurrentPos)+"px"
								rel.style.marginLeft = String(rgetCurrentPos)+"px"		
							}else{
								return
							}
						}else if (getCurrentPos <= -900){
							if (diffX <= 0){
								lgetCurrentPos+=20
								getCurrentPos+=20
								rgetCurrentPos+=20

								lel.style.marginLeft = String(lgetCurrentPos)+"px"
								el.style.marginLeft = String(getCurrentPos)+"px"
								rel.style.marginLeft = String(rgetCurrentPos)+"px"	
							}else{
								return 
							}
						//get in
						}else{
							if (diffX > 0) {
							  // swiped left
								lgetCurrentPos-=20
								getCurrentPos-=20
								rgetCurrentPos-=20

								lel.style.marginLeft = String(lgetCurrentPos)+"px"
								el.style.marginLeft = String(getCurrentPos)+"px"
								rel.style.marginLeft = String(rgetCurrentPos)+"px"	
							} else {
								  // swiped right
									lgetCurrentPos+=20
									getCurrentPos+=20
									rgetCurrentPos+=20

									lel.style.marginLeft = String(lgetCurrentPos)+"px"
									el.style.marginLeft = String(getCurrentPos)+"px"
									rel.style.marginLeft = String(rgetCurrentPos)+"px"
								}
							}
						}
					//el.preventDefault()   
					},false)

		    el.addEventListener("touchend",(e)=>{
		    	
		    	if (el.style.marginLeft === "-280px"){
		    		return
		    	}else{
		    		if (diffX < -400){
		    			back(lgetCurrentPos,getCurrentPos,rgetCurrentPos)
		    		}else if (diffX > 400){
		    			next(lgetCurrentPos,getCurrentPos,rgetCurrentPos)
		    		}

		    	}

		    	lgetCurrentPos = -2200
		    	getCurrentPos = -280	
		    	rgetCurrentPos = 1650
		    },false)

				let year = Number(document.getElementById('year').innerHTML)
				let country_choosed = document.getElementById('dropdown_country_title').innerHTML

		    function back(marginValueLeft, marginValueCenter, marginValueRight){
		    		if (mode === "events"){
		    			year--
					    let data = {
								'year': year,
								'country': country_choosed,
							}
							calendar.preloader.show();
			        $.ajax({
			            type: "POST",
			            url: '/countries/',
			            data: JSON.stringify(data, null, '\t'),
			            contentType: 'application/json;charset=UTF-8',
			            success: function (response) {
			                let add_content_container = document.getElementById("table_event_container")
			                add_content_container.innerHTML = response["data"]
			                calendar.preloader.hide();
			            },
			            error: (error) => {
			                console.log(error)
			            }
			        })
		    		}else if (mode === "numbers"){
							let selectedCurrentMonth = months.indexOf(document.getElementById("month_name").innerHTML)
							let selectedCurrentYear = Number(document.getElementById("year").innerHTML)
							currentYear = (selectedCurrentMonth === 0) ? selectedCurrentYear - 1 : selectedCurrentYear;
							currentMonth = (selectedCurrentMonth === 0) ? 11 : selectedCurrentMonth - 1;
							showCalendar(currentMonth, currentYear, "back", "numbers", marginValueLeft, marginValueCenter, marginValueRight);
		    		}else{
		    			throw "Can't get mode."
		    		}
		    }

		    function next(marginValueLeft, marginValueCenter, marginValueRight){
		    	if (mode === "events"){
		    		if (year >= now.getFullYear()){}else if (year <= now.getFullYear()){
		    			year++
					    let data = {
								'year': year,
								'country': country_choosed,
							}
							calendar.preloader.show();
			        $.ajax({
			            type: "POST",
			            url: '/countries/',
			            data: JSON.stringify(data, null, '\t'),
			            contentType: 'application/json;charset=UTF-8',
			            success: function (response) {
			                let add_content_container = document.getElementById("table_event_container")
			                add_content_container.innerHTML = response["data"]
			                calendar.preloader.hide();
			            },
			            error: (error) => {
			                console.log(error)
			            }
			        })	
		    		}

		    	}else if (mode === "numbers"){
						let selectedCurrentMonth = months.indexOf(document.getElementById("month_name").innerHTML)
						let selectedCurrentYear = Number(document.getElementById("year").innerHTML)
						currentYear = (selectedCurrentMonth === 11) ? selectedCurrentYear + 1 : selectedCurrentYear;
						currentMonth = (selectedCurrentMonth + 1) % 12;
						showCalendar(currentMonth, currentYear, 'next',"numbers",marginValueLeft,marginValueCenter, marginValueRight);	    		
		    	}else{
		    		throw "Can't get mode."
		    	}

		    }

		    function daysInMonth(iMonth, iYear) {
		        return 32 - new Date(iYear, iMonth, 32).getDate()
		    }


		    [get_background_main, get_button_cancel_go_to, get_button_ok_go_to].forEach(
		        item => item.addEventListener("click", () => {
		            get_div_about.animate([{opacity: 1}, {opacity: 0}], {duration: 100, fill: 'both'});
		            setTimeout(() => get_div_about.style.cssText = 'opacity:0;display:none;', 100)
		            get_background.style.cssText = 'animation:0.1s linear sharp_background;';
		            setTimeout(() => get_background.style.cssText = 'filter:blur(0rem);')
		            get_background_arrow_buttons.style.cssText = 'animation:0.1s linear sharp_background;';
		            setTimeout(() => get_background_arrow_buttons.style.cssText = 'filter:blur(0rem);')
		            get_button_for_switch_to_current_date.style.cssText = 'animation:0.1s linear sharp_background;';
		            setTimeout(() => get_button_for_switch_to_current_date.style.cssText = 'filter:blur(0rem);')
		            get_event_list.style.cssText = 'margin-left:3%;display:block;animation:0.1s linear sharp_background;';
		            setTimeout(() => get_event_list.style.cssText = 'margin-left:3%;display:block;filter:blur(0rem);')
		            get_div_bg.style.display = 'none'
		            //dropdown_list_country.style.display = 'none'
		            //=-=-=-=-=-=-=-=-
		            get_go_to_div.animate([{opacity: 1}, {opacity: 0}], {duration: 100, fill: 'both'});
		            setTimeout(() => get_go_to_div.style.cssText = 'opacity:0;display:none', 100)
		        }))

		    // about container
		    get_button_about.addEventListener("click", () => {
		        get_div_bg.style.display = 'block'
		        get_background.style.cssText = 'display:block;animation:0.1s linear blur_background;';
		        setTimeout(() => get_background.style.cssText = 'filter:blur(1rem);')

		        get_background_arrow_buttons.style.cssText = 'animation:0.1s linear blur_background;';
		        setTimeout(() => get_background_arrow_buttons.style.cssText = 'filter:blur(1rem);')

		        get_event_list.style.cssText = 'margin-left:3%;display:block;animation:0.1s linear blur_background;';
		        setTimeout(() => get_event_list.style.cssText = 'margin-left:3%;display:block;filter:blur(1rem);')

		        get_button_for_switch_to_current_date.style.cssText = 'animation:0.1s linear blur_background;';
		        setTimeout(() => get_button_for_switch_to_current_date.style.cssText = 'filter:blur(1rem);')
		        get_div_about.style.display = 'block'
		        get_div_about.animate([{opacity: 0}, {opacity: 1}], {duration: 100, fill: 'both'});
		        setTimeout(() => get_div_about.style.cssText = 'opacity:1;display:block;')
		    })

		    //go to container
		    get_button_go_to.addEventListener("click", () => {
		        get_div_bg.style.display = 'block'
		        get_background.style.cssText = 'display:block;animation:0.1s linear blur_background;';
		        setTimeout(() => get_background.style.cssText = 'filter:blur(1rem);')

		        get_background_arrow_buttons.style.cssText = 'animation:0.1s linear blur_background;';
		        setTimeout(() => get_background_arrow_buttons.style.cssText = 'filter:blur(1rem);')

		        get_event_list.style.cssText = 'margin-left:3%;display:block;animation:0.1s linear blur_background;';
		        setTimeout(() => get_event_list.style.cssText = 'margin-left:3%;display:block;filter:blur(1rem);')

		        get_button_for_switch_to_current_date.style.cssText = 'animation:0.1s linear blur_background;';
		        setTimeout(() => get_button_for_switch_to_current_date.style.cssText = 'filter:blur(1rem);')
		        get_go_to_div.style.cssText = 'display:block;opacity:1;'
		        get_go_to_div.animate([{opacity: 0}, {opacity: 1}], {duration: 100, fill: 'both'});
		        setTimeout(() => get_go_to_div.style.cssText = 'opacity:1;display:block;')
		    })

		    //current date
		    get_button_for_switch_to_current_date.addEventListener("click", () => {
		        showCalendar(now.getMonth(), now.getFullYear())
		    })

		    get_button_ok_go_to.addEventListener("click", () => {
		        showCalendar(months.indexOf(document.getElementsByClassName('option-choose-month is-selected')[0].innerHTML), document.getElementsByClassName('option-choose-year is-selected')[0].innerHTML, 'None');
		    })

		    get_button_back.addEventListener("click", () => {
		    	back()
		    })

		    get_button_next.addEventListener("click", () => {
		    	next()
		    })

		    for (let m in months) {
		        let create_div_month = document.createElement('div')
		        create_div_month.innerHTML = months[m]
		        create_div_month.setAttribute('class', 'option-choose-month')
		        create_div_month.setAttribute('id', 'selector_' + months[m])
		        month_div.appendChild(create_div_month)
		    }

		    for (let d = 1; d < 32; d++) {
		        if (String(d).length < 2) {
		            d = "0" + d
		        }
		        let create_div_month_days_count = document.createElement('div')
		        create_div_month_days_count.innerHTML = d
		        create_div_month_days_count.setAttribute('class', 'option-choose-monthday')
		        create_div_month_days_count.setAttribute('id', 'selector_' + d)
		        month_days_div.appendChild(create_div_month_days_count)
		    }
		    for (let yc = 1970; yc <= 2050; yc++) {
		        let create_div_year = document.createElement('div')
		        create_div_year.innerHTML = yc
		        create_div_year.setAttribute('class', 'option-choose-year')
		        create_div_year.setAttribute('id', 'selector_' + yc)
		        year_div.appendChild(create_div_year)
		    }

		    let events_btn = document.querySelector('#events_list')
		    let event_container = document.querySelector('#events_container')
				let get_container_center = document.getElementById('calendar_body')
				let get_calendar_head = document.getElementById('nav_days_ul')
		    events_btn.addEventListener("click", () => {
		    		if (mode === 'events'){
		    			mode = 'numbers'
		    			events_btn.innerHTML = 'Event list'
		    			get_calendar_head.style.cssText = "animation:calendar_body_swipe_to_right 1s ease-in-out;";        setTimeout(() => get_calendar_head.style.cssText = 'margin-top: 10px;margin-left: -230px; position:absolute;', 1000)
		    			get_container_center.style.cssText = 'animation:left_to_center 1s ease-in-out;';
			        setTimeout(() => get_container_center.style.cssText = 'margin-left:-280px;margin-top: 180px;position:absolute;display:block;', 1000)
			        events_container.style.cssText = "display:block;animation: slide_events_container_back 1s ease-in-out;";
			        setTimeout(() => {events_container.style.cssText = "margin-left:200%;display:none;"}, 1000)
			       	dropdown_list_country.style.cssText = 'display:block;'
			        dropdown_list_country.animate([{opacity: 1}, {opacity: 0}], {duration: 1000, fill: 'both'});
			        setTimeout(() => {
			            dropdown_list_country.style.cssText = 'display:none;opacity:0;'
			        },1000)

		    		}else{
		    			events_btn.innerHTML = 'Simple calendar'
			        get_calendar_head.style.cssText = "animation:calendar_body_swipe_to_left 1s ease-in-out;";
			        setTimeout(() => get_calendar_head.style.cssText = 'margin-top:10px;margin-left:-200%;position:absolute;', 1000)
			        get_container_center.style.cssText = 'animation:center_container_to_left 1s ease-in-out;';
			        setTimeout(() => get_container_center.style.cssText = 'margin-left:-200%;margin-top: 180px;position:absolute;display:none;', 1000)
			        events_container.style.cssText = "display:block;animation: slide_events_container 1s ease-in-out;";
			        setTimeout(() => {events_container.style.cssText = "margin-left:3%;display:block;";}, 1000)
			        let year = document.getElementById('year').innerHTML
			        let country_choosed = document.getElementById('dropdown_country_title').innerHTML
			        let data = {
			            'year': year,
			            'country': country_choosed,
			        }
			        dropdown_list_country.style.cssText = 'display:block;'
			        dropdown_list_country.animate([{opacity: 0}, {opacity: 1}], {duration: 1000, fill: 'both'});
			        setTimeout(() => {
			            dropdown_list_country.style.cssText = 'display:block;opacity:1;'
			        })
			        $.ajax({
			            type: "POST",
			            url: '/countries/',
			            data: JSON.stringify(data, null, '\t'),
			            contentType: 'application/json;charset=UTF-8',
			            success: function (response) {
			                let add_content_container = document.createElement("div")
			                add_content_container.setAttribute("id", "table_event_container")
			                add_content_container.innerHTML = response["data"]
			                get_event_list.appendChild(add_content_container)
			                mode = 'events'
			            },
			            error: (error) => {
			                console.log(error)
			            }
			        })
		    		}

		    })
		})
})();

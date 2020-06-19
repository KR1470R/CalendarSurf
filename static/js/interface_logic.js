(() => {
    let calendar = null;
    (() => {
        let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        class Preloader {
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
                    {opacity: 1},
                    {opacity: 0},
                ], {
                    duration: 1000,
                });
                setTimeout(() => this.el.style.display = "none", 1000);
            }
        }

        class Menu {
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
                    {opacity: 0},
                    {opacity: 1},
                ], {
                    duration: 100,
                    fill: "both",
                });
                setTimeout(() => this.el.style.display = "block", 100);

                this.shown = true;
            }

            hide() {
                this.el.animate([
                    {opacity: 1},
                    {opacity: 0},
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
        const months_days_count = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        let has_been_clicked = false //for count day
        let now = new Date()
        let current_month = months[now.getMonth()]

        document.getElementById('month_name').innerHTML = current_month
        document.getElementById('month_day').innerHTML = now.getDate()

        const ico_cal_current_date_btn = document.getElementById("ico_cal_current_date_btn")
        const text_current_date_content = document.getElementById('text_current_date_content')
        text_current_date_content.innerHTML = now.getDate()

        let currentMonth = now.getMonth()
        let currentYear = now.getFullYear()
        const container_days = document.getElementById('nav_days_ul')
        const element_month = document.getElementById('month_name')
        const element_month_day = document.getElementById('month_day')
        const element_year = document.getElementById('year')

        const month_div = document.getElementById('month_div')

        const year_div = document.getElementById('year_div')

        const month_days_div = document.getElementById('day_div')

        //LOGIC PAGE
        const menu = document.getElementById('nav_menu')

        let one_selected = false
        let div_picker_selected_number = null
        let div_picker_selected = false
        let removed = false

        const get_button_about = document.getElementById('settings')
        const get_button_go_to = document.getElementById('go_to')

        const get_button_ok_go_to = document.getElementById('ok')
        const get_button_cancel_go_to = document.getElementById('cancel')

        const get_button_back = document.getElementById('back')
        const get_button_next = document.getElementById('next')

        const get_div_about = document.getElementById('about')
        const get_background_main = document.getElementById('background')
        const get_background = document.getElementById('canvas_cal')
        const get_background_arrow_buttons = document.getElementById('div_back_next')
        const get_div_bg = document.getElementById('background')
        const get_go_to_div = document.getElementById('go-to-div')
        const get_button_for_switch_to_current_date = document.getElementById('get_current_date')
        const dropdown_list_country = document.getElementById("dropdown_country")
        dropdown_list_country.style.display = 'none'
        const get_event_list = document.getElementById("events_container")

        const get_current_date_btn = document.getElementById('get_current_date')

        let pop_up_opened = false

        document.getElementById('ico_country_current').setAttribute('draggable', false);
        let number_selected = null

        let mode = 'numbers'

//         MOBILE CHECK
        function mobileCheck(){
            if (typeof window.orientation !== "undefined"){                                                     
                return true                                                                     
            }else{
                return false
            }
        }
        let outMobileCheck = mobileCheck()
//  

        if (outMobileCheck === true){                              // true if Mobile       
            get_background_arrow_buttons.style.display = "none"   // false if NOT Mobile
            menu.style.position = "absolute"
        }else{}

        function setAttributes(el, atrs) {
          for (let key in atrs){
            el.setAttribute(key, atrs[key]);
          }
        }

        dict_dropdown_list_countries = {
            "Russia":["/static/img/IcoCountryes/ru.png","ru"],
            "Belarus":["/static/img/IcoCountryes/by.svg","by"],
            "USA":["/static/img/IcoCountryes/usa.png","us"],
            "Uzbekistan":["/static/img/IcoCountryes/uz.png","uz"],
        }

        let dropdown_list_elms = ["dropdown_country","dropdown_list_ul","country_dropdown_list","dropdown_country_title_list","selected_country","ico_country_current"]

        function setAttributes(el, atrs) {
          for (let key in atrs){
            el.setAttribute(key, atrs[key]);
          }
        }

        function requestAjax(data) {
            $.ajax({
                type: "POST",
                url: '/countries/',
                data: JSON.stringify(data, null, '\t'),
                contentType: 'application/json;charset=UTF-8',
                success: function (response) {
                    get_event_list.innerHTML = ''
                    let add_content_container = document.createElement("div")
                    add_content_container.setAttribute("id", "table_event_container")
                    add_content_container.innerHTML = response["data"]
                    get_event_list.appendChild(add_content_container)
                    calendar.preloader.hide();
                    if (mode === "events") {
                        events_btn.innerHTML = 'Simple calendar'
                        add_content_container.innerHTML = response["data"]
                    }
                },
                error: (error) => {
                    throw error
                }
            })
        }

        function visibleCurrentDateBtn() {

            if (mode === "numbers") {
                if (element_month.innerHTML === current_month && element_month_day.innerHTML === now.getDate() && element_year.innerHTML === currentYear) {
                    get_current_date_btn.style.display = 'none'
                } else {
                    get_current_date_btn.style.cssText = 'background-color: #D5D5D5;width: 100px;height: 100px;border-radius: 99999px;position: relative;display: flex;flex-direction: column;float: right;position: fixed;bottom: 3%;left: 92%;align-self: flex-end;cursor: pointer;z-index: 10;'
                    text_current_date_content.innerHTML = now.getDate()
                    ico_cal_current_date_btn.width = "75";
                    ico_cal_current_date_btn.height = "75"
                    ico_cal_current_date_btn.style.marginTop = "-40px"

                }
            } else if (mode === "events") {
                if (element_year.innerHTML === currentYear) {
                    get_current_date_btn.style.display = 'none'
                } else {
                    get_current_date_btn.style.cssText = 'background-color: #D5D5D5;width: 200px;height: 100px;border-radius: 35px;position: relative;display: flex;flex-direction: column;float: right;position: fixed;bottom: 3%;left: 85%;align-self: flex-end;cursor: pointer;z-index: 10;'
                    text_current_date_content.innerHTML = now.getFullYear()
                    ico_cal_current_date_btn.width = "150";
                    ico_cal_current_date_btn.height = "95"
                    ico_cal_current_date_btn.style.marginTop = "-50px"
                }
            }
            if (pop_up_opened === false) {
            } else {
                get_button_for_switch_to_current_date.style.filter = 'blur(1rem)'
            }

        }

        document.addEventListener("mouseover", function (e) {
            visibleCurrentDateBtn()
        }, false)

        document.addEventListener("click", function (e) {
            let c = e.target.getAttribute('class')
            let i = e.target.getAttribute('id')
            let opened_dropdown_country = false
            let get_selected_month = document.querySelector('.option-choose-month.is-selected')
            let get_index_month = months.indexOf(get_selected_month.innerHTML)
            let get_month_count = months_days_count[get_index_month]
            let wtn = 31 - get_month_count

            visibleCurrentDateBtn()

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

            function swapElements(obj1, obj2) {
                let obj1_id = obj1.id 
                let obj2_id = obj2.id 
                obj1.id = obj2_id
                obj2.id = obj1_id
                let parent2 = obj2.parentNode;
                let next2 = obj2.nextSibling;
                if (next2 === obj1) {
                    parent2.insertBefore(obj1, obj2);
                } else {
                    obj1.parentNode.insertBefore(obj2, obj1);
                    if (next2) {
                        parent2.insertBefore(obj1, next2);
                    } else {
                        parent2.appendChild(obj1);
                    }
                }
            }

            if (c === 'nav_menu_li') {
                return;
            }else if(!dropdown_list_elms.includes(i)){
                try{
                    let get_dropdown_list = document.getElementById('dropdown_list_countries')
                    let get_dropdown_list_ul = document.getElementById('dropdown_list_ul')
                    get_dropdown_list.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>get_dropdown_list.style.cssText='opacity:0;display:none;',100)
                    get_dropdown_list_ul.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>get_dropdown_list_ul.style.cssText='opacity:0;display:none;',100)
                    opened_dropdown_country = true  
                    document.getElementById('dropdown_country').style.cssText = 'display:block;opacity:1;background-color:transparent;'
                }catch(e){return}
            }else if (dropdown_list_elms.includes(i)){
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
                                swapElements(get_content_from_title,get_current_item_title)
                                get_current_item_ico.setAttribute("src",String(get_ico_from_item.getAttribute("src")));get_ico_from_item.setAttribute("src",String(previus_current_ico_country))
                                let get_dropdown_list = document.getElementById('dropdown_list_countries')
                                let get_dropdown_list_ul = document.getElementById('dropdown_list_ul')
                                get_dropdown_list.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>get_dropdown_list.style.cssText='opacity:0;display:none;',100)
                                get_dropdown_list_ul.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>get_dropdown_list_ul.style.cssText='opacity:0;display:none;',100)
                                opened_dropdown_country = true  
                                document.getElementById('dropdown_country').style.cssText = 'display:block;opacity:1;background-color:transparent;'
                                let year = document.getElementById('year').innerHTML
                                let country_choosed = document.getElementById('dropdown_country_title').className
                                let data = {    
                                    'year': year,
                                    'country': country_choosed,
                                }
                                calendar.preloader.show();
                                requestAjax(data)
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
                        let create_dropdown_list_ul_el = document.createElement("ul")
                        create_dropdown_list_ul_el.setAttribute("id","dropdown_list_ul")
                        create_dropdown_list_ul.appendChild(create_dropdown_list_ul_el)
                        for (let [name,value] of Object.entries(dict_dropdown_list_countries)){
                            let dropdown_list_ul_li = document.createElement("li")
                            dropdown_list_ul_li.setAttribute("class","nav_ul")
                            create_dropdown_list_ul_el.appendChild(dropdown_list_ul_li)
                            let dropdown_list_ul_li_div = document.createElement("div")
                            dropdown_list_ul_li_div.setAttribute("id","country_dropdown_list")
                            dropdown_list_ul_li.appendChild(dropdown_list_ul_li_div)
                            let dropdown_list_ul_li_div_img = document.createElement("img")
                            setAttributes(dropdown_list_ul_li_div_img,{"id":"ico_country","src":value[0],"width":"80","height":"80"})
                            let dropdown_list_ul_li_div_p = document.createElement("p")
                            setAttributes(dropdown_list_ul_li_div_p,{"id":"dropdown_country_title_list","class":value[1]})
                            dropdown_list_ul_li_div_p.innerHTML = name 
                            dropdown_list_ul_li_div.appendChild(dropdown_list_ul_li_div_img);dropdown_list_ul_li_div.appendChild(dropdown_list_ul_li_div_p)
                        }
                        document.getElementById('dropdown_country').appendChild(create_dropdown_list_ul)
                        create_dropdown_list_ul.style.cssText = 'display:block;opacity:0;'
                        create_dropdown_list_ul.animate([{opacity:0},{opacity:1}],{duration:100,fill:"both"});setTimeout(()=>{create_dropdown_list_ul.cssText="opacity:1;"},100)
                        document.getElementById('dropdown_country').style.cssText = "background-color:white;min-height:50px;height:auto;z-index:10;-webkit-box-shadow: 0px 0px 23px -5px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 23px -5px rgba(0,0,0,0.75);box-shadow: 0px 0px 23px -5px rgba(0,0,0,0.75);"
                        document.getElementById('ico_country').setAttribute('draggable', false);
                    }
                    opened_dropdown_country = true
                    return
            }
        }});

        //PART LOGIC OF CALENDAR

        function generate_year_range(start, end) {
            let years = "";
            for (let year = start; year <= end; year++) {
                years += "<option value='" + year + "'>" + year + "</option>";
            }
            return years;
        }

        const createYear = generate_year_range(1970, 2050);
        showCalendar(currentMonth, currentYear, 'None')

        function showCalendar(month, year, swiped, swiped_mode, xPos, clickedOnButton) {
            let firstDay = (new Date(year, month)).getDay()
            if (swiped_mode === "preview") {
            } else {
                element_month.innerHTML = months[month];
                element_year.innerHTML = year
            }

            if(clickedOnButton){
                if (swiped === "next") {
                    render_cal('right_calendar_body')
                    let get_container_right = document.getElementById('right_calendar_body')
                    let get_container_left = document.getElementById('left_calendar_body')
                    let get_container_center = document.getElementById('calendar_body')
                    get_container_center.style.cssText = '-webkit-animation: animation_next 1000ms linear both;animation: animation_next 1000ms linear both;';
                    setTimeout(() => get_container_center.style.cssText = 'margin-left:-280px;margin-top: 180px;position: absolute;', 100)
                    get_container_center.innerHTML = get_container_right.innerHTML
                }else if(swiped === "back"){
                    render_cal('left_calendar_body')
                    let get_container_right = document.getElementById('right_calendar_body')
                    let get_container_left = document.getElementById('left_calendar_body')
                    let get_container_center = document.getElementById('calendar_body')
                    get_container_center.style.cssText = '-webkit-animation: animation_back 1000ms linear both;animation: animation_back 1000ms linear both;';
                    setTimeout(() => get_container_center.style.cssText = 'margin-left:-280px;margin-top: 180px;position: absolute;', 100)
                    get_container_center.innerHTML = get_container_left.innerHTML
                }

            } else if (clickedOnButton === false) {
                if (swiped === "next") {
                    if (swiped_mode === "preview") {
                        render_cal('right_calendar_body')
                    } else {
                        render_cal('right_calendar_body')
                        let get_container_right = document.getElementById('right_calendar_body')
                        let get_container_left = document.getElementById('left_calendar_body')
                        let get_container_center = document.getElementById('calendar_body')

                        get_container_right.animate([{transform: "translateX(" + xPos + "px)"}, {transform: "translateX(-2000px)"}], {duration: 300})

                        get_container_center.animate([{transform: "translateX(" + xPos + "px)"}, {transform: "translateX(-2000px)"}], {duration: 300})
                        setTimeout(() => {
                            get_container_center.style.cssText = 'margin-left:-280px;margin-top:180px;position:absolute;transform:translateX(0px);'
                            get_container_center.innerHTML = get_container_right.innerHTML
                            get_container_right.innerHTML = ""
                            get_container_left.innerHTML = ""
                        }, 300)
                    }
                } else if (swiped === "back") {
                    if (swiped_mode === "preview") {
                        render_cal('left_calendar_body')
                    } else {
                        render_cal('left_calendar_body')
                        let get_container_right = document.getElementById('right_calendar_body')
                        let get_container_left = document.getElementById('left_calendar_body')
                        let get_container_center = document.getElementById('calendar_body')
                        get_container_left.animate([{transform: "translateX(" + xPos + "px)"}, {transform: "translateX(2000px)"}], {duration: 300})
                        get_container_center.animate([{transform: "translateX(" + xPos + "px)"}, {transform: "translateX(2000px)"}], {duration: 300})
                        setTimeout(() => {
                            get_container_center.style.cssText = 'margin-left:-280px;margin-top: 180px;position: absolute;transform:translateX(0px);'
                            get_container_center.innerHTML = get_container_left.innerHTML
                            get_container_right.innerHTML = ""
                            get_container_left.innerHTML = ""
                        }, 300)
                    }
                }
            } else {
                render_cal("calendar_body")
            }

            //CREATING CELLS
            function render_cal(id) {
                let tbl = document.getElementById(id)
                tbl.innerHTML = ''
                let date = 1
                let row_day = document.createElement("tr")
                row_day.style.paddingTop = "100px"
                for (let count in days) {
                    let newElem = document.createElement('td')
                    newElem.innerHTML = days[count]
                    newElem.id = days[count]
                    newElem.className = 'day'
                    row_day.appendChild(newElem)
                }
                tbl.appendChild(row_day)
                for (let i = 0; i < 6; i++) {
                    let row = document.createElement('tr')
                    row.style.cssText = "font-size: 30px;font-family: 'Lato', sans-serif;"
                    for (let j = 0; j < 7; j++) {
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

                            if (date === now.getDate() && year === now.getFullYear() && month === now.getMonth()) {
                                div_picker_selected_number = date
                                cell_span.className = 'cell_div_selected selected'
                            }
                            row.appendChild(cell)
                            date++
                        }
                    }
                    tbl.appendChild(row)
                }
            }
        }

        let active = false;
        let currentX;
        let initialX;
        let xOffset = 0;

        const lel = document.getElementById("left_calendar_body")
        const el = document.getElementById("calendar_body")
        const rel = document.getElementById("right_calendar_body")

        const eventsel = document.getElementById("events_container")

        lel.style.cssText = "display:block;margin-left:-2200px;"
        rel.style.cssText = "display:block;margin-left:1650px;"

        let getCurrentPosEvents = Math.abs(Number(eventsel.style.marginLeft.replace(/\D/g, '')))

        function dragStart(e) {
            if (e.type === "touchstart") {
                initialX = e.touches[0].clientX - xOffset;
            } else {
                initialX = e.clientX - xOffset;
            }
            let selectedCurrentMonth = months.indexOf(document.getElementById("month_name").innerHTML)
            let selectedCurrentYear = Number(document.getElementById("year").innerHTML)
            currentYear = (selectedCurrentMonth === 0) ? selectedCurrentYear - 1 : selectedCurrentYear;
            currentMonth = (selectedCurrentMonth === 0) ? 11 : selectedCurrentMonth - 1;

            showCalendar(currentMonth, currentYear, "back", "preview", null, false);
            showCalendar(currentMonth, currentYear, "next", "preview", null, false);
        }

        function drag(e) {
            e.preventDefault();
            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
            } else {
                currentX = e.clientX - initialX;
            }
            xOffset = currentX;
            if (mode === "numbers") {
                setTranslate(currentX, [lel, el, rel]);

            } else if (mode === "events") {
                setTranslate(currentX, [eventsel])
            }
        }

        function setTranslate(xPos, elements) {
            elements.forEach(
                i => i.style.transform = "translateX(" + xPos + "px)"
            )
        }

        function setTranslateBack(elements) {
            elements.forEach(
                j => {
                    j.animate([{transform: "translateX(" + currentX + "px)"}, {transform: "translateX(0px)"}], {duration: 100});
                    setTimeout(() => {
                        j.style.transform = "translateX(0px)"
                    }, 100)
                }
            )
        }

        el.addEventListener("touchstart", dragStart, false)
        el.addEventListener("touchmove", drag, false)

        el.addEventListener("touchend", (e) => {
            if (el.style.transform === "translateX('0px')") {
                return
            } else {
                if (currentX < -400) {
                    next(false, currentX)
                } else if (currentX > 400) {
                    back(false, currentX)
                } else if (currentX > -400 || currentX < 400) {
                    setTranslateBack([lel, el, rel])
                }
            }
            xOffset = 0
            currentX = 0
        }, false)

        eventsel.addEventListener("touchstart", dragStart, false)
        eventsel.addEventListener("touchmove", drag, false)

        eventsel.addEventListener("touchend", (e) => {
            if (eventsel.style.transform === "translateX('0px')") {
                return
            } else {
                if (currentX < -400) {
                    next(false, currentX);
                    setTranslateBack([eventsel])
                } else if (currentX > 400) {
                    back(false, currentX);
                    setTranslateBack([eventsel])
                } else if (currentX > -400 || currentX < 400) {
                    setTranslateBack([eventsel])
                }
            }
            xOffset = 0
            currentX = 0
        }, false)

        function back(clickedOnButton, xPos) {
            if (mode === "events") {
                let year = document.getElementById('year').innerHTML
                let country_choosed = document.getElementById('dropdown_country_title').className
                year--
                document.getElementById('year').innerHTML = year
                let data = {
                    'year': year,
                    'country': country_choosed,
                }
                calendar.preloader.show();
                requestAjax(data)
            } else if (mode === "numbers") {
                let selectedCurrentMonth = months.indexOf(document.getElementById("month_name").innerHTML)
                let selectedCurrentYear = Number(document.getElementById("year").innerHTML)
                currentYear = (selectedCurrentMonth === 0) ? selectedCurrentYear - 1 : selectedCurrentYear;
                currentMonth = (selectedCurrentMonth === 0) ? 11 : selectedCurrentMonth - 1;
                showCalendar(currentMonth, currentYear, "back", "numbers", currentX, clickedOnButton);
            } else {
                throw "Can't get mode."
            }
        }

        function next(clickedOnButton, xPos) {
            if (mode === "events") {
                let year = document.getElementById('year').innerHTML
                let country_choosed = document.getElementById('dropdown_country_title').className
                if (year >= now.getFullYear()) {
                } else if (year <= now.getFullYear()) {
                    year++;
                    document.getElementById('year').innerHTML = year
                    let data = {
                        'year': year,
                        'country': country_choosed,
                    }
                    calendar.preloader.show();
                    requestAjax(data)
                }

            } else if (mode === "numbers") {
                let selectedCurrentMonth = months.indexOf(document.getElementById("month_name").innerHTML)
                let selectedCurrentYear = Number(document.getElementById("year").innerHTML)
                currentYear = (selectedCurrentMonth === 11) ? selectedCurrentYear + 1 : selectedCurrentYear;
                currentMonth = (selectedCurrentMonth + 1) % 12;
                showCalendar(currentMonth, currentYear, 'next', "numbers", currentX, clickedOnButton);
            } else {
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
                get_go_to_div.animate([{opacity: 1}, {opacity: 0}], {duration: 100, fill: 'both'});
                setTimeout(() => get_go_to_div.style.cssText = 'opacity:0;display:none', 100)
                pop_up_opened = false
            }))

        // about container
        get_button_about.addEventListener("click", () => {
            get_div_bg.style.display = 'block'
            get_background.style.cssText = 'display:block;animation:0.1s linear blur_background;';
            setTimeout(() => get_background.style.cssText = 'filter:blur(1rem);', 100)

            get_background_arrow_buttons.style.cssText = 'animation:0.1s linear blur_background;';
            setTimeout(() => get_background_arrow_buttons.style.cssText = 'filter:blur(1rem);', 100)

            get_event_list.style.cssText = 'margin-left:3%;display:block;animation:0.1s linear blur_background;';
            setTimeout(() => get_event_list.style.cssText = 'margin-left:3%;display:block;filter:blur(1rem);', 100)

            get_button_for_switch_to_current_date.style.cssText = 'animation:0.1s linear blur_background;';
            setTimeout(() => get_button_for_switch_to_current_date.style.filter = 'blur(1rem)', 100)

            get_div_about.style.display = 'block'
            get_div_about.animate([{opacity: 0}, {opacity: 1}], {duration: 100, fill: 'both'});
            setTimeout(() => get_div_about.style.cssText = 'opacity:1;display:block;', 100)
            pop_up_opened = true
        })

        //go to container
        get_button_go_to.addEventListener("click", () => {
            get_div_bg.style.display = 'block'
            get_background.style.cssText = 'display:block;animation:0.1s linear blur_background;';
            setTimeout(() => get_background.style.cssText = 'filter:blur(1rem);', 100)

            get_background_arrow_buttons.style.cssText = 'animation:0.1s linear blur_background;';
            setTimeout(() => get_background_arrow_buttons.style.cssText = 'filter:blur(1rem);', 100)

            get_event_list.style.cssText = 'margin-left:3%;display:block;animation:0.1s linear blur_background;';
            setTimeout(() => get_event_list.style.cssText = 'margin-left:3%;display:block;filter:blur(1rem);', 100)

            get_button_for_switch_to_current_date.style.cssText = 'animation:0.1s linear blur_background;';
            setTimeout(() => get_button_for_switch_to_current_date.style.filter = 'blur(1rem)', 100)

            get_go_to_div.style.cssText = 'display:block;opacity:1;'
            get_go_to_div.animate([{opacity: 0}, {opacity: 1}], {duration: 100, fill: 'both'});
            setTimeout(() => get_go_to_div.style.cssText = 'opacity:1;display:block;', 100)
            pop_up_opened = true
        })
        //current date
        get_button_for_switch_to_current_date.addEventListener("click", () => {

            if (mode === "numbers") {
                showCalendar(now.getMonth(), now.getFullYear())
                get_current_date_btn.style.display = 'none'
            } else if (mode === "events") {
                let year = now.getFullYear()
                let country_choosed = document.getElementById('dropdown_country_title').className
                let data = {
                    'year': year,
                    'country': country_choosed,
                }
                calendar.preloader.show();
                requestAjax(data)
            }
        })

        get_button_ok_go_to.addEventListener("click", () => {
            pop_up_opened = false
            if (mode === "numbers") {
                get_event_list.innerHTML = "";
                get_event_list.style.display = "none"
                showCalendar(months.indexOf(document.getElementsByClassName('option-choose-month is-selected')[0].innerHTML), document.getElementsByClassName('option-choose-year is-selected')[0].innerHTML, 'None');
            } else if (mode === "events") {
                let year = document.querySelector('.option-choose-year.is-selected').innerHTML
                let country_choosed = document.getElementById('dropdown_country_title').innerHTML
                // let table_event_container = document.getElementById('table_event_container')
                let data = {
                    'year': year,
                    'country': country_choosed,
                }
                calendar.preloader.show();
                requestAjax(data)
            }
        })

        get_button_back.addEventListener("click", () => {
            back(true)
        })

        get_button_next.addEventListener("click", () => {
            next(true)
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
                mode = "numbers"
                get_container_center.style.cssText = 'margin-left:-280px;margin-top: 180px;position:absolute;display:block;'
                events_container.style.cssText = "margin-left:200%;display:none;";event_container.innerHTML
                    dropdown_list_country.style.cssText = 'display:block;'
                dropdown_list_country.animate([{opacity: 1}, {opacity: 0}], {duration: 100, fill: 'both'});
                setTimeout(() => {
                    dropdown_list_country.style.cssText = 'display:none;opacity:0;';events_btn.innerHTML = 'Event list'
                },1000)

            }else{
                mode = "events"
                calendar.preloader.show();
                get_container_center.style.cssText = 'margin-left:-200%;margin-top: 180px;position:absolute;display:none;'
                events_container.style.cssText = "margin-left:50px;display:block;"
                let year = document.getElementById('year').innerHTML
                let country_choosed = document.getElementById('dropdown_country_title').className
                let data = {
                    'year': year,
                    'country': country_choosed,
                }
                dropdown_list_country.style.cssText = 'display:block;'
                dropdown_list_country.animate([{opacity: 0}, {opacity: 1}], {duration: 1000, fill: 'both'});
                setTimeout(() => {
                    dropdown_list_country.style.cssText = 'display:block;opacity:1;'
                })
                requestAjax(data)
            }

        })
    })
})();

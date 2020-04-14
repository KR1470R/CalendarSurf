$(document).on('click', function(e){
	let $menu = $('#nav_menu')
	let c = $(e.target).attr('class')
	let i = $(e.target).attr('id')
	if (c === 'nav_menu_li'){return};
	if (i == 'menu'){$menu.toggleClass('disabled')}else{$menu.addClass('disabled')};
	if ($menu.hasClass('disabled')){$menu.css('display','none')}else{$menu.css('display','block')}
})
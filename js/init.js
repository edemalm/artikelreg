$(document).ready(function() {
	"use strict";
	console.debug('Loading init.js');

	// Global variables
	window.update = '2025-11-04-2';	// Last commit date
	window.validate_input = 'Yes';	// "Yes" to enable

	// Initialize form
	formInit();

	// Read theme cookie from device
	var c_theme = getCookie('theme');
	if (c_theme != null) {
		console.info('Found cookie: theme=' + c_theme);
		setTheme(c_theme);
	} else {
		console.info('No theme cookie found, using system preferred theme');
		setSystemTheme();
	}

	// Read palette cookie from device
	var c_palette = getCookie('palette');
	if (c_palette != null) {
		console.info('Found cookie: palette=' + c_palette);
		$('html').addClass(c_palette);
		$('.palette-item[value=' + c_palette + ']').attr('selected', true);
		setCookie('palette', c_palette, 365);
	} else {
		console.info('No palette cookie found');
		$('html').addClass('navy');
		$('.palette-item[value=navy]').attr('selected', true);
	}

	// Set background image class
	const d = new Date();
	let month = d.getMonth();
	let bgclasses = [];
	if ( month == 0 || month == 1 || month == 2 ) {
		// Jan, Feb, Mar
		console.debug("I believe it's winter");
		bgclasses = ['winter-0','winter-1','winter-2','winter-3','winter-4','winter-5','winter-6','winter-7','winter-8'];
	}
	if ( month == 3 || month == 4 ) {
		// Apr, May
		console.debug("I believe it's spring");
		bgclasses = ['spring-0','spring-1','spring-2','spring-3','spring-4','spring-5','spring-6', 'spring-7'];
	}
	if ( month == 5 || month == 6 || month == 7 ) {
		// Jun, Jul, Aug
		console.debug("I believe it's summer");
		bgclasses = ['summer-0','summer-1','summer-2','summer-3','summer-4','summer-5','summer-6','summer-7','summer-8','summer-9','summer-10','summer-11','summer-12','summer-13','summer-14','summer-15','summer-16'];
	}
	if ( month == 8 || month == 9 || month == 10 ) {
		// Sep, Oct, Nov
		console.debug("I believe it's fall");
		bgclasses = ['fall-0','fall-1','fall-2','fall-3','fall-4','fall-5','fall-6','fall-7','fall-8','fall-9','fall-10','fall-11','fall-12','fall-13','fall-14','fall-15','fall-16','fall-17','fall-18','fall-19','fall-20','fall-21'];
	}
	if ( month == 11 ) {
		// Dec
		console.debug("I believe it's christmas");
		bgclasses = ['christmas-0','christmas-1','christmas-2','christmas-3'];
	}
	const random = Math.floor(Math.random() * bgclasses.length);
	$('body').addClass(bgclasses[random]);

	// Inactivity plugin
	// https://github.com/kaparelos/jquery.inactivity
	$(document).inactivity( { timeout: 30000 });
	$(document).on("activity", function() {
		console.debug('Activity detected');
		$('mdui-layout-main').fadeIn('fast');
	});
	$(document).on("inactivity", function() {
		console.debug('Inactivity detected');
		if ( $('mdui-navigation-drawer').attr('open') || $('mdui-dialog').attr('open')) {
			console.log('action calcelled');
			return;
		}
		$('mdui-layout-main').fadeOut();
	});

	// Set date in version
	$('#version').html('Version ' + update);

	// Update site links
	let deploy1 = atob('aHR0cHM6Ly9hcnRpa2VscmVnLnBhZ2VzLmRldg==');
	let deploy2 = atob('aHR0cHM6Ly9hcnRpa2VscmVnLm5ldGxpZnkuYXBw');
	$('#main-site').html('<a href="' + deploy1 + '/">' + deploy1 + '</a>');
	$('#backup-site').html('<a href="' + deploy2 + '/">' + deploy2 + '</a>');

	// Set current year in copyright
	let currentYear = new Date().getFullYear();
	$('#current-year').html('-' + currentYear);

	// Include HTML from files
	// Note: The load function is not included in the slim verion of jQuery
	console.debug('Loading inc/artikelbenamning.html');
	$('#inc-artikelbenamning').load('inc/artikelbenamning.html'); 

	console.debug('Loading inc/produkt.html');
	$('#inc-produkt').load('inc/produkt.html'); 

	console.debug('Loading inc/infotext.html');
	$('#inc-infotext').load('inc/infotext.html'); 

	console.debug('Loading inc/iso-koder.html');
	$('#inc-iso-koder').load('inc/iso-koder.html'); 

	console.debug('Loading inc/liggplats.html');
	$('#inc-liggplats').load('inc/liggplats.html');

	console.debug('Loading inc/plockomraden.html');
	$('#inc-plockomrade').load('inc/plockomraden.html');

	// Page was reloaded
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	if (urlParams.has('reload')) {
		console.info('Page reload detected');
		const url = location.protocol + '//' + location.host + location.pathname;
		window.history.pushState(null, '', url);
		mdui.snackbar({ message: 'Formuläret är rensat' });
	}

});

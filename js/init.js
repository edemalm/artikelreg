$(document).ready(function() {
	"use strict";
	console.debug('Loading init.js');

	// Global variables
	window.update = '2025-11-27';	// Last commit date
	window.validate_input = 'Yes';	// "Yes" to enable

	// Initialize form
	formInit();

	// Get theme cookie
	var c_theme = getCookie('theme');
	if (c_theme != null) {
		console.debug('Found cookie: theme=' + c_theme);
		switch (c_theme) {
			case 'light':
				setCookie('theme', 'light', 365);
				setTheme('light');
			break;
			case 'dark':
				setCookie('theme', 'dark', 365);
				setTheme('dark');
			break;
			default:
				setCookie('theme', 'system', 365);
				setSystemTheme();
		}
	} else {
		console.info('No theme cookie found, using system preferred theme');
		setSystemTheme();
	}

	// Get palette cookie
	var c_palette = getCookie('palette');
	if (c_palette != null) {
		console.debug('Found cookie: palette=' + c_palette);
		if (c_palette == 'blue' || c_palette == 'purple' || c_palette == 'amber' || c_palette == 'green' ) {
			$('html').addClass(c_palette);
			$('.palette-item[value=' + c_palette + ']').attr('selected', true);
			setCookie('palette', c_palette, 365);
		} else {
			console.info('Invalid palette cookie found, using default palette');
			$('html').addClass('blue');
			$('.palette-item[value=blue]').attr('selected', true);
		}
	} else {
		console.info('No palette cookie found, using default palette');
		$('html').addClass('blue');
		$('.palette-item[value=blue]').attr('selected', true);
	}

	/*
	// Set background image class
	let d = new Date();
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
	let random = Math.floor(Math.random() * bgclasses.length);
	$('body').addClass(bgclasses[random]);
	*/

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

	// Page was reloaded
	/*
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	if (urlParams.has('reload')) {
		console.info('Page reload detected');
		const url = location.protocol + '//' + location.host + location.pathname;
		window.history.pushState(null, '', url);
		mdui.snackbar({ message: 'Formuläret är rensat' });
	}
	*/

	/*
	if ($(window).width() >= 1080) {
		console.debug('Window width ' + $(window).width() + ' >= 1080')

		// Inactivity plugin
		// https://github.com/kaparelos/jquery.inactivity
		$(document).inactivity( { timeout: 30000 });
		console.debug('Starting inactivity timer');

		$(document).on("activity", function() {
			console.debug('Activity detected');
			$('body, mdui-layout-main').removeClass('inactive');
		});
		$(document).on("inactivity", function() {
			console.debug('Inactivity detected');
			if ( $('mdui-navigation-drawer').attr('open') || $('mdui-dialog').attr('open')) {
				console.debug('Inactivity action calcelled');
			} else {
				$('body, mdui-layout-main').addClass('inactive');
			}
		});

	} else {
		console.debug('Window width ' + $(window).width() + ' < 1080')
		console.debug('Inactivity timer disabled');
	}
	*/
});

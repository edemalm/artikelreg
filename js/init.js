$(document).ready(function() {
	"use strict";
	console.debug('Loading init.js');

	// Global variables
	window.update = '2026-07-14';	// Last commit date
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

});

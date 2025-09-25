$(document).ready(function() {
	console.log('Loading init.js');

	// Global variables
	window.update = '2025-09-25';	// Last commit date
	window.debug = 'No';			// "Yes" to enable
	window.validate_input = 'Yes';	// "Yes" to enable

	window.artikelansvar = '';
	window.artikelbenamning = '';
	window.artikeldata = '';
	window.artikeltyp = '';
	window.avd = '';
	window.avdelning = '';
	window.avskrivningstid = '';
	window.buffertlager = '';
	window.debiteringsform = '';
	window.dtm = '';
	window.forbrukning = '';
	window.forbrukning_msg = '';
	window.gmi = '';
	window.iki = '';
	window.iri = '';
	window.individartikel = '';
	window.inkopshantering = '';
	window.inventarium = '';
	window.ipi = '';
	window.kk = '';
	window.kkb = '';
	window.leverantor = '';
	window.liggplats = '';
	window.huvudlager = '';
	window.produkt2 = '';
	window.produkt3 = '';
	window.produkt4 = '';
	window.servicegrad = '';
	window.sortimentsartikel = '';
	window.standardprodukt = '';
	window.team = '';
	window.theme = '';
	window.upplysningar = '';
	window.ws_bb = '';
	window.ws_pub = '';
	window.ws_info = '';
	window.ws_komp = '';
	window.ws_sort = '';

	// Check for 'theme' parameter in URL
	let params = new URLSearchParams(window.location.search);
	if (params.get('theme') == 'dark') {
		theme = 'dark';
		console.log('Requested theme: ' + theme);
	} else if (params.get('theme') == 'light') {
		theme = 'light';
		console.log('Requested theme: ' + theme);
	} else {
		console.log('No theme requested in URL parameter');
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme = 'dark';
		} else {
			theme = 'light';
		}
		console.log('System preferred theme: ' + theme);
	}

	// Set theme class
	if (theme == 'dark') {
		$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-light').addClass('mdui-theme-dark');
		$('#button-toggle-theme').removeAttr('icon').attr('icon', 'light_mode--outlined');
	} else {
		$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-dark').addClass('mdui-theme-light');
		$('#button-toggle-theme').removeAttr('icon').attr('icon', 'dark_mode--outlined');
	}

	// Toggle theme
	$('#button-toggle-theme').click(function() {
		console.log('<mdui-button #button-toggle-theme> clicked');
		if ( $('html').hasClass('mdui-theme-light') ) {
			$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-light').addClass('mdui-theme-dark');
			$('#button-toggle-theme').removeAttr('icon').attr('icon', 'light_mode--outlined');
			theme = 'dark';
		} else {
			$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-dark').addClass('mdui-theme-light');
			$('#button-toggle-theme').removeAttr('icon').attr('icon', 'dark_mode--outlined');
			theme = 'light';
		}
	});

	// Debug
	if (debug == 'Yes') {
		$('.debug').removeClass('hidden');
		$('#viewport-size').html( 'Viewport size: ' + $(window).width() + 'x' + $(window).height() );
		$(window).resize(function() {
			$('#viewport-size').html( 'Viewport size: ' + $(window).width() + 'x' + $(window).height() );
		});
	}

	// Set background image class
	const d = new Date();
	let month = d.getMonth();

	if ( month == 0 || month == 1 || month == 2 ) {
		// Jan, Feb, Mar
		console.log("I believe it's winter");
		const bgclasses = ['winter-0','winter-1','winter-2','winter-3','winter-4','winter-5','winter-6','winter-7','winter-8'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}
	if ( month == 3 || month == 4 ) {
		// Apr, May
		console.log("I believe it's spring");
		const bgclasses = ['spring-0','spring-1','spring-2','spring-3','spring-4','spring-5','spring-6', 'spring-7'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}
	if ( month == 5 || month == 6 || month == 7 ) {
		// Jun, Jul, Aug
		console.log("I believe it's summer");
		const bgclasses = ['summer-0','summer-1','summer-2','summer-3','summer-4','summer-5','summer-6','summer-7','summer-8','summer-9','summer-10','summer-11','summer-12','summer-13','summer-14','summer-15','summer-16'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}
	if ( month == 8 || month == 9 || month == 10 ) {
		// Sep, Oct, Nov
		console.log("I believe it's fall");
		const bgclasses = ['fall-0','fall-1','fall-2','fall-3','fall-4','fall-5','fall-6','fall-7','fall-8','fall-9','fall-10','fall-11','fall-12','fall-13','fall-14','fall-15','fall-16','fall-17','fall-18','fall-19','fall-20','fall-21'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}
	if ( month == 11 ) {
		// Dec
		console.log("I believe it's christmas");
		const bgclasses = ['christmas-0','christmas-1','christmas-2','christmas-3'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}

	// Inactivity plugin
	// https://github.com/kaparelos/jquery.inactivity
	$(document).inactivity( { timeout: 30000 });
	$(document).on("activity", function() {
		console.log('Activity detected');
		$('#filter-layer, mdui-layout-main, mdui-dialog').removeClass('inactive')
	});
	$(document).on("inactivity", function() {
		console.log('Inactivity detected');
		$('#filter-layer, mdui-layout-main, mdui-dialog').addClass('inactive')
	});

	// Set date in version
	$('#version').html( 'Version ' + update );

	// Update site links
	var deploy1 = atob('aHR0cHM6Ly9hcnRpa2VscmVnLnBhZ2VzLmRldg==');
	var deploy2 = atob('aHR0cHM6Ly9hcnRpa2VscmVnLm5ldGxpZnkuYXBw');
	$('#main-site').html('<a href="' + deploy1 + '/">' + deploy1 + '</a>');
	$('#backup-site').html('<a href="' + deploy2 + '/">' + deploy2 + '</a>');

	// Catch the "open" event of <mdui-collapse-item #menu-collapse-group1>
	$('#menu-collapse-group1').on('open', function() {
		console.log('The open event fired on #menu-collapse-group1');
		$('#menu-group1-arrow').attr('name', 'keyboard_arrow_up')
	});
	// Catch the "open" event of <mdui-collapse-item #menu-collapse-group2>
	$('#menu-collapse-group2').on('open', function() {
		console.log('The open event fired on #menu-collapse-group2');
		$('#menu-group2-arrow').attr('name', 'keyboard_arrow_up')
	});
	// Catch the "close" event of <mdui-collapse-item #menu-collapse-group1>
	$('#menu-collapse-group1').on('close', function() {
		console.log('The close event fired on #menu-collapse-group1');
		$('#menu-group1-arrow').attr('name', 'keyboard_arrow_down')
	});
	// Catch the "close" event of <mdui-collapse-item #menu-collapse-group2>
	$('#menu-collapse-group2').on('close', function() {
		console.log('The close event fired on #menu-collapse-group2');
		$('#menu-group2-arrow').attr('name', 'keyboard_arrow_down')
	});

	// Include HTML from files
	// Note: The load function is not included in the slim verion of jQuery
	console.log('Loading inc/artikelbenamning.html');
	$('#inc-artikelbenamning').load('inc/artikelbenamning.html'); 

	console.log('Loading inc/produkt.html');
	$('#inc-produkt').load('inc/produkt.html'); 

	console.log('Loading inc/iso-koder.html');
	$('#inc-iso-koder').load('inc/iso-koder.html'); 

	console.log('Loading inc/liggplats.html');
	$('#inc-liggplats').load('inc/liggplats.html');

	console.log('Loading inc/plockomraden.html');
	$('#inc-plockomrade').load('inc/plockomraden.html');

	// Page was reloaded
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	if (urlParams.has('reload')) {
		console.log('Page reload detected');
		/*
		let params = new URLSearchParams(window.location.search);
		console.log('Query string (before):' + params);
		params.delete('reload');
		console.log('Query string (after):' + params);
		let url = location.protocol + '//' + location.host + location.pathname + '?' + params;
		console.log(url);
		window.history.pushState(null, '', url);

		*/
		const url = location.protocol + '//' + location.host + location.pathname;
		window.history.pushState(null, '', url);
		mdui.snackbar({ message: 'Formuläret är rensat' });
	}

});

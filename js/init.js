$(document).ready(function() {

	console.log('Loading init.js');
	//console.log('window.location.protocol: ' + window.location.protocol);

	// Global variables
	window.update = '2025-08-19';
	window.debug = 'No'; // "Yes" to enable

	window.artikelansvar = '';
	window.artikeldata = '';
	window.artikeltyp = '';
	window.avd = '';
	window.avdelning = '';
	window.avskrivningstid = '';
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
	window.huvudlager = '';
	window.huvudprodukt = '';
	window.produkt2 = '';
	window.produkt3 = '';
	window.produkt4 = '';
	window.servicegrad = '';
	window.sortimentsartikel = '';
	window.team = '';
	window.upplysningar = '';
	window.ws_bb = '';
	window.ws_pub = '';
	window.ws_info = '';
	window.ws_komp = '';
	window.ws_sort = '';

	/* Set theme class on html element, set icon on theme toggle button */
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		console.log('System prefers dark mode');
		$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-light').addClass('mdui-theme-dark');
		$('#button-toggle-theme').removeAttr('icon').attr('icon', 'light_mode--outlined');
	} else {
		console.log('System prefers light mode');
		$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-dark').addClass('mdui-theme-light');
		$('#button-toggle-theme').removeAttr('icon').attr('icon', 'dark_mode--outlined');
	}

	// Debug
	if (debug == 'Yes') {
		$('.debug').removeClass('hidden');
		$('#viewport-size').html( 'Viewport size: ' + $(window).width() + 'x' + $(window).height() );
		$(window).resize(function() {
			$('#viewport-size').html( 'Viewport size: ' + $(window).width() + 'x' + $(window).height() );
		});
	}

	const d = new Date();
	let month = d.getMonth();

	if ( month == 0 || month == 1 || month == 2 ) {
		console.log("I believe it's winter");
		const bgclasses = ['winter-0','winter-1','winter-2','winter-3','winter-4','winter-5','winter-6','winter-7','winter-8'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}
	if ( month == 3 || month == 4 ) {
		console.log("I believe it's spring");
		const bgclasses = ['spring-0','spring-1','spring-2','spring-3','spring-4','spring-5','spring-6', 'spring-7'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}
	if ( month == 5 || month == 6 || month == 7 ) {
		console.log("I believe it's summer");
		const bgclasses = ['summer-0','summer-1','summer-2','summer-3','summer-4','summer-5','summer-6','summer-7','summer-8','summer-9','summer-10','summer-11','summer-12','summer-13','summer-14','summer-15','summer-16'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}
	if ( month == 8 || month == 9 || month == 10 ) {
		console.log("I believe it's fall");
		const bgclasses = ['fall-0','fall-1','fall-2','fall-3','fall-4','fall-5','fall-6','fall-7','fall-8','fall-9','fall-10','fall-11','fall-12','fall-13','fall-14','fall-15','fall-16','fall-17','fall-18','fall-19','fall-20','fall-21'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}
	if ( month == 11 ) {
		console.log("I believe it's christmas");
		const bgclasses = ['christmas-0','christmas-1','christmas-2','christmas-3'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}

	// https://github.com/kaparelos/jquery.inactivity
	$(document).inactivity( { timeout: 60000 });
	$(document).on("activity", function() {
		$('#filter-layer, .outer-container').removeClass('inactive')
	});
	$(document).on("inactivity", function() {
		console.log('function that fires on inactivity');
		$('#filter-layer, .outer-container').addClass('inactive')
	});

	// Set date in version
	$('#version').html( 'Version ' + update );

	// Update site links
	var deploy1 = atob('aHR0cHM6Ly9hcnRpa2VscmVnLnBhZ2VzLmRldg==');
	var deploy2 = atob('aHR0cHM6Ly9hcnRpa2VscmVnLm5ldGxpZnkuYXBw');
	$('#main-site').html('<a href="' + deploy1 + '/">' + deploy1 + '</a>');
	$('#backup-site').html('<a href="' + deploy2 + '/">' + deploy2 + '</a>');

	/* Toggle theme */
	$('#button-toggle-theme').click(function() {
		console.log('#button-toggle-theme clicked');
		if ( $('html').hasClass('mdui-theme-light') ) {
			$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-light').addClass('mdui-theme-dark');
			$('#button-toggle-theme').removeAttr('icon').attr('icon', 'light_mode--outlined');
		} else {
			$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-dark').addClass('mdui-theme-light');
			$('#button-toggle-theme').removeAttr('icon').attr('icon', 'dark_mode--outlined');
		}
		// $('#navigation-drawer').removeAttr('open');
	});

	// Catch the "open" event of <mdui-collapse-item> #menu-collapse-group1
	$('#menu-collapse-group1').on('open', function() {
		console.log('The open event fired on #menu-collapse-group1');
		$('#menu-group1-arrow').attr('name', 'keyboard_arrow_up')
	});
	// Catch the "open" event of <mdui-collapse-item> #menu-collapse-group2
	$('#menu-collapse-group2').on('open', function() {
		console.log('The open event fired on #menu-collapse-group2');
		$('#menu-group2-arrow').attr('name', 'keyboard_arrow_up')
	});

	// Catch the "close" event of <mdui-collapse-item> #menu-collapse-group1
	$('#menu-collapse-group1').on('close', function() {
		console.log('The close event fired on #menu-collapse-group1');
		$('#menu-group1-arrow').attr('name', 'keyboard_arrow_down')
	});
	// Catch the "close" event of <mdui-collapse-item> #menu-collapse-group2
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

	console.log('Loading inc/plockomrade.html');
	$('#inc-plockomrade').load('inc/plockomrade.html');

	// Page was reloaded
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	if (urlParams.has('reload')) {
		console.log('Page reload detected');
		const url = location.protocol + '//' + location.host + location.pathname;
		window.history.pushState(null, '', url);
		mdui.snackbar({ message: 'Formuläret är rensat' });
	}

});

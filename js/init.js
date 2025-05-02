$(document).ready(function() {

	console.log('DOM ready');
	console.log('Loading init.js');
	console.log('window.location.protocol: ' + window.location.protocol);

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
	$(document).inactivity( {
		timeout: 10000, // the timeout until the inactivity event fire [default: 3000]
		mouse: true, // listen for mouse inactivity [default: true]
		keyboard: true, // listen for keyboard inactivity [default: true]
		touch: true, // listen for touch inactivity [default: true]
		customEvents: "customEventName", // listen for custom events [default: ""]
		triggerAll: true, // if set to false only the first "activity" event will be fired [default: false]
	});
	$(document).on("activity", function() {
		$('#filter-layer, #content-container').removeClass('inactive')
	});

	$(document).on("inactivity", function() {
		console.log('function that fires on inactivity');
		$('#filter-layer, #content-container').addClass('inactive')
	});

	// Global variables
	var update = '2025-04-30';
	var artikeldata;

	// Set date in version
	$('#version').html( 'Version ' + update );

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

	/* Top bar help */
	$('#button-help').click(function() {
		console.log('#button-help clicked');
		$('#dialog-info').attr('open', true);
	});
	$('#button-close-dialog-info').click(function() {
		console.log('#button-close-dialog-info');
		$('#dialog-info').removeAttr('open');
	});





	// Catch the "open" event of <mdui-collapse-item>
	$('.menu-collapse-item').on('open', function() {
		console.log('The open event fired on .menu-collapse-item');
		$('#menu-group-arrow').attr('name', 'keyboard_arrow_up')
	});

	// Catch the "close" event of <mdui-collapse-item>
	$('.menu-collapse-item').on('close', function() {
		console.log('The close event fired on .menu-collapse-item');
		$('#menu-group-arrow').attr('name', 'keyboard_arrow_down')
	});

	$('#menu-formular, .button-back-to-form').click(function() {
		console.log('#menu-formular or .button-back-to-form clicked');
		$('.content-wrapper').addClass('hidden'); /* hide all content */
		$('#content-formular').removeClass('hidden');
		$('mdui-list-item').removeAttr('active');
		$('#menu-formular').attr('active','');
		$('#navigation-drawer').removeAttr('open'); /* close menu */
	});

	$('#menu-help-artikelbenamning').click(function() {
		console.log('#menu-help-artikelbenamning clicked');
		$('.content-wrapper').addClass('hidden'); /* hide all content */
		$('#content-help-artikelbenamning').removeClass('hidden');
		$('mdui-list-item').removeAttr('active'); /* remove active class from all list items */
		$('#menu-help-artikelbenamning').attr('active','');
		$('#navigation-drawer').removeAttr('open'); /* close menu */
	});

	$('#menu-help-produktnamn').click(function() {
		console.log('#menu-help-produktnamn clicked');
		$('.content-wrapper').addClass('hidden'); /* hide all content */
		$('#content-help-produktnamn').removeClass('hidden');
		$('mdui-list-item').removeAttr('active'); /* remove active class from all list items */
		$('#menu-help-produktnamn').attr('active','');
		$('#navigation-drawer').removeAttr('open'); /* close menu */
	});


	$('#menu-help-plockomraden').click(function() {
		console.log('#menu-help-plockomraden clicked');
		$('.content-wrapper').addClass('hidden'); /* hide all content */
		$('#content-help-plockomraden').removeClass('hidden');
		$('mdui-list-item').removeAttr('active'); /* remove active class from all list items */
		$('#menu-help-plockomraden').attr('active','');
		$('#navigation-drawer').removeAttr('open'); /* close menu */
	});

	$('#menu-help-liggplats').click(function() {
		console.log('#menu-help-liggplats clicked');
		$('.content-wrapper').addClass('hidden'); /* hide all content */
		$('#content-help-liggplats').removeClass('hidden');
		$('mdui-list-item').removeAttr('active'); /* remove active class from all list items */
		$('#menu-help-liggplats').attr('active','');
		$('#navigation-drawer').removeAttr('open'); /* close menu */
	});

	$('#menu-help-outlook').click(function() {
		console.log('#menu-help-outlook clicked');
		$('.content-wrapper').addClass('hidden'); /* hide all content */
		$('#content-help-outlook').removeClass('hidden');
		$('mdui-list-item').removeAttr('active'); /* remove active class from all list items */
		$('#menu-help-outlook').attr('active','');
		$('#navigation-drawer').removeAttr('open'); /* close menu */
	});


	$('#button-open-menu').click(function(){
		console.log('Button #button-open-menu clicked');
		if ( $('#navigation-drawer').attr('open') ) {
			console.log('Closing #navigation-drawer');
			$('#navigation-drawer').removeAttr('open');
		} else {
			console.log('Opening #navigation-drawer');
			$('#navigation-drawer').attr('open', true);
		}
	});

	$('#button-close-menu').click(function(){
		console.log('Button #button-close-menu clicked');
		$('#navigation-drawer').removeAttr('open');
	});

	$('#button-fler-produktnamn').click(function(){
		$('#text-produktnamn').attr('label', 'Huvudproduktnamn');
		$('#div-fler-produktnamn').hide();
		$('.extra-produkt').removeClass('hidden');
	});


	$('.button-close-dialog').click(function(){
		console.log('Button #close-dialog clicked');
		// $('#dialog').removeAttr('open');
		$('mdui-dialog').removeAttr('open');
	});

	let var_artikelansvar = '0';
	let var_artikeltyp = '0';
	let var_debiteringsform = '0';
	let var_avd = '';

	$('#select-artikelansvar').on('change', function() {
	var_artikelansvar = this.value;
	console.log('Artikelansvar: ' + var_artikelansvar );
		$('#select-artikeltyp').removeAttr('selected').val('').attr('disabled', false);
		$('#select-debiteringsform').removeAttr('selected').val('').attr('disabled', true);
		// $('#select-individ').val('0').attr('disabled', true).formSelect();
		// $('#select-inventarie').val('0').attr('disabled', true).formSelect();
		// $('#select-avskriv').val('0').attr('disabled', true).formSelect();
	});







	$('#select-artikeltyp').on('change', function() {
		var_artikeltyp = this.value;
		console.log('Artikeltyp: ' + var_artikeltyp );
	});


	$('#switch-individmarkt').on('change', function() {
		console.log('#switch-individmarkt changed to: ' + this.checked);
		var var_individmarkt = (this.checked === true) ? 'Ja' :'Nej';
		console.log('Individmärkt: ' + var_individmarkt );
	});

	$('#switch-inventarie').on('change', function() {
		console.log('#switch-inventarie changed to: ' + this.checked);
		var var_inventarie = (this.checked === true) ? 'Ja' :'Nej';
		console.log('Inventarie: ' + var_inventarie );
	});

	$('#radio-avskrivningstid').on('change', function() {
		console.log('#radio-avskrivningstid changed to: ' + this.value);
		var var_avskrivningstid = this.value;
		console.log('Avskrivningstid: ' + var_avskrivningstid );
	});

	// $('.input').css('color', 'green !important');

});

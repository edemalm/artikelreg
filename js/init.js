$(document).ready(function() {

	console.log('DOM ready');
	console.log('Loading init.js');
	console.log('window.location.protocol: ' + window.location.protocol);

	// Global variables
	var update = '2025-04-22';
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
		$('#div-fler-produktnamn').hide();
		// $('#div-produktnamn').removeClass('m6').addClass('m3');
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

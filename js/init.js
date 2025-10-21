$(document).ready(function() {
	console.debug('Loading init.js');

	// Global variables
	window.update = '2025-10-21';	// Last commit date
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
	window.dev = '';
	window.dm = '';
	window.forbrukning = '';
	window.forbrukning_msg = '';
	window.fuintervall = '';
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
	window.haraldrigkomp = '';
	window.huvudlager = '';
	window.produkt2 = '';
	window.produkt3 = '';
	window.produkt4 = '';
	window.serienummer = '';
	window.servicegrad = '';
	window.sortimentsartikel = '';
	window.standardprodukt = '';
	window.team = '';
	window.theme = '';
	window.upphandlad = '';
	window.upplysningar = '';
	window.wsbb = '';
	window.wspub = '';
	window.wsinfo = '';
	window.wskomp = '';
	window.wssort = '';

	// 1. Artikelbenämning och produkt
	setTextField('artikelbenamning', 'enabled', '', helper_artikelbenamning);	// OK
	setTextField('standardprodukt', 'enabled', '', helper_standardprodukt);		// OK

	// 2. Leverantör

	// 3. Ansvarigt team

	// 4. Ekonomi
	setSelect('artikeltyp', 'disabled', '', helper_artikeltyp);					// OK
	setSelect('debiteringsform', 'disabled', '', helper_debiteringsform);		// OK
	setSwitch('inventarium', 'disabled', 'off', helper_inventarium_off);		// OK
	setRadio('avskrivningstid', 'disabled', '', helper_avskrivningstid_off);	// OK

	// 5. Individinställningar
	setSwitch('individartikel', 'disabled', 'off', helper_individartikel);		// OK
	setSwitch('serienummer', 'disabled', 'off', helper_serienummer);			// OK
	setSwitch('haraldrigkomp', 'disabled', 'off', helper_haraldrigkomp);		// OK
	setSwitch('dm', 'disabled', 'off', helper_dm);							// OK

	// 6. Visma webSesam
	setSwitch('wspub', 'enabled', 'off', helper_wspub_off);						// OK
	setSwitch('wssort', 'enabled', 'off', helper_wssort_off);					// OK
	setSwitch('wsbb', 'enabled', 'off', helper_wsbb_off);						// OK
	setSwitch('wskomp', 'disabled', 'off', helper_wskomp);						// OK
	setTextField('wsinfo', 'disabled', '', helper_wsinfo);

	// 7. Lagerhållning
	setSelect('inkopshantering', 'enabled', '', helper_inkopshantering);		// OK
	setTextField('liggplats', 'enabled', '', helper_liggplats);					// OK
	setTextField('buffertlager', 'enabled', placeholder_buffertlager, helper_buffertlager);	// OK

	// 8. Hantering vid ankomst
	setTextField('gmi', 'enabled', placeholder_gmi, helper_gmi);				// OK
	setSwitch('kk', 'disabled', 'off', helper_kk_off);							// OK
	setTextField('kkb', 'disabled', placeholder_kkb, helper_kkb);				// OK

	// 9. Service och underhåll

	// 10. Informationstexter
	setTextField('iki', 'enabled', placeholder_iki, helper_iki);				// OK
	setTextField('ipi', 'enabled', placeholder_ipi, helper_ipi);				// OK
	setTextField('iri', 'disabled', placeholder_iri, helper_iri_off);			// OK

	// 11. Övriga upplysningar
	setTextField('upplysningar', 'enabled', placeholder_upplysningar, helper_upplysningar);	// OK

	// Check for 'theme' parameter in URL
	let params = new URLSearchParams(window.location.search);
	if (params.get('theme') == 'dark') {
		theme = 'dark';
		console.debug('Requested theme: ' + theme);
	} else if (params.get('theme') == 'light') {
		theme = 'light';
		console.debug('Requested theme: ' + theme);
	} else {
		console.debug('No theme requested in URL parameter');
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme = 'dark';
		} else {
			theme = 'light';
		}
		console.debug('System preferred theme: ' + theme);
	}

	// Set theme class
	if (theme == 'dark') {
		$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-light').addClass('mdui-theme-dark');
		$('#button-toggle-theme').removeAttr('icon').attr('icon', 'light_mode--outlined');
	} else {
		$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-dark').addClass('mdui-theme-light');
		$('#button-toggle-theme').removeAttr('icon').attr('icon', 'dark_mode--outlined');
	}

	// Set background image class
	const d = new Date();
	let month = d.getMonth();

	if ( month == 0 || month == 1 || month == 2 ) {
		// Jan, Feb, Mar
		console.debug("I believe it's winter");
		const bgclasses = ['winter-0','winter-1','winter-2','winter-3','winter-4','winter-5','winter-6','winter-7','winter-8'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}
	if ( month == 3 || month == 4 ) {
		// Apr, May
		console.debug("I believe it's spring");
		const bgclasses = ['spring-0','spring-1','spring-2','spring-3','spring-4','spring-5','spring-6', 'spring-7'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}
	if ( month == 5 || month == 6 || month == 7 ) {
		// Jun, Jul, Aug
		console.debug("I believe it's summer");
		const bgclasses = ['summer-0','summer-1','summer-2','summer-3','summer-4','summer-5','summer-6','summer-7','summer-8','summer-9','summer-10','summer-11','summer-12','summer-13','summer-14','summer-15','summer-16'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}
	if ( month == 8 || month == 9 || month == 10 ) {
		// Sep, Oct, Nov
		console.debug("I believe it's fall");
		const bgclasses = ['fall-0','fall-1','fall-2','fall-3','fall-4','fall-5','fall-6','fall-7','fall-8','fall-9','fall-10','fall-11','fall-12','fall-13','fall-14','fall-15','fall-16','fall-17','fall-18','fall-19','fall-20','fall-21'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}
	if ( month == 11 ) {
		// Dec
		console.debug("I believe it's christmas");
		const bgclasses = ['christmas-0','christmas-1','christmas-2','christmas-3'];
		const random = Math.floor(Math.random() * bgclasses.length);
		$('body').addClass(bgclasses[random]);
	}

	// Inactivity plugin
	// https://github.com/kaparelos/jquery.inactivity
	$(document).inactivity( { timeout: 30000 });
	$(document).on("activity", function() {
		console.debug('Activity detected');
		$('#filter-layer, mdui-layout-main, mdui-dialog').removeClass('inactive');
	});
	$(document).on("inactivity", function() {
		console.debug('Inactivity detected');
		$('#filter-layer, mdui-layout-main, mdui-dialog').addClass('inactive');
	});

	// Set date in version
	$('#version').html( 'Version ' + update );

	// Update site links
	var deploy1 = atob('aHR0cHM6Ly9hcnRpa2VscmVnLnBhZ2VzLmRldg==');
	var deploy2 = atob('aHR0cHM6Ly9hcnRpa2VscmVnLm5ldGxpZnkuYXBw');
	$('#main-site').html('<a href="' + deploy1 + '/">' + deploy1 + '</a>');
	$('#backup-site').html('<a href="' + deploy2 + '/">' + deploy2 + '</a>');

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

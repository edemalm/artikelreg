"use strict";

console.debug('Loading functions.js');

/**
 * Initialize form
 */
function formInit() {
	console.debug('formInit()');

	// Global variables
	window.artikelansvar = '';
	window.artikelbenamning = '';
	window.artikeldata = '';
	window.artikeltyp = '';
	window.avd = '';
	window.avdelning = '';
	window.avskrivningstid = '';
	window.besiktningsintervall = '';
	window.buffertlager = '';
	window.debiteringsform = '';
	window.dev = '';
	window.dm = '';
	window.forbrukning = '';
	window.forbrukning_msg = '';
	window.fuintervall = '';
	window.garanti = '';
	window.gmi = '';
	window.ht = '';
	window.iki = '';
	window.iri = '';
	window.individartikel = '';
	window.inkopshantering = '';
	window.inventarium = '';
	window.ipi = '';
	window.isokod = '';
	window.kk = '';
	window.kkb = '';
	window.levartnr = '';
	window.leverantor = '';
	window.liggplats = '';
	window.haraldrigkomp = '';
	window.huvudlager = '';
	window.pg = '';
	window.pris = '';
	window.produkt2 = '';
	window.produkt3 = '';
	window.produkt4 = '';
	window.serienummer = '';
	window.servicegrad = '';
	window.sortimentsartikel = '';
	window.standardprodukt = '';
	window.team = '';
	window.theme = '';
	window.upplysningar = '';
	window.vf = '';
	window.wsbb = '';
	window.wspub = '';
	window.wsinfo = '';
	window.wskomp = '';
	window.wssort = '';

	// 1. Artikelbenämning och produkt
	setTextField('artikelbenamning', 'enabled', '', helper_artikelbenamning);
	setTextField('standardprodukt', 'enabled', '', helper_standardprodukt);
	$('.extraprodukt').hide();
	$('.standardprodukt').removeClass('xl3');
	$('#text-standardprodukt').attr('label', 'Produkt');
	$('#div-fler-produkter').show();

	// 2. Leverantör
	$('#checkbox-ht').attr('checked', true);
	ht = 'Ja';
	$('#text-isokod, #text-pris, #text-garanti').attr('disabled', true);
	$('#ejht-isokod, #ejht-pris, #ejht-garanti, #ejht-label').addClass('hidden');

	// 3. Ansvarigt team
	setSelect('team', 'enabled', '', helper_team);

	// 4. Ekonomi
	setSelect('artikelansvar', 'disabled', '', '');
	setSelect('artikeltyp', 'disabled', '', helper_artikeltyp);
	setSelect('debiteringsform', 'disabled', '', helper_debiteringsform);
	setSwitch('inventarium', 'disabled', 'off', helper_inventarium_off);
	setRadio('avskrivningstid', 'disabled', '', helper_avskrivningstid_off);

	// 5. Individinställningar
	setSwitch('individartikel', 'disabled', 'off', helper_individartikel);
	setSwitch('serienummer', 'disabled', 'off', helper_serienummer);
	setSwitch('haraldrigkomp', 'disabled', 'off', helper_haraldrigkomp);
	setSwitch('dm', 'disabled', 'off', helper_dm);

	// 6. Visma webSesam
	setSwitch('wspub', 'disabled', 'off', helper_wspub_off);
	setSwitch('wssort', 'disabled', 'off', helper_wssort);
	setSwitch('wsbb', 'disabled', 'off', helper_wsbb_off);
	setSwitch('wskomp', 'disabled', 'off', helper_wskomp);
	setTextField('wsinfo', 'disabled', '', helper_wsinfo);

	// 7. Lagerhållning
	setSelect('inkopshantering', 'enabled', '', helper_inkopshantering);
	setTextField('liggplats', 'enabled', '', helper_liggplats);
	disableSliderForbrukning();
	setTextField('buffertlager', 'enabled', 'Exempel: ' + placeholder_buffertlager, helper_buffertlager);

	// 8. Hantering vid ankomst
	setTextField('gmi', 'enabled', 'Exempel: ' + placeholder_gmi, helper_gmi);
	setSwitch('kk', 'disabled', 'off', helper_kk_off);
	setTextField('kkb', 'disabled', 'Exempel: ' + placeholder_kkb, helper_kkb);

	// 9. Service och underhåll

	// 10. Informationstexter
	setTextField('iki', 'enabled', 'Exempel: ' + placeholder_iki, helper_iki);
	setTextField('ipi', 'enabled', 'Exempel: ' + placeholder_ipi, helper_ipi);
	setTextField('iri', 'disabled', 'Exempel: ' + placeholder_iri, helper_iri_off);

	// 11. Övriga upplysningar
	setTextField('upplysningar', 'enabled', 'Exempel: ' + placeholder_upplysningar, helper_upplysningar);

}
/**
 * Set cookie
 * @param {string} name		- Cookie name 
 * @param {string} value	- Cookie value
 * @param {int} days		- Number of days valid
 */
function setCookie(name, value, days) {
	console.debug('setCookie("' + name + '", "' + value + '", ' + days + ')');
	var d = new Date;
	d.setTime(d.getTime() + 24*60*60*1000*days);
	document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

/**
 * Get cookie
 * @param {string} name		- Cookie name
 */
function getCookie(name) {
	console.debug('getCookie("' + name + '")');
	var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
}

/**
 * Delete cookie
 * @param {string} name		- Cookie name
 */
function deleteCookie(name) {
	console.debug('deleteCookie("' + name + '")');
	setCookie(name, '', -1);
}

/**
 * Detect and set system preferred theme
 */
function setSystemTheme() {
	console.debug('setSystemTheme()');
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
		console.info('System prefers light theme');
		$('html').removeClass('mdui-theme-dark').addClass('mdui-theme-light');
		$('#button-theme-menu').attr('icon', 'light_mode--outlined');
	} else {
		console.info('System prefers dark theme');
		$('html').removeClass('mdui-theme-light').addClass('mdui-theme-dark');
		$('#button-theme-menu').attr('icon', 'dark_mode--outlined');
	}
	$('.theme-item[value=system]').attr('selected', true);
}

/**
 * Set theme
 * @param {string} theme	- Set "light" or "dark"
 */
function setTheme(theme) {
	console.debug('setTheme(' + theme + ')');
	switch (theme) {
		case 'light':
			$('html').removeClass('mdui-theme-dark').addClass('mdui-theme-light');
			$('#button-theme-menu').attr('icon', 'light_mode--outlined');
			$('.theme-item[value=light]').attr('selected', true);
		break;
		case 'dark':
			$('html').removeClass('mdui-theme-light').addClass('mdui-theme-dark');
			$('#button-theme-menu').attr('icon', 'dark_mode--outlined');
			$('.theme-item[value=dark]').attr('selected', true);
		break;
	}
}

/**
 * Add a search parameter to current URL
 * @param {string} key		- Name of search key (i.e. "theme").
 * @param {string} value	- Value of search key (i.e. "dark").
 */
function setURLParam(key, value) {
	console.debug('setURLParam("' + key + '","' + value + '")');
	const url = new URL(window.location);
	url.searchParams.set(key, value);
	history.pushState(null, '', url);
}

/**
 * Enable and show 'isokod', 'pris' and 'garanti' text fields
 */
function showManualPrice() {
	console.debug('showManualPrice()');
	$('#text-isokod').attr('disabled', false);
	$('#text-pris').attr('disabled', false);
	$('#text-garanti').attr('disabled', false);
	$('#ejht-isokod').removeClass('hidden');
	$('#ejht-pris').removeClass('hidden');
	$('#ejht-garanti').removeClass('hidden');
	$('#ejht-label').removeClass('hidden');
}

/**
 * Disable, clear and hide 'isokod', 'pris' and 'garanti' text fields
 */
function hideManualPrice() {
	console.debug('hideManualPrice()');
	$('#text-isokod').val('').attr('disabled', true);
	$('#text-pris').val('').attr('disabled', true);
	$('#text-garanti').val('').attr('disabled', true);
	$('#ejht-isokod').addClass('hidden');
	$('#ejht-pris').addClass('hidden');
	$('#ejht-garanti').addClass('hidden');
	$('#ejht-label').addClass('hidden');
}

/**
 * Set mode of a text field and its palceholder and label
 * @param {string} paramId		- Text field element ID part (i.e. foo in #text-foo).
 * @param {string} mode			- Set "enabled" or "disabled".
 * @param {string} placeholder	- Placeholder text.
 * @param {string} helper		- Helper text.
 */
function setTextField(paramId, mode, placeholder, helper) {
	console.debug('setTextField("' + paramId + '","' + mode + '","' + placeholder + '","' + helper + '")');
	if (mode == 'disabled') {
		$('#text-' + paramId).attr('disabled', true);
	} else {
		$('#text-' + paramId).removeAttr('disabled');
	}
	if (placeholder.length > 0) {
		$('#text-' + paramId).attr('placeholder', placeholder);
	} else {
		$('#text-' + paramId).removeAttr('placeholder');
	}
	if (helper.length > 0) {
		$('#text-' + paramId).attr('helper', helper);
	} else {
		$('#text-' + paramId).removeAttr('helper');
	}
	// TODO: add value to function?
	let oval = window[paramId];
	let nval = $('#text-' + paramId).val();
	if (oval !== nval) {
		window[paramId] = nval;
		console.info(paramId + ': "' + oval + '" => "' + window[paramId] + '"');
	}
}

/**
 * Set <mdui-select> attributes and value
 * @param {string} paramId	- Select element ID part (i.e. foo in #select-foo)
 * @param {string} mode		- Set "enabled" or "disabled".
 * @param {string} value	- Selected value, or '' to reset
 * @param {string} helper	- Helper text.
 */
function setSelect(paramId, mode, value, helper) {
	console.debug('setSelect("' + paramId + '", "' + mode + '", "' + '", "' + value + '", "' + helper + '")');
	if (mode == 'disabled') {
		$('#select-' + paramId).attr('disabled', true);
	} else {
		$('#select-' + paramId).removeAttr('disabled');
	}
	$('#select-' + paramId).val(value);
	if (helper.length > 0) {
		$('#select-' + paramId).attr('helper', helper);
	} else {
		$('#select-' + paramId).removeAttr('helper');
	}
	let oval = window[paramId];
	let nval = $('#select-' + paramId).val();
	if (oval !== nval) {
		window[paramId] = nval;
		console.info(paramId + ': "' + oval + '" => "' + window[paramId] + '"');
	}
}

/**
 * Set mode and state of a switch button and its label.
 * @param {string} paramId	- Element ID part (i.e. foo #label-foo and #switch-foo).
 * @param {string} mode		- Set "enabled" or "disabled".
 * @param {string} state	- Set "on" or "off" state of switch.
 * @param {string} helper	- Helper text.
 */
function setSwitch(paramId, mode, state, helper) {
	console.debug('setSwitch("' + paramId + '","' + mode + '","' + state + '","' + helper + '")');
	if (mode == "disabled") {
		$('#label-' + paramId).addClass('disabled');
		$('#switch-' + paramId).attr('disabled', true);
	} else {
		$('#label-' + paramId).removeClass('disabled');
		$('#switch-' + paramId).removeAttr('disabled');
	}
	if (state == 'on') {
		if (helper.length > 0) $('#label-' + paramId + ' .switch-helper').html(helper);
		$('#switch-' + paramId).attr('checked', true);
	} else {
		if (helper.length > 0) $('#label-' + paramId + ' .switch-helper').html(helper);
		$('#switch-' + paramId).attr('checked', false);
	}
	let oval = window[paramId];
	let nval = ($('#switch-' + paramId).prop("checked") ? "Ja" : "Nej");
	if (oval !== nval) {
		window[paramId] = nval;
		console.info(paramId + ': "' + oval + '" => "' + window[paramId] + '"');
	}
}

/**
 * Set mode of radio buttons and their label.
 * @param {string} paramId	- Element ID part (i.e. foo in #label-foo and #radio-foo).
 * @param {string} mode		- "enabled" or "disabled".
 * @param {string} selected	- selected radio button, or '' to reset.
 * @param {string} helper	- Helper text, or '' to clear
 */
function setRadio(paramId, mode, selected, helper) {
	console.debug('setRadio("' + paramId + '","' + mode + '","' + selected + '","' + helper + '")');
	if (mode == "disabled") {
		$('#label-' + paramId).addClass('disabled');
		$('#radio-' + paramId).val('');
		$('#radio-' + paramId).attr('disabled', true);
	} else {
		$('#label-' + paramId).removeClass('disabled');
		$('#radio-' + paramId).val(selected);
		$('#radio-' + paramId).removeAttr('disabled');
	}
	if (helper.length > 0) {
		$('#label-' + paramId + ' .radio-helper').html(helper);
	} else {
		$('#label-' + paramId + ' .radio-helper').html('');
	}
	let oval = window[paramId];
	let nval = $('#radio-' + paramId).val();
	if (oval !== nval) {
		window[paramId] = nval;
		console.info(paramId + ': "' + oval + '" => "' + window[paramId] + '"');
	}
}


function enableTextReturtagningsinformation() {
	$('#text-iri').attr('disabled', false); // enable
}
function disableTextReturtagningsinformation() {
	$('#text-iri').val('').attr('disabled', true); // clear and disable
}

function enalbeSliderForbrukning() {
	console.debug('enableSliderForbrukning()');
	$('#slider-forbrukning').val('').attr('disabled', false); // clear and enable
	$('.slider-label').removeClass('disabled'); // remove .disabled
	$('.slider-helper').removeClass('disabled'); // remove .disabled
	forbrukning_msg = 'Årsbehov 0-24. Mindre än 0.5 per vecka.';
	$('#slider-msg').html(forbrukning_msg); // update displayd msg
}
function disableSliderForbrukning() {
	console.debug('disableSliderForbrukning()');
	$('#slider-forbrukning').val('').attr('disabled', true); // clear and disable
	$('.slider-label').addClass('disabled'); // add .disabled
	$('.slider-helper').addClass('disabled'); // add .disabled
	forbrukning = ''; // reset
	forbrukning_msg = 'Endast relevant för inköpshantering Nettobehov'; // reset to default msg
	$('#slider-msg').html(forbrukning_msg); // update displayed msg
}

function createArtikeldata() {
	console.debug('createArtikeldata()');

	// Collect data
	artikelansvar = $('#select-artikelansvar').val();
	artikelbenamning = $('#text-artikelbenamning').val();
	artikeltyp = $('#select-artikeltyp').val();
	avskrivningstid = $('#radio-avskrivningstid').val();
	besiktningsintervall = $('#select-besiktningsintervall').val();
	buffertlager = $('#text-buffertlager').val();
	debiteringsform = $('#select-debiteringsform').val();
	dm = ($('#switch-dm').prop("checked") ? "Ja" : "Nej");
	forbrukning = $('#slider-forbrukning').val();
	fuintervall = $('#select-fuintervall').val();
	garanti = $('#text-garanti').val();
	gmi = $('#text-gmi').val();
	haraldrigkomp = ($('#switch-har-aldrig-komp').prop("checked") ? "Ja" : "Nej");
	ht = ($('#checkbox-ht').prop("checked") ? "Ja" : "Nej");
	huvudlager = $('#select-huvudlager').val();
	standardprodukt = $('#text-standardprodukt').val();
	iki = $('#text-iki').val();
	ipi = $('#text-ipi').val();
	iri = $('#text-iri').val();
	isokod = $('#text-isokod').val();
	individartikel = ($('#switch-individartikel').prop("checked") ? "Ja" : "Nej");
	inkopshantering = $('#select-inkopshantering').val();
	inventarium = ($('#switch-inventarium').prop("checked") ? "Ja" : "Nej");
	kk = ($('#switch-kk').prop("checked") ? "Ja" : "Nej");
	kkb = $('#text-kkb').val();
	liggplats = $('#text-liggplats').val();
	leverantor = $('#text-leverantor').val();
	levartnr = $('#text-levartnr').val();
	pris = $('#text-pris').val();
	produkt2 = $('#text-produkt2').val();
	produkt3 = $('#text-produkt3').val();
	produkt4 = $('#text-produkt4').val();
	serienummer = ($('#switch-serienummer').prop("checked") ? "Ja" : "Nej");
	servicegrad = $('#select-servicegrad').val();
	team = $('#select-team').val();
	upplysningar = $('#text-upplysningar').val();
	vf = ($('#checkbox-vf').prop("checked") ? "Ja" : "Nej");
	wsbb = ($('#switch-wsbb').prop("checked") ? "Beställningsbar" : "Ej beställningsbar");
	wsinfo = $('#text-wsinfo').val();
	wskomp = ($('#switch-wskomp').prop("checked") ? "Ja" : "Nej");
	wspub = ($('#switch-wspub').prop("checked") ? "Ja" : "Nej");
	wssort = ($('#switch-wssort').prop("checked") ? "Ja" : "Nej");

	// Skapa artikeldata
	artikeldata = "Hej!\n\nJag önskar att följande artikel registreras i Sesam.\n";

	// Hjälpmedelstjänsten, Varuförsörjningen
	if (ht == 'Ja') artikeldata += "\nArtikeln finns i Hjälpmedelstjänsten.\n";
	if (vf == 'Ja') artikeldata += "\nArtikeln finns hos Varuförsörjningen. Artikeln måste skapas manuellt.\n";

	// Leverantör, lev. art.nr. och mallartikel
	let lev = leverantor.toLowerCase();

	function findLev(substring) {
		if (lev.indexOf(substring) !== -1) {
			return true;
		}
	}

	switch (true) {
		case findLev('bandi'):			leverantor = "AB Bandindustri (100)"; break;
		case findLev('bandindustri'):	leverantor = "AB Bandindustri (100)"; break;
		case findLev('medifa'):			leverantor = "AB Medifa (111)"; break;
		case findLev('abilia'):			leverantor = "Abilia AB (138)"; break;
		case findLev('ackumulator'):	leverantor = "Ackumulator och Batteri Teknik (7841)"; break;
		case findLev('aj medical'):		leverantor = "AJ Medical (10577)"; break;
		case findLev('anatomic'):		leverantor = "Anatomic Sitt AB (6009)"; break;
		case findLev('apodan'):			leverantor = "Apodan A/S (107)"; break;
		case findLev('arjo'):			leverantor = "Arjo Sverige AB (86)"; break;
		case findLev('aspira'):			leverantor = "Aspira Medical AB (6889)"; break;
		case findLev('bano'):			leverantor = "Bano Life AB (144)"; break;
		case findLev('baxter'):			leverantor = "Baxter AB (Liko Hillrom) (185)"; break;
		case findLev('liko'):			leverantor = "Baxter AB (Liko Hillrom) (185)"; break;
		case findLev('hillrom'):		leverantor = "Baxter AB (Liko Hillrom) (185)"; break;
		case findLev('becton'):			leverantor = "Becton Dickinson AB (10971)"; break;
		case findLev('bima'):			leverantor = "Bima Plastteknik AB (95)"; break;
		case findLev('ström'):			leverantor = "Br. Ström AB (116)"; break;
		case findLev('breas'):			leverantor = "Breas Medical AB (7758)"; break;
		case findLev('berner'):			leverantor = "Bröderna Berner AB (9942)"; break;
		case findLev('care of swed'):	leverantor = "Care of Sweden AB (7906)"; break;
		case findLev('comco'):			leverantor = "COMCO AB (109)"; break;
		case findLev('comfort sys'):	leverantor = "Comfort System Scandinavia AB (110)"; break;
		case findLev('comfortsys'):		leverantor = "Comfort System Scandinavia AB (110)"; break;
		case findLev('constella'):		leverantor = "Constella Försäljning AB (10793)"; break;
		case findLev('decon'):			leverantor = "Decon Wheel AB (9549)"; break;
		case findLev('dhg'):			leverantor = "DHG Direct Healthcare Group Sverige AB (252)"; break;
		case findLev('direct health'):	leverantor = "DHG Direct Healthcare Group Sverige AB (252)"; break;
		case findLev('djo'):			leverantor = "DJO Nordic AB (105)"; break;
		case findLev('dynavox'):		leverantor = "Dynavox Group AB (10931)"; break;
		case findLev('etac'):			leverantor = "Etac Sverige AB (251)"; break;
		case findLev('euforia'):		leverantor = "Euforia AB (9621)"; break;
		case findLev('feal'):			leverantor = "FeAl AB (10031)"; break;
		case findLev('fisher'):			leverantor = "Fisher & Paykel Healthcare AB (10916)"; break;
		case findLev('f&p'):			leverantor = "Fisher & Paykel Healthcare AB (10916)"; break;
		case findLev('fresenius kabi'):	leverantor = "Fresenius Kabi AB (10125)"; break;
		case findLev('fresenius medi'):	leverantor = "Fresenius Medical Care (10090)"; break;
		case findLev('funktionsverk'):	leverantor = "Funktionsverket AB (10975)"; break;
		case findLev('fysioline'):		leverantor = "Fysioline Sweden AB (104)"; break;
		case findLev('gce'):			leverantor = "GCE Norden AB (123)"; break;
		case findLev('ge healthcare'):	leverantor = "GE Healthcare (10911)"; break;
		case findLev('guldmann'):		leverantor = "Guldmann Sverige AB (7752)"; break;
		case findLev('göran sjödén'):	leverantor = "Göran Sjödén Rehab Distribution AB (7893)"; break;
		case findLev('göran sjöden'):	leverantor = "Göran Sjödén Rehab Distribution AB (7893)"; break;
		case findLev('haco'):			leverantor = "Haco Tellus AB (142)"; break;
		case findLev('hck'):			leverantor = "HCK Produkter AB (10147)"; break;
		case findLev('hd rehab'):		leverantor = "HD Rehab AB (7817)"; break;
		case findLev('hea'):			leverantor = "HEA Medical AB (7666)"; break;
		case findLev('intersurgical'):	leverantor = "Intersurgical AB (10025)"; break;
		case findLev('invacare'):		leverantor = "Invacare AB (211)"; break;
		case findLev('iris'):			leverantor = "Iris Hjälpmedel AB (6940)"; break;
		case findLev('järven'):			leverantor = "Järven Plast & Smide AB (10189)"; break;
		case findLev('knop'):			leverantor = "KNOP Rehatek AB (10942)"; break;
		case findLev('komikapp'):		leverantor = "Komikapp AB (171)"; break;
		case findLev('kvistberga'):		leverantor = "Kvistberga Group AB (173)"; break;
		case findLev('lb medical'):		leverantor = "LB Medical AB (10208)"; break;
		case findLev('l&b'):			leverantor = "LB Medical AB (10208)"; break;
		case findLev('limedic'):		leverantor = "Limedic AB (98)"; break;
		case findLev('linde'):			leverantor = "Linde Gas AB (10461)"; break;
		case findLev('lvi'):			leverantor = "LVI Low Vision International AB (190)"; break;
		case findLev('made for move'):	leverantor = "Made for Movement Sweden AB (103)"; break;
		case findLev('masimo'):			leverantor = "Masimo International Sarl (117)"; break;
		case findLev('maxgrepp'):		leverantor = "Maxgrepp Handrims AB (214)"; break;
		case findLev('mayday'):			leverantor = "Mayday Aid AB (7448)"; break;
		case findLev('medela'):			leverantor = "Medela Medical AB (197)"; break;
		case findLev('medema'):			leverantor = "Medema Physio AB (198)"; break;
		case findLev('medi sweden'):	leverantor = "Medi Sweden AB (10241)"; break;
		case findLev('medidyne'):		leverantor = "Medidyne AB (9961)"; break;
		case findLev('mediplast'):		leverantor = "Mediplast AB (10106)"; break;
		case findLev('mercado'):		leverantor = "Mercado Medic AB (202)"; break;
		case findLev('micrel'):			leverantor = "Micrel Medical Devices Nordics AB (10964)"; break;
		case findLev('minicrosser'):	leverantor = "Minicrosser AB (7521)"; break;
		case findLev('monark'):			leverantor = "Monark Exercise AB (10251)"; break;
		case findLev('mondian'):		leverantor = "Mondian AB (10976)"; break;
		case findLev('moovon'):			leverantor = "Moovon Sweden AB (10040)"; break;
		case findLev('nestlé'):			leverantor = "Nestlé Sverige AB (145)"; break;
		case findLev('nestle'):			leverantor = "Nestlé Sverige AB (145)"; break;
		case findLev('nimacare'):		leverantor = "Nimacare AB (10933)"; break;
		case findLev('nordic battery'):	leverantor = "Nordic Battery AB (7837)"; break;
		case findLev('nordic rehab'):	leverantor = "Nordic Rehab AB (10137)"; break;
		case findLev('nordicare'):		leverantor = "NordiCare Ortopedi & Rehab AB (10882)"; break;
		case findLev('nordicinfu'):		leverantor = "NordicInfu Care AB (10973)"; break;
		case findLev('novista'):		leverantor = "Novista of Sweden AB (90)"; break;
		case findLev('nowus'):			leverantor = "Nowus Healthcare A/S (124)"; break;
		case findLev('onemed'):			leverantor = "OneMed Sverige AB (10236)"; break;
		case findLev('oscar medtec'):	leverantor = "Oscar Medtec AB (126)"; break;
		case findLev('otto bock'):		leverantor = "Otto Bock Scandinavia AB (229)"; break;
		case findLev('palliance'):		leverantor = "Palliance AB (131)"; break;
		case findLev('panthera'):		leverantor = "Panthera Production AB (231)"; break;
		case findLev('permobil'):		leverantor = "Permobil Försäljning & Service AB (9534)"; break;
		case findLev('pernova'):		leverantor = "Pernova Hjälpmedel AB (237)"; break;
		case findLev('philips'):		leverantor = "Philips AB (10904)"; break;
		case findLev('polar print'):	leverantor = "Polar Print Försäljning AB (241)"; break;
		case findLev('posifon'):		leverantor = "Posifon AB (9959)"; break;
		case findLev('primed'):			leverantor = "Primed AB (10618)"; break;
		case findLev('provista'):		leverantor = "Provista Kognition AB (10081)"; break;
		case findLev('ramcon'):			leverantor = "Ramcon AB (125)"; break;
		case findLev('rehabcenter'):	leverantor = "RehabCenter AB (249)"; break;
		case findLev('rehabmodul'):		leverantor = "Rehabmodul AB (4952)"; break;
		case findLev('resmed'):			leverantor = "ResMed Sweden AB (9513)"; break;
		case findLev('salubrious'):		leverantor = "Salubrious AB (10802)"; break;
		case findLev('schuchman'):		leverantor = "Schuchmann Sverige AB (128)"; break;
		case findLev('wihlbacka'):		leverantor = "Senses by Wihlbacka AB (121)"; break;
		case findLev('sivantos'):		leverantor = "Sivantos A/S (10116)"; break;
		case findLev('skeppshult'):		leverantor = "Skeppshultcykeln AB (10834)"; break;
		case findLev('steripolar'):		leverantor = "Steripolar AB (10069)"; break;
		case findLev('sunrise'):		leverantor = "Sunrise Medical AB (298)"; break;
		case findLev('svan'):			leverantor = "Svan Care AB"; break;
		case findLev('swereco'):		leverantor = "Swereco AB (147)"; break;
		case findLev('timik'):			leverantor = "Timik AB (10965)"; break;
		case findLev('togemo'):			leverantor = "Togemo AB (10009)"; break;
		case findLev('toppen'):			leverantor = "Toppen77 (10963)"; break;
		case findLev('topro'):			leverantor = "Topro Industri AS (133)"; break;
		case findLev('trident'):		leverantor = "Trident Industri AB (7768)"; break;
		case findLev('vingmed'):		leverantor = "Vingmed AB (10171)"; break;
		case findLev('vitri'):			leverantor = "ViTri Medical AB (10178)"; break;
		case findLev('wolturnus'):		leverantor = "Wolturnus AB (10232)"; break;
		case findLev('zafe'):			leverantor = "Zafe Care Systems AB (10866)"; break;
	}

	artikeldata += "\nLeverantör:  " + leverantor + "\n";
	artikeldata += "Lev. art.nr:  " + levartnr + "\n";

	if (ht == 'Ja') {
		artikeldata += "\nMallartikel:  " + avd.substring(0,1) + artikeltyp;
		if (artikeltyp == 'H' && inventarium == 'Ja')  artikeldata += " (hyra " + avskrivningstid + " år)";
		if (artikeltyp == 'H' && inventarium == 'Nej') artikeldata += " (köp)";
		if (artikeltyp == 'T' && debiteringsform == 'M') artikeldata += " (hyra)";
		if (artikeltyp == 'T' && debiteringsform == 'A') artikeldata += " (köp)";
		artikeldata += "\n";
	} else {
		artikeldata += "\n";
		artikeldata += (isokod.length > 0 ? "Angiven ISO-kod:  " + isokod : "ISO-kod saknas") + "\n";
		artikeldata += (pris.length > 0 ? "Angivet inköpspris:  " + pris + " kr" : "Inköpspris saknas") + "\n";
		artikeldata += (garanti.length > 0 ? "Angiven garantitid:  " + garanti + " dagar" : "Garantitid saknas") + "\n";
	}

	// ARTIKEL
	artikeldata += "\nARTIKEL\n\n"
	artikeldata += "Artikelbenämning:  " + artikelbenamning + "\n";

	// KLASSIFICERING
	artikeldata += "\nKLASSIFICERING\n\n";

	// Artikeltyp
	artikeldata += "Artikeltyp:  ";
	if (artikeltyp.length > 0) {
		switch (artikeltyp) {
			case 'H':
				artikeldata += "Huvudhjälpmedel\n";
				break;
			case 'T':
				artikeldata += "Tillbehör\n";
				break;
			case 'R':
				artikeldata += "Reservdel\n";
				break;
		}
	} else {
		artikeldata += "(uppgift saknas)\n";
	}

	// Artikelansvar
	artikeldata += "Artikelansvar:  ";
	if (artikelansvar.length > 0) {
		switch (artikelansvar) {
			case 'L':
				artikeldata += "L (Region eller kommun)\n";
				break;
			case 'R':
				artikeldata += "R (Retursortiment) 👈\n";
				break;
			case 'E':
				artikeldata += "E (Egenansvar) 👈\n";
				break;
			case 'S':
				artikeldata += "S (Syncentralen)\n";
				break;
		}
	} else {
		artikeldata += "(uppgift saknas)\n";
	}

	// Konteringsgrupp
	artikeldata += "Konteringsgrupp:  ";
	// K     KLOK ej inventarie
	// KI3   KLOK inventarie 3 års avskrivning
	// KI5   KLOK inventarie 5 års avskrivning
	// PMB   PMB ej inventarie
	// PMBI3 PMB inventarie 3 års avskrivning
	// PMBI5 PMB inventarie 5 års avskrivning
	// R     Rörelse ej inventarie
	// RI3   Rörelse inventarie 3 års avskrivning
	// RI5   Rörelse inventarie 5 års avskrivning
	// S     SC ej inventarie
	// SI3   SC inventarie 3 års avskrivning
	// SI5   SC inventarie 5 års avskrivning
	if (avd.length > 0) {
		artikeldata += avd;
	} else {
		artikeldata += "(uppgift saknas)";
	}

	if (inventarium == 'Ja' && avskrivningstid == '3') {
		artikeldata += "I3";
	} else if (inventarium == 'Ja' && avskrivningstid == '5') {
		artikeldata += "I5";
	}
	artikeldata += "\n";

	// Avskrivningstid
	if (inventarium == 'Ja') {
		artikeldata += "Avskrivningstid:  ";
		if (avskrivningstid.length > 0) {
			artikeldata += avskrivningstid + " år";
			artikeldata += (avskrivningstid == '5' ? " 👈\n" : "\n");
		} else {
			artikeldata += "(uppgift saknas)\n";
		}
	}

	// Sektor
	artikeldata += "Sektor:  ";
	if (team.length > 0) {
		artikeldata += team + "\n";
	} else {
		artikeldata += "(uppgift saknas)\n";
	}

	// Sortimentsartikel
	artikeldata += "Ingår i sortimentet:  " + wssort;
	artikeldata += (wssort == 'Ja' ? " 👈\n" : "\n");

	// Individartikel
	if (artikeltyp == 'H') {
		artikeldata += "Individartikel:  " + individartikel + "\n";
	}

	// Serienummer obligatoriskt
	if (individartikel == 'Ja' && serienummer == 'Nej') {
		artikeldata += "Serienummer obligatoriskt:  " + serienummer + " 👈\n";
	}

	// Inventarium
	if (artikeltyp == 'H') {
		artikeldata += "Inventarium:  " + inventarium + "\n";
	}

	// Har aldrig komponenter
	if (individartikel == 'Ja' && haraldrigkomp == 'Ja') {
		artikeldata += "Har aldrig komponenter:  " + haraldrigkomp + " 👈\n";
	}

	// Driftsmätare
	if (individartikel == 'Ja' && dm == 'Ja') {
		artikeldata += "Drifsmätare:  " + dm + " (enhet: timmar) 👈\n";
	}

	// Kvalitetskontroll
	if (kk == 'Ja') {
		artikeldata += "Kvalitetskontroll:  " + kk + " 👈\n";
	}

	// Status
	artikeldata += "Status:  " + (inkopshantering == 'Nettobehov' ? "Ny" : "Aktiv") + "\n";

	// INSTRUKTIONER
	if (gmi.length > 0 || kkb.length > 0 || iki.length > 0 || ipi.length > 0 || iri.length > 0) {
		artikeldata += "\nINSTRUKTIONER\n\n";
		if (gmi.length > 0) artikeldata += "Godsmottagningsinstruktion:  " + gmi + "\n";
		if (kkb.length > 0) artikeldata += "Kvalitetskontroll, beskrivning:  " + kkb + "\n";
		if (iki.length > 0) artikeldata += "Intern kundorderinformation:  " + iki + "\n";
		if (ipi.length > 0) artikeldata += "Intern plockinformation:  " + ipi + "\n";
		if (iri.length > 0) {
			artikeldata += "Intern returtagningsinformation:  ";
			if (iri.match(/retur/i) && iri.match(/612/) && iri.match(/rekond/i) && iri.match(/KLOK/i)) {
				artikeldata += '<strong style="color: red; font-size: large">Retur till lager 612. Rekonditioneras av KLOK.</strong>';
			}
			else if (iri.match(/retur/i) && iri.match(/613/) && iri.match(/rekond/i) && iri.match(/PMB/i)) {
				artikeldata += '<strong style="color: blue; font-size: large">Retur till lager 613. Rekonditioneras av PMB.</strong>';
			}
			else {
				artikeldata += iri;
			}
			artikeldata += "\n";
		}
	}

	// VISMA WEBSESAM
	artikeldata += "\nVISMA WEBSESAM\n\n";

	// Publicera
	artikeldata += "Publicera i webSesam:  " + wspub + "\n";

	// Beställningsbar
	artikeldata += "Beställningsbar i webSesam:  " + wsbb + "\n";

	// Kan vara komponent
	if (artikeltyp == 'T') {
		artikeldata += "Kan vara komponent:  " + wskomp;
		artikeldata += (wskomp == 'Nej' ? " 👈\n" : "\n");
	}

	// Extra artikelinformation
	if (wsinfo.length > 0) artikeldata += "Extra artikelinformation:  " + wsinfo + "\n";

	// PRODUKTER
	artikeldata += "\nPRODUKTER\n\n";
	artikeldata += "Standardprodukt:  " + standardprodukt + "\n";
	if (produkt2.length > 0) artikeldata += "Extra produkt:  " + produkt2 + "\n";
	if (produkt3.length > 0) artikeldata += "Extra produkt:  " + produkt3 + "\n";
	if (produkt4.length > 0) artikeldata += "Extra produkt:  " + produkt4 + "\n";

	// PRISPARAMETRAR
	artikeldata += "\nPRISPARAMETRAR\n\n";

	// Debiteringsform
	artikeldata += "Debiteringsform:  ";
	if (debiteringsform == 'A') {
		artikeldata += "Köp\n";
	} else if (debiteringsform == 'M') {
		artikeldata += "Hyra\n";
	} else {
		artikeldata += "(uppgift saknas)\n";
	}

	// Prisgrupp
	switch (team) {
		case '02':
			pg = "RERST för elrullstolar, R för övriga artiklar";
			break;
		case '03':
			pg = "R";
			break;
		case '05':
			pg = "KLOK";
			break;
		case '07':
			pg = "PMB";
			break;
		case '08':
			pg = "RMRST för manuell rullstol, R för övriga artiklar";
			break;
		case '09':
			pg = "R";
			break;
		case '10':
			pg = "R";
			break;
		case '11':
			pg = "R";
			break;
		case '40':
			pg = "SYN eller SPEC";
			break;
		default:
			pg = "(uppgift saknas)";
	}
	if (team == '03' && artikelansvar == 'R') pg = "ReturBarn 👈";
	if (team != '03' && artikelansvar == 'R') pg = "ReturVuxen 👈";
	if (team == '10' && artikelansvar == 'R') pg = "ReturVuxen eller ReturVRoll 👈";
	artikeldata += "Beräknad prisgrupp:  " + pg + "\n";

	// Kalkylprocent
	if (debiteringsform == 'M') artikeldata += "Kalkylprocent:  Se tabell från IT-stödet\n";

	// Servicegrad
	if (artikeltyp == 'H' && debiteringsform == 'M') {
		artikeldata += "Servicegrad:  ";
		if (servicegrad.length > 0) {
			artikeldata += servicegrad + "\n";
		} else {
			artikeldata += "(uppgift saknas)\n";
		}
	}
	if (artikeltyp == 'T' && debiteringsform == 'M') artikeldata += "Servicegrad: 44\n";

	// AKTIVITETSTYPSCHEMAN
	if (artikeltyp == 'H' && individartikel == 'Ja') {
		if (besiktningsintervall.length > 0 || fuintervall.length > 0) {
			artikeldata += "\nAKTIVITETSTYPSCHEMAN\n\n";
			if (besiktningsintervall.length > 0) {
				artikeldata += "Besiktningsintervall:  " + besiktningsintervall + "\n";
			}
			if (fuintervall.length > 0) {
				artikeldata += "FU-intervall:  " + fuintervall + "\n";
			}
		}
	}

	// LAGER
	artikeldata += "\nLAGER\n\n";

	// Huvudlager
	artikeldata += "Huvudlager:  ";
	if (huvudlager.length > 0) {
		artikeldata += huvudlager + "\n";
	} else {
		artikeldata += "(uppgift saknas)\n";
	}

	// Inköpshantering
	artikeldata += "Inköpshantering:  ";
	if (inkopshantering.length > 0) {
		artikeldata += inkopshantering + "\n";
	} else {
		artikeldata += "(uppgift saknas)\n";
	}

	// Liggplats
	let lp_ejdef = '';
	let lp_ny = '';
	let po_info = '';
	if (huvudlager == '200') {
		switch (team) {
			case "02":
				lp_ejdef = 'P11-ejdef';
				lp_ny = 'P11-Ny-liggplats';
				po_info = 'Samtliga artiklar som tillhör elrullstolsteamet bör ha en liggplats inom plockområde 11.';
			break;
			case "03":
				if (artikeltyp == 'H') {
					lp_ejdef = 'P2-ejdef eller P7-ejdef';
					lp_ny = 'P2-Ny-liggplats eller P7-Ny-liggplats';
					po_info = 'Huvudhjälpmedel som tillhör habteamet bör ha en liggplats inom plockområde 2 eller 7.';
				}
				if (artikeltyp == 'T') {
					lp_ejdef = 'P2-ejdef eller P7-ejdef';
					lp_ny = 'P2-Ny-liggplats eller P7-Ny-liggplats';
					po_info = 'Tillbehör som tillhör habteamet bör ha en liggplats inom plockområde 2 eller 7.';
				}
				if (artikeltyp == 'R') {
					lp_ejdef = 'P1-ejdef';
					lp_ny = 'P1-Ny-liggplats';
					po_info = 'Reservdelar som tillhör habteamet bör ha en liggplats inom plockområde 1.';
				}
			break;
			case "05":
				lp_ejdef = 'P13-ejdef';
				lp_ny = 'P13-Ny-liggplats';
				po_info = 'Samtliga artiklar som tillhör KLOK bör ha en liggplats inom plockområde 13.';
			break;
			case "07":
				lp_ejdef = 'P8-ejdef';
				lp_ny = 'P8-Ny-liggplats';
				po_info = 'Samtliga artiklar som tillhör PMB bör ha en liggplats inom plockområde 8.';
			break;
			case "08":
				if (artikeltyp == 'H') {
					lp_ejdef = 'P3-ejdef eller P7-ejdef';
					lp_ny = 'P3-Ny-liggplats eller P7-Ny-liggplats';
					po_info = 'Huvudhjälpmedel som tillhör SST bör ha en liggplats inom plockområde 3 eller 7.';
				}
				if (artikeltyp == 'T') {
					lp_ejdef = 'P3-ejdef eller P7-ejdef';
					lp_ny = 'P3-Ny-liggplats eller P7-Ny-liggplats';
					po_info = 'Tillbehör som tillhör SST bör ha en liggplats inom plockområde 3 eller 7.';					}
				if (artikeltyp == 'R') {
					lp_ejdef = 'P1-ejdef';
					lp_ny = 'P1-Ny-liggplats';
					po_info = 'Reservdelar som tillhör SST bör ha en liggplats inom plockområde 1.';
				}
			break;
			case "09":
				if (artikeltyp == 'H') {
					lp_ejdef = 'P2-ejdef, P6-ejdef eller P7-ejdef';
					lp_ny = 'P2-Ny-liggplats, P6-Ny-liggplats eller P7-Ny-liggplats';
					po_info = 'Huvudhjälpmedel som tillhör ADL (säng/lyft/pos) bör ha en liggplats inom plockområde 2, 6 eller 7.';
				}
				if (artikeltyp == 'T') {
					lp_ejdef = 'P2-ejdef, P6-ejdef eller P7-ejdef';
					lp_ny = 'P2-Ny-liggplats, P6-Ny-liggplats eller P7-Ny-liggplats';
					po_info = 'Tillbehör som tillhör ADL (säng/lyft/pos) bör ha en liggplats inom plockområde 2, 6 eller 7.';
				}
				if (artikeltyp == 'R') {
					lp_ejdef = 'P1-ejdef';
					lp_ny = 'P1-Ny-liggplats';
					po_info = 'Reservdelar som tillhör ADL bör ha en liggplats inom plockområde 1.';
				}
			break;
			case "10":
				if (artikeltyp == 'H') {
					lp_ejdef = 'P2-ejdef eller P7-ejdef';
					lp_ny = 'P2-Ny-liggplats eller P7-Ny-liggplats';
					po_info = 'Huvudhjälpmedel som tillhör ADL (gång/hygien) bör ha en liggplats inom plockområde 2 eller 7.';
				}
				if (artikeltyp == 'T') {
					lp_ejdef = 'P2-ejdef eller P7-ejdef';
					lp_ny = 'P2-Ny-liggplats eller P7-Ny-liggplats';
					po_info = 'Tillbehör som tillhör ADL (gång/hygien) bör ha en liggplats inom plockområde 2 eller 7.';
				}
				if (artikeltyp == 'R') {
					lp_ejdef = 'P1-ejdef';
					lp_ny = 'P1-Ny-liggplats';
					po_info = 'Reservdelar som tillhör ADL bör ha en liggplats inom plockområde 1.';
				}
			break;
			case "11":
				if (artikeltyp == 'H') {
					lp_ejdef = 'P2-ejdef eller P7-ejdef';
					lp_ny = 'P2-Ny-liggplats eller P7-Ny-liggplats';
					po_info = 'Huvudhjälpmedel som tillhör SST (behandling/träning) bör ha en liggplats inom plockområde 2 eller 7.';
				}
				if (artikeltyp == 'T') {
					lp_ejdef = 'P2-ejdef eller P7-ejdef';
					lp_ny = 'P2-Ny-liggplats eller P7-Ny-liggplats';
					po_info = 'Tillbehör som tillhör SST (behandling/träning) bör ha en liggplats inom plockområde 2 eller 7.';
				}
				if (artikeltyp == 'R') {
					lp_ejdef = 'P1-ejdef';
					lp_ny = 'P1-Ny-liggplats';
					po_info = 'Reservdelar som tillhör SST bör ha en liggplats inom plockområde 1.';
				}
			break;
		}
		if (liggplats.length > 0) {
			artikeldata += "Angiven liggplats:  " + liggplats;
		} else {
			if (inkopshantering == 'Nettobehov') artikeldata += "Beräknad liggplats:  " + lp_ny;
			if (inkopshantering == 'Kundorder') artikeldata += "Beräknad liggplats:  " + lp_ejdef;
		}
	} else {
		// Huvudlager är inte 200
		if (liggplats.length > 0) {
			artikeldata += "Angiven liggplats:  " + liggplats;
		} else {
			if (inkopshantering == 'Nettobehov') artikeldata += "Liggplats:  Ny-liggplats";
			if (inkopshantering == 'Kundorder') artikeldata += "Liggplats:  ejdef";
		}
	}
	artikeldata += "\n";

	// Uppskattad förbrukning
	if (inkopshantering == 'Nettobehov' && forbrukning_msg.length > 0) {
		artikeldata += "Uppskattad förbrukning:  " + forbrukning_msg + "\n";
	}

	// Buffertlager
	if (buffertlager.length > 0) {
		artikeldata += "Buffertlager:  " + buffertlager + "\n";
	}

	// ÖVRIGT
	let counter = 0;
	let extratext = '';

	if (huvudlager == '200') {
		counter++;
		extratext += "👉 " + po_info + "\n\n";
	}
	if (upplysningar.length > 0) {
		counter++;
		extratext += "👉 Övriga upplysningar:  " + upplysningar + "\n\n";
	}
	if (artikeltyp == 'H' && artikelbenamning.startsWith('Elrullstol')) {
		counter++;
		extratext += "👉 Kom ihåg att elrullstolar ska ha uppföljning. Lägg till artikeln i Uppföljningsorsaker.\n\n";
	}
	if (artikelansvar == 'R') {
		counter++;
		extratext += "👉 Kom ihåg att retursortiment har olika prisgrupper för barn och vuxna.";
		if (artikelbenamning.startsWith('Rollator')) {
			extratext += " Rollatorer för vuxna har dessutom en egen prisgrupp.";
		}
		extratext += "\n\n"
	}
	if (counter > 0) {
		artikeldata += "\n" + extratext;
	}

	// remove " (123)" from leverantor
	leverantor = leverantor.replace(/ \([0-9]*\)/g, "");

	// Update href mailto link
	let mailrec = atob('aW5rb3BzcGVyc29uYWxpbnRlcm50LmhqYWxwbWVkZWxzY2VudGVyQHJlZ2lvbmRhbGFybmEuc2U=');
	let artikelbenamning_firstword = (artikelbenamning.length > 0 ? artikelbenamning.match(/\s*([^\s]+)/)[1] : '(uppgift saknas)');
	let mailsub = "";
	let mailbody = "(Radera denna rad. Tryck sedan Ctrl+V för att klista in artikeluppgifter.)\n";
	if (artikeltyp.length > 0) {
		if (artikeltyp == 'H') mailsub += "Nytt huvudhjälpmedel";
		if (artikeltyp == 'T') mailsub += "Nytt tillbehör";
		if (artikeltyp == 'R') mailsub += "Ny reservdel";
	} else {
		mailsub += "Ny artikel";
	}
	mailsub += " i Sesam: " + artikelbenamning_firstword + " från " + leverantor;

	// var hrefcontent = 'mailto:' + mailrec + '?subject=' + encodeURIComponent(mailsub);
	var hrefcontent = 'mailto:' + mailrec + '?subject=' + encodeURIComponent(mailsub) + '&body=' + encodeURIComponent(mailbody);
	$('#button-send-email').attr('href', hrefcontent);

}

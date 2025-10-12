console.log('Loading functions.js');

/**
 * Add a search parameter to current URL
 * @param {string} key		- Name of search key (i.e. "theme").
 * @param {string} value	- Value of search key (i.e. "dark").
 */
function setURLParam(key, value) {
	console.log('setURLParam("' + key + '","' + value + '")');
	const url = new URL(window.location);
	url.searchParams.set(key, value);
	history.pushState(null, '', url);
}

/**
 * Change visible page content
 * @param {string} contentId	- Element ID of page content (i.e. #content-formular).
 * @param {string} menuItemId	- Element ID of active menu item (i.e. #menu-formular).
 */
function changeContent(contentId, menuItemId) {
	console.log('changeContent("' + contentId + '","' + menuItemId + '")');
	if ($(contentId).css('display') == 'none') {
		$('.content-container').fadeOut(400); /* hide all content */
		$(contentId).delay(400).fadeIn(400);
		$('mdui-list-item').removeAttr('active');
		$(menuItemId).attr('active','');
	}
	$('#navigation-drawer').removeAttr('open'); /* close menu */
}

/**
 * Set mode of a text field and its palceholder and label
 * @param {string} paramId		- Text field element ID part (i.e. foo in #text-foo).
 * @param {string} mode			- Set "enabled" or "disabled".
 * @param {string} placeholder	- Placeholder text.
 * @param {string} helper		- Helper text.
 */
function setTextField(paramId, mode, placeholder, helper) {
	console.log('setTextField("' + paramId + '","' + mode + '","' + placeholder + '","' + helper + '")');
	if (mode == 'enabled') {
		$('#text-' + paramId).attr('disabled', false);
	} else {
		$('#text-' + paramId).attr('disabled', true);
	}
	if (placeholder.length > 0) $('#text-' + paramId).attr('placeholder', placeholder);
	if (helper.length > 0) $('#text-' + paramId).attr('helper', helper);
	window[paramId] = $('#text-' + paramId).val();
	console.log(" * " + paramId + ' = ' + '"' + window[paramId] + '"');
}

/**
 * Set <mdui-select> attributes and value
 * @param {string} paramId	- Select element ID part (i.e. foo in #select-foo)
 * @param {string} mode		- Set "enabled" or "disabled".
 * @param {string} value	- Selected value, or '' to reset
 * @param {string} helper	- Helper text.
 */
function setSelect(paramId, mode, value, helper) {
	console.log('setSelect("' + paramId + '","' + mode + '","' + value + '","' + helper + '")');
	if (mode == 'enabled') {
		$('#select-' + paramId).attr('disabled', false);
	} else {
		$('#select-' + paramId).attr('disabled', true);
	}
	$('#select-' + paramId).val(value);
	if (helper.length > 0) $('#select-' + paramId).attr('helper', helper);
	window[paramId] = $('#select-' + paramId).val();
	console.log(" * " + paramId + ' = ' + '"' + window[paramId] + '"');
}

/**
 * Set mode and state of a switch button and its label.
 * @param {string} paramId	- Element ID part (i.e. foo #label-foo and #switch-foo).
 * @param {string} mode		- Set "enabled" or "disabled".
 * @param {string} state	- Set "on" or "off" state of switch.
 * @param {string} helper	- Helper text.
 */
function setSwitch(paramId, mode, state, helper) {
	console.log('setSwitch("' + paramId + '","' + mode + '","' + state + '","' + helper + '")');
	if (mode == "enabled") {
		$('#label-' + paramId).removeClass('disabled');
		$('#switch-' + paramId).attr('disabled', false);
	} else {
		$('#label-' + paramId).addClass('disabled');
		$('#switch-' + paramId).attr('disabled', true);
	}
	if (state == 'on') {
		if (helper.length > 0) $('#label-' + paramId + ' .switch-helper').html(helper);
		$('#switch-' + paramId).attr('checked', true);
	} else {
		if (helper.length > 0) $('#label-' + paramId + ' .switch-helper').html(helper);
		$('#switch-' + paramId).attr('checked', false);
	}
	window[paramId] = ($('#switch-' + paramId).prop("checked") ? "Ja" : "Nej");
	console.log(" * " + paramId + ' = ' + '"' + window[paramId] + '"');
}

/**
 * Set mode of radio buttons and their label.
 * @param {string} paramId	- Element ID part (i.e. foo in #label-foo and #radio-foo).
 * @param {string} mode		- "enabled" or "disabled".
 * @param {string} selected	- selected radio button, or '' to reset.
 * @param {string} helper	- Helper text
 */
function setRadio(paramId, mode, selected, helper) {
	console.log('setRadio("' + paramId + '","' + mode + '","' + selected + '","' + helper + '")');
	if (mode == "enabled") {
		$('#label-' + paramId).removeClass('disabled');
		$('#radio-' + paramId).val(selected);
		$('#radio-' + paramId).attr('disabled', false); // enable
	} else {
		$('#label-' + paramId).addClass('disabled');
		$('#radio-' + paramId).val(''); // clear
		$('#radio-' + paramId).attr('disabled', true); // disable
	}
	if (helper.length > 0) $('#label-' + paramId + ' .radio-helper').html(helper);
	window[paramId] = $('#radio-' + paramId).val();
	console.log(" * " + paramId + ' = ' + '"' + window[paramId] + '"');
}

function enableSelectArtikeltyp() {
	console.log(' -- enableSelectArtikeltyp()');
	$('#select-artikeltyp').val('').attr('disabled', false); // unselect and enable
}
function disableSelectArtikeltyp() {
	console.log(' -- disableSelectArtikeltyp()');
	$('#artikeltyp-menu-item-r').attr('disabled', false); // re-enable option 'R'
	$('#select-artikeltyp').val('').attr('disabled', true); // unselect and disable
}

function enableSelectDebiteringsform() {
	console.log(' -- enableSelectDebiteringsform()');
	$('#select-debiteringsform').val('').attr('disabled', false); // unselect and enable
}
function disableSelectDebiteringsform() {
	console.log(' -- disableSelectDebiteringsform()');
	$('#debiteringsform-menu-item-m').attr('disabled', false); // re-enable option 'M' (månadshyra)
	$('#debiteringsform-menu-item-a').attr('disabled', false); // re-enable option 'A' (köp)
	$('#select-debiteringsform').val('').attr('disabled', true); // unselect and disable
}




function enableTextReturtagningsinformation() {
	$('#text-iri').attr('disabled', false); // enable
}
function disableTextReturtagningsinformation() {
	$('#text-iri').val('').attr('disabled', true); // clear and disable
}

function enalbeSliderForbrukning() {
	console.log('enableSliderForbrukning()');
	$('#slider-forbrukning').val('').attr('disabled', false); // clear and enable
	$('.slider-label').removeClass('disabled'); // remove .disabled
	$('.slider-helper').removeClass('disabled'); // remove .disabled
	forbrukning_msg = 'Årsbehov 0-24. Mindre än 0.5 per vecka.';
	$('#slider-msg').html(forbrukning_msg); // update displayd msg
}
function disableSliderForbrukning() {
	console.log('disableSliderForbrukning()');
	$('#slider-forbrukning').val('').attr('disabled', true); // clear and disable
	$('.slider-label').addClass('disabled'); // add .disabled
	$('.slider-helper').addClass('disabled'); // add .disabled
	forbrukning = ''; // reset
	forbrukning_msg = 'Endast relevant för inköpshantering Nettobehov'; // reset to default msg
	$('#slider-msg').html(forbrukning_msg); // update displayed msg
}

function enableServiceOchUnderhall() {
	console.log(' -- enableServiceOchUnderhall()');
	$('#select-servicegrad').val('').attr('disabled', false).attr('readonly', false); // reset, enable and not readonly	
	$('#select-besiktningsintervall').val('').attr('disabled', false); // reset and enable
	$('#select-fu-intervall').val('').attr('disabled', false); // reset and enable
	$('#switch-dtm').attr('checked', false).attr('disabled', false); // uncheck and disable
	$('#label-dtm').removeClass('disabled'); // remove .disabled
}
function disableServiceOchUnderhall() {
	console.log(' -- disableServiceOchUnderhall()');
	$('#servicegrad-menu-item-44').attr('disabled', false); // re-enable option '44'
	$('#select-servicegrad').val('').attr('disabled', true); // reset and disable
	$('#select-besiktningsintervall').val('').attr('disabled', true); // reset and disable
	$('#select-fu-intervall').val('').attr('disabled', true); // reset and disable
	$('#switch-dtm').attr('checked', false).attr('disabled', true); // uncheck and disable
	$('#label-dtm').addClass('disabled'); // add .disabled
}

function createArtikeldata() {

	// console.log('form #form-artikeldata submitted');
	console.log(' -- createArtikeldata()');

	// Collect data
	artikelansvar = $('#select-artikelansvar').val();
	artikelbenamning = $('#text-artikelbenamning').val();
	artikeltyp = $('#select-artikeltyp').val();
	avskrivningstid = $('#radio-avskrivningstid').val();
	besiktningsintervall = $('#select-besiktningsintervall').val();
	buffertlager = $('#text-buffertlager').val();
	debiteringsform = $('#select-debiteringsform').val();
	dtm = ($('#switch-dtm').prop("checked") ? "Ja" : "Nej");
	forbrukning = $('#slider-forbrukning').val();
	fu_intervall = $('#select-fu-intervall').val();
	gmi = $('#text-gmi').val();
	haraldrigkomp = ($('#switch-har-aldrig-komp').prop("checked") ? "Ja" : "Nej");
	huvudlager = $('#select-huvudlager').val();
	standardprodukt = $('#text-standardprodukt').val();
	iki = $('#text-iki').val();
	ipi = $('#text-ipi').val();
	iri = $('#text-iri').val();
	individartikel = ($('#switch-individartikel').prop("checked") ? "Ja" : "Nej");
	inkopshantering = $('#select-inkopshantering').val();
	inventarium = ($('#switch-inventarium').prop("checked") ? "Ja" : "Nej");
	kk = ($('#switch-kk').prop("checked") ? "Ja" : "Nej");
	kkb = $('#text-kkb').val();
	liggplats = $('#text-liggplats').val();
	leverantor = $('#text-leverantor').val();
	levartnr = $('#text-levartnr').val();
	produkt2 = $('#text-produkt2').val();
	produkt3 = $('#text-produkt3').val();
	produkt4 = $('#text-produkt4').val();
	serienummer = ($('#switch-serienummer').prop("checked") ? "Ja" : "Nej");
	servicegrad = $('#select-servicegrad').val();
	team = $('#select-team').val();
	upphandlad = ($('#checkbox-upphandlad').prop("checked") ? "Ja" : "Nej");
	upplysningar = $('#text-upplysningar').val();
	ws_bb = ($('#switch-wsbb').prop("checked") ? "Ja" : "Nej");
	ws_info = $('#text-wsinfo').val();
	ws_komp = ($('#switch-wskomp').prop("checked") ? "Ja" : "Nej");
	ws_pub = ($('#switch-wspub').prop("checked") ? "Ja" : "Nej");
	ws_sort = ($('#switch-wssort').prop("checked") ? "Ja" : "Nej");

	// Create artikeldata
	artikeldata = "Hej!\n\nJag önskar att följande artikel registreras i Sesam.";

	// Hjälpmedelstjänsten, avtal, mallartikel
	if ($('#checkbox-ht').attr('checked')) {
		artikeldata += " Artikeln finns i Hjälpmedelstjänsten";
		artikeldata += (upphandlad == 'Ja' ? " och är upphandlad.\n" : ".\n" );
	} else {
		artikeldata += " Artikeln saknas i Hjälpmedelstjänsten";
		artikeldata += (upphandlad == 'Ja' ? ", men är upphandlad.\n" : ".\n" );
	}

	// Leverantör, lev. art.nr. och mallartikel
	artikeldata += "\nLeverantör:  " + leverantor + "\nLev. art.nr:  " + levartnr + "\n";
	artikeldata += "Mallartikel:  " + avd.substring(0,1) + artikeltyp + "\n";

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
	artikeldata += "Ingår i sortimentet:  " + ws_sort;
	artikeldata += (ws_sort == 'Nej' ? " 👈\n" : "\n");

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

	// Drifttidsmätare
	if (individartikel == 'Ja' && dtm == 'Ja') {
		artikeldata += "Drifttidsmätare:  " + dtm + " (enhet: timmar) 👈\n";
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
		if (iri.length > 0) artikeldata += "Intern returtagningsinformation:  " + iri + "\n";
	}

	// VISMA WEBSESAM
	artikeldata += "\nVISMA WEBSESAM\n\n";

	// Publicera
	artikeldata += "Publicera:  " + ws_pub + "\n";

	// Beställningsbar
	artikeldata += "Beställningsbar:  " + ws_bb + "\n";

	// Kan vara komponent
	if (artikeltyp == 'T') {
		artikeldata += "Kan vara komponent:  " + ws_komp;
		artikeldata += (ws_komp == 'Nej' ? " 👈\n" : "\n");
	}

	// Extra artikelinformation
	if (ws_info.length > 0) artikeldata += "Extra artikelinformation:  " + ws_info + "\n";

	// PRODUKT
	artikeldata += "\nPRODUKT\n\n";
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
	let pg = '';
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
		if (besiktningsintervall.length > 0 || fu_intervall.length > 0) {
			artikeldata += "\nAKTIVITETSTYPSCHEMAN\n\n";
			if (besiktningsintervall.length > 0) {
				artikeldata += "Besiktningsintervall:  " + besiktningsintervall + "\n";
			}
			if (fu_intervall.length > 0) {
				artikeldata += "FU-intervall:  " + fu_intervall + "\n";
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

	// Add artikeldata to #div-artikeldata
	$('#div-artikeldata').html('<pre id="content-to-copy">' + artikeldata + '</pre>');

	// Update href mailto link
	let mailrec = atob('aW5rb3BzcGVyc29uYWxpbnRlcm50LmhqYWxwbWVkZWxzY2VudGVyQHJlZ2lvbmRhbGFybmEuc2U=');
	let artikelbenamning_firstword = (artikelbenamning.length > 0 ? artikelbenamning.match(/\s*([^\s]+)/)[1] : '(uppgift saknas)');
	let mailsub = "Registrering av ";
	let mailbody = "(Sudda denna rad. Tryck sedan Ctrl+V för att klista in uppgifter.)\n";
	if (artikeltyp.length > 0) {
		if (artikeltyp == 'H') mailsub += "nytt huvudhjälpmedel";
		if (artikeltyp == 'T') mailsub += "nytt tillbehör";
		if (artikeltyp == 'R') mailsub += "ny reservdel";
	} else {
		mailsub += "ny artikel";
	}
	mailsub += " (" + artikelbenamning_firstword.toLowerCase() + " från " + leverantor + ")";

	// var hrefcontent = 'mailto:' + mailrec + '?subject=' + encodeURIComponent(mailsub);
	var hrefcontent = 'mailto:' + mailrec + '?subject=' + encodeURIComponent(mailsub) + '&body=' + encodeURIComponent(mailbody);
	$('#button-send-email').attr('href', hrefcontent);

}
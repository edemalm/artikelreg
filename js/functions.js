function enableSwitchWSKomp() {
	$('#switch-ws-komp').attr('checked', true).attr('disabled', false); // check and enable
	$('#label-ws-komp').removeClass('disabled'); // remove .disabled
	$('#ws-komp-helper').html('Artikeln kan beställas som komponent till ett huvudhjälpmedel');
}

function disableSwitchWSKomp() {
	$('#switch-ws-komp').attr('checked', false).attr('disabled', true); // uncheck and disable
	$('#label-ws-komp').addClass('disabled'); // add .disabled
	$('#ws-komp-helper').html('Artikeln kan ej beställas som komponent till ett huvudhjälpmedel');
}

function enableServiceOchUnderhall() {
	$('#select-servicegrad').val('').attr('disabled', false); // reset and enable
	$('#select-besiktningsintervall').val('').attr('disabled', false); // reset and enable
	$('#select-fu-intervall').val('').attr('disabled', false); // reset and enable
	$('#switch-dtm').attr('checked', false).attr('disabled', false); // uncheck and disable
	$('#label-dtm').removeClass('disabled'); // remove .disabled
}

function disableServiceOchUnderhall() {
	$('#select-servicegrad').val('').attr('disabled', true); // reset and disable
	$('#select-besiktningsintervall').val('').attr('disabled', true); // reset and disable
	$('#select-fu-intervall').val('').attr('disabled', true); // reset and disable
	$('#switch-dtm').attr('checked', false).attr('disabled', true); // uncheck and disable
	$('#label-dtm').addClass('disabled'); // add .disabled
}

function huvudhjalpmedel() {
	console.log('huvudhjalpmedel() executed');

	// 3. Ekonomi
	$('#select-debiteringsform').val('').attr('disabled', false); // clear and enable
	$('#select-artikeltyp').attr('helper','Huvudjälpmedel är ett komplett fungerande hjälpmedel');

	// 5. Inställningar för webSesam
	disableSwitchWSKomp();

	// 7. Hantering vid ankomst
	$('#switch-kk').attr('checked', false).attr('disabled', false); // uncheck and enable
	$('#label-kk').removeClass('disabled'); // remove .disabled

	$('#textarea-kkb').val('').attr('disabled', false); // clear and enable

	// 8. Service och underhåll
	disableServiceOchUnderhall();

	// 9. Information
	$('#textarea-iri').val('').attr('disabled', false); // clear and enable

}

function tillbehor() {
	console.log('tillbehor() executed');

	// 3. Ekonomi
	$('#select-debiteringsform').val('').attr('disabled', false).attr('required', true); // clear and enable
	$('#select-artikeltyp').attr('helper','Tillbehör tillför en extra funktion till ett huvudhjälpmedel');

	// 5. Inställningar för webSesam
	enableSwitchWSKomp();

	// 7. Hantering vid ankomst
	$('#switch-kk').attr('checked', false).attr('disabled', false); // uncheck and enable
	$('#label-kk').removeClass('disabled'); // remove .disabled

	$('#textarea-kkb').val('').attr('disabled', false).attr('required', false); // clear and enable

	// 8. Service och underhåll
	disableServiceOchUnderhall();

	// 9. Information
	$('#textarea-iri').val('').attr('disabled',true); // clear and disable

}

function reservdel() {
	console.log('reservdel() executed');

	// 3. Ekonomi
	$('#select-debiteringsform').val('A').attr('disabled', true); // select 'A' (Köp) and disable
	$('#select-artikeltyp').attr('helper','Reservdelar används för reparationer och underhåll av huvudhjälpmedel och tillbehör');

	// 5. Inställningar för webSesam
	disableSwitchWSKomp();

	// 7. Hantering vid ankomst
	$('#switch-kk').attr('checked', false).attr('disabled', true); // uncheck and disable
	$('#label-kk').addClass('disabled'); // add .disabled

	$('#textarea-kkb').val('').attr('disabled', true); // clear and disable

	// 8. Service och underhåll
	disableServiceOchUnderhall();

	// 9. Information
	$('#textarea-iri').val('').attr('disabled', true); // clear and disable
}

function manadshyra(artikeltyp) {
	console.log('mandshyra() executed with argument artikeltyp=' + artikeltyp );
	switch (artikeltyp) {
		case 'H':
			// 3. Ekonomi
			$('#switch-individartikel').attr('checked', true).attr('disabled', true); // check and disable
			individartikel = "Ja";
			$('#switch-inventarium').attr('checked', true).attr('disabled', true); // check and disable
			inventarium = "Ja";
			$('#radio-avskrivningstid').val('').attr('disabled', false).attr('required', true); // clear, enable and required

			// 8. Service och underhåll
			enableServiceOchUnderhall();

		break;
		case 'T':
			// 8. Service och underhåll
			$('#select-servicegrad').val('44').attr('disabled', true).attr('required', false); // select '44' and disable
			servicegrad = '44';
		break;
	}
}

function kop(artikeltyp) {
	console.log('kop() executed with argument artikeltyp=' + artikeltyp );
	switch (artikeltyp) {
		case 'H':
			// 3. Ekonomi
			$('#switch-individartikel').attr('checked', false).attr('disabled', false); // uncheck and enable
			$('#label-individartikel').removeClass('disabled'); // remove .disabled
			individartikel = "Nej";

			$('#switch-inventarium').attr('checked', false).attr('disabled', true); // uncheck and disable
			inventarium = "Nej";

			$('#radio-avskrivningstid').val('').attr('disabled', true).attr('required', false); // clear and disable

			// 8. Service och underhåll
			disableServiceOchUnderhall();

		break;
		case 'T':

		break;

	}
}


function createArtikeldata() {

	// console.log('form #form-artikeldata submitted');
	console.log('createArtikeldata() executed');

	console.log('resetting artikeldata');
	artikeldata = '';

	// Cancel default browser submit action
	event.preventDefault();
	artikelansvar = $('#select-artikelansvar').val();
	artikelbenamning = $('#text-artikelbenamning').val();
	artikeltyp = $('#select-artikeltyp').val();
	avskrivningstid = $('#radio-avskrivningstid').val();
	debiteringsform = $('#select-debiteringsform').val();
	dtm = ($('#switch-dtm').prop("checked") ? "Ja" : "Nej" );
	gmi = $('#textarea-gmi').val();
	huvudlager = $('#select-huvudlager').val();
	huvudprodukt = $('#text-huvudprodukt').val();
	iki = $('#textarea-iki').val();
	ipi = $('#textarea-ipi').val();
	iri = $('#textarea-iri').val();
	individartikel = ( $('#switch-individartikel').prop("checked") ? "Ja" : "Nej" );
	inkopshantering = $('#select-inkopshantering').val();
	inventarium = ( $('#switch-inventarium').prop("checked") ? "Ja" : "Nej" );
	kk = ($('#switch-kk').prop("checked") ? "Ja" : "Nej" );
	kkb = $('#textarea-kkb').val();
	leverantor = $('#text-leverantor').val();
	levartnr = $('#text-levartnr').val();
	produkt2 = $('#text-produkt2').val();
	produkt3 = $('#text-produkt3').val();
	produkt4 = $('#text-produkt4').val();
	servicegrad = $('#select-servicegrad').val();
	team = $('#select-team').val();
	upplysningar = $('#textarea-upplysningar').val();
	ws_bb = ($('#switch-ws-bb').prop("checked") ? "Ja" : "Nej" );
	ws_info = $('#textarea-ws-info').val();
	ws_komp = ($('#switch-ws-komp').prop("checked") ? "Ja" : "Nej" );
	ws_pub = ($('#switch-ws-pub').prop("checked") ? "Ja" : "Nej" );
	ws_sort = ( $('#switch-ws-sort').prop("checked") ? "Ja" : "Nej" );

	// Leverantör + lev. art.nr.
	artikeldata += "LEVERANTÖR OCH ART.NR.\n\n";
	artikeldata += leverantor + "\n" + levartnr + "\n\n";

	// Hjälpmedelstjänsten, avtal, mallartikel
	if ( $('#checkbox-ht').attr('checked') ) {
		artikeldata += "Artikeln finns i Hjälpmedelstjänsten";
		if ( $('#checkbox-upphandlad').attr('checked') ) artikeldata +=" och är upphandlad";
	} else {
		artikeldata += "Artikeln saknas tyvärr i Hjälpmedelstjänsten";
		if ( $('#checkbox-upphandlad').attr('checked') ) artikeldata +=" men är upphandlad";
	}
	artikeldata += ".\n\n";

	// Mallartikel
	artikeldata += "Mallartikel: " + avd + artikeltyp + "\n\n";

	// ARTIKELBENÄMNING
	artikeldata += "ARTIKELBENÄMNING\n\n" + artikelbenamning + "\n\n";

	// KLASSIFICERING
	artikeldata += "KLASSIFICERING\n\n";

	// Artikeltyp
	artikeldata += "Artikeltyp: ";
	if ( artikeltyp.length > 0 ) {
		switch ( artikeltyp ) {
			case 'H':
				artikeldata += "Huvudhjälpmedel\n"; break;
			case 'T':
				artikeldata += "Tillbehör\n"; break;
			case 'R':
				artikeldata += "Reservdel\n"; break;
		}
	} else {
		artikeldata += "Uppgift saknas\n";
	}

	// Artikelansvar
	artikeldata += "Artikelansvar: ";
	if ( artikelansvar.length > 0 ) {
		switch ( artikelansvar ) {
			case 'L':
				artikeldata += "L (Region eller kommun)\n"; break;
			case 'R':
				artikeldata += "R (Retursortiment)\n"; break;
			case 'E':
				artikeldata += "E (Egenansvar)\n"; break;
			case 'S':
				artikeldata += "S (Syncentralen)\n"; break;
		}
	} else {
		artikeldata += "Uppgift saknas\n";
	}

	// Konteringsgrupp
	artikeldata += "Konteringsgrupp: ";
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
	if ( avd.length > 0 ) {
		artikeldata += avd;
	} else {
		artikeldata += "(avd saknas)";
	}

	if ( inventarium == 'Ja' && avskrivningstid == '3' ) {
		artikeldata += "I3";
	} else if ( inventarium == 'Ja' && avskrivningstid == '5' ) {
		artikeldata += "I5";
	}
	artikeldata += "\n";

	// Avskrivningstid
	if ( inventarium == 'Ja' ) {
		artikeldata += "Avskrivningstid: ";
		if ( avskrivningstid.length > 0 ) {
			artikeldata += avskrivningstid + " år\n";
		} else {
			artikeldata += "Uppgift saknas\n";
		}
	}

	// Sektor
	artikeldata += "Sektor: ";
	if ( team.length > 0 ) {
		artikeldata += team + "\n";
	} else {
		artikeldata += "Uppgift saknas\n";
	}

	// Sortimentsartikel
	artikeldata += "Ingår i sortimentet: " + ws_sort + "\n";

	// Individartikel
	if ( artikeltyp == 'H' ) {
		artikeldata += "Individartikel: " + individartikel + "\n";
	}

	// Inventarium
	if ( artikeltyp == 'H' ) {
		artikeldata += "Inventarium: " + inventarium + "\n";
	}

	// Drifttidsmätare
	if ( individartikel == 'Ja' && dtm == 'Ja' ) {
		artikeldata += "Drifttidsmätare: " + dtm + " (enhet: timmar)\n";
	}

	// Kvalitetskontroll
	if ( kk == 'Ja' ) {
		artikeldata += "Kvalitetskontroll: " + kk + "\n";
	}

	// Status
	artikeldata += "Status: " + ( inkopshantering == 'Nettobehov' ? "Ny" : "Aktiv" ) + "\n\n";

	// INSTRUKTIONER
	if ( gmi.length > 0 || kkb.length > 0 || iki.length > 0 || ipi.length > 0 || iri.length > 0 ) {
		artikeldata += "INSTRUKTIONER\n\n";
		if ( gmi.length > 0 ) artikeldata += "Godsmottagningsinstruktion: " + gmi + "\n";
		if ( kkb.length > 0 ) artikeldata += "Kvalitetskontroll, beskrivning: " + kkb + "\n";
		if ( iki.length > 0 ) artikeldata += "Intern kundorderinformation: " + iki + "\n";
		if ( ipi.length > 0 ) artikeldata += "Intern plockinformation: " + ipi + "\n";
		if ( iri.length > 0 ) artikeldata += "Intern returtagningsinformation: " + iri + "\n";
		artikeldata += "\n";
	}

	// VISMA WEBSESAM
	artikeldata += "VISMA WEBSESAM\n\n";

	// Publicera
	artikeldata += "Publicera: " + ws_pub + "\n";

	// Beställningsbar
	artikeldata += "Beställningsbar: " + ws_bb + "\n";

	// Kan vara komponent
	if ( artikeltyp == 'T' ) {
		artikeldata += "Kan vara komponent: " + ws_komp + "\n";
	}

	// Extra artikelinformation
	if ( ws_info.length > 0 ) artikeldata += "Extra artikelinformation: " + ws_info + "\n";
	artikeldata += "\n";

	// PRODUKT
	artikeldata += "PRODUKT\n\n";

	// Huvudprodukt
	artikeldata += huvudprodukt;
	if ( produkt2.length > 0 || produkt3.length > 0 || produkt4.length > 0 ) artikeldata += " (huvudprodukt)";
	if ( produkt2.length > 0 ) artikeldata += "\n" + produkt2;
	if ( produkt3.length > 0 ) artikeldata += "\n" + produkt3;
	if ( produkt4.length > 0 ) artikeldata += "\n" + produkt4;
	artikeldata += "\n\n";

	// PRISPARAMETRAR
	artikeldata += "PRISPARAMETRAR\n\n";

	// Debiteringsform
	artikeldata += "Debiteringsform: " + ( debiteringsform == 'M' ? "Hyra" : "Köp") + "\n";

	// Prisgrupp
	artikeldata += "Prisgrupp: ";
	if ( team == '02' ) artikeldata += "R eller RERST\n";
	if ( team == '03' ) artikeldata += "R, RMRST eller ReturBarn\n";
	if ( team == '05' ) artikeldata += "KLOK\n";
	if ( team == '07' ) artikeldata += "PMB\n";
	if ( team == '08' ) artikeldata += "R eller RMRST\n";
	if ( team == '09' ) artikeldata += "R\n";
	if ( team == '10' ) artikeldata += "R, ReturVuxen eller ReturVRoll\n";
	if ( team == '11' ) artikeldata += "R\n";
	if ( team == '40' ) artikeldata += "SYN eller SPEC\n";

	// Kalkylprocent
	if ( debiteringsform == 'M') artikeldata += "Kalkylprocent: Se tabell från IT-stödet\n";

	// Servicegrad
	if ( artikeltyp == 'H' && debiteringsform == 'M' ) artikeldata += "Servicegrad: " + servicegrad + "\n";
	if ( artikeltyp == 'T' && debiteringsform == 'M' ) artikeldata += "Servicegrad: 44\n";
	artikeldata += "\n";

	// ÖVRIGT
	let counter = 0;
	let extratext = '';
	if ( upplysningar.length > 0 ) {
		counter++;
		extratext += "Övriga upplysningar: " + upplysningar + "\n";
	}
	if ( artikeltyp == 'H' && artikelbenamning.startsWith('Elrullstol') ) {
		counter++;
		extratext += "Kom ihåg: Elrullstolar skall ha uppföljning. Lägg till artikeln i Uppföljningsorsaker.\n";
	}
	if ( artikelansvar == 'R' ) {
		counter++;
		extratext += "Kom ihåg: Retursortiment har olika prisgrupper för barn och vuxna.";
		if ( artikelbenamning.startsWith('Rollator') ) {
			extratext += " Rollatorer för vuxna har dessutom en egen prisgrupp.";
		}
		extratext += " Kontrollera noga att det blir rätt.\n"
	}
	if ( counter > 0 ) {
		artikeldata += "ÖVRIGT\n\n";
		artikeldata += extratext;
	}

	// Add artikeldata to #div-artikeldata
	$('#div-artikeldata').html('<pre>' + artikeldata + '</pre>');

	// Update href mailto link
	var mailrec = atob('aW5rb3BzcGVyc29uYWxpbnRlcm50LmhqYWxwbWVkZWxzY2VudGVyQHJlZ2lvbmRhbGFybmEuc2U=');
	var hrefcontent = 'mailto:' + mailrec + '?subject=' + encodeURIComponent('Upplägg av ny artikel i Sesam');
	$('#button-send-email').attr('href', hrefcontent);

	/* Change page */
	$('.content-wrapper').addClass('hidden'); /* hide all content */
	$('#content-artikeldata').removeClass('hidden');

}
$(document).ready(function() {

	console.log('Loading artikeldata.js');

	// https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
	// https://jsfiddle.net/edelman/KcX6A/1506/
	jQuery.fn.selectText = function() {
		var doc = document, element = this[0], range, selection;
		if (doc.body.createTextRange) {
			range = document.body.createTextRange();
			range.moveToElementText(element);
			range.select();
		} else if (window.getSelection) {
			selection = window.getSelection();        
			range = document.createRange();
			range.selectNodeContents(element);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	};

	$('#form-artikeldata').submit(function(event) {
		console.log('form #form-artikeldata submitted');

		// Cancel default browser submit action
		event.preventDefault();

		artikelansvar = $('#select-artikelansvar').val();
		artikelbenamning = $('#text-artikelbenamning').val();
		artikeltyp = $('#select-artikeltyp').val();
		avskrivningstid = $('#radio-avskrivningstid').val();
		debiteringsform = $('#select-debiteringsform').val();
		gmi = $('#textarea-gmi').val();
		iki = $('#textarea-iki-text').val();
		ipi = $('#textarea-ipi-text').val();
		iri = $('#textarea-iri-text').val();
		individmarkt = ($('#switch-individ').prop("checked") ? "Ja" : "Nej" );
		inventarie = ($('#switch-inventarie').prop("checked") ? "Ja" : "Nej" );
		kk = ($('#switch-kk').prop("checked") ? "Ja" : "Nej" );
		kkb = $('#textarea-kkb-text').val();
		leverantor = $('#text-leverantor').val();
		levartnr = $('#text-levartnr').val();
		team = $('#select-team').val();
		dtm = ($('#switch-dtm').prop("checked") ? "Ja" : "Nej" );
		ws_bb = ($('#switch-ws-bb').prop("checked") ? "Ja" : "Nej" );
		ws_info = $('#textarea-ws-info').val();
		ws_komp = ($('#switch-ws-komp').prop("checked") ? "Ja" : "Nej" );
		ws_pub = ($('#switch-ws-pub').prop("checked") ? "Ja" : "Nej" );
		ws_sort = ( $('#switch-ws-sort').prop("checked") ? "Ja" : "Nej" );

		// Hjälpmedelstjänsten + upphandlad
		artikeldata += "INFORMATION\n\n";

		artikeldata += ( $('#checkbox-ht').attr('checked') ? "Artikeln finns i Hjälpmedelstjänsten." : "Artikeln saknas tyvärr i Hjälpmedelstjänsten." );

		artikeldata += ( $('#checkbox-upphandlad').attr('checked')? " Artikeln är upphandlad." : " Artikeln är inte upphandlad" );
		artikeldata += "\n\n";

		// Mallartikel
		artikeldata += "Gissas mallartikel: " + avd + artikeltyp + "??? (kontrollera!)\n\n";

		// Leverantör + lev. art.nr.
		artikeldata += "LEVERANTÖR OCH ART.NR.\n\n";
		artikeldata += leverantor + "\n" + levartnr + "\n\n";

		// Artikelbenämning
		artikeldata += "ARTIKELBENÄMNING\n\n" + artikelbenamning + "\n\n";

		artikeldata += "KLASSIFICERING\n\n";

		// Artikeltyp
		artikeldata += "Artikeltyp: ";
		switch ( artikeltyp ) {
			case 'H':
				artikeldata += 'Huvudhjälpmedel'; break;
			case 'T':
				artikeldata += 'Tillbehör'; break;
			case 'R':
				artikeldata += 'Reservdel'; break;
		}
		artikeldata += "\n";

		// Artikelansvar
		artikeldata += "Artikelansvar: ";
		switch ( artikelansvar ) {
			case 'L':
				artikeldata += "L (Region eller kommun)"; break;
			case 'R':
				artikeldata += "R (Retursortiment)"; break;
			case 'E':
				artikeldata += "E (Egenansvar)"; break;
			case 'S':
				artikeldata += "S (Syncentralen)"; break;
		}
		artikeldata += "\n";

		// Konteringsgrupp
		artikeldata += "Konteringsgrupp: ";
		if ( artikeltyp == 'H' && debiteringsform == 'M' && individmarkt == 'Ja' && inventarie == 'Ja'  ) {
			artikeldata += avd + "I" + avskrivningstid + " (" + avdelning + ", " + avskrivningstid + " års avskrivningstid)\n\n"; 
		}

		artikeldata += "Avskrivningsregel: " + avskrivningstid + " år\n";

		// Sektor
		artikeldata += "Sektor: " + team + "\n";

		// Sortimentsartikel
		artikeldata += "Ingår i sortimentet: " + ws_sort + "\n";

		// Individartikel
		artikeldata += "Individartikel: " + individartikel + "\n";

		// Inventarium
		artikeldata += "Inventarium: " + inventarium + "\n";

		// Drifttidsmätare
		artikeldata += "Drifttidsmätare: " + dtm;
		artikeldata += (dtm == 'Ja' ? ' (enhet: timmar)' : '' ) + "\n";

		// Kvalitetskontroll
		artikeldata += "Kvalitetskontroll: " + kk + "\n\n";

		// Artikelstatus
		// if inköpshantering nettobehov, status = Ny else Aktiv

		// Instruktioner
		if ( gmi.length > 0 || kkb.length > 0 || iki.length > 0 || ipi.length > 0 || iri.length > 0 ) {
			artikeldata += "INSTRUKTIONER\n\n";
			if ( gmi.length > 0 ) artikeldata += "Godsmottagningsinstruktion: " + gmi + "\n";
			if ( kkb.length > 0 ) artikeldata += "Kvalitetskontroll, beskrivning: " + kkb + "\n";
			if ( iki.length > 0 ) artikeldata += "Intern kundorderinformation: " + iki + "\n";
			if ( ipi.length > 0 ) artikeldata += "Intern plockinformation: " + ipi + "\n";
			if ( iri.length > 0 ) artikeldata += "Intern returtagningsinformation: " + iri + "\n";
			artikeldata += "\n";
		}

		// Visma webSesam
		artikeldata += "VISMA WEBSESAM\n\n";
		artikeldata += "Publicera: " + ws_pub + "\n";
		artikeldata += "Beställningsbar: " + ws_bb + "\n";
		artikeldata += "Kan vara komponent: " + ws_komp + "\n";
		if ( ws_info.length > 0 ) artikeldata += "Extra artikelinformation: " + ws_info + "\n";
		artikeldata += "\n";

		// Produktnamn
		artikeldata += "PRODUKT\n" + $('#text-produktnamn').val();
		if ( $('#text-produktnamn2').val() ) {
			artikeldata += " (huvudprodukt)\n" + $('#text-produktnamn2').val();
		}
		artikeldata += "\n";
		if ( $('#text-produktnamn3').val() ) artikeldata += $('#text-produktnamn3').val() + "\n";
		if ( $('#text-produktnamn4').val() ) artikeldata += $('#text-produktnamn4').val() + "\n";
		artikeldata += "\n";

		// Add artikeldata to #div-artikeldata
		$('#div-artikeldata').html('<pre>' + artikeldata + '</pre>');

		// Prepare encoded email body
		// var encodedArtikeldata = encodeURIComponent(artikeldata);
		// console.log('encodedArtikeldata = ' + encodedArtikeldata);

		// Update href mailto link
		var mailrec = atob('aW5rb3BzcGVyc29uYWxpbnRlcm50LmhqYWxwbWVkZWxzY2VudGVyQHJlZ2lvbmRhbGFybmEuc2U=');
		// var hrefcontent = 'mailto:' + mailrec + '?subject=' + encodeURIComponent('Upplägg av ny artikel i Sesam') + '&body=' + encodedArtikeldata;
		var hrefcontent = 'mailto:' + mailrec + '?subject=' + encodeURIComponent('Upplägg av ny artikel i Sesam');
		$('#button-send-email').attr('href', hrefcontent).attr('rel', 'external').attr('target', '_blank');

		/* Change page */
		$('.content-wrapper').addClass('hidden'); /* hide all content */
		$('#content-artikeldata').removeClass('hidden');

	});

	// mdui-button #button-show-artikeldata clicked
	$('#button-show-artikeldata').click(function() {
		$('#button-show-artikeldata').addClass('hidden');
		$('#div-artikeldata').removeClass('hidden');
	});


	$('#button-copy-artikeldata').click(function() {
		console.log('#button-copy-artikeldata clicked');
		// $('#textarea-artikeldata').selectText();
		// document.execCommand('copy');
		navigator.clipboard.writeText(artikeldata);
		mdui.snackbar({ message: 'Artikeluppgifterna har kopierats och kan klistras in med CTRL+V' });
	});


/*
	$('#button-send-email').click(function() {
		console.log('#button-send-email clicked');

		var encodedArtikeldata = encodeURIComponent(headertext + artikeldata);
		console.log('encodedArtikeldata = ' + encodedArtikeldata );

		var mailrec = atob('aW5rb3BzcGVyc29uYWxpbnRlcm50LmhqYWxwbWVkZWxzY2VudGVyQHJlZ2lvbmRhbGFybmEuc2U=');
		var hrefcontent = 'mailto:' + mailrec + '?subject=' + encodeURIComponent('Upplägg av ny artikel i Sesam') + '&body=' + encodedArtikeldata;

		// Update href mailto link
		$('#button-send-email').attr('href', hrefcontent);

	});
*/

});

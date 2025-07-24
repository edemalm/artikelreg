$(document).ready(function() {

	console.log('DOM ready');
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

		leverantor = $('#text-leverantor').val();
		levartnr = $('#text-levartnr').val();

		// Hjälpmedelstjänsten + upphandlad
		artikeldata += "INFORMATION\n";
		artikeldata += ( $('#checkbox-ht').attr('checked')? "Artikeln finns i Hjälpmedelstjänsten\n" : "Artikel saknas tyvärr i Hjälpmedelstjänsten\n" );
		artikeldata += ( $('#checkbox-upphandlad').attr('checked')? "Artikeln är upphandlad\n" : "Artikeln är inte upphandlad\n" );
		artikeldata += "\n";

		// Mallartikel
		artikeldata += "Beräknad mallartikel: " + avd + artikeltyp + "??? (kontrollera!)\n\n";

		// Leverantör + lev. art.nr.
		artikeldata += "LEVERANTÖR OCH ART.NR.\n";
		artikeldata += leverantor + "\n";
		artikeldata += "Lev. art.nr.: " + levartnr + "\n\n";

		// Artikelbenämning
		artikeldata += "ARTIKELBENÄMNING\n" + $('#text-artikelbenamning').val() + "\n\n";

		// Artikeltyp
		artikeldata += "ARTIKELTYP\n";
		switch ($('#select-artikeltyp').val()) {
			case 'H':
				artikeldata += 'Huvudhjälpmedel'; break;
			case 'T':
				artikeldata += 'Tillbehör'; break;
			case 'R':
				artikeldata += 'Reservdel'; break;
		}
		artikeldata += "\n\n";

		// Artikelansvar
		artikeldata += "ARTIKELANSVAR\n" + $('#select-artikelansvar').val() + " ";
		switch ($('#select-artikelansvar').val()) {
			case 'L':
				artikeldata += "(Region och kommun)"; break;
			case 'R':
				artikeldata += "(Retursortiment)"; break;
			case 'E':
				artikeldata += "(Egenansvar)"; break;
			case 'S':
				artikeldata += "(Syncentralen)"; break;
		}
		artikeldata += "\n\n";

		// Konteringsgrupp
		artikeldata += "KONTERINGSGRUPP\n";

		if ( artikeltyp == 'H' && debiteringsform == 'M' && individmarkt == 'Ja' && inventarie == 'Ja'  ) {
			artikeldata += avd + "I" + avskrivningstid + " (" + avdelning + ", " + avskrivningstid + " års avskrivningstid)\n\n"; 
		}

		// Sektor
		artikeldata += "SEKTOR\n" + $('#select-team').val() + " (team)\n\n";
	
		// Klassning
		artikeldata += "KLASSIFICERING\n";
		artikeldata += "Ingår i sortiment: " + ($('#switch-ws-sort').prop("checked") ? "Ja" : "Nej" );
		artikeldata += "\n\n";

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
		var encodedArtikeldata = encodeURIComponent(artikeldata);
		console.log('encodedArtikeldata = ' + encodedArtikeldata);

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

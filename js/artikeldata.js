$(document).ready(function() {

	var introtext = "Hej!\n\nHär är uppgifter för upplägg av ny artikel i Sesam.\n\n";
	var artikeldata = "";

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
		console.log('Form #form-artikeldata submitted');
		event.preventDefault();

		// Populate 'artikeldata' variable

		// Artikelbenämning
		artikeldata  = 'Artikelbenämning:  ' + $('#text-artikelbenamning').val() + "\n";

		// Produktnamn
		artikeldata += 'Huvudproduktnamn:  ' + $('#text-produktnamn').val() + "\n";
		if ( $('#text-produktnamn2').val() ) artikeldata += 'Extra produktnamn:  ' + $('#text-produktnamn2').val() + "\n";
		if ( $('#text-produktnamn3').val() ) artikeldata += 'Extra produktnamn:  ' + $('#text-produktnamn3').val() + "\n";
		if ( $('#text-produktnamn4').val() ) artikeldata += 'Extra produktnamn:  ' + $('#text-produktnamn4').val() + "\n";

		// Leverantör
		artikeldata += "\n";
		artikeldata += '      Leverantör:  ' + $('#text-leverantor').val() + "\n";

		// Leverantörens artikelnummer
		artikeldata += '    Lev. art.nr.:  ' + $('#text-levartnr').val() + "\n";

		// Upphandlad
		artikeldata += "\n";
		artikeldata += '      Upphandlad:  ' + ( $('#checkbox-upphandlad').attr('checked')? 'Ja' : 'Nej' ) + "\n";

		// Hjälpmedelstjänsten
		artikeldata += '      Finns i HT:  ' + ( $('#checkbox-ht').attr('checked')? 'Ja' : 'Nej' ) + "\n";

		// Artikelansvar
		artikeldata += "\n";
		artikeldata += '   Artikelansvar:  ' + $('#select-artikelansvar').val() + ' ';
		switch ($('#select-artikelansvar').val()) {
			case 'L':
				artikeldata += '(Region och kommun)'; break;
			case 'R':
				artikeldata += '(Retursortiment)'; break;
			case 'E':
				artikeldata += '(Egenansvar)'; break;
			case 'S':
				artikeldata += '(Syncentralen)'; break;
		}

		// Artikeltyp
		artikeldata += "\n";
		artikeldata += '      Artikeltyp:  ';
		switch ($('#select-artikeltyp').val()) {
			case 'H':
				artikeldata += 'Huvudhjälpmedel'; break;
			case 'T':
				artikeldata += 'Tillbehör'; break;
			case 'R':
				artikeldata += 'Reservdel'; break;
		}

		// Add artikeldata to <pre id="copy-content">
		//$('#copy-content').html( artikeldata );

		// Add artikeldata to #textarea-artikeldata
		$('#textarea-artikeldata').html( artikeldata );

		// Prepare encoded email body
		var encodedArtikeldata = encodeURIComponent(introtext + artikeldata);
		console.log('encodedArtikeldata = ' + encodedArtikeldata );

		// Update href mailto link
		var mailrec = atob('aW5rb3BzcGVyc29uYWxpbnRlcm50LmhqYWxwbWVkZWxzY2VudGVyQHJlZ2lvbmRhbGFybmEuc2U=');
		var hrefcontent = 'mailto:' + mailrec + '?subject=' + encodeURIComponent('Upplägg av ny artikel i Sesam') + '&body=' + encodedArtikeldata;
		$('#button-send-email').attr('href', hrefcontent);

		/* Change page */
		$('.content-wrapper').addClass('hidden'); /* hide all content */
		$('#content-artikeldata').removeClass('hidden');

	});

	$('#button-copy-artikeldata').click(function() {
		console.log('#button-copy-artikeldata clicked');
		// $('#textarea-artikeldata').selectText();
		// document.execCommand('copy');
		navigator.clipboard.writeText(artikeldata);
		mdui.snackbar({ message: 'Artikeluppgifterna har kopierats och kan klistras in med CTRL+V' });
	});

	$('#button-reset-form-warning').click(function() {
		console.log('Button #button-reset-form-warning clicked');
		$('#dialog-reset-warning').attr('open', true);
	});

	$('#button-reset-form').click(function() {
		console.log('Button #button-reset-form clicked');
		mdui.snackbar({ message: 'Formuläret är rensat' });
	});

	$('.button-close-dialog').click(function() {
		console.log('.button-close-dialog clicked');
		$('mdui-dialog').removeAttr('open');
	});






	$('#button-submit-form').click(function() {
		console.log('Button #button-submit-form clicked');

		for (const el of document.getElementById('form-artikeldata').querySelectorAll("[required]")) {
			if (!el.reportValidity()) {
				mdui.snackbar({ message: 'En obligatorisk uppgift saknas' });
				return;
			}
		}
		$('#form-artikeldata').submit();

		return;
	});


/*
	$('#button-send-email').click(function() {
		console.log('#button-send-email clicked');

		var encodedArtikeldata = encodeURIComponent(introtext + artikeldata);
		console.log('encodedArtikeldata = ' + encodedArtikeldata );

		var mailrec = atob('aW5rb3BzcGVyc29uYWxpbnRlcm50LmhqYWxwbWVkZWxzY2VudGVyQHJlZ2lvbmRhbGFybmEuc2U=');
		var hrefcontent = 'mailto:' + mailrec + '?subject=' + encodeURIComponent('Upplägg av ny artikel i Sesam') + '&body=' + encodedArtikeldata;

		// Update href mailto link
		$('#button-send-email').attr('href', hrefcontent);

	});
*/

});

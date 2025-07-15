$(document).ready(function() {

	console.log('DOM ready');
	console.log('Loading form-events.js');

	// 1. Artikelbenämning och produktnamn
	// -----------------------------------

/*
	// mdui-text-field #text-artikelbenamning set random placeholder text
	var textArray = [
		'Rullstol SpeedKing sb45 sd50 silver inkl arm- o benstöd',
		'Personlyft HaulMaster 250kg exkl lyftbygel',
		'Hygienstol PoopEasy tb55 130kg inkl stänkskydd',
		'Sittdyna SuperSoft 45x45 inkl hygienöverdrag',
		'Inhalator AirMan portabel 12V/220V',
		'Kalender HandyPad 24 timmar talande',
		'Rollator SpeedStepper fyra stora hjul exkl korg',
	];
	var randomNumber = Math.floor(Math.random()*textArray.length);
	$('#text-artikelbenamning').attr('placeholder', 'Exempel: ' + textArray[randomNumber]);

	// update placeholder when mdui-text-field #text-artikelbenamning is cleared
	$('#text-artikelbenamning').on('clear', function() {
		console.log('mdui-text-field #text-artikelbenamning cleared')
		var randomNumber = Math.floor(Math.random()*textArray.length);
		$('#text-artikelbenamning').attr('placeholder', 'Exempel: ' + textArray[randomNumber]);
	});
*/

	// mdui-button #button-fler-produktnamn clicked
	$('#button-fler-produktnamn').click(function() {
		$('#div-fler-produktnamn').addClass('hidden');
		$('#text-produktnamn').attr('label', 'Huvudproduktnamn');
		$('#text-produktnamn').attr('helper', 'Endast huvudprodukt visas i sökresultat');
		$('.huvudprodukt').addClass('xl3');
		$('.extraprodukt').removeClass('hidden');
	});

	// 2. Leverantör

	// mdui-checkbox #checkbox-ht changes
	$('#checkbox-ht').on('change', function() {
		console.log('mdui-checkbox #checkbox-ht changed');
		if ($('#checkbox-ht').prop("checked")) {

			// is checked
			$('#text-pris').val('').attr('disabled', true);
			$('#text-garanti').val('').attr('disabled', true);
			$('#text-isokod').val('').attr('disabled', true);

		} else {

			// not checked
			$('#text-pris').removeAttr('disabled');
			$('#text-garanti').removeAttr('disabled');
			$('#text-isokod').removeAttr('disabled');

		}

	});

	// 3. Grundläggande parametrar

	// mdui-select #select-artikelansvar changes
	$('#select-artikelansvar').on('change', function() {
		console.log('mdui-select #select-artikelansvar changed');
		let artikelansvar = this.value;
		console.log('Selected artikelansvar: ' + artikelansvar );
		$('#select-artikeltyp').val('').attr('selected',false).attr('disabled', false); // clear and enable
		$('#switch-individmarkt').attr('checked',false).attr('disabled', true); // uncheck and disable
		$('#select-debiteringsform').val('').attr('selected', false).attr('disabled', true); // clear and disable
		$('#switch-inventarie').attr('checked', false).attr('disabled', true); // uncheck and disable
		$('#select-avskrivningstid').val('').attr('selected', false).attr('disabled', true); // clear and disable
		if ( artikelansvar == 'R' || artikelansvar == 'E' ) {
			$('#artikeltyp-menu-item-r').attr('disabled', true); // disable
		} else {
			$('#artikeltyp-menu-item-r').attr('disabled', false); // enable
		}
		if ( artikelansvar == 'S' ) {
			$('#select-team').val('40').attr('disabled', true); // select '40' and disable
		} else {
			$('#select-team').val('').attr('disabled', false); // clear and enable
			$('#text-avd').val(''); // clear	
	}

	});

	// mdui-select #select-artikeltyp changes
	let artikeltyp = '';
	$('#select-artikeltyp').on('change', function() {
		console.log('mdui-select #select-artikeltyp changed');
		artikeltyp = this.value;
		console.log('Selected artikeltyp: ' + artikeltyp );
		if ( artikeltyp == 'H' ) {
			$('#switch-individmarkt').attr('checked', false).attr('disabled', false); // uncheck and enable
			$('#select-debiteringsform').val('').attr('disabled', false); // clear and enable
		}
		if ( artikeltyp == 'T' ) {
			$('#switch-individmarkt').attr('checked', false).attr('disabled', true); // uncheck and disable
			$('#select-debiteringsform').val('').attr('disabled', false); // clear and enable
		}
		if ( artikeltyp == 'R' ) {
			$('#switch-individmarkt').attr('checked', false).attr('disabled', true); // uncheck and disable
			$('#select-debiteringsform').val('A').attr('disabled', true); // select 'A' and disable
		}
		$('#switch-inventarie').attr('checked', false).attr('disabled', true); // uncheck and disable
		$('#select-avskrivningstid').val('').attr('disabled', true); // clear and disable
	});

	// mdui-switch #switch-individmarkt changes
	let individmarkt = '';
	$('#switch-individmarkt').on('change', function() {
		console.log('mdui-switch #switch-individmarkt changed');
		individmarkt = (this.checked === true) ? 'Ja' :'Nej';
		console.log('Switch individmärkt: ' + individmarkt );
		if ( artikeltyp == 'H' && individmarkt == 'Ja' ) {
			$('#select-debiteringsform').attr('disabled', false); // enable
			$('#switch-inventarie').attr('checked', false).attr('disabled', true); // uncheck and disable
			$('#select-avskrivningstid').val('').attr('disabled', true); // clear and disable
		}
		if ( artikeltyp == 'H' && individmarkt == 'Nej' ) {
			$('#select-debiteringsform').val('A').attr('disabled', true); // select 'A' and disable
			$('#switch-inventarie').attr('checked', false).attr('disabled', true); // uncheck and disable
			$('#select-avskrivningstid').val('').attr('disabled', true); // clear and disable
		}
	});

	// mdui-select #select-debiteringsform changes
	let debiteringsform = '';
	$('#select-debiteringsform').on('change', function() {
		console.log('mdui-select #select-debiteringsform changed');
		debiteringsform = this.value;
		console.log('Selected debiteringsform: ' + debiteringsform );
		if ( artikeltyp == 'H' && debiteringsform == 'M' ) {
			$('#switch-individmarkt').attr('checked', true).attr('disabled', true); // check and disable
			$('#switch-inventarie').attr('checked', true).attr('disabled', true); // check and disable
			$('#select-avskrivningstid').val('').attr('disabled', false); // clear and enable
		}
		if ( artikeltyp == 'H' && debiteringsform == 'A' ) {
			$('#switch-individmarkt').attr('disabled', false); // enable
			$('#switch-inventarie').attr('checked', false).attr('disabled', true); // uncheck and disable
			$('#select-avskrivningstid').val('').attr('disabled', true); // clear and disable
		}
	});

	// mdui-switch #switch-inventarie changes
	let inventarie = '';
	$('#switch-inventarie').on('change', function() {
		console.log('mdui-switch #switch-inventarie changed');
		inventarie = (this.checked === true) ? 'Ja' :'Nej';
		console.log('Switch inventarie: ' + inventarie );
	});

	// mdui-select #select-avskrivningstid changes
	let avskrivningstid = '';
	$('#select-avskrivningstid').on('change', function() {
		console.log('mdui-select #select-avskrivningstid changed');
		avskrivningstid = this.value;
		console.log('Selected avskrivningstid: ' + avskrivningstid );
	});




	// 4. Ansvarigt team

	// mdui-select #select-team changes
	let team = '';
	$('#select-team').on('change', function() {
		console.log('mdui-select #select-team changed');
		team = this.value;
		console.log('Selected team: ' + team );
		if ( team == '02' || team == '03' || team == '08' || team == '09' || team == '10' || team == '11' ) {
			console.log('Avdelning: Rörelse');
			$('#text-avd').val('Rörelse');
		}
		if ( team == '02' || team == '03' ) {
			$('#switch-uppfoljning').attr('disabled', false);
		} else {
			$('#switch-uppfoljning').attr('checked', false).attr('disabled', true);
		}
		if ( team == '05' ) {
			console.log('Avdelning: KLOK');
			$('#text-avd').val('KLOK');
		}
		if ( team == '07' ) {
			console.log('Avdelning: PMB');
			$('#text-avd').val('PMB');
		}
		if ( team == '40' ) {
			console.log('Avdelning: Syncentralen');
			$('#text-avd').val('Syncentralen');
		}
	});



	// 7. Hantering vid ankomst

	// mdui-switch #switch-kvalitetskontroll changes
	$('#switch-kvalitetskontroll').on('change', function() {
		console.log('mdui-switch #switch-kvalitetskontroll changed');
		if ($('#switch-kvalitetskontroll').prop("checked")) {
			// is checked
			$('#textarea-kvalitetskontrolltext').removeAttr('disabled');
		} else {
			// not checked
			$('#textarea-kvalitetskontrolltext').val(''); // clear input
			$('#textarea-kvalitetskontrolltext').attr('disabled', true);
		}
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

	// Skicka artikeluppgifter

	$('#button-submit-form').click(function() {
		console.log('mdui-button #button-submit-form clicked');

		// validate form
		console.log('validating form');
		for (const el of document.getElementById('form-artikeldata').querySelectorAll('[required]')) {
			if (!el.reportValidity()) {
				mdui.snackbar({ message: 'En obligatorisk uppgift saknas' });
				return;
			}
		}

		// submit form
		$('#form-artikeldata').submit();
	});


});

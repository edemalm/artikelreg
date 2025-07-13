$(document).ready(function() {

	console.log('DOM ready');
	console.log('Loading form-events.js');

	// 1. Artikelbenämning och produktnamn

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

	// mdui-button #button-fler-produktnamn clicked
	$('#button-fler-produktnamn').click(function(){
		$('#div-fler-produktnamn').addClass('hidden');
		$('#text-produktnamn').attr('label', 'Huvudproduktnamn');
		$('#text-produktnamn').attr('helper', 'Huvudprodukt visas i resultat vid artikelsök');
		$('.huvudprodukt').addClass('xl3');
		$('.extraprodukt').addClass('xl3').removeClass('hidden');
	});

	// 2. Leverantör

	// mdui-checkbox #checkbox-ht changes
	$('#checkbox-ht').on('change', function() {
		console.log('mdui-checkbox #checkbox-ht changed');
		if ($('#checkbox-ht').prop("checked")) {

			// is checked
			$('#text-pris').val('').removeAttr('required').attr('disabled', true);
			$('#text-garanti').val('').removeAttr('required').attr('disabled', true);
			$('#text-isokod').val('').removeAttr('required').attr('disabled', true);

		} else {

			// not checked
			$('#text-pris').removeAttr('disabled').attr('required', true);
			$('#text-garanti').removeAttr('disabled').attr('required', true);
			$('#text-isokod').removeAttr('disabled').attr('required', true);

		}

	});

	// 4. Ansvarigt team

	// mdui-select #select-team changes
	$('#select-team').on('change', function() {
		console.log('mdui-select #select-team changed');
		let team = this.value;
		console.log('Team: ' + team );
		if ( team == "02" || team == "03" || team == "08" || team == "09" || team == "10" || team == "11" ) {
			console.log('Avdelning: Rörelse');
			$('#text-avd').val('Rörelse');
		}
		if ( team == "05" ) {
			console.log('Avdelning: KLOK');
			$('#text-avd').val('KLOK');
		}
		if ( team == "07" ) {
			console.log('Avdelning: PMB');
			$('#text-avd').val('PMB');
		}
		if ( team == "40" ) {
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


});

$(document).ready(function() {

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
		// reset everything
		$('#select-artikeltyp').val('').attr('selected',false).attr('disabled', true); // clear and enable
		$('#select-debiteringsform').val('').attr('selected', false).attr('disabled', true); // clear and disable
		$('#switch-individartikel').attr('checked',false).attr('disabled', true); // uncheck and disable
		individartikel = "Nej";
		$('#switch-inventarium').attr('checked', false).attr('disabled', true); // uncheck and disable
		inventarium = "Nej";
		$('#radio-avskrivningstid').val('').attr('disabled', true); // clear and disable

		artikelansvar = this.value;
		console.log('Selected artikelansvar: ' + artikelansvar );
		if ( artikelansvar == '' ) {
			// nothing selected
			$('#select-artikeltyp').val('').attr('selected',false).attr('disabled', true); // clear and disable
		} else {
			// something selected
			$('#select-artikeltyp').val('').attr('selected',false).attr('disabled', false); // clear and enable
		}
		if ( artikelansvar == 'L' ) {
			// landsting och kommun
			$('#select-debiteringsform').val('').attr('disabled', true); // clear and disable
		}
		if ( artikelansvar == 'R' || artikelansvar == 'E' ) {
			// retursortiment eller egenansvar
			$('#artikeltyp-menu-item-r').attr('disabled', true); // disable
			$('#select-debiteringsform').val('A').attr('disabled', true); // select 'A' and disable
		} else {
			$('#artikeltyp-menu-item-r').attr('disabled', false); // enable
		}
		if ( artikelansvar == 'S' ) {
			// syncentralen
			$('#select-team').val('40').attr('disabled', true); // select '40' and disable
		} else {
			$('#select-team').val('').attr('disabled', false); // clear and enable
		}

	});

	// mdui-select #select-artikeltyp changes
	$('#select-artikeltyp').on('change', function() {
		console.log('mdui-select #select-artikeltyp changed');
		// reset
		$('#switch-individartikel').attr('checked',false).attr('disabled', true); // uncheck and disable
		individartikel = "Nej";
		$('#switch-inventarium').attr('checked', false).attr('disabled', true); // uncheck and disable
		inventarium = "Nej";
		$('#radio-avskrivningstid').val('').attr('disabled', true).attr('required', false); // clear, disable and not required

		artikeltyp = this.value;
		console.log('Selected artikeltyp: ' + artikeltyp );
		if ( artikelansvar == 'L' || artikelansvar == 'S' ) {
			// landsting och kommun, eller syncentralen
			if ( artikeltyp == 'H' || artikeltyp == 'T' ) {
				$('#select-debiteringsform').val('').attr('disabled', false); // clear and enable
			}
			if ( artikeltyp == 'R' ) {
				$('#select-debiteringsform').val('A').attr('disabled', true); // select 'A' and disable

			}
		}

		if ( artikelansvar == 'R' || artikelansvar == 'E' ) {
			// retursortiment eller egenansvar
			if ( artikeltyp == 'H' ) {
				$('#select-debiteringsform').val('A').attr('disabled', true); // select 'A' and disable
				$('#switch-individartikel').attr('checked', false).attr('disabled', false); // uncheck and enable
				individartikel = "Nej";
			}
			if ( artikeltyp == 'T' ) {
				$('#select-debiteringsform').val('A').attr('disabled', true); // select 'A' and disable
				$('#switch-individartikel').attr('checked', false).attr('disabled', true); // uncheck and disable
				individartikel = "Nej";
			}
		}

		if ( artikelansvar == 'S' ) {
			$('#select-team').val('40').attr('disabled', true); // select '40' and disable
		}
	});

	// mdui-select #select-debiteringsform changes
	$('#select-debiteringsform').on('change', function() {
		console.log('mdui-select #select-debiteringsform changed');
		debiteringsform = this.value;
		console.log('Selected debiteringsform: ' + debiteringsform );

		if ( artikelansvar == 'L' || artikelansvar == 'S' ) {
			// landsting och kommun, eller syncentralen
			if ( artikeltyp == 'H' ) {
				if ( debiteringsform == 'M' ) {
					$('#switch-individartikel').attr('checked', true).attr('disabled', true); // check and disable
					individartikel = "Ja";
					$('#switch-inventarium').attr('checked', true).attr('disabled', true); // check and disable
					inventarium = "Ja";
					$('#radio-avskrivningstid').val('').attr('disabled', false).attr('required', true); // clear, enable and required
				}
				if ( debiteringsform == 'A' ) {
					$('#switch-individartikel').attr('checked', false).attr('disabled', false); // uncheck and enable
					individartikel = "Nej";
					$('#switch-inventarium').attr('checked', false).attr('disabled', true); // uncheck and disable
					inventarium = "Nej";
					$('#radio-avskrivningstid').val('').attr('disabled', true).attr('required', false); // clear and disable
				}

			}
			if ( artikeltyp == 'T' ) {
			}
			if ( artikeltyp == 'R' ) {
			}
		}

		if ( artikelansvar == 'R' || artikelansvar == 'E' ) {
			// retursortiment eller egenansvar
			if ( artikeltyp == 'H' ) {
			}
			if ( artikeltyp == 'T' ) {
			}
		}


		/*
		if ( artikeltyp == 'H' && debiteringsform == 'M' ) {
			$('#switch-individartikel').attr('checked', true).attr('disabled', true); // check and disable
		}
		if ( artikeltyp == 'H' && debiteringsform == 'A' ) {
			$('#switch-individartikel').attr('checked', false).attr('disabled', false); // uncheck and enable
			$('#switch-inventarium').attr('checked', false).attr('disabled', true); // uncheck and disable
			$('#select-avskrivningstid').val('').attr('disabled', true); // clear and disable
		}
		*/

	});

	// mdui-switch #switch-individartikel changes
	$('#switch-individartikel').on('change', function() {
		console.log('mdui-switch #switch-individartikel changed');
		individartikel = (this.checked === true) ? 'Ja' :'Nej';
		console.log('Switch individmärkt: ' + individartikel );
		/*
		if ( artikeltyp == 'H' && individartikel == 'Ja' ) {
			$('#select-debiteringsform').attr('disabled', false); // enable
			$('#switch-inventarium').attr('checked', false).attr('disabled', true); // uncheck and disable
			$('#select-avskrivningstid').val('').attr('disabled', true); // clear and disable
		}
		if ( artikeltyp == 'H' && individartikel == 'Nej' ) {
			$('#select-debiteringsform').val('A'); // select 'A'
			$('#switch-inventarium').attr('checked', false).attr('disabled', true); // uncheck and disable
			$('#select-avskrivningstid').val('').attr('disabled', true); // clear and disable
		}
		*/
	});

	// mdui-switch #switch-inventarium changes
	$('#switch-inventarium').on('change', function() {
		console.log('mdui-switch #switch-inventarium changed');
		inventarium = (this.checked === true) ? "Ja" : "Nej";
		console.log('Switch inventarium: ' + inventarium );
	});

	// mdui-select #raio-avskrivningstid changes
	$('#radio-avskrivningstid').on('change', function() {
		console.log('mdui-radio #radio-avskrivningstid changed');
		avskrivningstid = this.value;
		console.log('Selected avskrivningstid: ' + avskrivningstid );
	});



	// 4. Ansvarigt team

	// mdui-select #select-team changes
	$('#select-team').on('change', function() {
		console.log('mdui-select #select-team changed');
		team = this.value;
		console.log('Selected team: ' + team );
		if ( team == '02' || team == '03' || team == '08' || team == '09' || team == '10' || team == '11' ) {
			console.log('Avdelning: Rörelse');
			avd = "R";
			avdelning = "Rörelse";
		} else if ( team == '05' ) {
			console.log('Avdelning: KLOK');
			avd = "K";
			avdelning = "KLOK";
		} else if ( team == '07' ) {
			console.log('Avdelning: PMB');
			avd = "PMB";
			avdelning = "PMB";
		} else if ( team == '40' ) {
			console.log('Avdelning: Syncentralen');
			avd = "S";
			avdelning = "Syncentralen";
		} else {
			console.log('Avdelning: Kan ej fastställas baserat på team');
			avd = "(avd saknas)";
			avdelning = "(avdelning saknas)";
		}

	});

	// 5. Inställningar för webSesam

	// mdui-switch #switch-ws-pub changes
	$('#switch-ws-pub').on('change', function() {
		console.log('mdui-switch #switch-ws-pub changed');
		if ($('#switch-ws-pub').prop("checked")) {
			// on
			$('#ws-pub-helper').html('Artikeln visas och är sökbar');
		} else {
			// off
			$('#ws-pub-helper').html('Artikeln visas ej');
		}
	});

	// mdui-switch #switch-ws-bb changes
	$('#switch-ws-bb').on('change', function() {
		console.log('mdui-switch #switch-ws-bb changed');
		if ($('#switch-ws-bb').prop("checked")) {
			// on
			$('#ws-bb-helper').html('Artikeln kan beställas. Uttag från eget kundlager kan registreras.');
		} else {
			// off
			$('#ws-bb-helper').html('Artikeln kan ej beställas. Uttag från eget kundlager kan ej registreras.');
		}
	});

	// mdui-switch #switch-ws-komp changes
	$('#switch-ws-komp').on('change', function() {
		console.log('mdui-switch #switch-ws-komp changed');
		if ($('#switch-ws-komp').prop("checked")) {
			// on
			$('#ws-komp-helper').html('Artikeln kan beställas som komponent till ett huvudhjälpmedel');
		} else {
			// off
			$('#ws-komp-helper').html('Artikeln kan ej beställas som komponent till ett huvudhjälpmedel');
		}
	});

	// mdui-switch #switch-ws-sort changes
	$('#switch-ws-sort').on('change', function() {
		console.log('mdui-switch #switch-ws-sort changed');
		if ($('#switch-ws-sort').prop("checked")) {
			// on
			sortimentsartikel = "Ja";
			$('#ws-sort-helper').html('Artikeln ingår i ordinarie sortiment och visas vid artikelsökning');
		} else {
			// off
			sortimentsartikel = "Nej";
			$('#ws-sort-helper').html('Artikeln tillhör övrigt sortiment och visas inte som standard vid artikelsöknig');
		}
	});


	// 7. Hantering vid ankomst

	// mdui-switch #switch-kvalitetskontroll changes
	$('#switch-kk').on('change', function() {
		console.log('mdui-switch #switch-kk changed');
		if ($('#switch-kk').prop("checked")) {
			// is checked
			$('#textarea-kkb-text').attr('disabled', false).attr('required', true); // enable
		} else {
			// not checked
			$('#textarea-kkb-text').val('').attr('disabled', true); // clear and disable
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

	// 8. Service and underhåll

	// mdui-switch #switch-dtm changes
	$('#switch-dtm').on('change', function() {
		console.log('mdui-switch #switch-dtm changed');
		if ($('#switch-dtm').prop("checked")) {
			// on
			$('#dtm-helper').html('Artikeln har drifttidsmätare (enhet timmar)');
		} else {
			// off
			$('#dtm-helper').html('Artikel har ej drifttidsmätare');
		}
	});





	// Skicka artikeluppgifter

	$('#button-submit-form').click(function() {
		console.log('mdui-button #button-submit-form clicked');

		console.log('resetting artikeldata');
		artikeldata = '';

		// validate form

		/*
		console.log('validating form');
		for (const el of document.getElementById('form-artikeldata').querySelectorAll('[required]')) {
			if (!el.reportValidity()) {
				mdui.snackbar({ message: 'En obligatorisk uppgift saknas' });
				return;
			}
		}
		*/
		mdui.snackbar({ message: 'Kontroll av obligatoriska fält inaktiverat i form-events.js:383' });

		// submit form
		$('#form-artikeldata').submit();
	});


});

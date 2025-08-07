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
		$('#text-huvudprodukt').attr('label', 'Huvudproduktnamn');
		$('#text-huvudprodukt').attr('helper', 'Endast huvudprodukt visas i sökresultat');
		$('.huvudprodukt').addClass('xl3');
		$('.extraprodukt').removeClass('hidden');
	});

	// 2. Leverantör

	// mdui-checkbox #checkbox-ht changes
	$('#checkbox-ht').on('change', function() {
		console.log('mdui-checkbox #checkbox-ht changed');
		if ($('#checkbox-ht').prop("checked")) {

			// is checked
			$('#ejht-pris').addClass('hidden');
			$('#ejht-garanti').addClass('hidden');
			$('#ejht-isokod').addClass('hidden');

			$('#text-pris').val('').attr('disabled', true);
			$('#text-garanti').val('').attr('disabled', true);
			$('#text-isokod').val('').attr('disabled', true);

		} else {

			// not checked
			$('#text-pris').attr('disabled', false);
			$('#text-garanti').attr('disabled', false);
			$('#text-isokod').attr('disabled', false);

			$('#ejht-pris').removeClass('hidden');
			$('#ejht-garanti').removeClass('hidden');
			$('#ejht-isokod').removeClass('hidden');

		}

	});

	// 3. Grundläggande parametrar

	// mdui-select #select-artikelansvar changes
	$('#select-artikelansvar').on('change', function() {
		console.log('<mdui-select #select-artikelansvar> changed');
		artikelansvar = this.value;
		console.log(' -- Artikelansvar = ' + artikelansvar );

		// reset everything
		disableSelectArtikeltyp();
		disableSelectDebiteringsform();
		disableSwitchIndividartikel();
		disableSwitchInventarium();
		disableRadioAvskrivningstid();

		switch (artikelansvar) {
			case 'L':
				// Region eller kommun
				enableSelectArtikeltyp();
				$('#select-huvudlager').val('200');
			break;
			case 'R':
				// Retursortiment
				$('#artikeltyp-menu-item-r').attr('disabled', true); // disable option 'R' (Reservdel)
				enableSelectArtikeltyp();
				$('#select-huvudlager').val('200');
			break;
			case 'E':
				// Egenansvar
				$('#artikeltyp-menu-item-r').attr('disabled', true); // disable option 'R' (Reservdel)
				enableSelectArtikeltyp();
				$('#select-huvudlager').val('200');
			break;
			case 'S':
				// Syncentralen
				enableSelectArtikeltyp();
				$('#select-team').val('40');
				$('#select-huvudlager').val('400');
			break;
		}
	});

	// mdui-select #select-artikeltyp changes
	$('#select-artikeltyp').on('change', function() {
		console.log('<mdui-select #select-artikeltyp> changed');
		artikeltyp = this.value;
		console.log(' -- Artikeltyp = ' + artikeltyp );

		// reset
		disableSelectDebiteringsform();
		disableSwitchIndividartikel();
		disableSwitchInventarium();
		disableRadioAvskrivningstid();

		switch (artikeltyp) {
			case 'H':
				// huvudhjalpmedel();
				$('#select-artikeltyp').attr('helper','Ett huvudjälpmedel är ett komplett fungerande hjälpmedel');
				enableSelectDebiteringsform();
				if (artikelansvar == 'R' || artikelansvar == 'E') {
					$('#debiteringsform-menu-item-m').attr('disabled', true); // disable option 'M' (Månadshyra)
					$('#select-debiteringsform').val('A'); // select option 'A' (Köp)
				}
			break;
			case 'T':
				// tillbehor();
				$('#select-artikeltyp').attr('helper','Ett tillbehör tillför en extra funktion till ett huvudhjälpmedel');
				enableSelectDebiteringsform();
				if (artikelansvar == 'R' || artikelansvar == 'E') {
					$('#debiteringsform-menu-item-m').attr('disabled', true); // disable option 'M' (Månadshyra)
					$('#select-debiteringsform').val('A'); // select option 'A' (Köp)
				}
			break;
			case 'R':
				// reservdel();
				$('#select-artikeltyp').attr('helper','En reservdel används för att reparera eller underhålla ett huvudhjälpmedel eller tillbehör');
				enableSelectDebiteringsform();
				$('#select-debiteringsform').val('A'); // select 'A' (köp)
				$('#debiteringsform-menu-item-m').attr('disabled', true); // disable option 'M' (månadshyra)
			break;
		}
	});

	// mdui-select #select-debiteringsform changes
	$('#select-debiteringsform').on('change', function() {
		console.log('<mdui-select #select-debiteringsform> changed');
		debiteringsform = this.value;
		console.log('Debiteringsform = ' + debiteringsform );
		switch (debiteringsform) {
			case 'M':
				if ((artikelansvar == 'L' || artikelansvar == 'S') && artikeltyp == 'H') {
					enableSwitchIndividartikel();
					$('#switch-individartikel').attr('checked', true); // checked
					console.log(' -- Väljer individartikel');
					enableSwitchInventarium();
					$('#switch-inventarium').attr('checked', true); // checked
					console.log(' -- Väljer inventarium');
					enableRadioAvskrivningstid();
				}
			break;
			case 'A':
				//if (artikelansvar == 'L' && artikeltyp == 'H') {
				//	enableSwitchIndividartikel();
				//	disableSwitchInventarium();
				//	disableRadioAvskrivningstid();
				//}
				if (artikeltyp == 'H') {
					enableSwitchIndividartikel();
					disableSwitchInventarium();
					disableRadioAvskrivningstid();
				}
			break;
		}
	});

	// mdui-switch #switch-individartikel changes
	$('#switch-individartikel').on('change', function() {
		console.log('<mdui-switch #switch-individartikel> changed');
		individartikel = (this.checked === true) ? 'Ja' : 'Nej';
		console.log(' -- Individartikel = ' + individartikel);
		switch (individartikel) {
			case 'Ja':
			break;
			case 'Nej':
				if (artikeltyp == 'H' && debiteringsform == 'M') {
					mdui.alert({
						headline: "Ej tillåtet",
						description: "Ett huvudhjälpmedel för uthyrning måste vara klassat som individartikel och inventarium",
						confirmText: "Jag förstår"
					});
					$('#switch-individartikel').attr('checked', true); // re-checked
					console.log(' -- Väljer individartikel');
				}
			break;
		}
	});

	// mdui-switch #switch-inventarium changes
	$('#switch-inventarium').on('change', function() {
		console.log('<mdui-switch #switch-inventarium> changed');
		inventarium = (this.checked === true) ? "Ja" : "Nej";
		console.log(' -- Inventarium = ' + inventarium );
		switch (inventarium) {
			case 'Ja':
			break;
			case 'Nej':
				if (artikeltyp == 'H' && debiteringsform == 'M') {
					mdui.alert({
						headline: "Ej tillåtet",
						description: "Ett huvudhjälpmedel för uthyrning måste vara klassat som individartikel och inventarium",
						confirmText: "Jag förstår"
					});
					$('#switch-inventarium').attr('checked', true); // re-checked
					console.log(' -- Väljer inventarium');
				}
			break;
		}
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
			$('#textarea-ws-info').val('').attr('disabled', false); // clear and enable
		} else {
			// off
			$('#ws-pub-helper').html('Artikeln visas ej');
			$('#textarea-ws-info').val('').attr('disabled', true); // clear and disable
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

	// 6. Lagerhållning

	// mdui-select #select-huvudlager changes
	$('#select-huvudlager').on('change', function() {
		console.log('mdui-select #select-huvudlager changed');
		huvudlager = this.value;
		console.log('Selected huvudlager: ' + huvudlager );
		switch( huvudlager) {
		case '200':
			$('#text-liggplats').attr('placeholder', 'P?-01-?-???');
		break;
		case '400':
			$('#text-liggplats').attr('placeholder', '01-?-???');
		break;
		case '688':
			$('#text-liggplats').attr('placeholder', '01-?-???');
		break;
		}
	});

	// mdui-select #select-inkopshantering changes
	$('#select-inkopshantering').on('change', function() {
		console.log('<mdui-select #select-inkopshantering> changed');
		inkopshantering = this.value;
		console.log('* Ikopshantering: ' + inkopshantering );
		switch( inkopshantering) {
		case 'Kundorder':
			disableSliderForbrukning();
		break;
		case 'Nettobehov':
			enalbeSliderForbrukning();
		break;
		}
	});

	// mdui-slider #slider-forbrukning focus
	$('#slider-forbrukning').on('focus', function() {
		console.log('<mdui-slider #slider-forbrukning> focus');
		const slider = this;
		forbrukning = this.value;
		if (forbrukning == 0) {
			slider.labelFormatter = (value) => `0-24`;
		}
	});

	// mdui-slider #slider-forbrukning changes
	$('#slider-forbrukning').on('input', function() {
		// console.log('<mdui-slider #slider-forbrukning> input');
		const slider = this;
		forbrukning = this.value;
		forbrukning_msg = 'Årsbehov ';
		// let veckobehov = Math.round((forbrukning*10)/52) / 10;
		let veckobehov = Math.round(forbrukning/52);
		if (forbrukning == 0) {
			forbrukning_msg += '0-24. Mindre än 0.5 per vecka.';
			slider.labelFormatter = (value) => `0-24`;
		} else if (veckobehov < 1 ) {
			forbrukning_msg += forbrukning + '. Mindre än 1 per vecka.';
			slider.labelFormatter = (value) => `${value}`;
		} else if (forbrukning == 500) {
			forbrukning_msg += '500 eller mer. Minst 10 per vecka. Vänligen skriv en kommentar och förtydliga behovet.';
			slider.labelFormatter = (value) => `${value}`;
		} else {
			forbrukning_msg += forbrukning + '. Ungefär ' + veckobehov + ' per vecka.';
			slider.labelFormatter = (value) => `${value}`;
		}
		$('#slider-msg').html(forbrukning_msg);
	});

	// 7. Hantering vid ankomst

	// mdui-switch #switch-kvalitetskontroll changes
	$('#switch-kk').on('change', function() {
		console.log('mdui-switch #switch-kk changed');
		if ($('#switch-kk').prop("checked")) {
			// is checked
			$('#textarea-kkb').attr('disabled', false).attr('required', true); // enable
		} else {
			// not checked
			$('#textarea-kkb').val('').attr('disabled', true); // clear and disable
		}
	});

	$('#button-reset-form-warning').click(function() {
		console.log('Button #button-reset-form-warning clicked');
		$('#dialog-reset-warning').attr('open', true);
	});

	$('#button-reset-form').click(function() {
		// console.log('Button #button-reset-form clicked');
		// resetForm();
		if ( window.location.search.indexOf('?reload=') == -1 ) {
			window.location.search += '?reload=1';
		} else {
			location.reload();
		}

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

	// Skapa artikeluppgifter

	$('#button-create-artikeldata').click(function() {
		console.log('mdui-button #button-create-artikeldata clicked');

		if ( $('#button-create-artikeldata').attr('validate-input') == "yes" ) {
			console.log('Input validation enabled');
			// validate input
			// vanilla javascript
			//for (const el of document.getElementById('content-formular').querySelectorAll('[required]')) {
			//	if (!el.reportValidity()) {
			//		mdui.snackbar({ message: 'En obligatorisk uppgift saknas' });
			//		return;
			//	}
			//}
			for (const el of $('[required]')) {
				if (!el.reportValidity()) {
					mdui.snackbar({ message: 'En obligatorisk uppgift saknas' });
					return;
				}
			}
		} else {
			console.log('Input validation disabled');
			mdui.snackbar({ message: 'Kontroll av obligatoriska uppgifter inaktiverat' });
		}

		console.log('Calling createArtikeldata()');
		createArtikeldata()
	});
});

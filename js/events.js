$(document).ready(function() {
	console.log('Loading events.js');

	// TOP APP BAR EVENTS
	// <mdui-top-app-bar #top-app-bar>

	// Open navigation drawer
	$('#button-open-menu').click(function() {
		console.log('<mdui-button-icon #button-open-menu> clicked');
		$('#navigation-drawer').attr('open', true);
	});

	// Toggle theme
	$('#button-toggle-theme').click(function() {
		console.log('<mdui-button #button-toggle-theme> clicked');
		if ( $('html').hasClass('mdui-theme-light') ) {
			$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-light').addClass('mdui-theme-dark');
			$('#button-toggle-theme').removeAttr('icon').attr('icon', 'light_mode--outlined');
			theme = 'dark';
		} else {
			$('html').removeClass('mdui-theme-auto').removeClass('mdui-theme-dark').addClass('mdui-theme-light');
			$('#button-toggle-theme').removeAttr('icon').attr('icon', 'dark_mode--outlined');
			theme = 'light';
		}
	});

	// Open "about" dialog
	$('#button-about').click(function() {
		console.log('<mdui-button-icon #button-about> clicked');
		$('#dialog-about').attr('open', true);
	});

	// NAVIGATION DRAWER EVENTS
	// <mdui-navigation-drawer id="navigation-drawer">

	// Close navigation drawer
	$('#button-close-menu').click(function() {
		console.log('<mdui-button-icon #button-close-menu> clicked');
		$('#navigation-drawer').removeAttr('open');
	});

	// Catch the "open" event of <mdui-collapse-item #menu-collapse-group1>
	$('#menu-collapse-group1').on('open', function() {
		console.log('The open event fired on #menu-collapse-group1');
		$('#menu-group1-arrow').attr('name', 'keyboard_arrow_up')
	});
	// Catch the "open" event of <mdui-collapse-item #menu-collapse-group2>
	$('#menu-collapse-group2').on('open', function() {
		console.log('The open event fired on #menu-collapse-group2');
		$('#menu-group2-arrow').attr('name', 'keyboard_arrow_up')
	});
	// Catch the "close" event of <mdui-collapse-item #menu-collapse-group1>
	$('#menu-collapse-group1').on('close', function() {
		console.log('The close event fired on #menu-collapse-group1');
		$('#menu-group1-arrow').attr('name', 'keyboard_arrow_down')
	});
	// Catch the "close" event of <mdui-collapse-item #menu-collapse-group2>
	$('#menu-collapse-group2').on('close', function() {
		console.log('The close event fired on #menu-collapse-group2');
		$('#menu-group2-arrow').attr('name', 'keyboard_arrow_down')
	});

	$('#menu-formular').click(function() {
		console.log('<mdui-button #menu-formular> clicked');
		changeContent('#content-formular', '#menu-formular');
	});

	$('#menu-help-artikelbenamning').click(function() {
		console.log('<mdui-list-item #menu-help-artikelbenamning> clicked');
		changeContent('#content-help-artikelbenamning', '#menu-help-artikelbenamning');
	});

	$('#menu-help-produkt').click(function() {
		console.log('<mdui-list-item #menu-help-produkt> clicked');
		changeContent('#content-help-produkt', '#menu-help-produkt');
	});

	$('#menu-help-iso-koder').click(function() {
		console.log('<mdui-list-item #menu-help-iso-koder> clicked');
		changeContent('#content-help-iso-koder', '#menu-help-iso-koder');
	});

	$('#menu-help-liggplats').click(function() {
		console.log('<mdui-list-item #menu-help-liggplats> clicked');
		changeContent('#content-help-liggplats', '#menu-help-liggplats');
	});

	$('#menu-help-plockomrade').click(function() {
		console.log('<mdui-list-item #menu-help-plockomrade> clicked');
		changeContent('#content-help-plockomrade', '#menu-help-plockomrade');
	});

	// DIALOG EVENTS
	// <mdui-dialog #dialog-about>

	$('#button-close-about').click(function() {
		console.log('<mdui-button #button-close-about> clicked');
		$('mdui-dialog').removeAttr('open');
	});

	// FORM EVENTS
	//

	// 1. Artikelbenämning och produkt
	// -------------------------------

	// mdui-text-field #text-artikelbenamning gains focus or being cleared
	$('#text-artikelbenamning').on('focus clear', function() {
		console.log('<mdui-text-field #text-artikelbenamning> focus/clear')
		var random = Math.floor(Math.random()*helper_artikelbenamning_array.length);
		$('#text-artikelbenamning').attr('helper', 'Exempel: ' + helper_artikelbenamning_array[random]);
	});

	// mdui-text-field #text-artikelbenamning loses focus
	$('#text-artikelbenamning').on('blur', function() {
		console.log('<mdui-text-field #text-artikelbenamning> blur')
		$('#text-artikelbenamning').attr('helper', helper_artikelbenamning);
	});

	// mdui-button #button-fler-produkter clicked
	$('#button-fler-produkter').click(function() {
		console.log('<mdui-button #button-fler-produkter> clicked');
		$('#div-fler-produkter').hide();
		$('#text-standardprodukt').attr('label', 'Standardprodukt');
		$('#text-standardprodukt').attr('helper', 'Endast standardprodukt visas i sökresultat');
		$('.standardprodukt').addClass('xl3');
		$('.extraprodukt').show();
	});

	// 2. Leverantör

	// mdui-checkbox #checkbox-ht changes
	$('#checkbox-ht').on('change', function() {
		console.log('<mdui-checkbox #checkbox-ht> changed');
		if ($('#checkbox-ht').prop("checked")) {
			// on
			$('#ejht-pris').addClass('hidden');
			$('#ejht-garanti').addClass('hidden');
			$('#ejht-isokod').addClass('hidden');
			$('#text-pris').val('').attr('disabled', true);
			$('#text-garanti').val('').attr('disabled', true);
			$('#text-isokod').val('').attr('disabled', true);
		} else {
			// off
			$('#text-pris').attr('disabled', false);
			$('#text-garanti').attr('disabled', false);
			$('#text-isokod').attr('disabled', false);
			$('#ejht-pris').removeClass('hidden');
			$('#ejht-garanti').removeClass('hidden');
			$('#ejht-isokod').removeClass('hidden');
		}
	});

	// 3. Ekonomi

	// mdui-select #select-artikelansvar changes
	$('#select-artikelansvar').on('change', function() {
		console.log('<mdui-select #select-artikelansvar> changed');
		artikelansvar = this.value;

		// reset everything

		setSelect('artikeltyp', 'enabled', '', helper_artikeltyp);
		$('#artikeltyp-menu-item-r').attr('disabled', false); // re-enable option 'R' (Reservdel)

		// disableSelectDebiteringsform();
		setSelect('debiteringsform', 'disabled', '', helper_debiteringsform)

		setSwitch('inventarium','disabled','off',helper_inventarium_off);
		setRadio('avskrivningstid','disabled','',helper_avskrivningstid_off);
		setSwitch('individartikel','disabled','off',helper_individartikel);
		setSwitch('serienummer','disabled','off',helper_serienummer);
		setSwitch('haraldrigkomp','disabled','off',helper_haraldrigkomp);
		setSwitch('wskomp','disabled','off',helper_wskomp);

		switch (artikelansvar) {
			case 'L':
				// Region eller kommun
				$('#select-huvudlager').val('200');
			break;
			case 'R':
				// Retursortiment
				$('#artikeltyp-menu-item-r').attr('disabled', true); // disable option 'R' (Reservdel)
				$('#select-huvudlager').val('200');
			break;
			case 'E':
				// Egenansvar
				$('#artikeltyp-menu-item-r').attr('disabled', true); // disable option 'R' (Reservdel)
				$('#select-huvudlager').val('200');
			break;
			case 'S':
				// Syncentralen
				$('#select-team').val('40');
				$('#select-huvudlager').val('400');
			break;
		}
		console.log(' * artikelansvar = "' + artikelansvar + '"');
	});

	// mdui-select #select-artikeltyp changes
	$('#select-artikeltyp').on('change', function() {
		console.log('<mdui-select #select-artikeltyp> changed');
		artikeltyp = this.value;
		console.log('Artikeltyp = ' + artikeltyp );

		// reset
		// disableSelectDebiteringsform();
		$('#debiteringsform-menu-item-m').attr('disabled', false); // re-enable option 'M' (månadshyra)
		$('#debiteringsform-menu-item-a').attr('disabled', false); // re-enable option 'A' (köp)
		setSelect('debiteringsform', 'disabled', '', helper_debiteringsform);

		setSwitch('inventarium','disabled','off',helper_inventarium_off);
		setRadio('avskrivningstid','disabled','',helper_avskrivningstid_off);
		setSwitch('individartikel','disabled','off',helper_individartikel);
		setSwitch('serienummer','disabled','off',helper_serienummer);
		setSwitch('haraldrigkomp','disabled','off',helper_haraldrigkomp);
		setSwitch('wskomp','disabled','off',helper_wskomp);

		disableTextReturtagningsinformation();

		// disableSwitchKvalitetskontroll();
		setSwitch('kk','disabled','off',helper_kk_off);
		// disableTextKvalitetskontroll();
		setTextField('kkb','disabled','',helper_kkb);

		switch (artikeltyp) {
			case 'H':
				// $('#select-artikeltyp').attr('helper', helper_artikeltyp_h);
				setSelect('artikeltyp', 'enabled', 'H', helper_artikeltyp_h);

				// enableSelectDebiteringsform();
				setSelect('debiteringsform', 'enabled', '', helper_debiteringsform);

				setSwitch('individartikel','disabled','off',helper_individartikel_off);
				setSwitch('kk','enabled','off',helper_kk_off);

				if (artikelansvar == 'R' || artikelansvar == 'E') {
					$('#debiteringsform-menu-item-m').attr('disabled', true); // disable option 'M' (Månadshyra)
					$('#select-debiteringsform').val('A'); // select option 'A' (Köp)
				}
			break;
			case 'T':
				// $('#select-artikeltyp').attr('helper', helper_artikeltyp_t);
				setSelect('artikeltyp', 'enabled', 'T', helper_artikeltyp_t);

				// enableSelectDebiteringsform();
				setSelect('debiteringsform', 'enabled', '', helper_debiteringsform);

				setSwitch('wskomp','enabled','on',helper_wskomp_on);
				if (artikelansvar == 'R' || artikelansvar == 'E') {
					$('#debiteringsform-menu-item-m').attr('disabled', true); // disable option 'M' (Månadshyra)
					$('#select-debiteringsform').val('A'); // select option 'A' (Köp)
				}
			break;
			case 'R':
				// $('#select-artikeltyp').attr('helper', helper_artikeltyp_r);
				setSelect('artikeltyp', 'enabled', 'R', helper_artikeltyp_r);
				setSelect('debiteringsform', 'enabled', '', helper_debiteringsform_a);
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
		setSwitch('inventarium','disabled','off',helper_inventarium_off);
		setRadio('avskrivningstid','disabled','',helper_avskrivningstid_off);
		setSwitch('serienummer','disabled','off',helper_serienummer);
		setSwitch('haraldrigkomp','disabled','off',helper_haraldrigkomp);
		setSwitch('dtm','enabled','off',helper_haraldrigkomp);
		disableServiceOchUnderhall();
		switch (debiteringsform) {
			case 'M':
				$('#select-debiteringsform').attr('helper', helper_debiteringsform_m);

				if ((artikelansvar == 'L' || artikelansvar == 'S') && artikeltyp == 'H') {
					setSwitch('inventarium','enabled','on',helper_inventarium_on);
					setRadio('avskrivningstid','enabled','',helper_avskrivningstid_on);
					setSwitch('individartikel','enabled','on',helper_individartikel_on);
					setSwitch('serienummer','enabled','on',helper_serienummer_on);
					setSwitch('haraldrigkomp','enabled','off',helper_haraldrigkomp_off);
					setSwitch('dtm','enabled','off',helper_dtm_off);
					enableServiceOchUnderhall();
					$('#servicegrad-menu-item-44').attr('disabled', true); // disable option '44'
				}
				if ((artikelansvar == 'L' || artikelansvar == 'S') && artikeltyp == 'T') {
					$('#select-servicegrad').val('44').attr('disabled', false).attr('readonly', true); // reset and enable
				}
			break;
			case 'A':
				$('#select-debiteringsform').attr('helper', helper_debiteringsform_a);
				if (artikeltyp == 'H') {
					setSwitch('individartikel','enabled','off',helper_individartikel_off);

				}
			break;
		}
	});

	// mdui-switch #switch-inventarium changes
	$('#switch-inventarium').on('change', function() {
		console.log('<mdui-switch #switch-inventarium> changed');
		inventarium = (this.checked === true) ? "Ja" : "Nej";
		switch (inventarium) {
			case 'Ja':
				// $('#label-inventarium .switch-helper').html(helper_inventarium_on);
				setSwitch('inventarium','enabled','on',helper_inventarium_on);
			break;
			case 'Nej':
				if (artikeltyp == 'H' && debiteringsform == 'M') {
					mdui.alert({
						closeOnEsc: true,
						closeOnOverlayClick: true,
						confirmText: "Jag förstår",
						description: "Ett huvudhjälpmedel för uthyrning måste vara klassat som individartikel och inventarium",
						headline: "Ej tillåtet"
					});
					// $('#switch-inventarium').attr('checked', true); // re-checked
					// inventarium = 'Ja';
					setSwitch('inventarium','enabled','on',helper_inventarium_on);
				} else {
					// $('#label-inventarium .switch-helper').html(helper_inventarium_off);
					setSwitch('inventarium','enabled','off',helper_inventarium_off);
				}
			break;
		}
		// console.log('Inventarium = ' + inventarium );
	});

	// mdui-select #raio-avskrivningstid changes
	$('#radio-avskrivningstid').on('change', function() {
		console.log('<mdui-radio #radio-avskrivningstid> changed');
		avskrivningstid = this.value;
		console.log(' * avskrivningstid: ' + avskrivningstid );
	});

	// 5. Individinställningar

	// mdui-switch #switch-individartikel changes
	$('#switch-individartikel').on('change', function() {
		console.log('<mdui-switch #switch-individartikel> changed');
		individartikel = (this.checked === true) ? 'Ja' : 'Nej';
		// console.log('Individartikel = ' + individartikel);
		switch (individartikel) {
			case 'Ja':
				// $('#label-individartikel .switch-helper').html(helper_individartikel_on);
				setSwitch('individartikel','enabled','on',helper_individartikel_on);
				setSwitch('serienummer','enabled','on',helper_serienummer_on);
				setSwitch('haraldrigkomp','enabled','off',helper_haraldrigkomp_off);
				setSwitch('dtm','enabled','off',helper_dtm_off);
			break;
			case 'Nej':
				if (artikeltyp == 'H' && debiteringsform == 'M') {
					mdui.alert({
						closeOnEsc: true,
						closeOnOverlayClick: true,
						confirmText: "Jag förstår",
						description: "Ett huvudhjälpmedel för uthyrning måste vara klassat som individartikel och inventarium",
						headline: "Ej tillåtet"
					});
					// $('#switch-individartikel').attr('checked', true); // re-checked
					// $('#label-individartikel .switch-helper').html(helper_individartikel_on);
					// individartikel = 'Ja';
					setSwitch('individartikel','enabled','on',helper_individartikel_on);
				} else {
					// $('#label-individartikel .switch-helper').html(helper_individartikel_off);
					setSwitch('individartikel','enabled','off',helper_individartikel_off);
					setSwitch('serienummer','disabled','off',helper_serienummer);
					setSwitch('haraldrigkomp','disabled','off',helper_haraldrigkomp);
				}
			break;
		}
	});

	// mdui-switch #switch-serienummer changes
	$('#switch-serienummer').on('change', function() {
		console.log('<mdui-switch #switch-serienummer> changed');
		serienummer = (this.checked === true) ? 'Ja' : 'Nej';
		// console.log('Serienummer obligatoriskt = ' + serienummer);
		switch (serienummer) {
			case 'Ja':
				// $('#label-serienummer .switch-helper').html(helper_serienummer_on);
				setSwitch('serienummer','enabled','on',helper_serienummer_on);
			break;
			case 'Nej':
				// $('#label-serienummer .switch-helper').html(helper_serienummer_off);
				mdui.alert({
					closeOnEsc: true,
					closeOnOverlayClick: true,
					confirmText: "Jag förstår",
					description: "Avmarkera denna inställning endast om du med säkerhet vet att hjälpmedlet saknar serienummer.",
					headline: "Varning!"
				});
				setSwitch('serienummer','enabled','off',helper_serienummer_off);
			break;
		}
	});

	// mdui-switch #switch-haraldrigkomp changes
	$('#switch-haraldrigkomp').on('change', function() {
		console.log('<mdui-switch #switch-haraldrigkomp> changed');
		if ($('#switch-haraldrigkomp').prop("checked")) {
			// on
			mdui.alert({
				closeOnEsc: true,
				closeOnOverlayClick: true,
				confirmText: "Jag förstår",
				description: "Markera denna inställning endast om du med säkerhet vet att hjälpmedlet aldrig ska ha tillbehör kopplade som komponenter i Sesam.",
				headline: "Varning!"
			});
			setSwitch('haraldrigkomp','enabled','on',helper_haraldrigkomp_on);
		} else {
			// off
			setSwitch('haraldrigkomp','enabled','off',helper_haraldrigkomp_off);
		}
	});

	// 5. Visma webSesam

	// mdui-switch #switch-wspub changes
	$('#switch-wspub').on('change', function() {
		console.log('<mdui-switch #switch-wspub> changed');
		if ($('#switch-wspub').prop("checked")) {
			// on
			if (artikeltyp == 'R') {
				mdui.alert({
					closeOnEsc: true,
					closeOnOverlayClick: true,
					confirmText: "Jag förstår",
					description: "Reservdelar används internt av DHC-personal för reparationer och underhåll. Reservdelar bör inte publiceras i Visma webSesam.",
					headline: "Observera!"
				});
			}
			setSwitch('wspub','enabled','on',helper_wspub_on);
			setTextField('wsinfo', 'enabled', '', helper_wsinfo);
		} else {
			// off
			setSwitch('wspub','enabled','off',helper_wspub_off);
			$('#text-wsinfo').val('').attr('disabled', true); // clear and disable
		}
	});

	// mdui-switch #switch-wsbb changes
	$('#switch-wsbb').on('change', function() {
		console.log('<mdui-switch #switch-wsbb> changed');
		if ($('#switch-wsbb').prop("checked")) {
			// on
			setSwitch('wsbb','enabled','on',helper_wsbb_on);
		} else {
			// off
			setSwitch('wsbb','enabled','off',helper_wsbb_off);
		}
	});

	// mdui-switch #switch-wssort changes
	$('#switch-wssort').on('change', function() {
		console.log('<mdui-switch #switch-wssort> changed');
		if ($('#switch-wssort').prop("checked")) {
			// on
			setSwitch('wssort','enabled','on',helper_wssort_on);
		} else {
			// off
			setSwitch('wssort','enabled','off',helper_wssort_off);
		}
	});

	// mdui-switch #switch-wskomp changes
	$('#switch-wskomp').on('change', function() {
		console.log('<mdui-switch #switch-wskomp> changed');
		if ($('#switch-wskomp').prop("checked")) {
			// on
			setSwitch('wskomp','enabled','on',helper_wskomp_on);
		} else {
			// off
			setSwitch('wskomp','enabled','off',helper_wskomp_off);
		}
	});

	// 6. Informationstexter
	// no events

	// 7. Ansvarigt team

	// mdui-select #select-team changes
	$('#select-team').on('change', function() {
		console.log('<mdui-select #select-team> changed');
		team = this.value;
		console.log('Team: ' + team );
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

	// 8. Lagerhållning

	// mdui-select #select-huvudlager changes
	$('#select-huvudlager').on('change', function() {
		console.log('<mdui-select #select-huvudlager> changed');
		huvudlager = this.value;
		console.log('Huvudlager: ' + huvudlager );
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
		console.log(' * inkopshantering: ' + inkopshantering );
		switch( inkopshantering) {
		case 'Kundorder':
			setSelect('inkopshantering', 'enabled', 'Kundorder', helper_inkopshantering_k);
			disableSliderForbrukning();
		break;
		case 'Nettobehov':
			setSelect('inkopshantering', 'enabled', 'Nettobehov', helper_inkopshantering_n);
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
			forbrukning_msg += '500 eller mer. 10 per vecka eller mer.';
			slider.labelFormatter = (value) => `${value}`;
		} else {
			forbrukning_msg += forbrukning + '. Ungefär ' + veckobehov + ' per vecka.';
			slider.labelFormatter = (value) => `${value}`;
		}
		if (forbrukning == 500) {
			$('#slider-msg').html(forbrukning_msg + ' Vänligen skriv en kommentar och förtydliga det stora behovet.');
		} else {
			$('#slider-msg').html(forbrukning_msg);
		}
	});

	// 9. Hantering vid ankomst

	// mdui-switch #switch-kvalitetskontroll changes
	$('#switch-kk').on('change', function() {
		console.log('<mdui-switch #switch-kk> changed');
		if ($('#switch-kk').prop("checked")) {
			mdui.alert({
				closeOnEsc: true,
				closeOnOverlayClick: true,
				confirmText: "Jag förstår",
				description: "När en artikel har kvalitetskontroll i Sesam görs inleveransen i två steg. Först registreras godsmottagning i Sesam av lagerpersonalen. Därefter kontrolleras artikeln, oftast av ansvarig tekniker. Efter genomförd kontroll registreras kvalitetskontrollen i Sesam. När detta är klart blir artikeln tillgänglig och leverantörsfakturan kan betalas. Det är viktigt att kvalitetskontrollen utförs skyndsamt.",
				headline: "Kvalitetskontroll i Sesam"
			});
			setSwitch('kk', 'enabled', 'on', helper_kk_on);
			setTextField('kkb', 'enabled', placeholder_kkb, helper_kkb);
		} else {
			setSwitch('kk', 'enabled', 'off', helper_kk_off);
			setTextField('kkb', 'disabled', '', helper_kkb);
		}
	});

	$('#button-reset-form-warning').click(function() {
		console.log('<mdui-button #button-reset-form-warning> clicked');
		$('#dialog-reset-warning').attr('open', true);
	});

	$('#button-reset-form').click(function() {
		console.log('<mdui-button #button-reset-form> clicked');
		setURLParam('theme', theme);
		setURLParam('reload', 1);
		location.reload();
	});

	$('.button-close-dialog').click(function() {
		console.log('.button-close-dialog clicked');
		$('mdui-dialog').removeAttr('open');
	});

	// 10. Service and underhåll

	// mdui-switch #switch-dtm changes
	$('#switch-dtm').on('change', function() {
		console.log('<mdui-switch #switch-dtm> changed');
		if ($('#switch-dtm').prop("checked")) {
			// on
			setSwitch('dtm','enabled','on',helper_dtm_on);
		} else {
			// off
			setSwitch('dtm','enabled','off',helper_dtm_off);
		}
	});

	$('#button-dialog-copy-artikeldata').click(function() {
		console.log('<mdui-button #button-dialog-copy-artikeldata> clicked');

		if ( validate_input == 'Yes' ) {
			console.log('Input validation enabled');

			// validate input
			for (const el of $('[required]')) {
				if (!el.reportValidity()) {
					// https://www.mdui.org/en/docs/2/functions/snackbar
					mdui.snackbar({ message: 'En obligatorisk uppgift saknas' });
					return;
				}
			}
		} else {
			console.log('Input validation disabled');
			mdui.snackbar({ message: 'Kontroll av obligatoriska uppgifter inaktiverat' });
		}

		createArtikeldata();

		navigator.clipboard.writeText(artikeldata);

		$('#dialog-copy-artikeldata').attr('open', true);
	});

	/* Visa artikeldata */
	$('#button-dialog-artikeldata').click(function() {
		console.log('<mdui-button #button-dialog-artikeldata> clicked');
		$('#dialog-artikeldata').attr('open', true);
	});

	/* XXXXX Kopiera artikeldata*/
//	$('#button-copy-artikeldata').click(function() {
//		console.log('<mdui-button #button-copy-artikeldata> clicked');
//		navigator.clipboard.writeText(artikeldata);
//		mdui.snackbar({ message: 'Artikeluppgifterna har kopierats och kan klistras in med CTRL+V' });
//	});

	$('.button-back-to-form').click(function() {
		console.log('<mdui-button .button-back-to-form> clicked');
		changeContent('#content-formular', '#menu-formular');
	});

});

$(document).ready(function() {
	"use strict";
	console.debug('Loading events.js');

	// TOP APP BAR EVENTS
	// <mdui-top-app-bar #top-app-bar>

	// Open navigation drawer
	$('#button-open-menu').click(function() {
		console.debug('<mdui-button-icon #button-open-menu> clicked');
		$('#navigation-drawer').attr('open', true);
	});

	// <mdui-button #button-theme-menu> hover
	$('#button-theme-menu').hover(function() {
		if ($('html').hasClass('mdui-theme-light')) {
			$(this).attr('icon', 'light_mode');
		} else {
			$(this).attr('icon', 'dark_mode');
		}
	}, function() {
		if ($('html').hasClass('mdui-theme-light')) {
			$(this).attr('icon', 'light_mode--outlined');
		} else {
			$(this).attr('icon', 'dark_mode--outlined');
		}
	});

	// Instantly close tooltip when menus opens
	$('#button-theme-menu, #button-palette-menu').click(function() {
		$('mdui-tooltip').attr('open', false);
	});

	$('mdui-button-icon[icon="palette--outlined"]').hover(function() {
		$(this).attr('icon', 'palette');
	}, function() {
		$(this).attr('icon', 'palette--outlined');
	});

	$('mdui-button-icon[icon="info--outlined"]').hover(function() {
		$(this).attr('icon', 'info');
	}, function() {
		$(this).attr('icon', 'info--outlined');
	});

	$('.theme-item').click(function() {
		console.debug('<mdui-menu-item .theme-item> clicked');
		let theme = $(this).attr('value');
		console.info('selected theme: ' + theme);
		$('#dropdown-theme').removeAttr('open');
		$('html').removeClass('mdui-theme-light mdui-theme-dark');
		if (theme == 'light' || theme == 'dark') {
			setCookie('theme', theme, 365);
			setTheme(theme);
		} else {
			setCookie('theme', 'system', 365);
			setSystemTheme();
		}
	});

	$('.palette-item').click(function() {
		console.info('<mdui-menu-item .palette-item> clicked');
		let palette = $(this).attr('value');
		console.info('selected palette: ' + palette);
		$('#dropdown-palette').removeAttr('open');
		$('html').removeClass('blue purple amber green');
		$('html').addClass(palette);
		setCookie('palette', palette, 365);
	});

	// Open "about" dialog
	$('#button-about').click(function() {
		console.debug('<mdui-button-icon #button-about> clicked');
		$('#dialog-about').attr('open', true);
	});

	// Dev activation
	$('#activate-dev').click(function() {
		console.debug('Dev mode activated');
		dev = "Yes";
		$('#activate-dev').css('opacity','1');
		$('.dev').removeClass('hidden');

		$('#viewport').show();
		$('#viewport-size').html( 'Viewport size: ' + $(window).width() + 'x' + $(window).height() );
		$(window).resize(function() {
			$('#viewport-size').html( 'Viewport size: ' + $(window).width() + 'x' + $(window).height() );
		});
	});

	// NAVIGATION DRAWER EVENTS
	// <mdui-navigation-drawer id="navigation-drawer">

	// Close navigation drawer
	$('#button-close-menu').click(function() {
		console.debug('<mdui-button-icon #button-close-menu> clicked');
		$('#navigation-drawer').removeAttr('open');
	});

	// Change icon of opened mdui-collapse-item
	$('mdui-collapse-item').on('open', function() {
		$(this).children('mdui-list-item').children('mdui-icon').attr('name', 'keyboard_arrow_up');
	});

	// Change icon of closed mdui-collapse-item
	$('mdui-collapse-item').on('close', function() {
		$(this).children('mdui-list-item').children('mdui-icon').attr('name', 'keyboard_arrow_down');
	});

	$('#list-item-formular').click(function() {
		console.debug('<mdui-list-item #list-item-formular> clicked');
		$('mdui-list-item').removeAttr('active');
		$(this).attr('active','');
		$('#navigation-drawer').removeAttr('open');
		if ($('#content-formular').css('display') == 'none') {
			$('.content-container').fadeOut().promise().done(function() { /* hide all content */
				$('#content-formular').fadeIn();
			});
		}
	});

	$('mdui-list-item.include').click(function() {
		console.debug('<mdui-list-item .include> clicked');
		let include = $(this).attr('data-href');
		$('mdui-list-item').removeAttr('active');
		$(this).attr('active','');
		$('#navigation-drawer').removeAttr('open');
		$('.content-container').fadeOut().promise().done(function() { /* hide all content */
			console.debug('Loading "' + include + '" into #inc-dynamic');
			$('#inc-dynamic').load(include, function(response, status, xhr) {
				if (status == "error") {
					$('#inc-dynamic').html('<h1>' + xhr.status + ' ' + xhr.statusText
						+ '</h1><p>Error loading "' + include + '": ' + response + '</p>');
				}
			}).promise().done(function () {
				$('#content-dynamic').fadeIn();
			});
		});
	});

	// DIALOG EVENTS
	// <mdui-dialog #dialog-about>

	$('#button-close-about').click(function() {
		console.debug('<mdui-button #button-close-about> clicked');
		$('mdui-dialog').removeAttr('open');
	});

	// FORM EVENTS
	//

	// Prevent form submission
	$('#form-formular').on('submit', function(event) {
		console.debug('Form submission prevented');
		event.preventDefault();
	});

	// Prevent 'enter' keypress in text inputs
	$('mdui-text-field').on('keydown', function(event) {
		if (event.keyCode === 13) {
			console.debug('Enter keypress ignored. Adding newline character to text field.');
			event.preventDefault();
			var s = $(this).val();
			$(this).val(s + "\n");
		}
	});

	// 1. Artikelbenämning och produkter

	// mdui-text-field #text-artikelbenamning gains focus or being cleared
	$('#text-artikelbenamning').on('focus clear', function() {
		console.debug('<mdui-text-field #text-artikelbenamning> focus/clear')
		var random = Math.floor(Math.random()*helper_artikelbenamning_array.length);
		$('#text-artikelbenamning').attr('helper', 'Exempel: ' + helper_artikelbenamning_array[random]);
	});

	// mdui-text-field #text-artikelbenamning loses focus
	$('#text-artikelbenamning').on('blur', function() {
		console.debug('<mdui-text-field #text-artikelbenamning> blur')
		$('#text-artikelbenamning').attr('helper', helper_artikelbenamning);
	});

	// mdui-button #button-fler-produkter clicked
	$('#button-fler-produkter').click(function() {
		console.debug('<mdui-button #button-fler-produkter> clicked');
		$('#div-fler-produkter').hide();
		$('#text-standardprodukt').attr('label', 'Standardprodukt');
		$('#text-standardprodukt').attr('helper', 'Endast standardprodukt visas i sökresultat');
		$('.standardprodukt').addClass('xl3');
		$('.extraprodukt').show();
	});

	// 2. Leverantör

	// mdui-checkbox #checkbox-ht changes
	$('#checkbox-ht').on('change', function() {
		console.debug('<mdui-checkbox #checkbox-ht> changed');
		let oval = ht;
		let nval = ((this.checked === true) ? "Ja" : "Nej");
		if (oval !== nval) {
			ht = nval;
			console.info('ht: "' + oval + '" => "' + ht + '"');
		}
		switch (ht) {
			case 'Ja':
				// Finns i Hjälpmedelstjänsten - dölj manuella uppgifter
				hideManualPrice();
			break;
			case 'Nej':
				// Saknas i Hjälpmedelstjänsten
				if (vf == 'Ja') {
					// Men finns hos Varuförsörjningen - dölj manuella uppgifter
					hideManualPrice();
				} else {
					// Och saknas hos Varuförsörjningen - visa manuella uppgifter
					showManualPrice();
				}
			break;
		}
	});

	// mdui-checkbox #checkbox-vf changes
	$('#checkbox-vf').on('change', function() {
		console.debug('<mdui-checkbox #checkbox-vf> changed');
		let oval = vf;
		let nval = ((this.checked === true) ? "Ja" : "Nej");
		if (oval !== nval) {
			vf = nval;
			console.info('vf: "' + oval + '" => "' + vf + '"');
		}
		switch (vf) {
			case 'Ja':
				// Finns hos Varuförsörjningen - dölj manuella uppgifter
				hideManualPrice();
			break;
			case 'Nej':
				// Saknas hos Varuförsörjningen
				if (ht == 'Ja') {
					// Men finns i Hjälpmedelstjänsten - dölj manuella uppgifter
					hideManualPrice();
				} else {
					// Och saknas i Hjälpmedelstjänsten - visa manuella uppgifter
					showManualPrice();
				}
			break;
		}
	});

	// 3. Ansvarigt team

	// mdui-select #select-team changes
	$('#select-team').on('change', function() {
		console.debug('<mdui-select #select-team> changed');
		let oval = team;
		let nval = this.value;
		if (oval !== nval) {
			team = nval;
			console.info('team: "' + oval + '" => "' + team + '"');
		}

		// Reset artikelansvar
		$('#artikelansvar-L').removeAttr('disabled'); // enable option 'L' (Reigion eller kommun)
		$('#artikelansvar-R').removeAttr('disabled'); // enable option 'R' (Retursortiment)
		$('#artikelansvar-E').removeAttr('disabled'); // enable option 'E' (Egenansvar)
		$('#artikelansvar-S').removeAttr('disabled'); // enable option 'S' (Syncentralen)
		setSelect('artikelansvar', 'enabled', '', '');

		// Reset huvudlager
		$('#huvudlager-200').removeAttr('disabled'); // enable option '400' (Syncentralen)
		$('#huvudlager-400').removeAttr('disabled'); // enable option '400' (Syncentralen)
		$('#huvudlager-688').removeAttr('disabled'); // enable option '688' (LOGFAB)
		// setSelect('huvudlager', 'enabled', '', '');

		switch (team) {
			case '02':
				avd = "R";
				avdelning = "Rörelse";
				$('#artikelansvar-S').attr('disabled', true); // disable option 'S' (Syncentralen)
				$('#huvudlager-400').attr('disabled', true); // disable option '400' (Syncentralen)
				$('#huvudlager-688').attr('disabled', true); // disable option '688' (LOGFAB)
				setSelect('huvudlager', 'enabled', '200', '');
				setTextField('iki', 'enabled', 'Exempel: ' + placeholder_iki_02, helper_iki);
			break;
			case '03':
				avd = "R";
				avdelning = "Rörelse";
				$('#artikelansvar-S').attr('disabled', true); // disable option 'S' (Syncentralen)
				$('#huvudlager-400').attr('disabled', true); // disable option '400' (Syncentralen)
				$('#huvudlager-688').attr('disabled', true); // disable option '688' (LOGFAB)
				setSelect('huvudlager', 'enabled', '200', '');
				setTextField('iki', 'enabled', 'Exempel: ' + placeholder_iki_03, helper_iki);
			break;
			case '05':
				avd = "K";
				avdelning = "KLOK";
				$('#artikelansvar-S').attr('disabled', true); // disable option 'S' (Syncentralen)
				$('#huvudlager-400').attr('disabled', true); // disable option '400' (Syncentralen)
				$('#huvudlager-688').attr('disabled', true); // disable option '688' (LOGFAB)
				setSelect('huvudlager', 'enabled', '200', '');
				setTextField('iki', 'enabled', 'Exempel: ' + placeholder_iki_05, helper_iki);
			break;
			case '07':
				avd = "PMB";
				avdelning = "PMB";
				$('#artikelansvar-S').attr('disabled', true); // disable option 'S' (Syncentralen)
				$('#huvudlager-400').attr('disabled', true); // disable option '400' (Syncentralen)
				$('#huvudlager-688').attr('disabled', true); // disable option '688' (LOGFAB)
				setSelect('huvudlager', 'enabled', '200', '');
				setTextField('iki', 'enabled', 'Exempel: ' + placeholder_iki_07, helper_iki);
			break;
			case '08':
				avd = "R";
				avdelning = "Rörelse";
				$('#artikelansvar-S').attr('disabled', true); // disable option 'S' (Syncentralen)
				$('#huvudlager-400').attr('disabled', true); // disable option '400' (Syncentralen)
				$('#huvudlager-688').attr('disabled', true); // disable option '688' (LOGFAB)
				setSelect('huvudlager', 'enabled', '200', '');
				setTextField('iki', 'enabled', 'Exempel: ' + placeholder_iki_08, helper_iki);
			break;
			case '09':
				avd = "R";
				avdelning = "Rörelse";
				$('#artikelansvar-S').attr('disabled', true); // disable option 'S' (Syncentralen)
				$('#huvudlager-400').attr('disabled', true); // disable option '400' (Syncentralen)
				setSelect('huvudlager', 'enabled', '200', '');
				setTextField('iki', 'enabled', 'Exempel: ' + placeholder_iki_09, helper_iki);
			break;
			case '10':
				avd = "R";
				avdelning = "Rörelse";
				$('#artikelansvar-S').attr('disabled', true); // disable option 'S' (Syncentralen)
				$('#huvudlager-400').attr('disabled', true); // disable option '400' (Syncentralen)
				$('#huvudlager-688').attr('disabled', true); // disable option '688' (LOGFAB)
				setSelect('huvudlager', 'enabled', '200', '');
				setTextField('iki', 'enabled', 'Exempel: ' + placeholder_iki_10, helper_iki);
			break;
			case '11':
				avd = "R";
				avdelning = "Rörelse";
				$('#artikelansvar-S').attr('disabled', true); // disable option 'S' (Syncentralen)
				$('#huvudlager-400').attr('disabled', true); // disable option '400' (Syncentralen)
				$('#huvudlager-688').attr('disabled', true); // disable option '688' (LOGFAB)
				setSelect('huvudlager', 'enabled', '200', '');
				setTextField('iki', 'enabled', 'Exempel: ' + placeholder_iki_11, helper_iki);
			break;
			case '40':
				avd = "S";
				avdelning = "Syncentralen";
				$('#artikelansvar-L').attr('disabled', true); // disable option 'L' (Reigion eller kommun)
				$('#artikelansvar-R').attr('disabled', true); // disable option 'R' (Retursortiment)
				$('#artikelansvar-E').attr('disabled', true); // disable option 'E' (Egenansvar)
				setSelect('artikelansvar', 'enabled', 'S', '')
				$('#huvudlager-688').attr('disabled', true); // disable option '688' (LOGFAB)
				setSelect('huvudlager', 'enabled', '400', '');
				setTextField('iki', 'enabled', 'Exempel: ' + placeholder_iki, helper_iki);
			break;
			default:
				avd = "";
				avdelning = "";
		}
		console.info('avd = "' + avd + '"');
		console.info('avdelning = "' + avdelning + '"');
	});

	// 4. Ekonomi

	// mdui-select #select-artikelansvar changes
	$('#select-artikelansvar').on('change', function() {
		console.debug('<mdui-select #select-artikelansvar> changed');
		let oval = artikelansvar;
		let nval = this.value;
		if (oval !== nval) {
			artikelansvar = nval;
			console.info('artikelansvar: "' + oval + '" => "' + artikelansvar + '"');
		}

		// reset everything

		setSelect('artikeltyp', 'enabled', '', helper_artikeltyp);
		$('#artikeltyp-menu-item-r').attr('disabled', false); // re-enable option 'R' (Reservdel)
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
			break;
			case 'R':
				// Retursortiment
				function alertConfirmed() {
					$('#artikeltyp-menu-item-r').attr('disabled', true); // disable option 'R' (Reservdel)
				}
				mdui.alert({
					closeOnEsc: false,
					closeOnOverlayClick: false,
					confirmText: "Jag förstår",
					description: "Artiklar som ingår i retursortimentet säljs till ett rabatterat pris. Kunden förväntas returnera hjälpmedlet när behovet upphör. Nya och rekonditionerade exemplar förekommer. Service och underhåll utförs inte hos kund, i stället ska ett nytt hjälpmedel beställas. Endast frekventa hjälpmedel bör klassas som retursortiment.",
					headline: "Retursortiment",
					onConfirm: () => alertConfirmed(),
				});
			break;
			case 'E':
				// Egenansvar
				$('#artikeltyp-menu-item-r').attr('disabled', true); // disable option 'R' (Reservdel)
			break;
			case 'S':
				// Syncentralen
			break;
		}
	});

	// mdui-select #select-artikeltyp changes
	$('#select-artikeltyp').on('change', function() {
		console.debug('<mdui-select #select-artikeltyp> changed');
		let oval = artikeltyp;
		let nval = this.value;
		if (oval !== nval) {
			artikeltyp = nval;
			console.info('artikeltyp: "' + oval + '" => "' + artikeltyp + '"');
		}

		// reset

		// $('#debiteringsform-menu-item-m').attr('disabled', false); // re-enable option 'M' (månadshyra)
		// $('#debiteringsform-menu-item-a').attr('disabled', false); // re-enable option 'A' (köp)
		// setSelect('debiteringsform', 'disabled', '', helper_debiteringsform);

		setSwitch('inventarium', 'disabled', 'off', helper_inventarium_off);
		setRadio('avskrivningstid', 'disabled', '', helper_avskrivningstid_off);

		setSwitch('individartikel', 'disabled', 'off', helper_individartikel);
		setSwitch('serienummer', 'disabled', 'off', helper_serienummer);
		setSwitch('haraldrigkomp', 'disabled', 'off', helper_haraldrigkomp);
		setSwitch('dm', 'disabled', 'off', helper_dm);

		setSwitch('wspub', 'enabled', 'off', helper_wspub_off);
		setSwitch('wssort', 'disabled', 'off', helper_wssort);
		setSwitch('wsbb', 'disabled', 'off', helper_wsbb_off);
		setSwitch('wskomp','disabled', 'off', helper_wskomp);
		setTextField('wsinfo', 'disabled', '', helper_wsinfo);

		setSwitch('kk', 'disabled', 'off', helper_kk_off);
		setTextField('kkb', 'disabled', '', helper_kkb);

		setTextField('iri', 'disabled', '', helper_iri_off);

		switch (artikeltyp) {
			case 'H':
				$('#select-artikeltyp').attr('helper', helper_artikeltyp_h);
				setSwitch('kk', 'enabled', 'off', helper_kk_off);
				setTextField('iri', 'enabled', 'Exempel: ' + placeholder_iri, helper_iri_on);
				if (artikelansvar == 'R' || artikelansvar == 'E') {
					$('#debiteringsform-menu-item-m').attr('disabled', true); // disable option 'M' (Månadshyra)
					setSelect('debiteringsform', 'enabled', 'A', helper_debiteringsform_a);
				} else {
					$('#debiteringsform-menu-item-m').attr('disabled', false); // re-enable option 'M' (månadshyra)
					setSelect('debiteringsform', 'enabled', '', helper_debiteringsform);
				}
			break;
			case 'T':
				$('#select-artikeltyp').attr('helper', helper_artikeltyp_t);
				setSwitch('wskomp', 'disabled', 'off', helper_wskomp_off);

				if (artikelansvar == 'R' || artikelansvar == 'E') {
					$('#debiteringsform-menu-item-m').attr('disabled', true); // disable option 'M' (Månadshyra)
					setSelect('debiteringsform', 'enabled', 'A', helper_debiteringsform_a);
				} else {
					$('#debiteringsform-menu-item-m').attr('disabled', false); // re-enable option 'M' (månadshyra)
					setSelect('debiteringsform', 'enabled', '', helper_debiteringsform);
				}
			break;
			case 'R':
				$('#select-artikeltyp').attr('helper', helper_artikeltyp_r);
				$('#debiteringsform-menu-item-m').attr('disabled', true); // disable option 'M' (månadshyra)
				setSelect('debiteringsform', 'enabled', 'A', helper_debiteringsform_a);
			break;
		}
	});

	// mdui-select #select-debiteringsform changes
	$('#select-debiteringsform').on('change', function() {
		console.debug('<mdui-select #select-debiteringsform> changed');
		let oval = debiteringsform;
		let nval = this.value;
		if (oval !== nval) {
			debiteringsform = nval;
			console.info('debiteringsform: "' + oval + '" => "' + debiteringsform + '"');
		}

		setSwitch('inventarium','disabled','off',helper_inventarium_off);
		setRadio('avskrivningstid','disabled','',helper_avskrivningstid_off);
		setSwitch('serienummer','disabled','off',helper_serienummer);
		setSwitch('haraldrigkomp','disabled','off',helper_haraldrigkomp);
		setSwitch('dm', 'disabled', 'off', helper_dm);
		setSelect('servicegrad', 'disabled', '', '');
		setSelect('besiktningsintervall', 'disabled', '', '');
		setSelect('fuintervall', 'disabled', '', '');
		$('#text-iri').val('');

		switch (debiteringsform) {
			case 'M':
				$('#select-debiteringsform').attr('helper', helper_debiteringsform_m);

				if ((artikelansvar == 'L' || artikelansvar == 'S') && artikeltyp == 'H') {
					setSwitch('inventarium','enabled','on',helper_inventarium_on);
					setRadio('avskrivningstid','enabled','',helper_avskrivningstid_on);
					setSwitch('individartikel','enabled','on',helper_individartikel_on);
					setSwitch('serienummer','enabled','on',helper_serienummer_on);
					setSwitch('haraldrigkomp','enabled','off',helper_haraldrigkomp_off);
					$('#sg-00, #sg-10, #sg-11, #sg-12, #sg-13, #sg-20, #sg-30, #sg-33').removeAttr('disabled');
					$('#sg-44').attr('disabled', true);
					setSelect('servicegrad', 'enabled', '', '');
					setSelect('besiktningsintervall', 'enabled', '', '');
					setSelect('fuintervall', 'enabled', '', '');
				}
				if ((artikelansvar == 'L' || artikelansvar == 'S') && artikeltyp == 'T') {
					$('#sg-00, #sg-10, #sg-11, #sg-12, #sg-13, #sg-20, #sg-30, #sg-33').attr('disabled', true);
					$('#sg-44').removeAttr('disabled');
					setSelect('servicegrad', 'enabled', '44', '');
				}

				if (artikelansvar == 'L' && artikeltyp == 'H' && team == '05') {
					setTextField('iri', 'enabled', 'Exempel: ' + placeholder_iri_05, helper_iri_on);
					$('#text-iri').val(placeholder_iri_05);
				}
				if (artikelansvar == 'L' && artikeltyp == 'H' && team == '07') {
					setSwitch('dm', 'enabled', 'off', helper_dm_off);
					setTextField('iri', 'enabled', 'Exempel: ' + placeholder_iri_07, helper_iri_on);
					$('#text-iri').val(placeholder_iri_07);
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
		console.debug('<mdui-switch #switch-inventarium> changed');
		let oval = inventarium;
		let nval = ((this.checked === true) ? "Ja" : "Nej");
		if (oval !== nval) {
			inventarium = nval;
			console.info('inventarium: "' + oval + '" => "' + inventarium + '"');
		}
		switch (inventarium) {
			case 'Ja':
				// setSwitch('inventarium','enabled','on',helper_inventarium_on);
				$('#switch-inventarium').attr('helper', helper_inventarium_on);
			break;
			case 'Nej':
				if (artikeltyp == 'H' && debiteringsform == 'M') {
					function alertConfirmed() {
						// Re-enable switch
						setSwitch('inventarium', 'enabled', 'on', helper_inventarium_on);
					}
					// Not allowed
					mdui.alert({
						closeOnEsc: false,
						closeOnOverlayClick: false,
						confirmText: "Jag förstår",
						description: "Ett huvudhjälpmedel för uthyrning måste vara klassat som individartikel och inventarium",
						headline: "Ej tillåtet",
						onConfirm: () => alertConfirmed(),
					});
				} else {
					$('#switch-inventarium').attr('helper', helper_inventarium_off);
				}
			break;
		}
	});

	// mdui-select #raio-avskrivningstid changes
	$('#radio-avskrivningstid').on('change', function() {
		console.debug('<mdui-radio #radio-avskrivningstid> changed');
		let oval = avskrivningstid;
		let nval = this.value;
		if (oval !== nval) {
			avskrivningstid = nval;
			console.info('avskrivningstid: "' + oval + '" => "' + avskrivningstid + '"');
		}
	});

	// 5. Individinställningar

	// mdui-switch #switch-individartikel changes
	$('#switch-individartikel').on('change', function() {
		console.debug('<mdui-switch #switch-individartikel> changed');
		let oval = individartikel;
		let nval = ((this.checked === true) ? "Ja" : "Nej");
		if (oval !== nval) {
			individartikel = nval;
			console.info('individartikel: "' + oval + '" => "' + individartikel + '"');
		}
		switch (individartikel) {
			case 'Ja':
				// setSwitch('individartikel', 'enabled', 'on',helper_individartikel_on);
				$('#label-individartikel .switch-helper').html(helper_individartikel_on);
				setSwitch('serienummer', 'enabled', 'on', helper_serienummer_on);
				setSwitch('haraldrigkomp', 'enabled', 'off', helper_haraldrigkomp_off);
				if (team == '07') setSwitch('dm', 'enabled', 'off', helper_dm_off);
			break;
			case 'Nej':
				if (artikeltyp == 'H' && debiteringsform == 'M') {
					// Not allowed
					function alertConfirmed() {
						// Re-enable switch
						setSwitch('individartikel', 'enabled', 'on', helper_individartikel_on);
					}
					mdui.alert({
						closeOnEsc: false,
						closeOnOverlayClick: false,
						confirmText: "Jag förstår",
						description: "Ett huvudhjälpmedel för uthyrning måste vara klassat som individartikel och inventarium",
						headline: "Ej tillåtet",
						onConfirm: () => alertConfirmed(),
					});
				} else {
					// setSwitch('individartikel', 'enabled', 'off', helper_individartikel_off);
					$('#label-individartikel .switch-helper').html(helper_individartikel_off);
					setSwitch('serienummer', 'disabled', 'off', helper_serienummer);
					setSwitch('haraldrigkomp', 'disabled', 'off', helper_haraldrigkomp);
					setSwitch('dm', 'disabled', 'off', helper_dm);
				}
			break;
		}
	});

	// mdui-switch #switch-serienummer changes
	$('#switch-serienummer').on('change', function() {
		console.debug('<mdui-switch #switch-serienummer> changed');
		let oval = serienummer;
		let nval = ((this.checked === true) ? "Ja" : "Nej");
		if (oval !== nval) {
			serienummer = nval;
			console.info('serienummer: "' + oval + '" => "' + serienummer + '"');
		}
		switch (serienummer) {
			case 'Ja':
				// setSwitch('serienummer','enabled','on',helper_serienummer_on);
				$('#label-serienummer .switch-helper').html(helper_serienummer_on);
			break;
			case 'Nej':
				function alertConfirmed() {
					// setSwitch('serienummer','enabled','off',helper_serienummer_off);
					$('#label-serienummer .switch-helper').html(helper_serienummer_off);
				}
				mdui.alert({
					closeOnEsc: false,
					closeOnOverlayClick: false,
					confirmText: "Jag förstår",
					description: "Avmarkera denna inställning endast om du med säkerhet vet att hjälpmedlet saknar serienummer.",
					headline: "Varning!",
					onConfirm: () => alertConfirmed(),
				});
			break;
		}
	});

	// mdui-switch #switch-haraldrigkomp changes
	$('#switch-haraldrigkomp').on('change', function() {
		console.debug('<mdui-switch #switch-haraldrigkomp> changed');
		let oval = haraldrigkomp;
		let nval = ((this.checked === true) ? "Ja" : "Nej");
		if (oval !== nval) {
			haraldrigkomp = nval;
			console.info('haraldrigkomp: "' + oval + '" => "' + haraldrigkomp + '"');
		}
		switch (haraldrigkomp) {
			case 'Ja':
				function alertConfirmed() {
					$('#label-haraldrigkomp .switch-helper').html(helper_haraldrigkomp_on);
				}
				mdui.alert({
					closeOnEsc: false,
					closeOnOverlayClick: false,
					confirmText: "Jag förstår",
					description: "Markera denna inställning endast om du med säkerhet vet att hjälpmedlet aldrig ska ha tillbehör kopplade som komponenter i Sesam.",
					headline: "Varning!",
					onConfirm: () => alertConfirmed(),
				});
			break;
			case 'Nej':
				$('#label-haraldrigkomp .switch-helper').html(helper_haraldrigkomp_off);
			break;
		}
	});

	// mdui-switch #switch-dm changes
	$('#switch-dm').on('change', function() {
		console.debug('<mdui-switch #switch-dm> changed');
		let oval = dm;
		let nval = ((this.checked === true) ? "Ja" : "Nej");
		if (oval !== nval) {
			dm = nval;
			console.info('dm: "' + oval + '" => "' + dm + '"');
		}
		switch (dm) {
			case 'Ja':
				$('#label-dm .switch-helper').html(helper_dm_on);
			break;
			case 'Nej':
				$('#label-dm .switch-helper').html(helper_dm_off);
			break;
		}
	});

	// 6. Visma webSesam

	// mdui-switch #switch-wspub changes
	$('#switch-wspub').on('change', function() {
		console.debug('<mdui-switch #switch-wspub> changed');
		let oval = wspub;
		let nval = ((this.checked === true) ? "Ja" : "Nej");
		if (oval !== nval) {
			wspub = nval;
			console.info('wspub: "' + oval + '" => "' + wspub + '"');
		}
		switch (wspub) {
			case 'Ja':
				if (artikeltyp == 'R') {
					mdui.alert({
						closeOnEsc: false,
						closeOnOverlayClick: false,
						confirmText: "Jag förstår",
						description: "Reservdelar används i huvudsak internt för att laga och underhålla huvudhjälpmedel och tillbehör. Reservdelar bör inte publiceras i Visma webSesam.",
						headline: "Observera!",
					});
				}
				$('#label-wspub .switch-helper').html(helper_wspub_on);
				setSwitch('wssort', 'enabled', 'off', helper_wssort_off);
				setSwitch('wsbb', 'enabled', 'off', helper_wsbb_off);
				if (artikeltyp == 'T') {
					setSwitch('wskomp', 'enabled', 'off', helper_wskomp_off);
				} else {
					setSwitch('wskomp', 'disabled', 'off', helper_wskomp);
				}
				setTextField('wsinfo', 'enabled', '', helper_wsinfo);
			break;
			case 'Nej':
				$('#label-wspub .switch-helper').html(helper_wspub_off);
				setSwitch('wssort', 'disabled', 'off', helper_wssort);
				setSwitch('wsbb', 'disabled', 'off', helper_wsbb_off);
				if (artikeltyp == 'T') {
					setSwitch('wskomp', 'disabled', 'off', helper_wskomp_off);
				} else {
					setSwitch('wskomp', 'disabled', 'off', helper_wskomp);
				}
				setTextField('wsinfo', 'disabled', '', helper_wsinfo);
			break;
		}
	});

	// mdui-switch #switch-wssort changes
	$('#switch-wssort').on('change', function() {
		console.debug('<mdui-switch #switch-wssort> changed');
		let oval = wssort;
		let nval = ((this.checked === true) ? "Ja" : "Nej");
		if (oval !== nval) {
			wssort = nval;
			console.info('wssort: "' + oval + '" => "' + wssort + '"');
		}
		switch (wssort) {
			case 'Ja':
				$('#label-wssort .switch-helper').html(helper_wssort_on);
			break;
			case 'Nej':
				$('#label-wssort .switch-helper').html(helper_wssort_off);
			break;
		}
	});

	// mdui-switch #switch-wsbb changes
	$('#switch-wsbb').on('change', function() {
		console.debug('<mdui-switch #switch-wsbb> changed');
		let oval = wsbb;
		let nval = ((this.checked === true) ? "Ja" : "Nej");
		if (oval !== nval) {
			wsbb = nval;
			console.info('wsbb: "' + oval + '" => "' + wsbb + '"');
		}
		switch (wsbb) {
			case 'Ja':
				$('#label-wsbb .switch-helper').html(helper_wsbb_on);
			break;
			case 'Nej':
				$('#label-wsbb .switch-helper').html(helper_wsbb_off);
			break;
		}
	});

	// mdui-switch #switch-wskomp changes
	$('#switch-wskomp').on('change', function() {
		console.debug('<mdui-switch #switch-wskomp> changed');
		let oval = wskomp;
		let nval = ((this.checked === true) ? "Ja" : "Nej");
		if (oval !== nval) {
			wskomp = nval;
			console.info('wskomp: "' + oval + '" => "' + wskomp + '"');
		}
		switch (wskomp) {
			case 'Ja':
				$('#label-wskomp .switch-helper').html(helper_wskomp_on);
			break;
			case 'Nej':
				$('#label-wskomp .switch-helper').html(helper_wskomp_off);
			break;
		}
	});

	// 7. Lagerhållning

	// mdui-select #select-huvudlager changes
	$('#select-huvudlager').on('change', function() {
		console.debug('<mdui-select #select-huvudlager> changed');
		let oval = huvudlager;
		let nval = this.value;
		if (oval !== nval) {
			huvudlager = nval;
			console.info('huvudlager: "' + oval + '" => "' + huvudlager + '"');
		}
		switch(huvudlager) {
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
		console.debug('<mdui-select #select-inkopshantering> changed');
		let oval = inkopshantering;
		let nval = this.value;
		if (oval !== nval) {
			inkopshantering = nval;
			console.info('inkopshantering: "' + oval + '" => "' + inkopshantering + '"');
		}
		switch(inkopshantering) {
			case 'Kundorder':
				$('#select-inkopshantering').attr('helper', helper_inkopshantering_k);
				disableSliderForbrukning();
			break;
			case 'Nettobehov':
				$('#select-inkopshantering').attr('helper', helper_inkopshantering_n);
				enalbeSliderForbrukning();
			break;
		}
	});

	// mdui-slider #slider-forbrukning gains focus
	$('#slider-forbrukning').on('focus', function() {
		console.debug('<mdui-slider #slider-forbrukning> focus');
		if (this.value == 0) this.labelFormatter = (value) => `0-24`;
	});

	// mdui-slider #slider-forbrukning changes
	$('#slider-forbrukning').on('input', function() {
		let oval = forbrukning;
		let nval = this.value;
		if (oval !== nval) {
			forbrukning = nval;
			console.info('forbrukning: "' + oval + '" => "' + forbrukning + '"');
		}
		let veckobehov = Math.round(forbrukning/52);
		forbrukning_msg = 'Årsbehov ';
		if (forbrukning == 0) {
				forbrukning_msg += '0-24. Mindre än 0.5 per vecka.';
				this.labelFormatter = (value) => `0-24`;
		} else if (veckobehov < 1 ) {
				forbrukning_msg += forbrukning + '. Mindre än 1 per vecka.';
				this.labelFormatter = (value) => `${value}`;
		} else if (forbrukning == 500) {
				forbrukning_msg += '500 eller mer. 10 per vecka eller mer.';
				this.labelFormatter = (value) => `${value}`;
		} else {
				forbrukning_msg += forbrukning + '. Ungefär ' + veckobehov + ' per vecka.';
				this.labelFormatter = (value) => `${value}`;
		}
		$('#slider-msg').html(forbrukning_msg);
		if (forbrukning == 500) {
			mdui.alert({
				closeOnEsc: false,
				closeOnOverlayClick: false,
				confirmText: "Stäng",
				description: "Vänligen skriv en kommentar och förtydliga det stora behovet så att inköpsparametrarna kan ställas in på ett bra sätt.",
				headline: "Årsbehov 500 eller mer"
			});
		}
	});

	// 8. Hantering vid ankomst

	// mdui-switch #switch-kvalitetskontroll changes
	$('#switch-kk').on('change', function() {
		console.debug('<mdui-switch #switch-kk> changed');
		let oval = kk;
		let nval = ((this.checked === true) ? "Ja" : "Nej");
		if (oval !== nval) {
			kk = nval;
			console.info('kk: "' + oval + '" => "' + kk + '"');
		}
		switch (kk) {
			case 'Ja':
				function alertConfirmed() {
					$('#label-kk .switch-helper').html(helper_kk_on);
					setTextField('kkb', 'enabled', 'Exempel: ' + placeholder_kkb, helper_kkb);
				}
				mdui.alert({
					closeOnEsc: false,
					closeOnOverlayClick: false,
					confirmText: "Jag förstår",
					description: "När en artikel har kvalitetskontroll i Sesam görs inleveransen i två steg. Först registreras godsmottagning i Sesam av lagerpersonalen. Därefter kontrolleras artikeln, oftast av ansvarig tekniker. Efter genomförd kontroll registreras kvalitetskontrollen i Sesam. När detta är klart blir artikeln tillgänglig och leverantörsfakturan kan betalas. Det är viktigt att kvalitetskontrollen utförs skyndsamt.",
					headline: "Kvalitetskontroll i Sesam",
					onConfirm: () => alertConfirmed(),
				});
			break;
			case 'Nej':
				$('#label-kk .switch-helper').html(helper_kk_off);
				setTextField('kkb', 'disabled', '', helper_kkb);
			break;
		}
	});

	// 9. Service och underhåll

	// mdui-select #select-servicegrad changes
	$('#select-servicegrad').on('change', function() {
		console.debug('<mdui-select #select-servicegrad> changed');
		let oval = servicegrad;
		let nval = this.value;
		if (oval !== nval) {
			servicegrad = nval;
			console.info('servicegrad: "' + oval + '" => "' + servicegrad + '"');
		}
	});

	// mdui-select #select-besiktningsintervall changes
	$('#select-besiktningsintervall').on('change', function() {
		console.debug('<mdui-select #select-besiktningsintervall> changed');
		let oval = besiktningsintervall;
		let nval = this.value;
		if (oval !== nval) {
			besiktningsintervall = nval;
			console.info('besiktningsintervall: "' + oval + '" => "' + besiktningsintervall + '"');
		}
	});

	// mdui-select #select-fuintervall changes
	$('#select-fuintervall').on('change', function() {
		console.debug('<mdui-select #select-fuintervall> changed');
		let oval = fuintervall;
		let nval = this.value;
		if (oval !== nval) {
			fuintervall = nval;
			console.info('fuintervall: "' + oval + '" => "' + fuintervall + '"');
		}
	});

	$('#button-reset-form-warning').click(function() {
		console.debug('<mdui-button #button-reset-form-warning> clicked');
		$('#dialog-reset-warning').attr('open', true);
	});

	$('#button-reset-form').click(function() {
		console.debug('<mdui-button #button-reset-form> clicked');
		/*
		setURLParam('theme', theme);
		setURLParam('reload', 1);
		location.reload();
		*/
		$('.content-container').fadeOut(); /* hide all content */
		$('#form-formular').trigger('reset');
		formInit();
		$('#content-formular').delay(400).fadeIn();

		mdui.snackbar({ message: 'Formuläret är rensat' });
	});

	$('.button-close-dialog').click(function() {
		console.debug('.button-close-dialog clicked');
		$('mdui-dialog').removeAttr('open');
	});

	$('#button-dialog-copy-artikeldata').click(function() {
		console.debug('<mdui-button #button-dialog-copy-artikeldata> clicked');
		if ( validate_input == 'Yes' ) {
			console.info('Input validation enabled');

			// validate input
			for (const el of $('[required]')) {
				if (!el.reportValidity()) {
					// https://www.mdui.org/en/docs/2/functions/snackbar
					mdui.snackbar({ message: 'En viktig uppgift saknas' });
					return;
				}
			}
		} else {
			console.info('Input validation disabled');
			mdui.snackbar({ message: 'Kontroll av obligatoriska uppgifter inaktiverat' });
		}
		createArtikeldata();
		navigator.clipboard.writeText(artikeldata);
		$('#dialog-copy-artikeldata').attr('open', true);
	});

	$('.button-back-to-form').click(function() {
		console.debug('<mdui-button .button-back-to-form> clicked');
		$('mdui-list-item').removeAttr('active');
		$('#list-item-formular').attr('active','');
		$('.content-container').fadeOut().promise().done(function() { /* hide all content */
			$('#content-formular').fadeIn();
		});
	});

});

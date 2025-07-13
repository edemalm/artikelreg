$(document).ready(function() {

	console.log('DOM ready');
	console.log('Loading form-events.js');

	// Kvalitetskontroll
	// mdui-switch #switch-kvalitetskontroll changes
	$('#switch-kvalitetskontroll').on('change', function() {
		console.log('mdui-switch #switch-kvalitetskontroll changed');
		if ($('#switch-kvalitetskontroll').prop("checked")) {
			// is checked
			$('#textarea-kvalitetskontrolltext').removeAttr('disabled');
		} else {
			// not checked
			$('#textarea-kvalitetskontrolltext').val('');
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

$(document).ready(function() {

	console.log('DOM ready');
	console.log('Loading form-events.js');

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

$(document).ready(function() {

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

	/* $('#form-artikeldata').submit(function(event) { */



	// mdui-button #button-show-artikeldata clicked
	$('#button-show-artikeldata').click(function() {
		$('#button-show-artikeldata').addClass('hidden');
		$('#div-artikeldata').removeClass('hidden');
	});


	$('#button-copy-div').click(function() {
		console.log('#button-copy-div clicked');
		// get text in div
		//let textToCopy = document.querySelector(".text-to-copy").innerHTML;
		//let tempElement = document.querySelector(".text-to-copy");

		const range = document.createRange();
		range.selectNode( document.querySelector(".text-to-copy") );
		// Copy the selected HTML content to the clipboard
		const selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		document.execCommand("copy");
		selection.removeAllRanges();
	
		mdui.snackbar({ message: 'Artikeluppgifterna (från div) har kopierats och kan klistras in med CTRL+V' });
	});



	$('#button-copy-artikeldata').click(function() {
		console.log('#button-copy-artikeldata clicked');
		// $('#textarea-artikeldata').selectText();
		// document.execCommand('copy');
		navigator.clipboard.writeText(artikeldata);
		mdui.snackbar({ message: 'Artikeluppgifterna har kopierats och kan klistras in med CTRL+V' });
	});


});

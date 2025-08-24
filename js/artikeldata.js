$(document).ready(function() {

	console.log('Loading artikeldata.js');

	// https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
	// https://jsfiddle.net/edelman/KcX6A/1506/
	/*
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
	*/

	/* $('#form-artikeldata').submit(function(event) { */





	/*
	$('#button-copy-div').click(function() {
		console.log('#button-copy-div clicked');
		const range = document.createRange();
		range.selectNode( document.querySelector("#content-to-copy") );
		const selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		document.execCommand("copy");
		selection.removeAllRanges();	
		mdui.snackbar({ message: 'Artikeluppgifterna (från div) har kopierats och kan klistras in med CTRL+V' });
	});
	*/



});

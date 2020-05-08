
Contact Form with simple Anti-Spam-Protection using ES6 (Vanilla JS), PHP, HTML5 & CSS3
Version 1.0 / May 2020 / get it @ GitHub: https://github.com/HannRuppert
Author: Hann Ruppert / https://github.com/HannRuppert

Description:
This is just my version for a contact form with simple spam protection:

 - The html form is initialised with a fake input field, wrong action path & disabled submit button
 - Basic client-side form validation happens in HTML
 - JavaScript hides the fake input field, adjusts target & activates submit when the user has moved the mouse or used the touchpad or pressed a key (humanDetected()).
 - The contact form will thus only work with JavaScript, so if JS is disabled in the Browser, a message that JS is required will be displayed to the user instead and the form will be hidden.
 - The PHP Script is a modification from Fredrik Jonsonn (thank you!) which was originally posted here: https://gist.github.com/frjo/23e45ec5e690d90f6bfcaca06873fd73
 - The JS uses the Browsers' session storage, lo reload the input in the form if an error occured...

There is an English and a German version (see subfolder for German version with all user outputs in German).


CONFIGURATION:

 - copy html, css, php and js files to your project
 - in the send.php file adjust the receiver address ($addr in line 6)
 - it should work!

OPTIONAL CONFIGURATION:

 - you could also adjust the messages that will be displayed to the user:
 - in contactform.html:
	- line 15: "no JS message"
	- line 18 onwards: the form labels and so on
	- lines 33 & 34: error & success messages
 - in contactform.js:
	- line 67: default "detailed" error message
	- line 81, 84, 87: specific "detailed" error messages

That's it! I hope you enjoy!



Contact Form with simple Anti-Spam-Protection using ES6 (Vanilla JS), PHP, HTML5 & CSS3
Version 1.0 / May 2020 / get it @ GitHub: https://github.com/HannRuppert
Author: Hann Ruppert / https://github.com/HannRuppert

Description:
This is just my version for a contact form with simple spam protection:

 - HTML init with a fake 'url' input field & disabled submit button
 - Basic client-side form validation happens in HTML, spam detection in JS, user input validation in PHP
 - JavaScript hides the fake input field & activates submit when the user has moved the mouse or used the touchpad or pressed a key (humanDetected()).
 - The contact form will thus only work with JavaScript, so if JS is disabled in the Browser, a message that JS is required will be displayed to the user instead and the form will be hidden.
 - Spinner from https://loading.io/css/
 - The PHP Script is a modification from Fredrik Jonsonn (thank you!) which was originally posted here: https://gist.github.com/frjo/23e45ec5e690d90f6bfcaca06873fd73
 - In this version the PHP script is called via a fetch request so that the form input will remain available for editing when an error occurs

There is an English (default) and a German version (see subfolder for German version with all user outputs in German).


CONFIGURATION:

 - copy all files to your project
 - in the send.php file adjust the receiver address ($addr in line 6)
 - it should work!

OPTIONAL CONFIGURATION:

 - you could also adjust the messages that will be displayed to the user:
 - @contactform.html:
	- line 16: "no JS message"
	- line 19 ff: the form labels and so on
	- lines 40 & 41: error & success messages
 - @contactform.js:
	- line 33: default "detailed" error message
	- line 94 ff: specific "detailed" error messages

That's it! I hope you enjoy!


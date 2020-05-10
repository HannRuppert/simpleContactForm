//
// Contact Form with simple Anti-Spam-Protection using ES6 (Vanilla JS), PHP, HTML5 & CSS3
// Version 1.0 / May 2020 / get it @ github: https://github.com/HannRuppert
// Author: Hann Ruppert / https://github.com/HannRuppert
//
// Description:
// This is just my version for a simple contact form with simple spam protection:
//  - The html form is initialised with a fake input field, wrong action path & disabled submit button
//  - Basic client-side form validation happens in HTML
//  - JavaScript hides the fake input field, adjusts target & activates submit when the user has moved the mouse or used the touchpad or pressed a key (humanDetected()).
//  - The contact form will thus only work with JavaScript, so if JS is disabled in the Browser, a message that JS is required will be displayed to the user instead and the form will be hidden.
//  - The PHP Script is a modification from Fredrik Jonsonn (thank you!) which was originally posted here: https://gist.github.com/frjo/23e45ec5e690d90f6bfcaca06873fd73
//  - The JS uses the Browsers' session storage, lo reload the input in the form if an error occured...

// THIS IS THE GERMAN VERSION (ALL OUTPUTS ARE IN GERMAN! :-)
// THERE IS ALSO AN INTERNATIONAL VERSION AVAILABLE (WITH ALL OUTPUTS IN ENGLISH :-)

// Variable declaration
const contactForm = document.querySelector('.contact-form');
const contactFormSubmit = contactForm.querySelector('.form-submit');
const errorText = document.querySelector('.submit-error');
const sentText = document.querySelector('.submit-success');
// Form inputs
const iName = contactForm.querySelector('#name');
const iMail = contactForm.querySelector('#email');
const iSubject = contactForm.querySelector('#subject');
const iMessage = contactForm.querySelector('#message');

// Display Contact Form, hide no JS info
contactForm.classList.remove('hidden');
document.querySelector('.noJSInfo').classList.add('hidden');

// Detect human - then remove fake input field & adjust target (Anti-Spam)
function humanDetected() {
  contactForm.querySelector('#url').classList.add('hidden');
  contactFormSubmit.removeAttribute('disabled');
}

// run humanDetected() on mousemove/ touchmove, keyuup
window.addEventListener('mousemove', humanDetected, { once: true });
window.addEventListener('keyup', humanDetected, { once: true });
window.addEventListener('touchmove', humanDetected, { once: true });

// handle submit button
function submitForm(e) {
  // check if fake-url-field is filled in by a bot
  if (document.querySelector('#url').value) {
    errorText.classList.remove('hidden');
    e.preventDefault();
    return;
  }
  contactForm.action = './send.php';
  // save inputs to session storage
  sessionStorage.setItem('contactFormName', iName.value);
  sessionStorage.setItem('contactFormMail', iMail.value);
  sessionStorage.setItem('contactFormSubject', iSubject.value);
  sessionStorage.setItem('contactFormMessage', iMessage.value);
}

contactForm.addEventListener('submit', submitForm);

// check for a status and message from browser address and display error or success message
let errmsg = 'Keine Angabe';
// read the status from the PHP script
let status = window.location.href.substring(
  window.location.href.indexOf('?') + 1
);

if (status.includes('&')) {
  // read the optional error message from the PHP script
  const err = window.location.href.substring(
    window.location.href.indexOf('&') + 1
  );
  status = status.substr(0, status.length - (err.length + 1));
  switch (err) {
    case '1':
      errmsg = 'Server Fehler (Emnpfänger Adresse)';
      break;
    case '2':
      errmsg = 'Server Fehler (no post request)';
      break;
    case '3':
      errmsg =
        'Eingegebene E-mail-Adresse ungültig (bitte überprüfe deine E-Mail-Adresse!)';
      break;
    default:
      break;
  }
}

// display error or success message
if (status === 'error') {
  errorText.classList.remove('hidden');
  errorText.innerHTML += `<br>(Fehlerbeschreibung: "${errmsg}")`;
  // populate fields from session storage in case of an error
  iName.value = sessionStorage.getItem('contactFormName');
  iMail.value = sessionStorage.getItem('contactFormMail');
  iSubject.value = sessionStorage.getItem('contactFormSubject');
  iMessage.value = sessionStorage.getItem('contactFormMessage');
}

if (status === 'submitted') {
  sentText.classList.remove('hidden');
  contactForm.classList.add('sent-success');
  contactForm.reset();
}

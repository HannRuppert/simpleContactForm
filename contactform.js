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

// THIS IS THE INTERNATIONAL VERSION (ALL OUTPUTS ARE IN ENGLISH! :-)
// THERE IS ALSO A GERMAN VERSION AVAILABLE (WITH ALL OUTPUTS IN GERMAN :-)

// wait function for handling send.php
const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

// Variable declaration
const contactForm = document.querySelector('.contact-form');
const contactFormSubmit = contactForm.querySelector('.form-submit');
const errorText = document.querySelector('.submit-error');
const sentText = document.querySelector('.submit-success');
const spinner = document.querySelector('.lds-ripple');
// Form inputs
const iName = contactForm.querySelector('#name');
const iMail = contactForm.querySelector('#email');
const iSubject = contactForm.querySelector('#subject');
const iMessage = contactForm.querySelector('#message');
// UI variables
let errmsg = 'Not specified';

// Display Contact Form, hide no JS info
contactForm.classList.remove('hidden');
document.querySelector('.noJSInfo').classList.add('hidden');

// Detect human - then remove fake input field & adjust target (Anti-Spam)
function humanDetected() {
  document.querySelector('#url').classList.add('hidden');
  contactFormSubmit.removeAttribute('disabled');
}

// run humanDetected() on mousemove/ touchmove, keyuup
window.addEventListener('mousemove', humanDetected, { once: true });
window.addEventListener('keyup', humanDetected, { once: true });
window.addEventListener('touchmove', humanDetected, { once: true });

// handle submit button
async function submitForm(e) {
  e.preventDefault();
  errorText.classList.add('hidden');
  sentText.classList.add('hidden');
  contactForm.classList.remove('sent-success');
  // check if fake-url-field is filled in by a bot
  if (document.querySelector('#url').value) {
    errorText.classList.remove('hidden');
    return;
  }
  // else continue to send data to send.php
  spinner.classList.remove('hidden');
  const formData = new FormData(e.currentTarget);
  const baseEndpoint = 'send.php';

  const response = await fetch(baseEndpoint, {
    method: 'POST',
    body: formData,
  }).catch(err => handleFetchError(err));

  const text = await response.text();
  if (text.includes('submitted')) {
    // sending Mail successful
    sentText.classList.remove('hidden');
    contactForm.classList.add('sent-success');
    contactForm.reset();
  } else {
    // sending error
    handleSendError(text);
  }
  await wait(500);
  spinner.classList.add('hidden');
}

function handleFetchError(err) {
  console.log('Fetch Error');
  console.log(err);
}

function handleSendError(err) {
  const errcode = err.substring(err.indexOf('&') + 1);
  switch (errcode) {
    case '1':
      errmsg = 'Server error (receiver adress)';
      break;
    case '2':
      errmsg = 'Server error (no direct access allowed)';
      break;
    case '3':
      errmsg = 'Server error (no post request)';
      break;
    case '4':
      errmsg = 'No valid user email adress (please check your email adress)';
      break;
    default:
      break;
  }
  errorText.classList.remove('hidden');
  errorText.innerHTML = `There has been an error sending your message. Please try again or contact us
  via phone.<br>(Error Message: "${errmsg}")`;
}

contactForm.addEventListener('submit', submitForm);

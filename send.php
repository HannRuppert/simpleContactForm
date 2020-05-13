<?php
// this PHP script has been taken from Fredrik Jonsson (thank you!) and slightly modified for JS fetch handling
// original file: https://gist.github.com/frjo/23e45ec5e690d90f6bfcaca06873fd73 

// receiver
$addr = 'YOUR RECEIVER ADRESS HERE';
// subject prefix
$prefix = 'contact form: ';

$error = false;
$errmsg = 0;
$success = false;

// Server-side validation
if ((bool) filter_var(trim($addr), FILTER_VALIDATE_EMAIL)) {
  // return path
  $to = $sender = trim($addr);
}
else {
  $error = true;
  $errmsg = 1; // Adress validation failed.
}

// Check that referer is local server.
if (!isset($_SERVER['HTTP_REFERER']) || (parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) != $_SERVER['SERVER_NAME'])) {
  exit('Direct access not permitted');
  $errmsg = 2; // Direct Access not allowed 
}

// Check that this is a post request
if ($_SERVER['REQUEST_METHOD'] != 'POST' || empty($_POST)) {
  $error = true;
  $errmsg = 3; // No post request
}

// Validate user e-mail address 
if ((bool) filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL)) {
  $email = trim($_POST['email']);
}
else {
  $error = true;
  $errmsg = 4; // No valid email adress
}

// If no error then send mail
if (!$error) {
  // Construct the mail with headers.
  $name = _contact_clean_str($_POST['name'], ENT_QUOTES, true, true);
  $prefix = _contact_clean_str($prefix, ENT_NOQUOTES, true, true);
  $subject = _contact_clean_str($_POST['subject'], ENT_NOQUOTES, true, true);
  $subject = "[$prefix] $subject";
  $message = _contact_clean_str($_POST['message'], ENT_NOQUOTES);
  $lines = explode("\n", $message);
  array_walk($lines, '_contact_ff_wrap');
  $message = implode("\n", $lines);
  $headers = [
    'From'                      => "$name <$email>",
    'Sender'                    => $sender,
    'Return-Path'               => $sender,
    'MIME-Version'              => '1.0',
    'Content-Type'              => 'text/plain; charset=UTF-8; format=flowed; delsp=yes',
    'Content-Transfer-Encoding' => '8Bit',
    'X-Mailer'                  => 'Hugo - Zen',
  ];
  $mime_headers = [];
  foreach ($headers as $key => $value) {
    $mime_headers[] = "$key: $value";
  }
  $mail_headers = join("\n", $mime_headers);

  // Send the mail, suppressing errors and setting Return-Path with the "-f" option.
  $success = @mail($to, $subject, $message, $mail_headers, '-f' . $sender);
}

$status = $success ? 'submitted' : 'error';

// Return to JS
if ($errmsg == 0) {
  echo('?' . $status);
} else {
  echo('?' . $status . '&' . $errmsg);
}
exit;

// required functions
function _contact_ff_wrap(&$line) {
  $line = wordwrap($line, 72, " \n");
}

function _contact_clean_str($str, $quotes, $strip = false, $encode = false) {
  if ($strip) {
    $str = strip_tags($str);
  }

  $str = htmlspecialchars(trim($str), $quotes, 'UTF-8');

  if ($encode && preg_match('/[^\x20-\x7E]/', $str)) {
    $str = '=?UTF-8?B?' . base64_encode($str) . '?=';
  }

  return $str;
}

?>
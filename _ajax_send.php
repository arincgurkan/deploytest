<?php

/**
 * Ajax Form Sending Scripts
 * Uses php local sendmail service
 */

/**
 * Disabling debug
 */
error_reporting(0);
ini_set('display_errors', 'off');

/**
 * List of all variables from web
 */
$forms = array(

	1	=>	array(

		'emails'	=>	array('orders@like-themes.com'),
		'subject'   =>  'New contact message from '.$_SERVER['SERVER_NAME'],
		'fields'    =>	array(

			array('field' => 'name', 'header' => 'Name:', 'required' => true),
			array('field' => 'email', 'header' => 'E-mail:', 'required' => true),
			array('field' => 'text', 'header' => 'Message:', 'required' => true),
		),
	),
	2	=>	array(

		'emails'	=>	array('orders@like-themes.com'),
		'subject'   =>  'New Order From '.$_SERVER['SERVER_NAME'],
		'fields'    =>	array(

			array('field' => 'from', 'header' => 'From:'),
			array('field' => 'to', 'header' => 'To:'),
			array('field' => 'phone', 'header' => 'Phone:', 'required' => true),
			array('field' => 'text', 'header' => 'Date:'),
			array('field' => 'type-value', 'header' => 'Car Type:', 'required' => true),
		),
	),


);

/* Checking form type and failing then no form */
$type = (int)($_POST['type']);
if (!isset($forms[$type])) {

	echo 'false';
	die();
}

/**
 * Filter
 */
$message = '';
foreach ($forms[$type]['fields'] as $field) {

	if ($field['required'] AND empty($_POST[$field['field']])) {

		echo 'false';
		die();
	}

	$message .= $field['header']." ".$_POST[$field['field']]."<br>";
}

/**
  *  If empty user email, sending from admin address. You can change this.
  */
if (!empty($_POST['email'])) {

	$from = $_POST['email'];
}
	else {

	$from = $forms[$type]['emails'][0];
}
	
$headers = "MIME-Version: 1.0" . "\r\n"; 
$headers .= "Content-type:text/html; charset=utf-8" . "\r\n"; 
$headers .= "From: <{$from}>" . "\r\n";

foreach ($forms[$type]['emails'] as $to) {

	$query = mail($to , $forms[$type]['subject'], $message , $headers);
}

/**
 * Answer will be visible to user
 */
if ($query) {

	echo "Message sent.";
}
	else {

	echo "Message sending error.";
}



<?php
// This requires that you have an account with MailChimp, and are able to obtain your API Key.
// http://kb.mailchimp.com/article/where-can-i-find-my-api-key/
$mailchimp_api_key = '';

// How can I find my List ID?
// http://kb.mailchimp.com/article/how-can-i-find-my-list-id/
$mailchimp_list_id ='';

if(filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
{
	//Write to file
	$file = 'emails.txt';
	$message = file_put_contents($file, $_POST['email'] . ';', FILE_APPEND | LOCK_EX);
	
	if ( !empty($mailchimp_api_key) || !empty($mailchimp_list_id) ) {
		require_once 'mailchimp/MCAPI.class.php';
		$api = new MCAPI( $mailchimp_api_key );
		$message = $api->listSubscribe( $mailchimp_list_id, $_POST['email'], '' );
	}

	if ($message==false) {
		echo 'There was a problem. Please try again.';
	} else {
		echo 'Thank you for subscribing.';
	}
}
else
{
	echo 'Your e-mail is not valid. Please try again.';  
}

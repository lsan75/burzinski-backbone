<?php


	if( 
	
		strlen($_POST['email']) > 0
		&&
		strlen($_POST['subject']) > 0
		&&
		strlen($_POST['message']) > 0
		
	) {

		$to      = 'contact@burzinski.fr';
	    $subject = stripslashes($_POST['subject']);
	    $message = stripslashes($_POST['message']);
	    $headers = 'From: ' . stripslashes($_POST['email']) . "\r\n" .
	    'Reply-To: '. stripslashes($_POST['email']);

	    if ( mail($to, $subject, $message, $headers) ) {
			echo 'Message sent. Talk to you soon !';	
		} else {
			echo 'Message not sent. Technical issue. Please retry.';
		}	

	} else {
	
		echo 'Message not sent. Invalid information entered.';
		
	}
	

?>
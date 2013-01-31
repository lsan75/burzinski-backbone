<?php
function catch_that_image() {
	global $post, $posts;
 	$first_img = '';
 	ob_start();
 	ob_end_clean();
 
 	$first_img = get_post_meta($post->ID,'image',true);
 
 	if(empty($first_img)){ //Defines a default image
 		$first_img = "http://www.burzinskimusic.com/wp-content/uploads/burzinski-real-logo.jpg";
 	}else{
 		$first_img = 'http://www.burzinskimusic.com/wp-content/uploads/'.$first_img;
 	}	
 	return $first_img;
}
?>
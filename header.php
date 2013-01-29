<!DOCTYPE html>

<!--[if lt IE 7 ]><html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="http://www.facebook.com/2008/fbml" class="ie6 ie ie67" lang="en"><![endif]-->
<!--[if IE 7 ]><html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="http://www.facebook.com/2008/fbml" class="ie7 ie ie67" lang="en"><![endif]-->
<!--[if IE 8 ]><html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="http://www.facebook.com/2008/fbml" class="ie8 ie" lang="en"><![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="http://www.facebook.com/2008/fbml" lang="en"><!--<![endif]-->

<head profile="http://gmpg.org/xfn/11>
	<title>Burzinski Music</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0" />
	<meta name="identifier-url" content="http://www.burzinskimusic.com">
	<meta name="category" content="Music, Artist">
	<meta name="copyright" content="burzinski 2011">
	<meta name="owner" content="burzinski">	
	<link rel="shortcut icon" href="/wp-content/themes/burzinski-backbone/img/favicon.gif" />
	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<link href="<?php bloginfo('home') ?>/wp-content/themes/burzinski-backbone/styles-ie.css" rel="stylesheet" type="text/css" />
	<![endif]-->	
		
	<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300, 400,700" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url') ?>">


	<link rel="alternate" type="application/rss+xml" href="<?php bloginfo('rss2_url') ?>" title="<?php printf( __( '%s latest posts', 'sandbox' ), wp_specialchars( get_bloginfo('name'), 1 ) ) ?>">
	<!--
	<link rel="alternate" type="application/rss+xml" href="<?php bloginfo('comments_rss2_url') ?>" title="<?php printf( __( '%s latest comments', 'sandbox' ), wp_specialchars( get_bloginfo('name'), 1 ) ) ?>">
	<link rel="pingback" href="<?php bloginfo('pingback_url') ?>">
	-->
	<?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); /* Threaded comments */?>
	<?php wp_head() /* For plugins */?>

	<meta property="og:type" content="article" />
	<meta property="og:title" content="Burzinski website" />
	<meta property="og:site_name" content="Burzinski" />
	<meta property="og:description" content="burzinski indie music, useless, untimely tales, alternative, post-punk, cold wave" />
	<meta property="og:image" content="http://www.burzinskimusic.com/wp-content/uploads/burzinski-real-logo.jpg" />

	<meta property="fb:admins" content="80233673887" />

</head>
<body>

	<?php
 		$cache_expire = 60*60*24*365;
 		header("Pragma: public");
 		header("Cache-Control: max-age=".$cache_expire);
 		header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$cache_expire) . ' GMT');
 	?>

	<div id="fb-root"></div>
	<script type="text/javascript">
	
  	window.fbAsyncInit = function() {
    	// init the FB JS SDK
    	FB.init({
      		appId      : '575453919134993', // App ID from the App Dashboard
      		status     : true, // check the login status upon init?
      		cookie     : true, // set sessions cookies to allow your server to access the session?
      		xfbml      : true  // parse XFBML tags on this page?
     	});

  	};
	
		
  	// Load the SDK's source Asynchronously
  	// Note that the debug version is being actively developed and might 
  	// contain some type checks that are overly strict. 
  	// Please report such bugs using the bugs tool.
  	(function(d, debug){
     	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     	if (d.getElementById(id)) {return;}
     	js = d.createElement('script'); js.id = id; js.async = true;
     	js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
     	ref.parentNode.insertBefore(js, ref);
   	}(document, /*debug*/ false));
	</script>

		<header>
	
			<hgroup>
				<h1><a href="/#" title=""><img src="<?php bloginfo('home') ?>/wp-content/themes/burzinski-backbone/img/burzinski-banner.jpg" alt="Burzinski music" width="960" height="200" /></a></h1>
			</hgroup>
	
			<nav class="menu" id="menu-content">
			
				<ul>
				
					<li><a href="/#!/category/blog" title="Blog" id="blog-menu">Blog</a></li><!--
					--><li><a href="/#!/page/biography" title="Bio" id="biography-menu">Bio</a></li><!--
					--><li><a href="/#!/category/music" title="Music" id="music-menu">Music</a></li><!--
					--><li><a href="/#!/category/videos" title="Videos" id="videos-menu">Videos</a></li><!--
					--><li><a href="/#!/category/photos" title="Photos" id="photos-menu">Photos</a></li><!--
					--><li><a href="/#!/page/contact" title="Contact" id="contact-menu">Contact</a></li>
				
				</ul>
				
			</nav>	
			
			<nav class="submenu" id="submenu">
			
				<aside>
					<form action="http://burzinskimusic.us1.list-manage.com/subscribe/post?u=aeb1f89f4753fd395eda3cb00&amp;id=f0e49fd03c" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate="">
						<label for="email">Subscribe :</label><!--
						--><input type="text" name="EMAIL" id="email" value="" class="required email" /><!--
						--><input type="submit" name="subscribe" id="ok" value="OK" />
					</form>
				</aside><!--
				
				--><div class="player" id="el-player">
						<a href="/#1" title="prev" class="player-prev">&nbsp;</a><!--
						--><a href="/#1" title="play" class="player-play">&nbsp;</a><!--
						--><a href="/#1" title="next" class="player-next">&nbsp;</a><!--
						--><span></span>
				</div>
			
			</nav>

			<div id="ajax-loader">&nbsp;</div>
	
		</header>
		


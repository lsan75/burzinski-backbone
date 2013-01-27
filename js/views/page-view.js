define([
		'jquery', 
		'backbone',
		'underscore', 
		'text!templates/article.tpl',
		'text!templates/socialbuttons.tpl',
		'text!templates/contact.tpl'], 
function($, Backbone, _, template, socialbuttons, contactform){
	var PageView = Backbone.View.extend({
		
		'initialize': function(options){
			_.bindAll(this, 'getPage', 'render', 'setContactForm');
			
			this.erreur = false;
			this.slug = options.slug;
		
		},
		
		'getPage': function(){
		
			var that = this;
			
			return $.ajax({ // get page
  				url: '/api/get_page?slug='+this.slug+'&custom_fields=image',
  				dataType: "json",
  				success: function(data) {
  				  			
  					if(data.status !=='error' ){ 					
						$.when(that.render(data.page)).done(function(){
							return true;
						});
					}
					
  				}
  				
  			});	
  			
		},
		
		'render': function(data){
						
  			var img = (data.custom_fields.image)?'/wp-content/uploads/'+data.custom_fields.image:'/wp-content/themes/burzinski-backbone/img/blank.gif';
    		var cnt = data.content;
    		var ttl = data.title;
    		var ids = data.slug+'-content';
			var ida = data.slug+'-id';	
			var url = '/#!/page/'+data.slug;

			_.metaFB({
				ttl: ttl,
				url: url,
				img: img
			});		


			var _json = {
				img: img,
				cnt: cnt,
				ttl: ttl,
				ids: ids,
				ida: ida,
				url: url
			};										
										  			
  			// main template
  			$('body header').after( _.template( template, { model: _json } ) );
  			
  			// social buttons
  			$('#'+ida).find('footer').append( _.template( socialbuttons, { model: _json }) );	
  			
  			// contact form
  			if(data.slug === 'contact'){
  				$('#'+ida).find('footer').before( _.template( contactform ) );
  				this.setContactForm();		
  			}
  			
			_(ida).refresh();
			
			return true;
		},
		
		'setContactForm': function(){
		
			$("#contact-form").validate({	

				rules: {
   					'contact-email': {
   		    			required: true,
   	    				email: true
	   	  			},
   			 		'contact-subject': "required",
   		  			'contact-message': "required"
   				},				
				messages: {
	   	 			'contact-email': {
						required: "Email required",
   		   				email: "Please enter a valid email"
   	 				},
	   	 			'contact-subject': {
   		   				required: "Subject required"
   	 				},
   	 				'contact-message': {
   	   					required: "Message required"
   	 				}
   	 			},	
   	 			errorClass: "invalid"
    			
  			});
			
			$("#contact-form").bind('submit', function(){
				if( $("#contact-form").valid() ) {
				
					$.post("/wp-content/themes/burzinski-backbone/send.php", 
						{ 
							email: $('#contact-email').val(), 
							subject: $('#contact-subject').val(),
							message: $('#contact-message').val()
						}
					).success(function(retour) {
						
						$('#sent').remove();
						$('<strong id="sent">'+retour+'</strong>').insertBefore('#contact-form p #contact-submit');				
					
					});
					
				}
				return false;
			
			});	
		
		
		}
		
	});
	
	return PageView;
});

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
			_.bindAll(this, 'render', 'setContactForm');
			
			this.slug = options.slug;
		
		},
		
		'render': function(dfd){

			var data = this.collection.where({slug: this.slug})[0];
			
			if(!data){
			
				return dfd.reject(); // not found
			
			}else{		

				var slug = data.get('slug');
				var	cnt = data.get('cnt');
				var	ttl = data.get('ttl');
				var	img = data.get('img');
	    		var ids = slug+'-content';
				var ida = slug+'-id';	
				var url = '/#!/page/'+slug;

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
			
				return dfd.resolve();
			
			}										

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

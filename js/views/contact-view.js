define([
		'jquery', 
		'backbone',
		'underscore', 
		'text!templates/contact.tpl'], 
function($, Backbone, _, template){
	var contactView = Backbone.View.extend({
		el: '#contact-content',
		initialize: function(){
			_.bindAll(this, 'getPage', 'render', 'setForm');
		
			this.getPage(); // load default page
		
		},
		
		'getPage': function(){
		
			var that = this;
			
			$.ajax({ // get bio page
  				url: '/api/get_page?slug=contact&custom_fields=image',
  				dataType: "json",
  				success: function(data){
  				
  					$.when(that.render(data)).done(function(){
  					
  						that.setForm();
  					
  					});
  					
  				}
  			});	
		},
		
		'render': function(data){
		
  			var img = (data.page.custom_fields.image)?'/wp-content/uploads/'+data.page.custom_fields.image:'/wp-content/themes/burzinski-backbone/img/blank.gif';
 			var cnt = data.page.content;
   			var ttl = data.page.title;
				
			var _json = {
				img: img,	
				cnt: cnt,
				ttl: ttl
			};
										
			this.template = _.template( template, { model: _json } );
  			$(this.el).append( this.template );
  							
  			$(this.el).promise().done(function() {
  				$(this).find('article').slice(-5).animate({
  					'opacity': '1'
  				}, 500);
  			});
			
			return true;		
		},
		
		'setForm': function(){
		
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
	
	return contactView;
});

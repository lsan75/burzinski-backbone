define(['jquery', 'backbone', 'underscore'], function($, Backbone, _){

	var PageModel = Backbone.Model.extend({
	});
	
	var PageCollection = Backbone.Collection.extend({
		model: PageModel,
		initialize: function(){

			var that = this;
				
			this.loaded = $.ajax({ // get page
  				url: '/api/get_page_index?custom_fields=image&include=slug,content,title,custom_fields',
  				dataType: "json",
  				success: function(data) {
  				  		  				  		
  				  	var i = 0;
  				  	var lng = data.pages.length;
  				  	
  				  	for ( ; i < lng ; i++){

  						that.add({
  							slug: data.pages[i].slug,
  							img: (data.pages[i].custom_fields.image)?'/wp-content/uploads/'+data.pages[i].custom_fields.image:'/wp-content/themes/burzinski-backbone/img/blank.gif',
    						cnt: data.pages[i].content,
    						ttl: data.pages[i].title
  						}); 
  				  	
  				  	}
  				  	
  				  	that.loaded.resolve;
  				}
  				
  			});			
			this.loaded.promise();

		}
	});
	
	return PageCollection;
});

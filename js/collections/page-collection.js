define(['jquery', 'backbone', 'underscore', 'datas'], function($, Backbone, _, datas){

	var PageModel = Backbone.Model.extend({
	});
	
	var PageCollection = Backbone.Collection.extend({
		model: PageModel,
		initialize: function(){

		//	var that = this;
		// console.log(dataJson['pages']);	
			
  				  	var i = 0;
  				  	var lng = dataJson['pages'].length;
  				  	for ( ; i < lng ; i++){

  						this.add({
  							slug:  dataJson['pages'][i]['post_name'],
  							img: ( dataJson['pages'][i]['image'])?'/wp-content/uploads/'+dataJson['pages'][i]['image']:'/wp-content/themes/burzinski-backbone/img/blank.gif',
    						cnt: dataJson['pages'][i]['post_content'],
    						ttl: dataJson['pages'][i]['post_title']
  						}); 
  				  	
  				  	}
  				  	
				
			/*	
			this.loaded = $.ajax({ // get page
  				url: '/api/get_page_index/?custom_fields=image&include=slug,content,title,custom_fields',
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
			*/
		}
	});
	
	return PageCollection;
});

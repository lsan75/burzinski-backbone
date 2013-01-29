define(['jquery', 'backbone', 'underscore'], function($, Backbone, _){

	var BlogModel = Backbone.Model.extend({
	});
	
	var BlogCollection = Backbone.Collection.extend({
		model: BlogModel,
		initialize: function(){

			var that = this;
									
			this.loaded = $.ajax({
  				url: '/api/get_recent_posts?count=99999&custom_fields=url,image&include=custom_fields,slug,content,title,date,categories',
  				dataType: "json",
  				success: function(data) {

  				  	var i = 0;
  				  	var lng = data.posts.length;
  				  	  				  	
  				  	for ( ; i < lng ; i++){

  						that.add({
  							slug: data.posts[i].slug,
							img: data.posts[i].custom_fields.image,
							url: data.posts[i].custom_fields.url,
							cnt: data.posts[i].content,
							ttl: data.posts[i].title,
							dte: data.posts[i].date,
							cat: data.posts[i].categories
  						}); 
  				  	
  				  	}
  				  	that.loaded.resolve;
  				}
  			});	
			
			this.loaded.promise();

		}
	});
	
	return BlogCollection;
});

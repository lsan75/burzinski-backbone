define(['jquery', 'backbone', 'underscore'], function($, Backbone, _){

	var PlayerModel = Backbone.Model.extend({});
	
	var PlayerCollection = Backbone.Collection.extend({
		model: PlayerModel,
		initialize: function(dummy, media){
		
			var that = this;

			this.loaded = $.ajax({ // load sampler set
		  		url: 'http://api.soundcloud.com/resolve.json?url=https://soundcloud.com/burzinski/sets/'+media+'&client_id=9a6dee35d2554511e23c08291d16aad8',
  				dataType: "jsonp",
  				success: function(data) {
  				  			
  					var i = 0;
  					var lng = data.tracks.length;
  					
  					for( ; i < lng ; i++ ){

  						that.add({
  							songid: data.tracks[i].id,
  							ttl: 	data.tracks[i].title
  						}); 
  						
  					}
  					that.loaded.resolve;
 				}
			});	
			this.loaded.promise();
		}
	});
	
	return PlayerCollection;
});

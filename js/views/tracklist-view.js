define([
		'jquery', 
		'backbone',
		'underscore', 
		'text!templates/tracklist.tpl',
		'collections/player-collection'], 
function($, Backbone, _, template, PlayerCollection){
	var TracklistView = Backbone.View.extend({
		tagName: 'ul',
		className: 'album',
		'initialize': function(options){
		
			_.bindAll(this, 'render', 'classTracklist');
			this.media = options.media;
			this.collection = new PlayerCollection;
			this.player = options.player;
		},

		events:{
			'click a': function(e) { this.classTracklist(e.target); }
		},

		'loadCollection': function(){
		
			var that = this;
			
			return $.ajax({ // load sampler set
		  		url: 'http://api.soundcloud.com/resolve.json?url=https://soundcloud.com/burzinski/sets/'+ this.media +'&client_id=9a6dee35d2554511e23c08291d16aad8',
  				dataType: "jsonp",
  				success: function(data) {
  				  				  			
  				  	var i = 0;
  				  	var lng = data.tracks.length;
  				  	
  				  	for( ; i < lng ; i++){			  				  				

  						that.collection.add({
  							songid: data.tracks[i].id,
  							ttl: 	data.tracks[i].title
  						}); 

  					}
  					
					$.when(that.render()).done(function(){
						return true;
					});	
 				}
			});	
			
		},
		
		'render': function(){
						
			this.template = _.template( template, {collection: this.collection.toJSON() } );	
			
			$(this.el).html(this.template);
			return true;
		},
		
		'classTracklist': function(obj){
				
			if( $(obj).hasClass('active') ){
				this.player.stopSong();
			}else{
				this.player.changeCollection(this.collection, $(obj).attr('data-songid'));
			}	
		
		}
		
	});
	
	return TracklistView;
});

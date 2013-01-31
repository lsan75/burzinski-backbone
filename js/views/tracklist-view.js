define([
		'jquery', 
		'backbone',
		'underscore', 
		'text!templates/tracklist.tpl'], 
function($, Backbone, _, template){
	var TracklistView = Backbone.View.extend({
		tagName: 'ul',
		className: 'album',
		'initialize': function(options){
		
			_.bindAll(this, 'render', 'classTracklist');
			this.player = options.player;

		},

		events:{
			'click a': function(e) { this.classTracklist(e.target); }
		},

		'render': function(dfdt){
						
			this.template = _.template( template, {collection: this.collection.toJSON() } );	
			
			$(this.el).html(this.template);
			return dfdt.resolve;
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

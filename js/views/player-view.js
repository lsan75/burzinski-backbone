define([
	'jquery', 
	'backbone',
	'underscore',
	'collections/player-collection',
	'text!templates/player.tpl'], 
function($, Backbone, _, PlayerCollection, playerTemplate){
	
	var PlayerView = Backbone.View.extend({
		el: '#el-player',
		'initialize': function(){
		
			_.bindAll(this, 'render', 'loadCollection', 'playSong', 'stopSong', 'nextSong', 'reloadTracklist');
			
			try{
				SC.initialize({client_id: "9a6dee35d2554511e23c08291d16aad8"});
			}
			catch(erreur){
			}
			
			this.soundcloud = false;		// soundcloud object	
			this.songPlayed = false;		// song play status

			this.playerCollection = new PlayerCollection; // default player
			this.loadCollection('sampler');

		},

		events: {
			'click a.player-play': 'playSong', 
			'click a.player-stop': 'stopSong', 
			'click a.player-next': function() { this.nextSong('next') }, 
			'click a.player-prev': function() { this.nextSong('prev') }
		},
		
		'loadCollection': function(slug){
		
			var that = this;	
			
			$.ajax({ // load sampler set
		  		url: 'http://api.soundcloud.com/resolve.json?url=https://soundcloud.com/burzinski/sets/'+ slug +'&client_id=9a6dee35d2554511e23c08291d16aad8',
  				dataType: "jsonp",
  				success: function(data) {
  				  				
  					var i = 0;
  					var lng = data.tracks.length
  					
  					for( ; i < lng ; i++ ){

  						that.playerCollection.add({
  							songid: data.tracks[i].id,
  							ttl: 	data.tracks[i].title
  						}); 
  						
  					}
  					
  					that.model = that.playerCollection.models[0];				
					that.render();

 				}
			});	
		
		},
		
		'changeCollection': function(collection, songid){ // play from tracklist
						
			if( Number(songid) !== this.model.get('songid'))
			{
				if(this.songPlayed){
					this.soundcloud.stop();
				}	
			
				var that = this;
				this.playerCollection = collection;
									
				this.model = this.playerCollection.where({songid: Number(songid)})[0];
			
				$.when(this.render()).done(function(){
					that.playSong();
				});
			}
		},
		
		'render': function(){
			
			var that = this;
			var span = $(this.el).find('span');
			
			span.animate({
  				'opacity': '0'
  			}, 200, function(){
				span.html( that.model.get('ttl') );
				span.animate({
  					'opacity': '1'
  				}, 200);
  			});
  			
			return true;
		},
		
		'playSong': function(){
						
			var that = this;
				
			try{	
								
				SC.stream('/tracks/'+this.model.get('songid'), 
				{
					onfinish: function() {
						that.nextSong('next');
					}
				},
				function(snd){

					that.soundcloud = snd;														
					that.soundcloud.play();
					that.songPlayed = true;		

					_.swapClass($(that.el).find('.player-play'), 'player-stop');
				
					that.reloadTracklist();

				});

			}
			catch(erreur){
				this.soundcloud = false;
			}
		},
		
		'reloadTracklist': function(){
			
			if(this.songPlayed){
				var songid = this.model.get('songid');
				$("section .album").find("a[data-songid!=" + songid + "]").removeClass('active');
				$("section .album").find("a[data-songid=" + songid + "]").addClass('active');	
			}
		},
		
		'stopSong': function(){

			if(this.soundcloud){
				this.soundcloud.stop();
				this.songPlayed = false;
				_.swapClass($(this.el).find('.player-stop'), 'player-play');
				
				$('.album a').removeClass('active');
	
			}
		
		},
				
		'nextSong': function(sens){
		
			var that = this;
				
			if(this.songPlayed){
				this.soundcloud.stop();
			}	
				
			var index = this.playerCollection.indexOf(this.model);			
			if(sens==='next'){
				this.model = this.playerCollection.at( (index < this.playerCollection.length-1)? index+1 : 0 );
			}else{
				this.model = this.playerCollection.at( (index > 0)? index-1 : this.playerCollection.length-1 );
			}	

			this.render();
			
			if(this.songPlayed){ 
				this.playSong(); 
			}	
		
		}			
				
	});
	
	return PlayerView;

});

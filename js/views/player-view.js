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
			var that = this;
		
			_.bindAll(this, 'render', 'playSong', 'stopSong', 'nextSong', 'reloadTracklist', 'changeCollection');
		
			
			try{
				SC.initialize({client_id: "9a6dee35d2554511e23c08291d16aad8"});
			}
			catch(erreur){
			}
			
			this.soundcloud = false;		// soundcloud object	
			this.songPlayed = false;		// song play status

			this.playerCollection = new PlayerCollection(null, 'sampler'); // default player
			$.when( this.playerCollection.loaded ).done(function(){
			  	that.model = that.playerCollection.models[0];		
				that.render();
			});

		},

		events: {
			'click a.player-play': 'playSong', 
			'click a.player-stop': 'stopSong', 
			'click a.player-next': function() { this.nextSong('next') }, 
			'click a.player-prev': function() { this.nextSong('prev') }
		},
				
		'changeCollection': function(collection, songid){ // play from tracklist

			if(this.songPlayed){
				this.soundcloud.stop();
			}	
			
			this.playerCollection = collection;
									
			this.model = this.playerCollection.where({songid: Number(songid)})[0];
			
			this.render();
			this.playSong();
				
		},
		
		'render': function(){
			
			var that = this;
			var span = $(this.el).find('span');

			try{	
				SC.stream('/tracks/'+that.model.get('songid'), 
					{
						onfinish: function() {
							that.nextSong('next');
						}
					},
					function(snd){
						that.soundcloud = snd;
					}
				);
			}
			catch(error){
				that.soundcloud = false;
				alert('soundcloud error ? reload ' +that.model.get('ttl'));			
			}
			
			span.animate({
  				'opacity': '0'
  			}, 200, function(){
				span.html( that.model.get('ttl') );
				span.animate({
  					'opacity': '1'
  				}, 200);
  			});
  			
		},
		
		'playSong': function(){
										
			if(this.soundcloud){

				this.soundcloud.play();
				this.songPlayed = true;		

				_.swapClass($(this.el).find('.player-play'), 'player-stop');
				
				this.reloadTracklist();
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

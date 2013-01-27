define([
		'jquery', 
		'backbone',
		'underscore', 
		'text!templates/socialbuttons.tpl',
		'text!templates/fbcomments.tpl',
		'text!templates/fbcommentsnb.tpl',
		'text!templates/article.tpl',
		'text!templates/videosarticle.tpl',
		'text!templates/list.tpl',
		'text!templates/videoslist.tpl',
		'views/gallery-view',
		'views/tracklist-view'], 
function($, Backbone, _, socialbuttons, fbcomments, fbcommentsnb, templateArticle, templateVideosArticle, templateList, templateVideosList, GalleryView, TracklistView){
	var PostView = Backbone.View.extend({
		'initialize': function(options){

			_.bindAll(	this,
						'getPage',
						'render'
			);
															
			this.type = options.category;
			this.erreur = false;
			this.slug = options.slug;
			this.player = options.player;
			this.parent = options.parent;
			
			
			
			// load template
			if(this.id === 'post'){
				this.templateFile = (this.type === 'videos') ? templateVideosArticle : templateArticle; 
			}else{
				this.templateFile = (this.type === 'videos') ? templateVideosList : templateList; 
			}
		},
		
		'getPage': function(){
								
			var that = this;
			$('#'+this.el.id).detach(); // empty former data
						
			return $.ajax({ // load one post
  				url: '/api/get_post?slug='+this.slug+'&custom_fields=url,image',
  				dataType: "json",
  				success: function(data) {

  					if(data.status !=='error' ){ 					
						$.when(that.render(data.post)).done(function(){
							return true;
						});
					}
					
  				}
  			});	
  			
		},
		
		'render': function(res){ // render single article

			var that = this;
			var ida = this.id+'-'+res.slug+'-id';
			var media = (res.custom_fields.url) ? res.custom_fields.url : '';
			
			// photo gallery or single photo
  			var img = '';
  			var isGallery = $.isArray(res.custom_fields.image) && res.custom_fields.image.length > 1;
  			
  			if(isGallery){ // photo gallery
  			
  				img = '/wp-content/uploads/'+res.custom_fields.image[0];
  				
  			} else { // image seule
  			
  				img = (res.custom_fields.image)?'/wp-content/uploads/'+res.custom_fields.image:'/wp-content/themes/burzinski-backbone/img/blank.gif';
    		
    		}
					
			_.metaFB({
				ttl: res.title,
				url: '/#!/'+this.type+'/post/'+res.slug,
				img: img
			});		
					
			var _json = {
				img: img,
				vid: media,
				cnt: res.content,
				ttl: res.title,
				url: '/#!/'+this.type+'/post/'+res.slug,
				dte: _(res.date).formatDate(),
				ids: this.el.id,
				ida: ida
			};
				
			// template article	
			this.template = _.template( this.templateFile, { model: _json } );
  			
  			if(this.id === 'post'){
  				$('body header').after( this.template );
			}else{
				$('#'+this.parent).append(this.template);
			}

  			// social buttons
  			$('#'+this.id+' footer').append( _.template( socialbuttons, { model: _json }) );	
			if(this.id === 'post'){
				$('#'+this.id+' footer .fb').after( _.template( fbcomments, { model: _json }) );
			}else{
				$('#'+this.id+' footer .fb').append( _.template( fbcommentsnb, { model: _json }) );
			}

			// add photo gallery 
			if(isGallery){
				var gallery = new GalleryView({'imgs': res.custom_fields.image});
				$.when( gallery.render() ).done(function(){
					$('#'+that.id+' footer').before(gallery.$el);
				});	
			}
  			
  						
			// add music player
			if( media && this.type === 'music'){ 
  				
  				var	tracklist = new TracklistView ({
  					'media': media, 
  					'player': this.player
  				});	
  				
  				$.when( tracklist.loadCollection() ).done(function(){
					$('#'+that.id+' hgroup').after( tracklist.$el );
					$('#'+that.id).promise().done(function(){ // set playing track in tracklist
							that.player.reloadTracklist();
					});
				});	
  			}

  			if(this.id === 'post'){
				_(ida).refresh();
			}else{
				_(this.el.id).refresh();
			}	
			
			return true;

		}
		
		
	});
	
	return PostView;
});

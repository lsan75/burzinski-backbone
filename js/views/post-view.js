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
		
		'render': function(data, dfd){ // render single article

			var that = this;

			res = (data) ? data : this.collection.where({slug: this.slug})[0];

			if( ! res ){
			
				return dfd.reject(); // not found

			}else{
						
				var ida = this.id+'-'+res.get('slug')+'-id';
				var media = (res.get('url')) ? res.get('url') : '';
			
				// photo gallery or single photo
  				var rimg = res.get('img');
  				var img = '';
  				var isGallery = $.isArray(rimg) && rimg.length > 1;
  				
 	 			if(isGallery){ // photo gallery
  			
  					img = '/wp-content/uploads/'+rimg[0];
  				
  				} else { // image seule
  			
  					img = (rimg)?'/wp-content/uploads/'+rimg:'/wp-content/themes/burzinski-backbone/img/blank.gif';
    		
    			}
					
				_.metaFB({
					ttl: res.get('title'),
					url: '/#!/'+this.type+'/post/'+res.get('slug'),
					img: img
				});		
										
				var _json = {
					img: img,
					vid: media,
					cnt: res.get('cnt'),
					ttl: res.get('ttl'),
					url: '/#!/'+this.type+'/post/'+res.get('slug'),
					dte: _(res.get('dte')).formatDate(),
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
					var gallery = new GalleryView({'imgs': res.get('img')});
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

				return dfd.resolve();
			}
			
		}
		
		
	});
	
	return PostView;
});

define([
		'jquery', 
		'backbone',
		'underscore', 
		'text!templates/gallery.tpl',
		'collections/gallery-collection'], 
function($, Backbone, _, template, GalleryCollection){
	var GalleryView = Backbone.View.extend({
		tagName: 'p',
		className:'gallery',
		initialize: function(options){

			_.bindAll(this, 'render', 'manageGallery');
			this.imgs = options.imgs;
			this.collection	= new GalleryCollection;
			
		},

		events:{
			'click a': function(e) { this.manageGallery(e.currentTarget); }
		},
		
		'render': function(){
				
			var i = 0;
			var lng = this.imgs.length;
  			for ( ; i < lng ; i++){
  			
  				this.collection.add({
  					img: this.imgs[i].replace(/.jpg/g,'-120x120.jpg')
  				});	
  					
  			}

			this.template = _.template( template, {collection: this.collection.toJSON() });
			
			$(this.el).html(this.template);
			
			return true;
			
		},
		
		'manageGallery': function(obj){ // set photo gallery
			
			var newImg = $(obj).find('img').attr('src').replace(/-120x120.jpg/g,'.jpg');
			
			$(obj).parents('article').find('aside img').fadeOut(function(){
				$(this).attr('src', newImg).fadeIn();
			});
			
		}

	});
	
	return GalleryView;
});	
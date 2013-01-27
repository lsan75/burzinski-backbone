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
		
		'render': function(){
		
			var that = this;
		
  			_.each(this.imgs, function(res){
  			
  				that.collection.add({
  					img: res.replace(/.jpg/g,'-150x150.jpg')
  				});	
  					
  			});

			this.template = _.template( template, {collection: this.collection.toJSON() });
			
			$(this.el)
				.html(this.template)
				.find('a').click(function(){ that.manageGallery(this) });
			
			return true;
			
		},
		
		'manageGallery': function(obj){ // set photo gallery
			
			var newImg = $(obj).find('img').attr('src').replace(/-150x150.jpg/g,'.jpg');
			
			$(obj).parents('article').find('aside img').fadeOut(function(){
				$(this).attr('src', newImg).fadeIn();
			});
			
		}


	});
	
	return GalleryView;
});	
define(['jquery', 'backbone', 'underscore'], function($, Backbone, _){

	var Gallery = Backbone.Model.extend({
	});
	
	var GalleryCollection = Backbone.Collection.extend({
		model: Gallery
	});
	
	return GalleryCollection;
});

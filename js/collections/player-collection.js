define(['jquery', 'backbone', 'underscore'], function($, Backbone, _){

	var PlayerModel = Backbone.Model.extend();
	
	var PlayerCollection = Backbone.Collection.extend({
		model: PlayerModel
	});
	
	return PlayerCollection;
});

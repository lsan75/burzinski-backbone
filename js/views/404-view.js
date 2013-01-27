define([
		'jquery', 
		'backbone',
		'underscore'], 
function($, Backbone, _){
	var FourOFourView = Backbone.View.extend({
			
		'initialize': function(){								
			console.log('page 404');
		}
				
	});
	
	return FourOFourView;
});

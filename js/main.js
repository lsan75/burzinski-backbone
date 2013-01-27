// This set's up the module paths for underscore and backbone
require.config({ 
    'paths': { 
		'underscore': 	'libs/underscore-min', 
		'mixins':		'libs/mixins',
		'backbone': 	'libs/backbone-min',
		'SC': 			'libs/soundcloud-sdk.unminified',
		'validate': 	'libs/jquery.validate.min'
	},
	'shim': 
	{
		backbone: {
			'deps': ['jquery', 'underscore'],
			'exports': 'Backbone'
		},
		underscore: {
			'exports': '_'
		},
		mixins: {
			'deps': ['jquery', 'underscore']
		},
    	SC: { 
	   		'deps': ['jquery'],
			'exports': 'SC'
    	},
    	validate: {
    		'deps': ['jquery']
    	}
	}	
}); 

require([
	'underscore',
	'mixins',
	'backbone',
	'app',
	'SC',
	'validate'
	], 
	function(_, mixins, Backbone, app, SC, validate){
		app.init();
		Backbone.history.start();		
});

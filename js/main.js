// This set's up the module paths for underscore and backbone
require.config({ 
    'paths': { 
    	'jquery':		[	'//code.jquery.com/jquery-latest.min',	
    						'libs/jquery.min'
    					],
		'underscore': 	[	
							'//cdn.jsdelivr.net/underscorejs/1.4.3/underscore-min',
							'libs/underscore-min'
						],	
		'backbone': 	[	'//cdn.jsdelivr.net/backbonejs/0.9.10/backbone-min',
							'libs/backbone-min'
						],	
		'mixins':		'libs/mixins',
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
	'jquery',
	'underscore',
	'mixins',
	'backbone',
	'app',
	'SC',
	'validate'
	], 
	function($, _, mixins, Backbone, app, SC, validate){
		app.init();
		Backbone.history.start();		
});

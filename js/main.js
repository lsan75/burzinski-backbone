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
//    	'jquery':		'libs/jquery.min',
//		'underscore': 	'libs/underscore-min',
//		'backbone': 	'libs/backbone-min',	
		'mixins':		'libs/mixins',
		'SC': 			'libs/soundcloud-sdk.unminified',
		'validate': 	'libs/jquery.validate.min',
		'datas':		'../../../plugins/json-jsfile/js-file'
	}
	,
	'shim': 
	{
		underscore: {
			'exports': '_'
		},
		backbone: {
			'deps': ['jquery', 'underscore'],
			'exports': 'Backbone'
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

define([
	'jquery',
	'underscore',
	'backbone',
	'mixins',
	'app',
	'SC',
	'validate',
	'datas'
	], 
	function($, _, Backbone, mixins, app, SC, validate, datas){
		app.init();
		Backbone.history.start();		
});

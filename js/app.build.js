({

	// launch : node r.js -o js/app.build.js


    appDir: "../",
    baseUrl: "js",
    dir: "../../burzinski-backbone-build/",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    optimize: "uglify",
    paths: {
    	'jquery':		'libs/jquery.min',	
		'underscore': 	'libs/underscore-min',
		'backbone': 	'libs/backbone-min',
		'mixins':		'libs/mixins',
		'SC': 			'libs/soundcloud-sdk.unminified',
		'validate': 	'libs/jquery.validate.min',
		'datas':		'empty:'
    },
    modules: [
        {
            name: "require"
        },
        {
            name: "main"
        }
    ]
})
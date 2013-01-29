({

	// launch : node r.js -o js/app.build.js


    appDir: "../",
    baseUrl: "js",
    dir: "../burzinski-backbone-build/",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    optimize: "uglify",

    paths: {
    	'jquery':		'libs/jquery.min',			
		'underscore': 	'libs/underscore-min', 
		'mixins':		'libs/mixins',
		'backbone': 	'libs/backbone-min',
		'SC': 			'libs/soundcloud-sdk.unminified',
		'validate': 	'libs/jquery.validate.min'
    },

    modules: [
        //Optimize the require-jquery.js file by applying any minification
        //that is desired via the optimize: setting above.
        {
            name: "require"
        },

        //Optimize the application files. Exclude jQuery since it is
        //included already in require-jquery.js
        {
            name: "main"
        }
    ]
})
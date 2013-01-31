({

	// launch : node r.js -o js/app.build.js


    appDir: "../",
    baseUrl: "js",
    dir: "../burzinski-backbone-build/",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    optimize: "uglify",
	findNestedDependencies:true,
    paths: {
    	'jquery':		'empty:',	
		'underscore': 	'empty:',
		'backbone': 	'empty:',
		'mixins':		'libs/mixins',
		'SC': 			'libs/soundcloud-sdk.unminified',
		'validate': 	'libs/jquery.validate.min'
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
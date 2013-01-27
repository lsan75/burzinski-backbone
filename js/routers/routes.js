define([
	'jquery', 
	'backbone', 
	'underscore',
	'views/main-view'], 
function($, Backbone, _, MainView){

	var router = Backbone.Router.extend({
		routes: {
			'!/top': 'top', // scroll to top
			'1': 'nada', // #1 pour click sur images et autres boutons
			'': 'home',
			'!/category/:nom': 'gotoCategory',
			'!/page/:nom': 'gotoPage',
			'!/:category/post/:nom': 'gotoPost',
			'*actions': 'f404'
			
		},
		initialize: function(){

			_.bindAll(this, 'home', 'gotoCategory', 'gotoPage', 'gotoPost', 'top', 'nada', 'f404');
															
			// set main view controller
			this.mainView = new MainView; 
			
			// store last route
			this.lastRoute = null;
		},
		
		'home': function(){
			
			var controle = document.URL.split('/');
			if(controle.length === 3 || (controle.length === 4 && (controle[3]===''||controle[3]==='#') )){ // racine du site
				
				this.navigate('!/category/blog', {trigger: true});
			
			}else{
				if( controle.length >= 6 && isFinite(controle[3]) ){ // ancien article du blog ?
				
					this.navigate('!/blog/post/'+controle[4], {trigger: true});
				
				}else{
			
					this.f404();
				
				}	
			}
			
		},
		
		'gotoCategory': function(nom){
			this.lastRoute = '#!/category/'+nom;
			
			this.mainView.produceView({type:'category', 'nom': nom});		
		},

		'gotoPage': function(nom){
			this.lastRoute = '#!/page/'+nom;
		
			this.mainView.produceView({type:'page', 'nom': nom});		
		},

		'gotoPost': function(category, nom){
			this.lastRoute = '#!/'+category+'/post/'+nom;
			
			this.mainView.produceView({type:'post', 'nom': nom, 'category': category});		
		},

		'f404': function(){ // page 404
		
			//console.log('404');
			//this.navigate(this.lastRoute, {replace: true});
			
		},
			
		'nada': function(){ // si url est #1 ex click photo click player audio
		
			if( this.lastRoute === '' ){ // si url est #1 direct
				this.navigate('!/category/blog', {trigger: true});
			}else{
				this.navigate(this.lastRoute, {replace: true});
			}
			
			
		},
		
		'top': function(){ // scroll page to top
		
   		 	_.goTop(); 
			this.navigate(this.lastRoute, {replace: true});
			
		}
		
	});
	
	return router;
	
});

define([
		'jquery', 
		'backbone',
		'underscore', 
		'views/menu-view',
		'views/player-view',
		'views/page-view',
		'views/post-view',
		'views/category-view',
		'views/404-view'], 
function($, Backbone, _, MenuView, PlayerView, PageView, PostView, CategoryView, FourOFourView){
	var MainView = Backbone.View.extend({
	
		el: 'body',
	
		initialize: function(){
				
			_.bindAll(this, 'produceView', 'doneView');
		
			// set header view
			this.menuView = new MenuView;
			
			// set player view
			this.playerView = new PlayerView;

			// views array
			this.views = [];
			
		},
		
		'produceView': function(options){
		
			var that = this,		
				tempView = null,	
				res = null;
			
			var idToDo = (options.type==='post') ? 'post':options.nom;
			var obj = _.where(this.views, {'slug': idToDo});


			$.when (_.goTop()).done(function(){
			$.when ( $('section').fadeOut(300) ).done(function(){

				// remove post view : no conflict with album list
				$('#post').detach();
												
				if( obj.length === 0 ){
				
					switch(options.type){
						case 'page':							
							tempView = new PageView({'slug': options.nom});
							break;
							
						case 'category':
							tempView = new CategoryView({'slug': options.nom, 'player': that.playerView});
							break;
							
						case 'post':
							tempView = new PostView({'id': 'post', 'slug': options.nom, 'category': options.category, 'player': that.playerView});
							break;
					}		
				
					
					$.when( tempView.getPage() ).done(function(res){
						
						if(res.error) { 
					
							slug = 'f404';
							(that.f404view) ? {} : that.f404view = new FourOFourView;
					
						}else{
					
							if( options.type !== 'post'){ // don't store post view
								that.views.push( tempView );
							}
							
						}
						
						that.doneView(options, tempView, idToDo);
						
					});	
				
				}else{
				
					that.doneView(options, obj[0], idToDo);
				
				}		
				
			
			});						
			});
		
		},
		
		'doneView': function(options, view, idToDo){
								
			var that = this;
		
			// manage scroll
				
				_.each(this.views, function(views){

					if(views.currentPage){ // ignore pages, manage only categories
			
						if(views === view){
							$(window).bind('scroll', views.isNewPage); // handle infinite scrolling
						}else{
							$(window).unbind('scroll', views.isNewPage); // unbind inactive views
						}
			
					}
							
				});
					
				
			// manage menu & show			
				var menu = (options.type==='post') ? /*options.category*/ 'none' : options.nom;
				this.menuView.setMenu('#'+menu+'-menu');

				$('#'+idToDo+'-content').fadeIn(300);	
					
				that.playerView.reloadTracklist();

		}
	
	});
	
	return MainView;
	
});	
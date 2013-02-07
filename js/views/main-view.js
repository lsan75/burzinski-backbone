define([
		'jquery', 
		'backbone',
		'underscore', 
		'collections/blog-collection',
		'collections/page-collection',
		'views/menu-view',
		'views/player-view',
		'views/page-view',
		'views/post-view',
		'views/category-view'], 
function($, Backbone, _, BlogCollection, PageCollection, MenuView, PlayerView, PageView, PostView, CategoryView){
	var MainView = Backbone.View.extend({
	
		el: 'body',
	
		initialize: function(){
														
			_.bindAll(this, 'produceView', 'doneView');
			
			// load async data
			this.pageCollection = new PageCollection();
			this.blogCollection = new BlogCollection();	
		
			// set header view
			this.menuView = new MenuView;
			
			// set player view
			this.playerView = new PlayerView;

			// views array
			this.views = [];
		
		},
		
		'produceView': function(options){

			var that = this,		
				tempView = null;
			
			var idToDo = (options.type==='post') ? 'post':options.nom;
			var obj = _.where(this.views, {'slug': idToDo});

			$.when (_.goTop()).done(function(){
			$.when ( $('section').fadeOut(300) ).done(function(){

				// remove post view : no conflict with album list
				$('#post').unbind('all');
				$('#post').remove();
												
				if( obj.length === 0 ){
					
					var vfetch = $.Deferred();	
					vfetch.promise();					
					switch(options.type){
						case 'page':

							//$.when(that.pageCollection.loaded).done(function(){											
								tempView = new PageView({collection: that.pageCollection,'slug': options.nom});
								vfetch = tempView.render(vfetch);
							//});
							break;
							
						case 'category':
										
							//$.when(that.blogCollection.loaded).done(function(){				
								tempView = new CategoryView({collection: that.blogCollection,'slug': options.nom, 'player': that.playerView});
								vfetch = tempView.render(vfetch);
							//});
							break;
							
						case 'post':
							
							//$.when(that.blogCollection.loaded).done(function(){				
								tempView = new PostView({collection: that.blogCollection, 'id': 'post', 'slug': options.nom, 'category': options.category, 'player': that.playerView});
								vfetch = tempView.render(false, vfetch);
							//});
							break;
					}		

					$('#ajax-loader').fadeOut(300);

					$.when( vfetch ).then(
					
						function(){

							
							if( options.type !== 'post'){ // don't store post view
								that.views.push( tempView );
							}
							that.doneView(options, tempView, idToDo);

						},

						function(error){

							var sfetch = $.Deferred();	
							sfetch.promise();
							$.when(that.pageCollection.loaded).done(function(){				
								tempView = new PageView({collection: that.pageCollection, 'slug': '404-error'});
								sfetch = tempView.render(sfetch);
								$.when( sfetch ).done(function(ret){
									that.views.push( tempView );
									that.doneView(options, tempView, '404-error');
								});
							});	
							
						}
												
					);
				
				}else{
				
					that.doneView(options, obj[0], idToDo);
				
				}		
				
			});						
			});
		
		},
		
		'doneView': function(options, view, idToDo){
										
			var that = this;
		
			// manage scroll
				
				var i=0;
				var lng = this.views.length;
				
				for( ; i < lng ; i++){

					if(this.views[i].currentPage){ // ignore pages, manage only categories
			
						if(this.views[i] === view && view.currentPage < view.nbPages ){
							$(window).bind('scroll', this.views[i].isNewPage); // handle infinite scrolling
						}else{
							$(window).unbind('scroll', this.views[i].isNewPage); // unbind inactive views
						}
			
					}
							
				}
				
				view.unbind('all');	
				view = null; // delete temp view	
				
			// manage menu & show			
				var menu = (options.type==='post') ? /*options.category*/ 'none' : options.nom;
				this.menuView.setMenu('#'+menu+'-menu');

				$('#'+idToDo+'-content').fadeIn(300);	
					
				that.playerView.reloadTracklist();

		}
	
	});
	
	return MainView;
	
});	
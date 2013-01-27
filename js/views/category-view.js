define([
		'jquery', 
		'backbone',
		'underscore', 
		'views/post-view'], 
function($, Backbone, _, PostView){
	var CategoryView = Backbone.View.extend({
		tagName: 'section',
		currentPage: 1,
		'initialize': function(options){

			_.bindAll(	this, 
						'isNewPage', 
						'getPage', 
						'render'
			);
						
			this.slug = options.slug; // recup type de catégorie
			this.player = options.player;
			this.id = options.slug+'-content';
			 // load data

								
		},
		
		'isNewPage': function(){ // handle scroll to next page
			var isScrolling = null;
			if( _.isiPhone() ){
				isScrolling = ($(window).scrollTop() >= ($(document).height() - $(window).height() - 60) );
			}else{
				isScrolling = (($(window).scrollTop() + $(window).height()) == $(document).height());
			}		
			
			if(isScrolling)
	        {
	            this.getPage(++this.currentPage); // get next page
	        }
		
		},
		
		'getPage': function(){ // get 5 articles - count=5
			
			var that = this;
		
			return $.ajax({ // load 5 articles
  				url: '/api/get_category_posts?slug='+this.slug+'&page='+this.currentPage+'&count=5&custom_fields=url,image',
  				dataType: "json",
  				success: function(data) {

  					if(data.status !=='error' ){ 					
						$.when(that.render(data)).done(function(){
							return true;
						});
					}
  					
  				}
  			});	
  			
		},
		
		'render': function(data){ // render 5 articles

			var that = this;
			var tempView = null;
						
			if(this.currentPage >= data.pages){ // unbind scroll si plus de pages à accéder
				$(window).unbind('scroll', this.isNewPage);
				$(window).unbind('touchmove', this.isNewPage);
			}
			
			if( $('#'+this.id).length === 0 ){
				this.template = '<section id="'+this.id+'"></section>';
				$('body header').after( this.template );
			}
			
  			_.each(data.posts, function(res) {

  				tempView = new PostView({'parent': that.id, 'id': that.slug+'-'+res.slug, 'slug': res.slug, 'category': that.slug, 'player': that.player});
  				tempView.render(res);
  				
  			});
  			
  			return true;
		}
		
		
	});
	
	return CategoryView;
});

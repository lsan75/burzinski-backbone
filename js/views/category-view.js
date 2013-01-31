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
						'render'
			);
						
			this.slug = options.slug; // recup type de catégorie
			this.player = options.player;
			this.id = options.slug+'-content';
				
			// filter collection by category
			this.data = [];
			this.nbPages = 0;
			
			var i = 0,
				lng = this.collection.length,
				p,
				pg, 
				j,jlng;
						
			while ( i < lng ){
			
				p=0;
				
				pg = [];
				while ( p < 5 && i < lng){
										
					jlng = this.collection.models[i].attributes.cat.length;
					for( j=0 ; j < jlng ; j++){				
						if(this.collection.models[i].attributes.cat[j].slug === this.slug){
							pg.push(this.collection.models[i]);
							p++;
						}
					}
					
					i++;
				}	
				if(pg.length !== 0){
					this.data.push(pg);
					this.nbPages++;
				}	
			}	
																									
		},
		
		'isNewPage': function(){ // handle scroll to next page

			var that = this;

			var isScrolling = null;
			if( _.isiPhone() ){
				isScrolling = ($(window).scrollTop() >= ($(document).height() - $(window).height() - 60) );
			}else{
				isScrolling = (($(window).scrollTop() + $(window).height()) == $(document).height());
			}		
			
			if(isScrolling)
	        {
				$(window).unbind('scroll', this.isNewPage); // unbind if scrolled again
	        	this.currentPage++;
	        	
	        	var dfd = $.Deferred();
	        	dfd.promise();
	            $.when(this.render(dfd)).done(function(){ // get next page
	            	$(window).bind('scroll', that.isNewPage); // bind again after render
	            });	

	        }
		
		},
		
		'render': function(dfd){ // render 5 articles

			var that = this;
			var tempView = null;
						
			if( this.data.length === 0 ){

	  			return dfd.reject(); // not found
			
			}else{			
															
				if( $('#'+this.id).length === 0 ){
					this.template = '<section id="'+this.id+'"></section>';
					$('body header').after( this.template );
				}
			
				var i=0;
				var lng = this.data[this.currentPage-1].length;
				var data;
				var sdfd = [];
				
				for( ; i < lng ; i++ ){	
					sdfd[i] = $.Deferred();
					data = this.data[this.currentPage-1][i];
  					tempView = new PostView({'parent': that.id, 'id': that.slug+'-'+data.get('slug'), 'slug': data.get('slug'), 'category': that.slug, 'player': that.player});
  					tempView.render(data, sdfd[i]);
  				}
  			}
  			return dfd.resolve();
		}
		
	});
	
	return CategoryView;
});

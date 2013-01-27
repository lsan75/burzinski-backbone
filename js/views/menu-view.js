define([
		'jquery', 
		'backbone',
		'underscore'], 
function($, Backbone, _){
	var MenuView = Backbone.View.extend({
		el: '#menu-content',
		offtop: null,
		elsize: null,
		initialize: function(){		
			_.bindAll(this, 'setMenu', 'scrollMenu', 'calculsMenu');
						
			this.calculsMenu();
			$(window).bind('scroll', this.scrollMenu); // handle sticky nav	
			$(window).bind('resize', this.calculsMenu); // reset sizes	
			
		},
		setMenu: function(parm) {
															
			$(this.el).find('a').removeClass('active'); // handle active menu
			$(parm).addClass('active');
			
		},
		calculsMenu: function() {
			this.offtop = $('header hgroup').outerHeight(); // position initiale menu
			this.elsize = $(this.el).outerHeight()+'px'; // calcul hauteur menu
		
		},
		scrollMenu: function() {
		
			var wintop = $(window).scrollTop(); // sticky nav
			if( wintop >= this.offtop ){
				$(this.el).css({
					'position': 'fixed',
					'top': 0
				});
				$('#submenu').css('padding-top', this.elsize); // recale sous menu
			} else {
				$(this.el).css('position','relative');
				$('#submenu').css('padding-top', 0);
			}	
										
		}
	});
	return MenuView;
});

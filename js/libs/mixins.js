_.mixin({

		formatDate: function(dte) {
			var mois = ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			return mois[dte.substr(5,2)-1] + ' ' + dte.substr(8,2) + ', ' + dte.substr(0,4);
		},
		
		goTop: function(){
			return $('html, body').animate({scrollTop:'0px'}, 500, function(){return true;});
		},
		
		swapClass: function(id, classe){
		
			$(id).fadeOut(100, function(){
				$(id).attr('class', classe).fadeIn(100);
			});
		
		},
		
		refresh: function(id){
			
			$('#'+id).promise().done(function() {	
				
				try{		
  					FB.XFBML.parse(document.getElementById(id)); 
  				}
  				catch(erreur){
  					//console.log('FB issue');
  				}
  				
  				
  				$(this).animate({
  					'opacity': '1'
  				}, 500);
  				
  			});
  			
  		},
  		
  		isiPhone: function(){
			if (navigator && navigator.userAgent && navigator.userAgent != null) 
   			{
        		var strUserAgent = navigator.userAgent.toLowerCase();
        		var arrMatches = strUserAgent.match(/(iphone|ipod|ipad)/);
       			if (arrMatches) return true;
    		} 

    		return false;
    	}
    	
});
	
		

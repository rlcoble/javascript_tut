$(document).ready(function(){
	var pg = 1;

	function a(){
		//show the loading screen if the images haven't loaded
		if(!($('#'+pg).is(':visible'))){
			$('.loading').show();
		}

		$.ajax({
  	  url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=85713b0393fcdf02ba021b88add04ba5&tags=bleacherreport&per_page=10&format=json&nojsoncallback=1',
  	  dataType: 'json',
  	  data:{
  	  	page: pg
  	  },
  	  success: function(rsp){
  	  	var photos = rsp.photos.photo;
  	  	var start = 'https://farm'
  	  	var middle = '.staticflickr.com/'
  	  	var end = '.jpg'
  	  	$.each(photos, function(i, photo){
  	  		if(i === 9){
  	  			$('body').append('<img src="'+start+photo.farm+middle+photo.server+'/'+photo.id+'_'+photo.secret+end+'" id="'+pg+'" class="last"><br>')
  	  		} else {
 		   			$('body').append('<img src="'+start+photo.farm+middle+photo.server+'/'+photo.id+'_'+photo.secret+end+'" id="'+pg+'"><br>');
 		   		}
  	  	});
  	  	//hide loading screen once images loaded
  	  	$('.loading').hide();
  	  	$(window).on('scroll', function(e){
  	  		var item = $('#'+pg+'.last');
  	  		if(item.length === 0){
  	  			//stop listening for scrolling if nothign is left to load
  	  			$(window).off('scroll');
  	  		} else if(item.isOnScreen()){
  	  				$(window).off('scroll');
  	  				pg+=1;
  	  				a();
  	  		}    			
  	  	});
  	  }
  	});
	}

  $.fn.isOnScreen = function(){
  	var win = $(window);

  	var scrolledScreen = {
  		top: win.scrollTop(),
  		left: win.scrollLeft()
  	}

  	scrolledScreen.right = scrolledScreen.left + win.width();
  	scrolledScreen.bottom = scrolledScreen.top + win.height();

  	var itemBounds = this.offset();
  	itemBounds.right = itemBounds.left + this.outerWidth();
  	itemBounds.bottom = itemBounds.top + this.outerHeight();

  	return(!(scrolledScreen.right < itemBounds.left || scrolledScreen.left > itemBounds.right || scrolledScreen.bottom < itemBounds.top || scrolledScreen.top > itemBounds.bottom));
  }

  a();
});
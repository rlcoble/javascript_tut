$.widget("custom.slider", {

	options: {
		slide: 1 																									//Default value;
	},

	_create: function() {
		var currentSlide = this.options.slide; 										//Get current slide
		var slides = this.element;																//Get slides div
		var leftEdge = '0px';																			//Set left boundary
		var max = slides.children().length;												//Calculate # of slides
		var rightEdge = ((max-1) * -500)+'px';										//Calculate right boundary
		var stopClick = false;																		//Flag to disable rapid clicking
		var interval = setInterval(automatic, 5000);							//Start automatic interval	

		$('.prev').click(function(){															//Left Arrow
			if(stopClick) return;																		//Test if during animation
			stopClick = true;																				//Lock rapid clicking

			clearInterval(interval);																//Stop interval

			nextSlide(currentSlide-1);															//Go back a slide

			interval = setInterval(automatic, 5000);								//Reset interval
		});

		$('.next').click(function(){															//Right Arrow
			if(stopClick) return;																		
			stopClick = true;																				

			clearInterval(interval);

			nextSlide(currentSlide+1);															//Go forward a slide

			interval = setInterval(automatic, 5000);
		});

		$('.nav').delegate('.dot', 'click', function(){						//Dots
			clearInterval(interval);

			nextSlide($(this).index()+1);														//Go to slide corresponding to dot

			interval = setInterval(automatic, 5000);	
		});

		function nextSlide(slide){
			if(slide > max){																				//If past right boundry
				currentSlide = 1;																			//go back to beginning
			} else if (slide < 1){																	//If past left boundary
				currentSlide = max;																		//go to end
			} else {																								//Otherwise
				currentSlide = slide;																	//go to passed slide number
			}

			$('.dot').removeClass('active');												//Remove black dot
			$('.dot:eq('+(currentSlide-1)+')').addClass('active');	//Place new black dot

			var nextValue = ((currentSlide-1) * (-500))+'px';				//Create string to set 'left' to

			slides.animate({ left: nextValue }, 500, function(){		//Animate sliding to the left (or right)
				if(currentSlide > 1){																	//Make sure next arrow is showing
					$('.prev').show();
				} 
				if(currentSlide < max){																//Make sure prev arrow is showing
					$('.next').show();
				}
				callback();
			});
		}

		function callback() {																	
			if(slides.css('left') === leftEdge){										//Test for left boundary								
				$('.prev').hide();																		//hide prev arrow
			} else if (slides.css('left') === rightEdge){						//Test for right boundary
				$('.next').hide();																		//hide next arrow
			}
			stopClick = false;																			
		}

		function automatic() {
			nextSlide(currentSlide+1);															//Automatically go to next slide after 5 secs.
		}
	}
});

$(document).ready(function(){
	$('.slides').slider();
});
SNAKE = [];

//draw grid
function render(){
	var cellCount = 0;
	for(var i=0; i<40; i++){
		$('.container').append('<div class="row-'+i+'"></div>');
		
		for(var j=0; j<40; j++){
			$('.row-'+i).append('<div id='+(1+j+cellCount)+' class="col-'+j+' cell"></div>');
		}

		cellCount+=40;
	}
}

//draw snake
function show_snake(){
	$('#821').addClass('snake');
	$('#822').addClass('snake');
	$('#823').addClass('head');
	SNAKE.push(821);
	SNAKE.push(822);
	SNAKE.push(823);
}

//start game
function play(){
	set_food();
	move_snake();
}

//randomly place food on the grid
function set_food(){
	var food = Math.floor(Math.random()*1600)+1;
	$('#'+food).addClass('food');
}

function move_snake(){
	var direction = '';

	setInterval(function(){
		if(direction !== ''){
			move(direction);
		}
	}, 100);

	//take directional input from user
	$(document).keydown(function(key){
  	switch(key.which){
   		case 37:
   	  	direction = 'l';
   	    break;

   	  case 38:
   	  	direction = 'u';
   	    break;

   	  case 39:
   	  	direction = 'r';
   	    break;

   	  case 40:
   	  	direction = 'd';
   	    break;
   	}
 	});

	var move = function(dir){
		var currentPosition = SNAKE[SNAKE.length-1];

		//move based on user input
		switch(dir){
			case 'l':
				var nextPosition = currentPosition-1;
				break;
			case 'u':
				var nextPosition = currentPosition-40;
				break;
			case 'r':
				var nextPosition = currentPosition+1;
				break;
			case 'd':
				var nextPosition = currentPosition+40;
				break;
		}

		//test if food has been eaten
		var tail = 0;
		if($('#'+nextPosition).hasClass('food')){
			tail = SNAKE[0];
			$('#'+nextPosition).removeClass('food');
			set_food();
		}

		//test if boundaries hit
		if(($('#'+currentPosition).parent().hasClass('row-0') & nextPosition === currentPosition-40) ||
			($('#'+currentPosition).hasClass('col-39') & nextPosition === currentPosition+1) ||
		 	($('#'+currentPosition).hasClass('col-0') & nextPosition === currentPosition-1) ||
			($('#'+currentPosition).parent().hasClass('row-39') & nextPosition === currentPosition+40)){
				alert('Game Over!');
				direction = '';
				snake = [];
		}

		//test if hit self
		if($('#'+nextPosition).hasClass('snake')){
			alert('Game Over!');
			direction = '';
			snake = [];
		}

		//move snake one square
		for(var i=0; i<SNAKE.length; i++){
			$('#'+SNAKE[i]).removeClass('snake');	
			SNAKE[i] = SNAKE[i+1];
		}
	
		for(var i=0; i<SNAKE.length; i++){
			$('#'+SNAKE[i]).addClass('snake');
		}

		//add square to snake if fruit eaten
		if (tail !== 0){
			SNAKE.unshift(tail);
		}
	
		SNAKE[SNAKE.length-1] = nextPosition;
		$('#'+nextPosition).addClass('head');
		$('#'+currentPosition).removeClass('head');
	}
};

$(document).ready(function(){
	render();
	show_snake();
	play();
});
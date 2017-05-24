function Board(){
	this.grid = [];
	this.boundary = [];
	this.adjacent = [1,10,11,12, -1, -10, -11, -12];
}

Board.prototype = {
	constructor: Board,

	init: function(){
		var upperBound = [];
		var lowerBound = [];
		var leftBound = [];
		var rightBound = [];

		for(var i=0; i<11; i++){
			upperBound.push(i);
			lowerBound.push(i+110);
			leftBound.push(i*11);
			rightBound.push((i*11)+10);
		}

		this.boundary = upperBound.concat(lowerBound, leftBound, rightBound);

		for(var i=0; i<121; i++){		//11*11 = 121 (2 extra rows to avoid conrner/edge cases)
			this.grid.push('cell_'+i);
		}
	},

	render: function(){
		var $board = $('.board');
		var startHTML = '<div class="cell" id="';
		var endHTML = '"></div>';

		for(var i=0; i<this.grid.length; i++){
			$board.append(startHTML+i+endHTML);
			//$('#'+i).html(this.grid[i]);
		}

		for(var i=0; i<this.boundary.length; i++){
			$('#'+this.boundary[i]).addClass('hide');
		}
	},

	play: function(){
		var that = this;
		this.placeMines();
		this.addCount();

		//for(var i=0; i<this.grid.length; i++){
			//$('#'+i).html(this.grid[i]);
		//};

		$('.cell').mousedown(function(e){
			switch(e.which){
				case 1:
					that.uncover(parseInt($(this).attr('id')));
					if(that.won()){
						alert('You Win!');
					}
					break;	
				case 3:
					$(this).addClass('flag');
					break;
			}
		});
	},

	placeMines: function(){
		var boardNumbers = [];

		for(var i=0; i<121; i++){
			if(!this.boundary.includes(i)){
				boardNumbers.push(i);
			}
		}

		for(var i=0; i<10; i++){
			var randomNum = Math.floor(Math.random() * boardNumbers.length); 
			var randomCell = boardNumbers.splice(randomNum,1);
			this.grid[randomCell[0]] = 'Mine';

			//$('#'+randomCell[0]).addClass('mine');
		}
	},

	addCount: function(){
		for(var i=0; i<this.grid.length; i++){
			var count = 0;
			if(this.grid[i] !== 'Mine'){
				for(var j=0; j<this.adjacent.length; j++){
					if(this.grid[i+this.adjacent[j]] === 'Mine'){
						count+=1;
					}
				}

				this.grid[i] = count;
			}
		}

		for(var i=0; i<this.boundary.length; i++){
			this.grid[this.boundary[i]] = '';
		}
	},

	uncover: function(cellNum){
		if(this.grid[cellNum] !== ''){
			if(this.grid[cellNum] !== 'Mine'){
				$('#'+cellNum).removeClass('flag').addClass('uncover').html(this.grid[cellNum]);
			} else {
				$('#'+cellNum).addClass('mine').html(this.grid[cellNum]);
				alert('GAME OVER!');
			}

			if(this.grid[cellNum] === 0){
				var neighbors = this.getNeighbors(cellNum);

				for(var i=0; i<neighbors.length; i++){
					var neighbor = neighbors[i];

					if(!($('#'+neighbor).hasClass('uncover'))){
						$('#'+neighbor).removeClass('flag').addClass('uncover').html(this.grid[neighbor]);
					}

					if(this.grid[neighbor] === 0){
						var secondLevel = this.getNeighbors(neighbor);

						for(var j=0; j<secondLevel.length; j++){
							var otherNeighbor = secondLevel[j];

							if(!($('#'+otherNeighbor).hasClass('uncover'))){
								this.uncover(otherNeighbor);
							}
						}
					}
				}
			}
		}
	},

	getNeighbors: function(cellNum){
		var neighbors = [];

		for(var i=0; i<this.adjacent.length; i++){
			var n = cellNum+this.adjacent[i];

			if((!this.boundary.includes(n)) && (this.grid[n] !== 'Mine')) {
				neighbors.push(n);
			}
		}

		return neighbors;
	},

	won: function(){
		for(var i=0; i<this.grid.length; i++){
			if(!(this.boundary.includes(i)) && (this.grid[i] !== 'Mine') && !($('#'+i).hasClass('uncover'))){
				return false;
			}
		}

		return true;
	}
}

$(function(){
	var b = new Board();
	b.init();
	b.render();
	b.play();
});
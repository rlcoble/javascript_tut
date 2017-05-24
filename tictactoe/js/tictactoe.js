
function Board (p1, p2){
	this.player1 = p1;
	this.player2 = p2;
	this.grid = [];
	this.winCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
}

Board.prototype = {
	constructor: Board,

	init: function(){
		for(var i=0; i<9; i++){
			this.grid.push(i);
		}
		this.player1.icon = 'X';
		this.player2.icon = 'O';
	},

	takeTurns: function(player){
		var that = this;
		$('.square').on('click', function(){
			if(($(this).html() !== 'X') && ($(this).html() !== 'O')){
				$('.square').off('click');
				$(this).html(player.icon);
				var id = $(this).attr('id');
				that.grid[id] = player.icon;
				if(that.won()){
					alert(player.name+' wins!');
				} else if(player === that.player1){
					that.takeTurns(that.player2);
				} else {
					that.takeTurns(that.player1);
				}
			}
		});
	},

	won: function(){
		var returnVal = false;
		var that = this;
		this.winCombos.forEach(function(combo){
			if (that.grid[combo[0]] === that.grid[combo[1]] && that.grid[combo[1]] === that.grid[combo[2]]){
				returnVal = true;
			}
		});
		return returnVal;
	}
}

function render (board){
	var $boardDiv = $('.board');
	var open = '<div class="square" id="';
	var close = '"></div>';

	for(var i=0; i<board.grid.length; i++){
		$boardDiv.append(open+i+close);
	}
}

function Player (name){
	this.name = name;
	this.icon = '';
}

$(document).ready(function(){
	//var player1 = prompt("Player 1's name:");
	var p1 = new Player('Player 1');

	//var player2 = prompt("Player 2's name:");
	var p2 = new Player('Player 2');

	var b = new Board(p1, p2);
	b.init();
	render(b);
	
	b.takeTurns(p1);
});
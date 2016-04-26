// Create variable to store the winning player
var winner = 0;   
// Create the game board
var gameboard = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];



// Keep track of whose turn it is
var turn = {
	number : 0,
	currentPlayer : function() {
		if (this.number % 2 === 0) {
			return 1;
		}
		else {
			return 2;
		}
	},
	nextTurn : function(){
		this.number += 1;
	}
};

// Check to see if any of the columns has 3 in a row
function checkColumns() {
	for (i = 0; i < gameboard.length; i++) {
		var matching = true;
		for (j = 0; j < gameboard[i].length; j++) {
			if (gameboard[j][i] === 0 || gameboard[j][i] !== gameboard[0][i]) {
				matching = false;
			}
		}
		if (matching) {
			return matching;
		}
	}
}
// Check to see if any of the rows has 3 in a row
function checkRows() {
	for (i = 0; i < gameboard.length; i++) {
		var matching = true;
		for (j = 0; j < gameboard[i].length; j++) {
			if (gameboard[i][j] === 0 || gameboard[i][j] !== gameboard[i][0]) {
				matching = false;
			}
		}
		if (matching) {
			return matching;
		}
	}
}
// Check to see if any of the diagonals has 3 in a row
function check_diag() {
	var matching = true;
	for (i = 0; i < gameboard.length; i++) {
		if (gameboard[i][i] === 0 || gameboard[i][i] !== gameboard[0][0]) {
			matching = false;
		}
	}
	if (matching) {
		return matching;
	}
	matching = true;
	for (i = 0; i < gameboard.length; i++) {
		if (gameboard[i][2 - i] === 0 || gameboard[i][2 - i] !== gameboard[0][2]) {
			matching = false;
		}
	}
	if (matching) {
		return matching;
	}
}

// Check to see if it's a tie
function checkTie() {
	var flatboard = Array.prototype.concat.apply([], gameboard);
	for(i = 0; i < flatboard.length; i++){
		if(flatboard[i] === 0){
			return false;
		}
	}
	return true;
}

// Check to see if either player has won
function checkWinner() {
	if (checkRows() === true || checkColumns() === true || check_diag() === true) {
		winner = turn.currentPlayer();
		// Alert winner
		gameOver("Player " + winner + " Has won the game. God Bless you.");
    	location.reload();
	}
	else if (checkTie() === true) {
		gameOver("The game is tied");
		location.reload();
    turn.nextTurn();
	}
	else {
		turn.nextTurn();
	}
}

// checks the values of the cell
function checkCellVal(cell) {
	var row = $(cell).data("row");
	var col = $(cell).data("col");
	return(gameboard[row][col]);
}

function changeCell(cell) {
	// Change cell to the oposite player
	var row = $(cell).data("row");
	var col = $(cell).data("col");
	gameboard[row][col] = turn.currentPlayer();
	if (turn.currentPlayer() == 1){
		// Removes the hover when clicked. Cell still changes when hovered over again
		$(".cells").click(function () {
			$(this).removeClass("hover");
		});
		//adds an 'X' and class for this player
		$(cell).html("X");
		$(cell).addClass('x');
	}	
	else {
		//adds an 'O' and class for this player 
		$(cell).html("O");
		$(cell).addClass('o');
	}
}

$(document).ready(function(){

	// Take the appropriate action when a box is clicked
	$('.cells').click(function(){
		// Check if cell is 0 on the board
		if (checkCellVal(this) === 0 && winner === 0) {
			// Change color if it's 0
			changeCell(this);
			// Check if we have a winner
			checkWinner();
		}
	});
});
//Ends the current game, alerts the player, and refreshes
function gameOver(message) {
	alert(message);
  $('.x').html('');
  $('.o').html(''); 
	$('.x').removeClass('x');
   $('.o').removeClass('o');

  winner = 0;
  
}

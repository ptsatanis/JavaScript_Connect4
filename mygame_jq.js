
var player1 = prompt("Player One: Enter your Name , you will be Blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter your Name, you will be Red");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

// http://stackoverflow.com/questions/6139407/getting-td-by-index-with-jquery
function reportWin(rowNum, colNum) {
    console.log("You won starting st this row,col");
    console.log(rowNum);
    console.log(colNum);
}


// Change the color of a button
function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

// Return the color of a button
function getColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

//Check if a color is gray
function isGray(color) {
    return color === 'rgb(128, 128, 128)' || color === 'rgba(128, 128, 128, 1)';
}

// Take in column index, returns the bottom row that is still gray
function checkBottom(colIndex) {

    for (var row = 5; row > -1; row--) {
        var colorReport = getColor(row, colIndex);
        if (colorReport === 'rgb(128, 128, 128)')
            return row;
    }

    alert("That column is full! Pick another one.");
    return -1;
}

//Check if 4 cells are the same color
function colorMatchCheck(color_one, color_two, color_three, color_four) {
    if (color_one === color_two && color_one === color_three && color_one === color_four) {
        if (color_one !== 'rgb(128, 128, 128)' && color_one !== undefined) {
            return true;
        }
        else {
            return false;
        }

    }

    return false;
}

//Check for horizontal wins
function checkWinH() {

    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
            var color_one = getColor(row, col);
            var color_two = getColor(row, col + 1);
            var color_three = getColor(row, col + 2);
            var color_four = getColor(row, col + 3);

            if (colorMatchCheck(color_one, color_two, color_three, color_four)) {
                console.log("horiz");
                reportWin(row, col);
                return true;
            }
        }
    }

    return false;
}


//Check for vertical wins
function checkWinV() {

    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {

            var color_one = getColor(row, col);
            var color_two = getColor(row + 1, col);
            var color_three = getColor(row + 2, col);
            var color_four = getColor(row + 3, col);

            if (colorMatchCheck(color_one, color_two, color_three, color_four)) {
                console.log("vert");
                reportWin(row, col);
                return true;
            }
        }
    }

    return false;
}

// Check for Diagonal Wins
function checkWinDiag() {
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 3; row++) {
            var color_one = getColor(row, col);
            var color_two = getColor(row + 1, col + 1);
            var color_three = getColor(row + 2, col + 2);
            var color_four = getColor(row + 3, col + 3);

            if (colorMatchCheck(color_one, color_two, color_three, color_four)) {
                console.log("diag");
                reportWin(row, col);
                return true;
            }
        }

        for (var row = 5; row > 2; row--) {
            var color_one = getColor(row, col);
            var color_two = getColor(row - 1, col + 1);
            var color_three = getColor(row - 2, col + 2);
            var color_four = getColor(row - 3, col + 3);

            if (colorMatchCheck(color_one, color_two, color_three, color_four)) {
                console.log("diag");
                reportWin(row, col);
                return true;
            }
        }
    }

    return false;
}


// Game End
function gameEnd(winningPlayer) {
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    $('h1').text(winningPlayer + " has won! Refresh your browser to play again!").css("fontSize", "50px");
    game_on = false;
}


$(document).ready(function () {


    // Start with Player One
    $('h3').text(player1 + ": it is your turn, please pick a column to drop your blue chip.");


});

$('.board').on('click', 'button', function () {

    if (!game_on) return;

    // Start with Player One

    console.log("Button clicked!");

    // Recognize what column was chosen
    var col = $(this).closest("td").index();

    // Get back bottom available row to change
    var bottomAvail = checkBottom(col);

    if (bottomAvail === -1) return;

    //Drop the chip to the first available row
    changeColor(bottomAvail, col, currentColor);


    if (checkWinH() || checkWinV() || checkWinDiag()) {
        gameEnd(currentName);
        return;
    }

    //If no win or tie, continue to next player
    currentPlayer = (-1) * currentPlayer;
    console.log(currentPlayer);

    // Re-Check who the current Player is.
    if (currentPlayer === 1) {
        currentName = player1;
        currentColor = player1Color;
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your blue chip.");
    }
    else {
        currentName = player2;
        currentColor = player2Color;
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your red chip.");
    }
})

document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
init();

function startGame () {
// Functions
function generateBoard(size) {
  // Generate board
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      board.cells.push(
        {
          row: i,
          col: j,
          isMine: false,
          hidden: true,
          isMarked: false
        }
      );
    }
  }
}
function getCellByCoordinates(i, j) {
  try {
    return board.cells.find(cell => {
      return cell.row === i && cell.col === j;
    })
  } catch (err) {
    return err;
  }
}
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
}


// Init
function init() {
  // Start Game on Click
  lib.displayMessage("Let's Start");

  // Init Board
  board = { cells: [] }

  // Parent Node
  let body = document.body;
  let container = document.createElement('div');
  container.className = "container";

  // Init Child Nodes
  let startButton = Builder.createButton('button start-button is-primary', 'START GAME !', startHandler);
  let difficultyLabel = Builder.createLabel("diffculty", "Select Difficulty")
  let difficulty = Builder.createSelector(["Easy", "Medium", "Hard"], "difficulty");
  let inputRangeLabel = Builder.createLabel("size", "Select Size")
  let rangeDisplay = Builder.createSpan('range-display', "2");
  let inputRange = Builder.createRange('size', 2, 6);

  //Add Child Nodes
  let childNodes = [
    difficultyLabel,
    difficulty,
    inputRange,
    inputRangeLabel,
    rangeDisplay,
    startButton
  ];

  // Append Childrend to container
  for (let node of childNodes) {
    container.appendChild(node)
  }
  // Append All
  body.appendChild(container);

  // Add listeners
  document.querySelector(".start-button").addEventListener('click', startHandler);
  inputRange.addEventListener('input', updateRange)
}
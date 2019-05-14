// Const board
let board;

// Initilize
init();


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


function plantMines(size, totalMines) {
  let count = 0;
  while (count < totalMines) {
    // Generate Random Coords
    let i = Math.floor((Math.random() * size - 1) + 1);
    let j = Math.floor((Math.random() * size - 1) + 1);

    // Get cell
    let cell = getCellByCoordinates(i, j);

    // Convert cell and advance count
    if (!cell.isMine) {
      cell.isMine = true;
      count += 1;
    }
  }
}


function setDifficulty(totalCells, difficulty) {
  switch (difficulty) {
    case "easy":
      return Math.floor(0.333 * totalCells);
    case "medium":
      return Math.floor(0.40 * totalCells);
    case "hard":
      return Math.floor(0.45 * totalCells)
  }
}

function startGame(size, difficulty) {

  // Calculations
  const totalCells = size ** 2;
  const totalMines = setDifficulty(totalCells, difficulty);
  // Generate Place Space
  generateBoard(size);
  plantMines(size, totalMines);

  // Don't remove this function call: it makes the game work!
  lib.initBoard();

  for (let cell of board.cells) {
    countSurroundingMines(cell);
  }

  // Add Event Listeners
  document.querySelectorAll('.board div.hidden').forEach(cell => {
    cell.addEventListener('mouseover', playClick);
  });
  document.querySelector('.board').addEventListener('click', checkForWin);
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin(e) {
  const totalCells = board.cells.length;
  const totalMines = board.cells.filter(cell => {
    return cell.isMine;
  }).length;
  const totalNonMines = totalCells - totalMines;
  // Filter active cells which is not a mine and not hidden
  let cells = board.cells.filter(cell => {
    return !cell.isMine && !cell.hidden;
  });

  if (cells.length === totalNonMines) {
    lib.displayMessage('You Win!');

    // remove event listeners
    lib.removeListeners();

    // Init button and Append
    let resetButton = createButton('button reset-button is-alert', 'Try Again!');
    resetButton.addEventListener('click', () => {
      window.location.reload();
    });
    document.querySelector('.container').appendChild(resetButton);
    return
  }
};

// Define this function to count the number of mines around the cell
function countSurroundingMines(cell) {
  let mineCount = lib.getSurroundingCells(cell.row, cell.col)
    .filter(
      cell => {
        return cell.isMine;
      })
    .length
  cell.surroundingMines = mineCount;
}


// ------------ Handlers
// Handler for starting New Games
function startHandler(e) {
  const size = Number(document.getElementsByName("size")[0].value);
  const difficulty = document.getElementsByName("difficulty")[0].value;

  if (e !== undefined) {
    let element = e.target;

    // Remove Start Button
    if (element.classList.contains('start-button')) {
      Builder.deleteChildNodes(element.parentNode)
    }
  }
  startGame(size, difficulty);
}

function updateRange(e) {
  document.getElementsByClassName("range-display")[0].textContent = e.target.value;
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
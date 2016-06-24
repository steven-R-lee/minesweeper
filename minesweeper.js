document.addEventListener('DOMContentLoaded', startGame)

// declare global variables
var board = {
  cells:[]
};

function startGame () {
  var kids = document.getElementsByClassName('board')[0].children;

  for (var n = 0; n < kids.length; n++) {
    addListeners(kids[n]);
    addCellToBoard(kids[n]);
  }

  for (var n = 0; n < board.cells.length; n++) {
    board.cells[n].surroundingMines = countMines(board.cells[n]);
  }
}


function addListeners(element) {
    element.addEventListener('click', showCell);
    element.addEventListener('contextmenu', markCell);
  }

function showCell(evt) {
  var targetEvt = event.target.classList;
    if(targetEvt.includes(mine)) {
      showAllMines();
      alert('You Are A Loser!');
      return restart();
    }
    else
    {
  evt.target.classList.remove('hidden');
  showSurrounding(evt.target);
  checkForWin();
}

function markCell(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('marked');
  evt.target.classList.toggle('hidden');

  for (var m = 0; m < board.cells.length; n++) {
    if(board.cells[m].row === getRow(event.target) && 
      board.cells[m].col === getCol(event.target)) {
        board.cells[m].isMarked = true;
    }
  }
}

function checkForWin() {
  var mineswept= document.getElementsByClassName('board')[0].children;
  var maximumMines = 0;
    for(var m = 0; m < board.cells.length; m++) {
      if(board.cells[m].isMine && board.cells[m].isMarked) {
        maximumMines = maximumMines + 1;
      }
      else if (!board.cells[m].isMine && board.cells[m].isMarked) {
        maximumMines = maximumMines + 1;
      }
    }
    if (maximumMines === 5) {
      for (var n = 0; n < mineswept.length; n++) {
        if(mineswept[n].classList.includes('hidden')) {
          return;
        }
        alert('Your Are A Winner!');
        return restart();
      }
    }
}

function getRow(element) {
  var list = element.classList;
    for (var n = 0; n < list.length; n++) {
      if (list[n].includes('row-')) {
        var classNameParts = parseInt(list[n].split('-'));
        return parseInt(classNameParts[1]);
   }
 }
}

function getCol(element) {
  var list = element.classList;
    for (var n = 0; n < list.length; n++) {
      if (list[n].includes('col-')) {
        var classNameParts = parseInt(list[n].split('-'));
        return parseInt(classNameParts[1]);
   }
 }
}

function addCellToBoard(element) {
  var newCell = {};
    newCell.row = getRow(element);
    newCell.col = getCol(element);
    newCell.isMine = element.classList.includes('mine');

board.cells.push(newCell);
}

function countMines(cell) {
  var surroundingCells = getSurroundingCells(cell.row, cell.col);
  var count = 0;
    for (var m = 0; m < surroundingCells.length; m++) {
      if(surroundingCells[m].isMine) {
        count = count + 1;
      }
    }
    return count;
}

function showAllMines() {
  var mineswept= document.getElementsByClassName('board')[0].children;
    for(var n = 0; n < mineswept.length; n++) {
      if (mineswept[n].classList.includes('mine')) {
        mineswept[n].classList.remove('hidden');
      }
    }
}

function reload() {
  location.reload();
}

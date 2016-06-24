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
  evt.target.classList.remove('hidden');
  showSurrounding(evt.target);
}

function markCell(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('marked');
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
    newCell.isMine = element.classList.contains('mine');

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

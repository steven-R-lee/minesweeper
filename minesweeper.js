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
}


function addListeners(element) {
  for (var m = 0; m < element.length; m++) {
    element[m].addEventListener('click', showCell);
    element[m].addEventListener('contextmenu', markCell);
  }
}

function showCell(evt) {
  evt.target.classList.remove('hidden');
}

function markCell(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('marked');
}

function getRow(element) {
  var list = element.classList;
    for (var n = 0; n < list.length; n++) {
      if (list[n].contains('row-') && list[n].contains('col-')) {
        return (parseInt(list[n].charAt(4)));
   }
 }
}

function getCol(element) {
  var list = element.classList;
    for (var n = 0; n < list.length; n++) {
      if (list[n].contains('row-') && list[n].contains('col-')) {
         return (parseInt(list[n].charAt(10)));
   }
 }
}

function addCellToBoard(element) {
  var newCell = {};
  newCell.row = getRow(element);
  newCell.col = getCol(element);
  newCell.isMine = element.classList.contains('mine');
}
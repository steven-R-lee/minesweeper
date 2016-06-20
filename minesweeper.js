document.addEventListener('DOMContentLoaded', startGame)

function startGame () {
  var kids = document.getElementsByClassName('board')[0].children;
  addListeners(kids);
}

function addListeners(element) {
  for (var n = 0; n < element.length; n++) {
    element[n].addEventListener('click', showCell);
    element[n].addEventListener('contextmenu', markCell);
  }
}

function showCell(evt) {
  evt.target.classList.remove('hidden');
}

function markCell(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('marked');
}
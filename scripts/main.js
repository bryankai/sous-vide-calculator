//// CONNECTION TESTING /////
// Linked to HTML?
// console.log("I'm linked to the HTML file.")

// // Data.js linked?
// console.log(recipes.beef.steak.rare)
// var data = require('./data.js');


//Initialize variables.
const button = document.querySelectorAll('.buttons-sub-container>.button')
const progBarStatus = document.querySelectorAll('.progress-bar>.progress')
const clearButton = document.querySelector('.clear-button')
let progBarArr = []


//Event listeners
for (let i = 0; i < button.length; i++) {
  button[i].addEventListener('click', render)
}
clearButton.addEventListener('click', emptyProgBar)

///// FUNCTIONS /////
// Progress bar //
function render(event) {
  console.log(event.target.innerHTML + ' clicked!')
  updateProgBar(event)
}

function updateProgBar(event) {
  progBarArr.push(event.target.innerHTML)
  for (let i = 0; i < progBarStatus.length; i++) {
    if (progBarArr[i]) {
      progBarStatus[i].classList.add("complete")
    }
  }
}

function emptyProgBar() {
  progBarArr = []
  for (let i = 0; i < progBarStatus.length; i++) {
    progBarStatus[i].classList.remove("complete")
  }
}

// Buttons //
function populateButtons() {
  
}

//// CONNECTION TESTING /////
// Linked to HTML?
// console.log("I'm linked to the HTML file.")

// // Data.js linked?
console.log(recipes.beef.steak.rare)
// var data = require('./data.js');


//Initialize variables.
const button = document.querySelectorAll('.buttons-sub-container>.button')
const progBarStatus = document.querySelectorAll('.progress-bar>.progress') // Prog Bar Icons
const clearButton = document.querySelector('.clear-button')
let selectionsArr = [] // Array of selections.


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
  selectionsArr.push(event.target.innerHTML)
  for (let i = 0; i < progBarStatus.length; i++) {
    if (selectionsArr[i]) {
      progBarStatus[i].classList.add("complete")
    }
  }
}

function emptyProgBar() {
  selectionsArr = []
  for (let i = 0; i < progBarStatus.length; i++) {
    progBarStatus[i].classList.remove("complete")
  }
}

// Buttons //
function populateButtons() {
  // What level am I at?
  if(selectionsArr.Length===1) {
    // Meat

  } else if (selectionsArr.Length===2) {
    // Cut
  } else if (selectionsArr.Length===3) {
    // Doneness
  }
  for (let i = 0; i<selectionsArr.length; i++) {
    button.innerHTML = []
  }
}

function createButton() {
  let button = document.createElement('a')
  button.classList.add('button')

}

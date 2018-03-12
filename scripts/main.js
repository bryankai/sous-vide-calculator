//// CONNECTION TESTING /////
// Linked to HTML?
// console.log("I'm linked to the HTML file.")

// // Data.js linked?
// console.log(recipes.beef.steak.rare)
// var data = require('./data.js');


//Initialize variables.
const buttonsContainer = document.querySelector('.buttons-sub-container')
let buttons = buttonsContainer.children
const progBarStatus = document.querySelectorAll('.progress-bar>.progress') // Prog Bar Icons
const clearButton = document.querySelector('.clear-button')
const selectionCont = document.querySelector('.selection-container')
const resultsCont = document.querySelector('.results-sub-container')
const favesCont = document.querySelector('.favorites-container')
let selectionsArr = [] // Array of selections.
let potentialFav = []

initialRender()

///// FUNCTIONS /////
// Render
function initialRender() {
  populateButtons()
  addButtonEventListeners()
  console.log('Initial render complete.')
}

function render(event) {
  // console.log(event.target.innerHTML + ' clicked!')
  updateProgBar(event)
  emptyButtons()
  populateButtons()
  addButtonEventListeners()
}

function clearRender() {
  emptyProgBar()
  emptyButtons()
  populateButtons()
  addButtonEventListeners()
  displayButtons()
}

// Event Listeners
function addButtonEventListeners() {
  clearButton.addEventListener('click', clearRender)

  document.querySelector('.favorite-btn').addEventListener('click',saveFavorite)

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', render)
  }
}


// Progress bar //
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
function emptyButtons() {
  // Clers buttons array
  const length = buttons.length
  for (let i = 0; i < length; i++) {
    buttonsContainer.removeChild(buttonsContainer.firstElementChild)
  }
}

function populateButtons() {
  let title
  let recipeName
  const objMap = createObjMap()
  if (selectionsArr.length === 3) {
    // Inputting Display text
    let temp = objMap['temp']
    let time = objMap['time']
    document.querySelector('.temp > h3').innerHTML = temp + '°'
    document.querySelector('.time > h3').innerHTML = time
    document.querySelector('.results-title > h2').innerHTML = recipeName
    // Hide/unhide containers
    displayResults()
  } else {
    // Create Selection Title
    document.querySelector('.selection-title h2').innerHTML = title

    // Append Buttons
    const buttonsArr = Object.keys(objMap)
    for (let i = 0; i < buttonsArr.length; i++) {
      document.querySelector('.buttons-sub-container').appendChild(createButton(buttonsArr[i]))
    }
  }
  function createObjMap() {
    let meat
    let cut
    let doneness
    let result
    if (selectionsArr.length === 0) {
      // Meat Buttons
      result = recipes
      title = 'MEAT TYPE'
    }
    if (selectionsArr.length === 1) {
      // Cut Buttons
      meat = selectionsArr[0]
      result = recipes[meat]
      title = 'CUT TYPE'
    }
    if (selectionsArr.length === 2) {
      // Doneness Buttons
      meat = selectionsArr[0]
      cut = selectionsArr[1]
      result = recipes[meat][cut]
      title = 'DONENESS'
    }
    if (selectionsArr.length === 3) {
      // Recipe
      meat = selectionsArr[0]
      cut = selectionsArr[1]
      doneness = selectionsArr[2]
      result = recipes[meat][cut][doneness]
      potentialFav = [meat,cut,doneness]
      recipeName = cut+' // '+doneness
    }
    return result
  }
}

// Hide/Unhide HTML
function displayResults() {
  selectionCont.style.display = "none"
  resultsCont.style.display = "block"
}

// Hide/Unhide HTML
function displayButtons() {
  selectionCont.style.display = "block"
  resultsCont.style.display = "none"
}

function createButton(string) {
  let button = document.createElement('a')
  button.classList.add('button')
  button.innerHTML = string
  return button
}

//Favorite
function saveFavorite () {
  localStorage.setItem('myFavs', potentialFav);
}

function displayFavorites () {
  let myFavs = localStorage.getItem("myFavs")
  if (myFavs) {

      favesCont.style.display = "block"
  }
}

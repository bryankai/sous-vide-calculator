// Initialize variables.
let selectionsArr = [] // Array of selections.
const favSection = document.querySelector('.favorites-section')

if (JSON.parse(localStorage.getItem('sousVideData'))) {
  displayFav()
} else {
  // If no data in local storage, hide favorites container
  favSection.style.display = "none"
}
let meat
let cut
let doneness
let result
let temp
let time

initialRender()

///// FUNCTIONS /////
/// Render ///
function initialRender() {
  populateButtons()
  addButtonEventListeners()
}

function render(event) {
  const buttonsContainer = document.querySelector('.buttons-sub-container')
  updateProgBar(event)
  empty(buttonsContainer)
  populateButtons()
  addButtonEventListeners()
}

function clearRender() {
  const buttonsContainer = document.querySelector('.buttons-sub-container')
  emptyProgBar()
  empty(buttonsContainer)
  populateButtons()
  addButtonEventListeners()
  displayButtons()
}

/// EMPTY ///
function empty(container) {
  // Clers div
  const children = container.children
  const length = children.length
  for (let i = 0; i < length; i++) {
    container.removeChild(container.firstElementChild)
  }
}


// Event Listeners
function addButtonEventListeners() {
  const clearButton = document.querySelector('.clear-button')
  const buttons = document.querySelector('.buttons-sub-container').children
  clearButton.addEventListener('click', clearRender)
  document.querySelector('.favorite-btn').addEventListener('click', saveFavorite)
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', render)
  }
  document.querySelector('.clear-fav-button').addEventListener('click', clearFav)
}


/// Progress bar ///
function updateProgBar(event) {
  const progBarStatus = document.querySelectorAll('.progress-bar>.progress')
  selectionsArr.push(event.target.innerHTML)
  for (let i = 0; i < progBarStatus.length; i++) {
    if (selectionsArr[i]) {
      progBarStatus[i].classList.add("complete")
    }
  }
}

function emptyProgBar() {
  const progBarStatus = document.querySelectorAll('.progress-bar>.progress')
  selectionsArr = []
  for (let i = 0; i < progBarStatus.length; i++) {
    progBarStatus[i].classList.remove("complete")
  }
}

/// Buttons ///
function populateButtons() {
  let title
  let recipeName
  const objMap = createObjMap()
  if (selectionsArr.length === 3) {
    // Inputting Display text
    temp = objMap['temp']
    time = objMap['time']
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
      potentialFav = [meat, cut, doneness]
      recipeName = cut + ' // ' + doneness
    }
    return result
  }
}

// Hide/Unhide HTML
function displayResults() {
  const selectionCont = document.querySelector('.selection-container')
  const resultsCont = document.querySelector('.results-sub-container')
  selectionCont.style.display = "none"
  resultsCont.style.display = "block"
}

// Hide/Unhide HTML
function displayButtons() {
  const selectionCont = document.querySelector('.selection-container')
  const resultsCont = document.querySelector('.results-sub-container')
  selectionCont.style.display = "block"
  resultsCont.style.display = "none"
}

function createButton(string) {
  let button = document.createElement('a')
  button.classList.add('button')
  button.innerHTML = string
  return button
}

///// FAVORITES /////
function saveFavorite() {
  let favArr = JSON.parse(localStorage.getItem('sousVideData')) || []
  console.log(favArr)
  if(!favArr.some(duplicateFav)) {
    // If favorite is not a duplicate, add the fav.
    favArr.push({
      'meat': meat,
      'cut': cut,
      'doneness': doneness,
      'temp': temp,
      'time': time
    })
  } else {
    console.log('dont push');
  }
  function duplicateFav (arr) {
    return arr.meat==meat&&arr.cut==cut&&arr.doneness==doneness
  }
  localStorage.setItem('sousVideData', JSON.stringify(favArr));
  displayFav()
}

function displayFav() {
  const favSection = document.querySelector('.favorites-section')
  let parsed = JSON.parse(localStorage.getItem('sousVideData'))
  let favArr = parsed ? parsed : [];
  let favTable = document.getElementById('favTable')
  empty(favTable)
  updateFavTable()
  favSection.style.display = "block"

  function updateFavTable() {
    for (let i = 0; i < favArr.length; i++) {
      favTable.appendChild(createFavoriteRow(favArr[i]))
    }

    function createFavoriteRow(favObj) {
      let row = document.createElement('tr');
      for (let key in favObj) {
        let td = document.createElement('td')
        td.innerHTML = favObj[key]
        row.appendChild(td)
      }
      // Create and append 'Delete Fav' button
      // let td = document.createElement('td')
      // let icon = document.createElement('i')
      // icon.classList.add('fas')
      // icon.classList.add('fa-trash-alt')
      // icon.classList.add('delete-icon')
      // td.appendChild(icon)
      // row.appendChild(td)
      // td.addEventListener('click',deleteFavRow)
      return row
    }
  }
}

function deleteFavRow(event) {
  // event.this
  console.log('delete individual favorite')
}

function clearFav() {
  console.log('clearFav')
  localStorage.removeItem('sousVideData')
  displayFav()
  favSection.style.display = "none"
}

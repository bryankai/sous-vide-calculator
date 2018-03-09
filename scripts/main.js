console.log("I'm linked to the HTML file.")
//Initialize variables.
const button = document.querySelectorAll('.button')

//Event listeners
for (let i=0; i<button.length; i++) {
  button[i].addEventListener('click', render)
}




// Progress bar

function render() {
  console.log('Click!')
}

function createProgBar() {
  let progBar = []
  progBar.push(button.innerHTML)
  console.log
}

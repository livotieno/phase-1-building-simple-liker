// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
//add class .hidden to error modal
const modal = document.querySelector('#modal')
modal.classList.add('hidden')

const hearts = document.querySelectorAll(".like-glyph")
hearts.forEach(heart => {
  heart.addEventListener('click', (e) => {
    if (e.target.innerHTML === FULL_HEART) {
      e.target.innerHTML = EMPTY_HEART;
      e.target.classList.remove('activated-heart');
    } else {
      handleLike(e);
    }
  })
})

function handleLike(e) {
  mimicServerCall()
  .then(resp => {
    //console.log(resp);
    changeHeartFill(resp, e)
  })
  .catch(error => {
    modal.innerHTML = error
  })
  setTimeout(() => {
    modal.classList.add('hidden')
  }, 3000)
}

function changeHeartFill(resp, e) {
  if (resp === 'Pretend remote server notified of action!') {
    e.target.classList.add('activated-heart')
    e.target.innerHTML = FULL_HEART;
  }
}



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

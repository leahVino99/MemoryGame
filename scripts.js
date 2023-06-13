
//document.addEventListener("DOMContentLoaded", function() {

  const cards = document.querySelectorAll(".memory-card");
  const body = document.querySelector("body");
  const winScreen = document.querySelector(".win-screen");
  const startScreen = document.querySelector(".start-screen");
  const startButton = document.querySelector(".start-button");
  const winMessage = document.querySelector(".win-message");
  const memoryGame = document.querySelector(".memory-game");

  //let count = 0;
  let firstPressed = false;
  let selectedCard1, selectedCard2, score = 0;

  function remainOrFlipCard(e) {
    let cardTarget = e.target.offsetParent;
    
    // Check if the clicked card is already flipped or matched
    if (cardTarget.classList.contains("flip") || cardTarget.classList.contains("matched")) {
     return;
    }
  
    cardTarget.classList.add("flip");

    //cards.forEach((el) => {
      // if you are the first card - always flip.
      if (!firstPressed) {
        //el.classList.add("flip");
        selectedCard1 = cardTarget.dataset.framework;
        firstPressed = true;
      }
      // check that el is the card we chose and flip.
      else{
        //el.classList.add("flip");
        selectedCard2 = cardTarget.dataset.framework;
  
        // If they are the same, update the score and flip both cards.
        if (selectedCard1 === selectedCard2) {
          selectedCard1 = "";
          selectedCard2 = "";
          firstPressed = false;
          score++;
          console.log("score: " + score);
          checkGameWin();

          // Flip both matching cards after a delay
          // setTimeout(() => {
          //   document.querySelectorAll(".card.flip").forEach((card) => {
          //     card.classList.add("matched");
          //   });
          // }, 500);
        } else {
          // If they are different, flip the second card back.
          setTimeout(() => {
            cardTarget.classList.remove("flip");
            cards.forEach((card) => {
              if (card.dataset.framework === selectedCard1) {
                card.classList.remove("flip");
              }
            });
            selectedCard1 = "";
            selectedCard2 = "";
            firstPressed = false;
          }, 700);
        }
      }
    }
  
  
  function showStartScreen() {
    startScreen.style.display = "flex";
  }

  function hideStartScreen() {
    startScreen.style.display = "none";
  }

  function showMemoryGame() {
    memoryGame.style.display = "flex";
  }

  function hideMemoryGame() {
    memoryGame.style.display = "none";
  }

  function flipAllCards() {
    cards.forEach((card) => {
      card.classList.add("flip");
      setTimeout(() => {
        card.classList.remove("flip");
      }, 2000);
    });
  }

  function showWinScreen() {
    winMessage.textContent = "Congratulations! You won!";
    winScreen.style.display = "block";
  }

  function resetGame() {
    cards.forEach((card) => {
      card.classList.remove("flip");
    });
    score = 0;
    selectedCard1 = "";
    selectedCard2 = "";
    firstPressed = false;
    shuffleCards();
  }

  function shuffleCards() {
    let shouldFlipCards = true; // Flag to control flipping cards during shuffling

    if (shouldFlipCards) {
      flipAllCards();
      shouldFlipCards = false; // Flip cards only once at the beginning
    }

    cards.forEach((card) => {
      let randomPos = Math.floor(Math.random() * cards.length);
      card.style.order = randomPos;
    });
  }

  function hideWinScreen() {
    winScreen.style.display = "none";
  }

  function startGame() {
    hideStartScreen();
    resetGame();
    showMemoryGame();
    //shuffleCards();
    //flipAllCards();
    //score = 0; // Reset the score to 0 at the beginning of each game
    //hideWinScreen();
  }
 
  function checkGameWin() {
    if (score === cards.length / 2) {
      setTimeout(() => {
        showWinScreen();
      }, 500);
    }
  }

  function initializeGame() {
    shuffleCards(); // Shuffle the cards at the beginning of the game
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", remainOrFlipCard);
    }
    startButton.addEventListener("click", startGame);
  }

  initializeGame();
  // window.addEventListener("DOMContentLoaded", function() {
  //   showStartScreen();
  window.addEventListener("DOMContentLoaded", function() {
    hideWinScreen();
    // Other code...
    showStartScreen();
    // Other code...
  });
  // })
//});
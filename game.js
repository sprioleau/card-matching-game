const gameBoard = document.querySelector(".gameboard");
const scoreElement = document.getElementById("score");
let score = 0;

const cardsData = [
  { src: "images/caillou.png"       , name: "caillou"        , bgColor: "#e6194b" },
  { src: "images/curious-george.png", name: "curious-george" , bgColor: "#3cb44b" },
  { src: "images/daniel.png"        , name: "daniel"         , bgColor: "#ffe119" },
  { src: "images/george-pig.png"    , name: "george-pig"     , bgColor: "#4363d8" },
  { src: "images/masha-and-bear.png", name: "masha-and-bear" , bgColor: "#f58231" },
  { src: "images/minnie.png"        , name: "minnie"         , bgColor: "#911eb4" },
  { src: "images/mouse.png"         , name: "mouse"          , bgColor: "#46f0f0" },
  { src: "images/peppa.png"         , name: "peppa"          , bgColor: "#f032e6" },
  { src: "images/pete.png"          , name: "pete"           , bgColor: "#bcf60c" },
  { src: "images/skye.png"          , name: "skye"           , bgColor: "#fabebe" },
];

const createCard = (cardData) => {
  const card = document.createElement("div");
  const front = document.createElement("img");
  const back = document.createElement("div");

  card.classList.add("card");
  front.classList.add("front");
  back.classList.add("back");

  front.src = cardData.src;
  card.style.backgroundColor = cardData.bgColor;

  card.appendChild(front);
  card.appendChild(back);
  card.dataset.name = cardData.name;

  return card;
};

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
} 

const generateCards = (cardsData) => {
  const cards = cardsData.concat(cardsData);
  const shuffledCards = shuffle(cards);
      
  shuffledCards.forEach(cardData => {
    const card = createCard(cardData);
    
    card.addEventListener("click", (e) => {
      card.classList.add("selected");
      checkForMatch(e)
    })

    gameBoard.appendChild(card);
  });
}

const restartGame = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => gameBoard.removeChild(card));
  score = 0;
  scoreElement.innerText = score;
  generateCards(cardsData);
}

const checkForMatch = (e) => {
  const selectedCards = document.querySelectorAll(".selected");

  const clickedCard = e.target;
  clickedCard.classList.add("selected");

  if (selectedCards.length !== 2) return;
  
  const first = selectedCards[0];
  const second = selectedCards[1];

  if (first.dataset.name === second.dataset.name) {
    selectedCards.forEach(selectedCard => {
      setTimeout(() => {
        selectedCard.classList.remove("selected");
        selectedCard.classList.add("matched");

        if (document.querySelectorAll(".matched").length === cardsData.length * 2) {
          setTimeout(() => restartGame(), 2000);
        }
      }, 500);
      
      score += 5;
      scoreElement.innerText = score;
    });
  } else {
    selectedCards.forEach(selectedCard => {
      gameBoard.style.pointerEvents = "none";

      setTimeout(() => {
        selectedCard.classList.remove("selected");
        gameBoard.style.pointerEvents = "all"; 
      }, 750 + 500);
    })
  }

  // if (matchedCards.length === cardsData.length * 2) {
  //   restartGame();
  // }
}

generateCards(cardsData);
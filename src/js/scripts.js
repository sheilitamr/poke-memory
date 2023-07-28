const cardsElement = document.getElementById('cards');
const pointsElement = document.getElementById('points');
pointsElement.querySelectorAll('span');
const numberCardsToPlay = 20;
let cards;
let firstCard;
let secondCard;
let cardsToPlay = [];
let points = 0;
pointsElement.textContent = `Points: ${points}`;

const generateCards = () => {
  const fragment = document.createDocumentFragment();
  cardsElement.innerHTML = '';

  for (const cardNumber of cardsToPlay) {
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.dataset.number = cardNumber;

    const divCardFront = document.createElement('div');
    divCardFront.classList.add('card__front');
    divCard.append(divCardFront);

    const img = document.createElement('img');
    img.classList.add('card__image');
    img.src = `./assets/images/${cardNumber}.png`;

    divCardFront.append(img);

    const divCardBack = document.createElement('div');
    divCardBack.classList.add('card__back');
    divCard.append(divCardBack);
    fragment.append(divCard);
  }
  cardsElement.append(fragment);
  cards = [...cardsElement.children];
  showCards();
};

const showCards = () => {
  cards.forEach(card => {
    card.classList.add('card--show');
  });
  setTimeout(hideCards, 2000);
};

const hideCards = () => {
  cards.forEach(card => {
    if (cardsToPlay.includes(Number(card.dataset.number))) {
      card.classList.remove('card--show');
    }
  });
};

const getRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 150 + 1);
  return randomNumber;
};

const generateCardsToPlay = () => {
  while (cardsToPlay.length < numberCardsToPlay / 2) {
    const randomNumber = getRandomNumber();
    if (!cardsToPlay.includes(randomNumber)) {
      cardsToPlay.push(randomNumber);
    }
  }
  cardsToPlay = [...cardsToPlay, ...cardsToPlay];
  console.log(cardsToPlay);

  generateCards();
};

const checkCards = card => {
  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
  }
  if (firstCard && secondCard) {
    if (firstCard.dataset.number === secondCard.dataset.number) {
      cardsToPlay = cardsToPlay.filter(
        cardNumber => firstCard.dataset.number !== String(cardNumber)
      );
      points += 2;
      pointsElement.textContent = `Points: ${points}`;
      firstCard = null;
      secondCard = null;
    } else {
      points--;
      pointsElement.textContent = `Points: ${points}`;
      secondCard.addEventListener(
        'transitionend',
        () => {
          hideCards();
          firstCard = null;
          secondCard = null;
        },
        { once: true }
      );
    }
  }
};

const showCard = card => {
  card.classList.add('card--show');
  checkCards(card);
};

const hideCard = card => {
  card.classList.remove('card--show');
};

cardsElement.addEventListener('click', e => {
  if (e.target.classList.contains('card--show') || e.target.id === 'cards')
    return;
  if (!secondCard) {
    showCard(e.target);
  }
});

window.addEventListener('load', generateCardsToPlay);

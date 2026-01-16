const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');

const images = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop'
];
let cards = [...images, ...images];
let flippedCards = [];
let matchedPairs = 0;
let isBusy = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(imageUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imageUrl;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-face', 'card-back');
    cardBack.textContent = '?';

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-face', 'card-front');
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Girl';
    cardFront.appendChild(img);

    card.appendChild(cardBack);
    card.appendChild(cardFront);

    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (isBusy || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    isBusy = true;
    const [card1, card2] = flippedCards;

    if (card1.dataset.image === card2.dataset.image) {
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            flippedCards = [];
            isBusy = false;

            if (matchedPairs === images.length) {
                alert('Congratulations! You matched all pairs!');
            }
        }, 600);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            isBusy = false;
        }, 1000);
    }
}

function initGame() {
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    flippedCards = [];
    isBusy = false;
    const shuffledCards = shuffle([...cards]);
    shuffledCards.forEach(imageUrl => {
        gameBoard.appendChild(createCard(imageUrl));
    });
}

resetButton.addEventListener('click', initGame);

initGame();

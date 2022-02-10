
// defining initial JS variables for the game
let dealerFirstCard = [];
let dealerSecondCard = [];
let dealerCards = [];
let dealerSum = 0;
let firstCard = [];
let secondCard = [];
let cards = [];
let sum = 0;
let deck = [];
let player = {
    Name: "Player",
    Chips: 0
};

// linking our html elements to JS variables
let messageEl = document.querySelector("#message-el");
let dealerEl = document.querySelector("#dealer-el");
let cardsEl = document.querySelector("#cards-el");
let sumEl = document.querySelector("#sum-el")
let startGame = document.querySelector("#start-el");
let newCard = document.querySelector("#new-card-el");
let stayEl = document.querySelector("#stay-el");
let resetGame = document.querySelector("#reset-el");
let playerEl = document.querySelector("#player-el");
let deckEl = document.querySelector("#deck-el");

// adding the players name and their chips
playerEl.textContent = player.Name + ": $" + player.Chips;

//displaying the deck to see how it functions
deckEl.textContent = "Remaining Cards: " + deck.length;

// disabling the new card and reset buttons on load
if (sum === 0) {
    document.querySelector("#new-card-el").disabled = true
    document.querySelector("#reset-el").disabled = true
    document.querySelector("#stay-el").disabled = true
};

// function to generate a random card and remove that card from the deck
function getRandomCard() {
    let randomCard = deck[Math.floor(Math.random() * deck.length + 1)]
    deck.splice(randomCard, 1)
    if (randomCard[0] === 11) {
        randomCard[0] = "J"
    } else if (randomCard[0] === 12) {
        randomCard[0] = "Q"
    } else if (randomCard[0] === 13) {
        randomCard[0] = "K"
    } else if (randomCard[0] === 14) {
        randomCard[0] = "A"
    }
    return randomCard
};

// function to determine the point value of a card
function determinePoints(card) {
    if (card[0] === "J" | card[0] === "Q" | card[0] === "K") {
        return 10
    } else if (card[0] === "A" ) {
        return 11
    } else {
        return card[0]
    }
};

// function to render the game, pre stay
function renderGame() {
    cardsEl.textContent = `Player: ${cards}`
    dealerEl.textContent = `Dealer: Hidden,${dealerCards[1]}`
    sumEl.textContent = `Player Points: ${sum}`
    if (sum) {
        document.querySelector("#start-el").disabled = true
        document.querySelector("#new-card-el").disabled = false
        document.querySelector("#stay-el").disabled = false
        document.querySelector("#reset-el").disabled = false
    }
    if (sum <= 20) {
        message = "Do you want to draw another card?"
    } else if (sum === 21 && sum === dealerSum) {
        message = "Nice job, but you have to split the pot with the house. Hit RESET to play again."
        document.querySelector("#new-card-el").disabled = true
        document.querySelector("#stay-el").disabled = true
    } else if(sum === 21){
        document.querySelector("#new-card-el").disabled = true
        document.querySelector("#stay-el").disabled = true
        message = "Woohoo! You got blackjack! Hit RESET to play again."
    } else if (sum > 21) {
        message = "You're out of the game. Hit RESET to play again."
        document.querySelector("#new-card-el").disabled = true
        document.querySelector("#stay-el").disabled = true
    }
    messageEl.textContent = message
    deckEl.textContent = "Remaining Cards: " + deck.length

};

// function to start the game
startGame.addEventListener("click", function() {
    deck = [[ 2, '♠' ],  [ 3, '♠' ],  [ 4, '♠' ],  [ 5, '♠' ],
    [ 6, '♠' ],  [ 7, '♠' ],  [ 8, '♠' ],  [ 9, '♠' ],
    [ 10, '♠' ], [ 11, '♠' ], [ 12, '♠' ], [ 13, '♠' ],
    [ 14, '♠' ], [ 2, '♥' ],  [ 3, '♥' ],  [ 4, '♥' ],
    [ 5, '♥' ],  [ 6, '♥' ],  [ 7, '♥' ], [ 8, '♥' ],
    [ 9, '♥' ],  [ 10, '♥' ], [ 11, '♥' ], [ 12, '♥' ],
    [ 13, '♥' ], [ 14, '♥' ], [ 2, '♣️' ],  [ 3, '♣️' ],
    [ 4, '♣️' ],  [ 5, '♣️' ],  [ 6, '♣️' ],  [ 7, '♣️' ],
    [ 8, '♣️' ],  [ 9, '♣️' ],  [ 10, '♣️' ], [ 11, '♣️' ],
    [ 12, '♣️' ], [ 13, '♣️' ], [ 14, '♣️' ], [ 2, '♦' ],
    [ 3, '♦' ],  [ 4, '♦' ],  [ 5, '♦' ],  [ 6, '♦' ],
    [ 7, '♦' ],  [ 8, '♦' ],  [ 9, '♦' ],  [ 10, '♦' ],
    [ 11, '♦' ], [ 12, '♦' ], [ 13, '♦' ], [ 14, '♦' ]];
    dealerFirstCard = getRandomCard()
    dealerSecondCard = getRandomCard()
    dealerCards = [dealerFirstCard[0] + dealerFirstCard[1], dealerSecondCard[0] + dealerSecondCard[1]]
    dealerSum = determinePoints(dealerFirstCard) + determinePoints(dealerSecondCard)
    firstCard = getRandomCard()
    secondCard = getRandomCard()
    cards = [firstCard[0] + firstCard[1], secondCard[0]+ secondCard[1]]
    sum = determinePoints(firstCard) + determinePoints(secondCard)
    renderGame()
});

// function to draw a new card during the game
newCard.addEventListener("click", function() {
    let newCard = getRandomCard()
    cards.push(newCard[0] + newCard[1])
    sum += determinePoints(newCard)
    if (determinePoints(newCard) === 11 && sum > 21) {
        sum -= 10
    }
    renderGame()
});

// function to stay and initiate the dealer draw
// the dealer must draw if sum <= 16 and the dealer must stand if the sum >= 17
// we are rendering the end game in this function so won't use renderGame()
stayEl.addEventListener("click", function() {
    if (dealerSum <= 16) {
            for (let i = 0; i < deck.length; i++) {
                let dealerDraw = getRandomCard()
                dealerCards.push(dealerDraw[0] + dealerDraw[1])
                dealerSum += determinePoints(dealerDraw)
                if (determinePoints(dealerDraw) === 11 && dealerSum > 21) {
                    dealerSum -= 10
                }
                if (dealerSum >= 17) {
                    break
                }
            }
    }
    cardsEl.textContent = `Player: ${cards}`
    dealerEl.textContent = `Dealer: ${dealerCards}`
    sumEl.textContent = `Player Points: ${sum}`
    if (dealerSum > 21) {
        message = "Woohoo! You beat the Dealer! Hit RESET to play again."
    } else if(dealerSum > sum){
        message = "Sorry, the Dealer beat you. Hit RESET to play again."
    } else if (dealerSum === sum) {
        message = "Nice job, but you have to split the pot with the house. Hit RESET to play again."
    } else {
        message = "Woohoo! You beat the Dealer! Hit RESET to play again."
    }
    messageEl.textContent = message
    deckEl.textContent = "Remaining Cards: " + deck.length
    document.querySelector("#new-card-el").disabled = true
    document.querySelector("#stay-el").disabled = true 
});

// function to reset the game
resetGame.addEventListener("click", function() {
    dealerFirstCard = 0
    dealerSecondCard = 0
    dealerCards = [];
    dealerSum = 0
    firstCard = 0
    secondCard = 0
    cards = []
    sum = 0
    deck = [];
    messageEl.textContent = "Want to play a game?"
    dealerEl.textContent = "Dealer:"
    cardsEl.textContent = "Player:"
    sumEl.textContent = "Player Points:"
    playerEl.textContent = player.Name + ": $" + player.Chips;
    deckEl.textContent = "Remaining Cards: " + deck.length
    if (sum === 0) {
        document.querySelector("#start-el").disabled = false
        document.querySelector("#new-card-el").disabled = true
        document.querySelector("#stay-el").disabled = true
        document.querySelector("#reset-el").disabled = true
    }
 });

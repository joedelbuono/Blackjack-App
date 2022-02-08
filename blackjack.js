
// defining initial JS variables for the game
let firstCard = [];
let secondCard = [];
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let deck = [[ 2, '♠' ],  [ 3, '♠' ],  [ 4, '♠' ],  [ 5, '♠' ],
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
let player = {
    Name: "Player 1",
    Chips: 0
};

// linking our html elements to JS variables
let messageEl = document.querySelector("#message-el");
let cardsEl = document.querySelector("#cards-el");
let sumEl = document.querySelector("#sum-el");
let startGame = document.querySelector("#start-el");
let newCard = document.querySelector("#new-card-el");
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

// function to render the game 
function renderGame() {
    cardsEl.textContent = `Cards: ${cards}`
    sumEl.textContent = `Sum: ${sum} points`
    if (sum <= 20) {
        message = "Do you want to draw another card?"
    } else if(sum === 21){
        message = "Woohoo! You got blackjack"
        hasBlackJack = true
    } else if (sum > 21) {
        message = "You're out of the game"
        isAlive = false
    }
    messageEl.textContent = message
    deckEl.textContent = "Remaining Cards: " + deck.length

};

// function to start the game
startGame.addEventListener("click", function() {
    // denote current status of player
    isAlive = true
    // generate random two cards, add them to the cards array,  
    // add them to the sum
    firstCard = getRandomCard()
    secondCard = getRandomCard()
    cards = [firstCard[0] + firstCard[1], secondCard[0]+ secondCard[1]]
    sum = determinePoints(firstCard) + determinePoints(secondCard)
    // determine current state in the game after the initial draw
    renderGame()
    // display to the user their current state in the game
    messageEl.textContent = message
    // after initial draw, disable the start button and re-enable the 
    // new card button and the reset button
    if (sum) {
        document.querySelector("#start-el").disabled = true
        document.querySelector("#new-card-el").disabled = false
        document.querySelector("#reset-el").disabled = false
    }
});

// function to draw a new card during the game
newCard.addEventListener("click", function() {
    // only allow a new card if they are alive
    // and do not have blackjack
    if (isAlive === true && hasBlackJack === false) {
        // generate a random new card
        let newCard = getRandomCard()
        // add the new card to the cards array
        cards.push(newCard)
        // add the new points to the points tally
        sum += determinePoints(newCard)
        // determine the new state the player is currently in
        renderGame()
    } else {
        document.querySelector("#new-card-el").disabled = true
    }
    
});

// function to reset the game
resetGame.addEventListener("click", function() {
    // resetting all the initial values
    let firstCard = 0
    let secondCard = 0
    let cards = []
    let sum = 0
    let deck = [[ 2, '♠' ],  [ 3, '♠' ],  [ 4, '♠' ],  [ 5, '♠' ],
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
    /* let hasBlackJack = false
    let isAlive = true */
    // resetting all the display text to default
    messageEl.textContent = "Want to play a game?"
    cardsEl.textContent = "Cards:"
    sumEl.textContent = "Sum:"
    playerEl.textContent = player.Name + ": $" + player.Chips;
    deckEl.textContent = "Remaining Cards: " + deck.length
    // re-enabling the start game button and re-disabling the new card
    // and reset buttons
    if (sum === 0) {
        document.querySelector("#start-el").disabled = false
        document.querySelector("#new-card-el").disabled = true
        document.querySelector("#reset-el").disabled = true
    }

 });

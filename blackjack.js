
// defining initial JS variables for the game
let firstCard = 0
let secondCard = 0
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false

let player = {
    Name: "Player 1",
    Chips: 145
}

// linking our html elements to JS variables
let messageEl = document.querySelector("#message-el")
let cardsEl = document.querySelector("#cards-el")
let sumEl = document.querySelector("#sum-el")
let playerEl = document.querySelector("#player-el")

// adding the players name and their chips
playerEl.textContent = player.Name + ": $" + player.Chips

// disabling the new card and reset buttons on load
if (sum === 0) {
    document.querySelector("#new-card-el").disabled = true
    document.querySelector("#reset-el").disabled = true
}

// function to generate a random card
function getRandomCard() {
    let randomCard = Math.floor(Math.random() * 13 + 1)
    if (randomCard > 10) {
        return 10
    } else if (randomCard === 1) {
        return 11
    } else {
        return randomCard
    }

}

// function to start the game
function startGame() {
    // denote current status of player
    isAlive = true
    // generate random two cards, add them to the cards array,  
    // add them to the sum
    firstCard = getRandomCard()
    secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    // input default state to the cards list
    cardsEl.textContent = "Cards:" + " "
    // add our randomly generated first two cards to the cards list
    for (let i = 0; i < cards.length; i ++) {
        cardsEl.textContent += cards[i] + " "
    }
    // add our total points after initial draw to the point tally
    sumEl.textContent = "Sum:" + " " + sum + " " + "points"
    // determine current state in the game after the initial draw
    if (sum <= 20) {
        message = "Do you want to draw another card?"
    } else if(sum === 21){
        message = "Woohoo! You got blackjack"
  /*       hasBlackJack = true */
    } else if (sum > 21) {
        message = "You're out of the game"
  /*       isAlive = false */
    }
    // display to the user their current state in the game
    messageEl.textContent = message
    // after initial draw, disable the start button and re-enable the 
    // new card button and the reset button
    if (sum) {
        document.querySelector("#start-el").disabled = true
        document.querySelector("#new-card-el").disabled = false
        document.querySelector("#reset-el").disabled = false
    }
}

// function to render the game, after the initial draw 
// should be similar to the start game function without initial
// values
function renderGame() {
    cardsEl.textContent = "Cards:" + " "
    for (let i = 0; i < cards.length; i ++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum:" + " " + sum + " " + "points"
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
}

// function to draw a new card during the game
function newCard () {
    // only allow a new card if they are alive
    // and do not have blackjack
    if (isAlive === true && hasBlackJack === false) {
        // generate a random new card
        let newCard = getRandomCard()
        // add the new card to the cards array
        cards.push(newCard)
        // add the new points to the points tally
        sum += newCard
        // determine the new state the player is currently in
        renderGame()
    } else {
        document.querySelector("#new-card-el").disabled = true
    }
    
}

// function to reset the game
function resetGame() {
    // resetting all the initial values to 0
    let firstCard = 0
    let secondCard = 0
    let cards = []
    let sum = 0
    /* let hasBlackJack = false
    let isAlive = true */
    // resetting all the display text to default
    messageEl.textContent = "Want to play a game?"
    cardsEl.textContent = "Cards:"
    sumEl.textContent = "Sum:"
    // re-enabling the start game button and re-disabling the new card
    // and reset buttons
    if (sum === 0) {
        document.querySelector("#start-el").disabled = false
        document.querySelector("#new-card-el").disabled = true
        document.querySelector("#reset-el").disabled = true
    }

}

const SUITS = ["hearts", "diamonds", "clubs", "spades"];
const FACE = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];

class Deck {
  constructor() {
    this.deck = this.shuffle(this.buildDeck());
  }

  shuffle(deck) {
    let length = deck.length;
    let shuffledDeck = [];
    for (let v = length; v >= 0; v--) {
      let num = Math.floor(Math.random() * v);
      let card = deck.splice(num, 1);
      shuffledDeck.push(card);
    }
    return shuffledDeck.flat();
  }

  dealToPlayers(numberOfPlayers) {
    let playersStartingHands = [];
    for (let v = 0; v < numberOfPlayers; v++) {
      let playerHand = [];
      for (let c = 0; c < 3; c++) {
        let c = this.deck.pop();
        playerHand.push(c);
      }
      playersStartingHands.push(playerHand);
    }
    return playersStartingHands;
  }

  placeDrawDeck() {
    return this.deck;
  }

  buildDeck() {
    let deck = [];
    SUITS.forEach((suit) => {
      FACE.forEach((face, index) => {
        let value;
        if (index == 0) {
          value = 11;
        } else if (index > 8) {
          value = 10;
        } else {
          value = index + 1;
        }
        let card = {
          suit: suit,
          face: face,
          value: value,
          image: `${face}_of_${suit}`,
        };
        deck.push(card);
      });
    });
    return deck;
  }
}

module.exports = Deck;

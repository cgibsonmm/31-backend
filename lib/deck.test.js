const Deck = require("./deck");

beforeEach(() => {
  deck = new Deck();
});

describe("Deck", () => {
  it("Should create a new deck", () => {
    expect(deck.deck.length).toBe(52);
  });

  it("should create 13 cards of each suit", () => {
    let suits = ["diamonds", "hearts", "spades", "clubs"];
    suits.forEach((suit) => {
      let arr = deck.deck.filter((card) => {
        return card.suit === suit;
      });
      expect(arr.length).toBe(13);
    });
  });

  it("should deal three cards to each player", () => {
    let numbOfPlayers = 1;
    let dealtCards = deck.dealToPlayers(numbOfPlayers);
    expect(dealtCards[0].length).toBe(3);
  });

  it("should handle dealing to more than one player", () => {
    let numbOfPlayers = 3;
    let dealtCards = deck.dealToPlayers(numbOfPlayers);

    dealtCards.forEach((hand) => {
      expect(hand.length).toBe(3);
    });
    expect(dealtCards.length).toBe(3);
  });
});

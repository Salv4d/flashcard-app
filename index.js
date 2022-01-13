const words = {
  apple: {
    image: "/images/apple.png",
    text: { en: "Apple", ptbr: "Maçã" },
  },
  broccoli: {
    image: "/images/broccoli.png",
    text: { en: "Broccoli", ptbr: "Brócolis" },
  },
  carrot: {
    image: "/images/carrot.png",
    text: { en: "Carrot", ptbr: "Cenoura" },
  },
  corn: {
    image: "/images/corn.png",
    text: { en: "Corn", ptbr: "Milho" },
  },
  garlic: {
    image: "/images/garlic.png",
    text: { en: "Garlic", ptbr: "Alho" },
  },
  mushroom: {
    image: "/images/mushroom.png",
    text: { en: "Mushroom", ptbr: "Cogumelo" },
  },
  potato: {
    image: "/images/potato.png",
    text: { en: "Potato", ptbr: "Batata" },
  },
  pumpkin: {
    image: "/images/pumpkin.png",
    text: { en: "Pumpkin", ptbr: "Abóbora" },
  },
  tomato: {
    image: "/images/tomato.png",
    text: { en: "Tomato", ptbr: "Tomate" },
  },
  tree: {
    image: "/images/tree.png",
    text: { en: "Tree", ptbr: "Árvore" },
  },
};

class Card {
  constructor(words) {
    this.words = words;
    this.wordDiscard = [];
    this.results = {
      correct: 0,
      wrong: 0,
      skipped: 0,
    };
  }

  getWord() {
    const wordsLength = Object.keys(this.words).length;
    const wordsRemaining = Object.keys(this.words);
    const randomPick = Math.floor(Math.random() * wordsLength);
    return wordsRemaining[randomPick];
  }

  discard(word) {
    this.wordDiscard[word] = this.words[word];
    delete this.words[word];

    return word;
  }

  revealAnswer() {}

  validateChoice() {}

  enableNextButton() {}

  skip() {}

  next() {}

  showResults() {}
}

card = new Card(words);

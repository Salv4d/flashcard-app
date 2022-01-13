const words = {
  apple: {
    image: "/images/apple.png",
    text: { en: "Apple", ptbr: "Maçã" },
    key: "apple",
  },
  broccoli: {
    image: "/images/broccoli.png",
    text: { en: "Broccoli", ptbr: "Brócolis" },
  },
  carrot: {
    image: "/images/carrot.png",
    text: { en: "Carrot", ptbr: "Cenoura" },
    key: "carrot",
  },
  corn: {
    image: "/images/corn.png",
    text: { en: "Corn", ptbr: "Milho" },
    key: "corn",
  },
  garlic: {
    image: "/images/garlic.png",
    text: { en: "Garlic", ptbr: "Alho" },
    key: "garlic",
  },
  mushroom: {
    image: "/images/mushroom.png",
    text: { en: "Mushroom", ptbr: "Cogumelo" },
    key: "mushroom",
  },
  potato: {
    image: "/images/potato.png",
    text: { en: "Potato", ptbr: "Batata" },
    key: "potato",
  },
  pumpkin: {
    image: "/images/pumpkin.png",
    text: { en: "Pumpkin", ptbr: "Abóbora" },
    key: "pumpkin",
  },
  tomato: {
    image: "/images/tomato.png",
    text: { en: "Tomato", ptbr: "Tomate" },
    key: "tomato",
  },
  tree: {
    image: "/images/tree.png",
    text: { en: "Tree", ptbr: "Árvore" },
    key: "tree",
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
    this.currentWord = {};
  }

  new() {
    const wordPick = this.getWord();
    const word = this.words[wordPick];
    this.discard(wordPick);
    this.currentWord = word;
    this.showCard();
  }

  showCard() {
    const cardWord = document.querySelector("#card-word");
    cardWord.innerText = this.currentWord.text.en;

    let choices = this.pickWords(3);
    choices.push(this.currentWord);

    const shuffledChoices = choices.sort(() => Math.random() - 0.5);

    card.showOptions(shuffledChoices);
  }

  pickWords(qty) {
    const remainingWords = Object.keys(this.words);
    let choices = [];
    let num = 0;
    let word = "";

    for (let i = 0; i < qty; i++) {
      num = Math.floor(Math.random() * remainingWords.length);
      word = remainingWords[num];
      remainingWords.splice(num, 1);
      choices.push(this.words[word]);
    }
    return choices;
  }

  showOptions(wordArray) {
    const options = document.querySelector("#options");

    let n = 0;

    for (let word of wordArray) {
      options.innerHTML += `
        <img class="option" id="${word.key}" src="${word.image}" alt="${word.text.en}" >
      `;
      n++;
    }
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

  revealAnswer() {
    const correctWord = document.querySelector(`#${this.currentWord.key}`);
    correctWord.classList.add("correct");
  }

  correctAnswer(choice) {
    return choice === this.currentWord.key;
  }

  enableNextButton() {}

  skip() {
    this.results.skipped++;
    this.new();
  }

  next() {}

  showResults() {}
}

card = new Card(words);

card.new();

const options = document.querySelectorAll(".option");

for (let option of options) {
  option.addEventListener("click", function (e) {
    if (card.correctAnswer(this.id)) {
      card.results.correct++;
    } else {
      card.results.wrong++;
      card.revealAnswer();
      this.classList.toggle("wrong");
    }

    console.log(card.results);
  });
}

const words = {
  apple: {
    image: "./images/apple.png",
    text: { en: "Apple", ptbr: "Maçã" },
    key: "apple",
  },
  broccoli: {
    image: "./images/broccoli.png",
    text: { en: "Broccoli", ptbr: "Brócolis" },
    key: "broccoli",
  },
  carrot: {
    image: "./images/carrot.png",
    text: { en: "Carrot", ptbr: "Cenoura" },
    key: "carrot",
  },
  corn: {
    image: "./images/corn.png",
    text: { en: "Corn", ptbr: "Milho" },
    key: "corn",
  },
  garlic: {
    image: "./images/garlic.png",
    text: { en: "Garlic", ptbr: "Alho" },
    key: "garlic",
  },
  mushroom: {
    image: "./images/mushroom.png",
    text: { en: "Mushroom", ptbr: "Cogumelo" },
    key: "mushroom",
  },
  potato: {
    image: "./images/potato.png",
    text: { en: "Potato", ptbr: "Batata" },
    key: "potato",
  },
  pumpkin: {
    image: "./images/pumpkin.png",
    text: { en: "Pumpkin", ptbr: "Abóbora" },
    key: "pumpkin",
  },
  tomato: {
    image: "./images/tomato.png",
    text: { en: "Tomato", ptbr: "Tomate" },
    key: "tomato",
  },
  tree: {
    image: "./images/tree.png",
    text: { en: "Tree", ptbr: "Árvore" },
    key: "tree",
  },
};

class Card {
  constructor(words, nextButton, revealButton, skipButton, resultCard) {
    this.words = words;
    this.nextButton = nextButton;
    this.revealButton = revealButton;
    this.skipButton = skipButton;
    this.resultCard = resultCard;

    this.wordDiscard = [];
    this.results = {
      correct: 0,
      wrong: 0,
      skipped: 0,
    };
    this.currentWord = {};

    this.nextButton.addEventListener("click", this.new);
    this.skipButton.addEventListener("click", this.skip);
    this.revealButton.addEventListener("click", this.reveal);
  }

  new = () => {
    if (Object.keys(this.words).length === 0) {
      return this.showResults();
    }

    this.resultCard.style.visibility = "hidden";
    this.resultCard.style.left = "-10000px";
    const wordPick = this.getWord();
    const word = this.words[wordPick];
    this.discard(wordPick);
    this.currentWord = word;

    this.showCard();
  };

  showCard() {
    const cardWord = document.querySelector(".card-word");
    cardWord.innerText = this.currentWord.text.en;

    let choices = this.pickWords(3);
    choices.push(this.currentWord);

    const shuffledChoices = choices.sort(() => Math.random() - 0.5);

    card.showOptions(shuffledChoices);

    document.querySelector("#next").hidden = true;
    document.querySelector("#skip").hidden = false;
  }

  pickWords(qty) {
    let allWords = Object.assign({}, this.words, this.wordDiscard);
    delete allWords[this.currentWord.key];
    const wordKeyList = Object.keys(allWords);
    let choices = [];
    let num = 0;
    let word = "";

    for (let i = 0; i < qty; i++) {
      num = Math.floor(Math.random() * wordKeyList.length);
      word = wordKeyList[num];
      wordKeyList.splice(num, 1);
      choices.push(allWords[word]);
    }
    return choices;
  }

  showOptions(wordArray) {
    const options = document.querySelector("#options");

    options.innerHTML = "";

    for (let word of wordArray) {
      options.innerHTML += `
        <img class="option" id="${word.key}" src="${word.image}" alt="${word.text.en}" >
      `;
    }

    const choices = document.querySelectorAll(".option");

    for (let choice of choices) {
      choice.addEventListener("click", this.interactionHandler);
    }
  }

  interactionHandler = (e) => {
    const { target } = e;

    if (this.correctAnswer(target.id)) {
      this.results.correct++;
      this.revealAnswer("correct");
    } else {
      this.results.wrong++;
      target.classList.toggle("wrong");
      this.revealAnswer("wrong");
    }

    this.disableChoices();
    this.showNext();
  };

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

  revealAnswer = (type) => {
    this.resultCard.style.left = "0";
    this.resultCard.style.visibility = "visible";
    this.resultCard.innerHTML = `
      <h2 id="result-type"></h2>
      <h3>The word was:</h3>
      <h2 class="card-word">${this.currentWord.text.ptbr}</h2>
      <img id="result-img" src="${this.currentWord.image}" alt="${this.currentWord.text.en}" />
    `;

    switch (type) {
      case "correct":
        this.resultCard.children["result-type"].innerText = "Correct!";
        this.resultCard.children["result-type"].className = "correct";
        break;

      case "wrong":
        this.resultCard.children["result-type"].innerText = "Wrong!";
        this.resultCard.children["result-type"].className = "wrong";
        break;

      default:
        this.resultCard.children["result-type"].innerText = "";
        this.resultCard.children["result-type"].className = "";
        break;
    }
  };

  correctAnswer(choice) {
    return choice === this.currentWord.key;
  }

  disableChoices() {
    const choices = document.querySelectorAll(".option");

    for (let choice of choices) {
      choice.removeEventListener("click", this.interactionHandler);
    }
  }

  skip = () => {
    this.results.skipped++;
    this.new();
  };

  reveal = () => {
    this.results.skipped++;
    this.reveal();
  };

  showNext() {
    document.querySelector("#next").hidden = false;
    document.querySelector("#skip").hidden = true;
  }

  showResults = () => {
    this.resultCard.style.left = "0";
    this.resultCard.style.visibility = "visible";

    this.resultCard.innerHTML = `
    <p>Game finished!</p>
    <h2 id="result-type">Results</h2>
    <table>
    <tr id="correct-points">
        <td class="result-cat">Correct &#10004;</td>
        <td class="result-num" id="correct-num">${this.results.correct}</td>
    </tr>
    <tr id="wrong-points">
        <td class="result-cat">Wrong &#10006; </td>
        <td class="result-num" id="wrong-num">${this.results.wrong}</td>
    </tr>
    <tr id="skipped-points">
        <td class="result-cat">Skipped \\ </td>
        <td class="result-num" id="skipped-num">${this.results.skipped}</td>
    </tr>
    </table>
    <button id="try-again">Try Again</button>
    `;

    this.resultCard.children["try-again"].addEventListener(
      "click",
      this.tryAgain
    );
    document.querySelector("#game-options").innerHTML = "";
  };

  tryAgain() {
    location.reload();
  }
}

const nextButton = document.querySelector("#next");
const revealButton = document.querySelector("#reveal");
const skipButton = document.querySelector("#skip");
const resultCard = document.querySelector("#result");

card = new Card(words, nextButton, revealButton, skipButton, resultCard);

card.new();

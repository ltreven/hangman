class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10;
  }

  pickWord() {
    this.secretWord = this.words[parseInt(Math.random()*this.words.length)];
    return this.secretWord;
  }

  checkIfLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90;
  }

  checkClickedLetters(letter) {
    return this.letters.indexOf(letter) == -1;
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
    if (this.letters.indexOf(letter) <=0) {
      this.letters.push(letter);
    }
    // check if user won
    this.checkWinner();
  }

  addWrongLetter(letter) {
    this.errorsLeft--;
    if (this.letters.indexOf(letter) <=0) {
      this.letters.push(letter);
    }
  }

  checkGameOver() {
    return this.errorsLeft == 0;
  }

  checkWinner() {
    return JSON.stringify(this.secretWord.split('').sort())==JSON.stringify(this.guessedLetters.split('').sort());
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['saopaulo', 'madrid', 'london', 'washington', 'paris', 'amsterdam', 'lisbon']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  // ... your code goes here
  console.log(event.keyCode, event.key);

  if (hangman != undefined) {

    if (hangman.checkIfLetter(event.keyCode) && hangman.checkClickedLetters(event.key)) {
      if (hangman.secretWord.indexOf(event.key) >= 0) {
        // write all correct ocurrences:
        let idx = hangman.secretWord.indexOf(event.key);
        do {
          hangman.addCorrectLetter(event.key);
          idx = hangman.secretWord.indexOf(event.key, idx);
          hangmanCanvas.writeCorrectLetter(idx);
          idx++;
        } while (hangman.secretWord.indexOf(event.key, idx) > 0);
    
        if (hangman.checkWinner()) {
          hangmanCanvas.winner();
          hangman = undefined;
        }

      } else {
        hangman.addWrongLetter(event.key);
        hangmanCanvas.writeWrongLetter(event.key, hangman.errorsLeft);
        hangmanCanvas.drawHangman(hangman.errorsLeft);
        if (hangman.checkGameOver()) {
          hangmanCanvas.gameOver();
          hangman = undefined;
        }  
      }

    }

    // comment added on develop branch
    // one more (after deleting develop branch)

  }

});

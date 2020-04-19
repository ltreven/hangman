class HangmanCanvas {
  constructor(secretWord) {
    this.canvas = document.getElementById('hangman');
    this.context = this.canvas.getContext('2d');
    this.secretWord = secretWord;
  }

  createBoard() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawLines();
  }

  drawLines() {
    for (let i=0; i < this.secretWord.length; i++) {
      this.context.beginPath();
      this.context.moveTo(300 + i*50, 700);
      this.context.lineTo(300 + i*50 + 40, 700);  
      this.context.stroke();
      this.context.closePath();
      }
  }

  writeCorrectLetter(index) {
    this.context.font = '48px serif';
    this.context.fillText(this.secretWord.charAt(index), 310 + index*50,  680);

  }

  writeWrongLetter(letter, errorsLeft) {
    this.context.font = '48px serif';
    this.context.fillText(letter, 700,  500 - errorsLeft*50);

  }

  drawHangman(errorsLeft) {
    if (errorsLeft < 10) {
      if (errorsLeft <= 9) {
        // draw base
        this.context.beginPath();
        this.context.moveTo(50, 700);
        this.context.lineTo(80, 700);
        this.context.lineTo(65, 680);
        this.context.lineTo(50, 700);
        this.context.stroke();
        this.context.closePath();
      }
      if (errorsLeft <= 8) {
        // draw haste
        this.context.beginPath();
        this.context.moveTo(65, 680);
        this.context.lineTo(65, 80);
        this.context.stroke();
        this.context.closePath();
      }
      if (errorsLeft <= 7) {
        // draw travessao
        this.context.beginPath();
        this.context.moveTo(65, 80);
        this.context.lineTo(400, 80);
        this.context.stroke();
        this.context.closePath();
      }
      if (errorsLeft <= 6) {
        // draw hang
        this.context.beginPath();
        this.context.moveTo(400, 80);
        this.context.lineTo(400, 110);
        this.context.stroke();
        this.context.closePath();
      }
      if (errorsLeft <= 5) {
        // draw left head
        this.context.beginPath();
        this.context.arc(400, 160, 50, 0, Math.PI * 2);
        this.context.stroke();
        this.context.closePath();
      }
      if (errorsLeft <= 4) {
        // draw  body
        this.context.beginPath();
        this.context.moveTo(400, 210);
        this.context.lineTo(400, 350);
        this.context.stroke();
        this.context.closePath();
      }
      if (errorsLeft <= 3) {
        // draw right arm
        this.context.beginPath();
        this.context.moveTo(400, 220);
        this.context.lineTo(300, 300);
        this.context.stroke();
        this.context.closePath();
      }
      if (errorsLeft <= 2) {
        // draw left arm
        this.context.beginPath();
        this.context.moveTo(400, 220);
        this.context.lineTo(500, 300);
        this.context.stroke();
        this.context.closePath();
      }
      if (errorsLeft <= 1) {
        // draw right leg
        this.context.beginPath();
        this.context.moveTo(400, 350);
        this.context.lineTo(300, 400);
        this.context.stroke();
        this.context.closePath();
      }
      if (errorsLeft <= 0) {
        // draw left leg
        this.context.beginPath();
        this.context.moveTo(400, 350);
        this.context.lineTo(500, 400);
        this.context.stroke();
        this.context.closePath();
      }
    }
  }

  gameOver() {
    // ... your code goes here
    const img = new Image();
    img.src = './images/gameover.png';
    const ctx = this.context;
    img.onload = function() {
      ctx.drawImage(img, 100, 210);
    };
    this.context.fillText("Game over", 300,  750);

  }

  winner() {
    // ... your code goes here
    const img = new Image();
    img.src = './images/awesome.png';
    const ctx = this.context;
    img.onload = function() {
      ctx.drawImage(img, 100, 210);
    };
    this.context.fillText("You win", 300,  750);
  }
}

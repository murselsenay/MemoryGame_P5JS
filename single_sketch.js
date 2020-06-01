let xPos = 150;
let yPos = 50;
let offset = 0;
let r, g, b;
let cards = [];
let cardCount;
let line;
cardsPositions = [];
let numbers = [];
let gameNumbers = [];
let max;
let fontSize;
let canDrawCards = false;
let deleteCards = false;
let clickCount = 2;
let card_1;
let card_2;
let cw, ch;
let whichCard_1;
let whichCard_2;
timer = 2;
posX = [];
posY = [];
let numberOffsetX;
let numberOffsetY;
let remainingMoves;
let gtext;
function setup() {

  slider = createSlider(0, 4, 4, 2);
  slider.position(10, 10);


  button = createButton('Start Game');
  button.position(10, 50);
  button.mousePressed(startGame);

}
function startGame() {
  switch (slider.value()) {
    case 0:
      resetGame();
      background(0, 0, 0);
      for (let i = 1; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
          numbers.push(i);
        }
      }
      line = 2;
      cardCount = 4;
      fontSize = 70;
      cw = 100;
      ch = 150;
      offset = 110;
      numberOffsetX = 30;
      numberOffsetY = 100;
      remainingMoves = 3;
      max = numbers.length - 1;
      break;
    case 2:
      resetGame();
      for (let i = 1; i < 9; i++) {
        for (let j = 0; j < 2; j++) {
          numbers.push(i);
        }
      }
      line = 4;
      cardCount = 16;
      fontSize = 70;
      cw = 100;
      ch = 150;
      offset = 110;
      numberOffsetX = 30;
      numberOffsetY = 100;
      remainingMoves = 12;
      max = numbers.length - 1;
      break;
    case 4:
      resetGame();
      for (let i = 1; i < 19; i++) {
        for (let j = 0; j < 2; j++) {
          numbers.push(i);
        }
      }
      line = 6;
      cardCount = 36;
      fontSize = 50;
      cw = 75;
      ch = 100;
      offset = 80;
      numberOffsetX = 20;
      numberOffsetY = 60;
      remainingMoves = 27;
      max = numbers.length - 1;
      break;


  }


  function resetGame() {


    xPos = 150;
    yPos = 0;
    offset = 0;
    r, g, b;
    cards = [];
    cardCount;
    line;
    cardsPositions = [];
    numbers = [];
    gameNumbers = [];
    max;
    canDrawCards = false;
    deleteCards = false;
    clickCount = 2;
    card_1;
    card_2;
    whichCard_1;
    whichCard_2;
    timer = 2;
    posX = [];
    posY = [];
  }

  createGrid(line, cardCount);

}
function createGrid(line_, cardCount_) {
  cardCount = cardCount_;
  let startPos = xPos;
  createCanvas(windowWidth, windowHeight);

  background(0, 0, 0);

  for (let i = 0; i < cardCount; i++) {
    xPos += offset;

    if (i % line_ == 0) {
      yPos += offset + 40;
      xPos = startPos;
    }
    let card = new Cards(xPos, yPos, cw, ch);
    cards.push(card);

  }
  //console.log(cards);
  for (let i = 0; i < cards.length; i++) {
    cards[i].drawCards();
    posX[i] = cards[i].x;
    posY[i] = cards[i].y;
    cardsPositions[i] = cards[i].x.toString() + cards[i].y.toString();
  }
}

function mousePressed() {
  if (clickCount < 2) {
    for (let i = 0; i < cards.length; i++) {
      cards[i].clicked(mouseX, mouseY);
    }
  }
}
function draw() {


  if (gameNumbers.length == 0) {
    text('you win', 1000, 500);
    gameNumbers.push('a');
  }


  if (frameCount % 60 == 0 && timer > 0 && canDrawCards == false) {
    if (clickCount > 1) {
      timer--;
      //console.log(timer);
    }
  }


  if (timer == 0) {
    background(255, 255, 255);

    if (deleteCards == true) {

      for (let i = 0; i < gameNumbers.length; i++) {
        while (gameNumbers[i] === card_1) {
          //console.log(card_1 + ' Silindi.');
          gameNumbers.splice(i, 1);
          //console.log(gameNumbers);
        }
      }

      if (whichCard_1 > whichCard_2) {
        cards.splice(whichCard_1, 1);
        cards.splice(whichCard_2, 1);
      }
      else {
        cards.splice(whichCard_1, 1);
        cards.splice(whichCard_2 - 1, 1);
      }
      deleteCards = false;
    }
    for (let i = 0; i < cards.length; i++) {
      cards[i].drawCardsWithoutNumbers();
      cardsPositions[i] = cards[i].x.toString() + cards[i].y.toString();
    }
    clickCount = 0;
    canDrawCards = true;
    timer = 2;
  }


}
class Cards {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  clicked(px, py) {
    console.log(cards);
    if ((px > this.x && px < this.x + this.w) && (py > this.y && py < this.y + this.h)) {
      clickCount++;
      remainingMoves -= 0.5;
      canDrawCards = false;
      card_2 = undefined;
      for (let i = 0; i < cardsPositions.length; i++) {

        //console.log(cardsPositions.indexOf(this.x.toString() + this.y.toString()) + ". Kart Tıklandı.");
        textSize(fontSize);
        text(gameNumbers[cardsPositions.indexOf(this.x.toString() + this.y.toString())], this.x + numberOffsetX, this.y + numberOffsetY);
        if (clickCount == 1) {
          whichCard_1 = cardsPositions.indexOf(this.x.toString() + this.y.toString());
          card_1 = gameNumbers[cardsPositions.indexOf(this.x.toString() + this.y.toString())];
        }
        else if (clickCount == 2) {
          card_2 = gameNumbers[cardsPositions.indexOf(this.x.toString() + this.y.toString())];
          whichCard_2 = cardsPositions.indexOf(this.x.toString() + this.y.toString());

        }
        console.log(card_1 + ' ' + card_2);
        if (card_1 == card_2) {
          //console.log(gameNumbers[cardsPositions.indexOf(this.x.toString() + this.y.toString())]);
          deleteCards = true;

        }
        else {

        }
      }
    }
  }
  drawCards() {

    rect(this.x, this.y, this.w, this.h);

    let r = getRandom(0, max);
    gameNumbers.push(numbers[r]);
    textSize(fontSize);
    text(numbers[r], this.x + numberOffsetX, this.y + numberOffsetY);
    numbers.splice(r, 1);
    max--

  }
  drawCardsWithoutNumbers() {

    rect(this.x, this.y, this.w, this.h);
    if (clickCount >= 2) {
      clickCount = 0;
    }

    if (remainingMoves < 1 && gameNumbers.length > 0) {

      gtext = 'game over';
    }

    else {
      gtext = 'remaining moves: ' + remainingMoves;
    }

    text(gtext, 500, 500);
  }
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Game constants and variables
let direction = { x: 0, y: 0 };
const moveSound = new Audio("move.mp3");
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let score = 0;
food = { x: 6, y: 7 };

//GAME FUNCTIONS
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 0.2) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function collide(snake) {
  //If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //IF YOU BUMP INTO WALL
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  // PART1 --> UPDATING SNAKE & FOOD
  if (collide(snakeArr)) {
    gameOverSound.play();
    direction = { x: 0, y: 0 };
    alert("GAME OVER :(PRESS CTRL + R TO REFRESH THE GAME");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
  }

  //If you have eaten the food , regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score++;
    if (score > highscore) {
      highscoreval = score;
      localStorage.setItem("highscore", JSON.stringify(highscoreval));
      highscorebox.innerHTML = "HighScore: " + highscoreval;
    }

    scorebox.innerHTML = "Score: " + score;

    snakeArr.unshift({
      x: snakeArr[0].x + direction.x,
      y: snakeArr[0].y + direction.y,
    });
    let a = 2,
      b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  //MOVE THE SNAKE
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;

  //Part2 --> DISPLAY / RENDER SNAKE AND FOOD

  //DISPLAY SNAKE
  playArea.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    playArea.appendChild(snakeElement);
  });

  //DISPLAY FOOD
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  playArea.appendChild(foodElement);
}

//Main logic behind runing the game
let highscore = localStorage.getItem("highscore");

if (highscore === null) {
  highscoreval = 0;
  localStorage.setItem("highscore", JSON.stringify(highscoreval));
} else {
  highscoreval = JSON.parse(highscore);
  highscore.innerHTML = "HighScore: " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  direction = { x: 0, y: 1 };
  switch (e.key) {
    case "ArrowUp":
      console.log("Arrow Up");
      direction.x = 0;
      direction.y = -1;
      break;
    case "ArrowDown":
      console.log("Arrow Down");
      direction.x = 0;
      direction.y = 1;
      break;
    case "ArrowRight":
      console.log("Arrow Right");
      direction.x = 1;
      direction.y = 0;
      break;
    case "ArrowLeft":
      console.log("Arrow Left");
      direction.x = -1;
      direction.y = 0;
      break;

    default:
      break;
  }
});

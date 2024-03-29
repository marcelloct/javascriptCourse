"use strict";

// let secretNumber = Math.trunc(Math.random() * 20) + 1;
// // document.querySelector(".number").textContent = secretNumber;

// let score = 20;
// let highscore = 0;

// const displayMessage = function (message) {
//   document.querySelector(".message").textContent = message;
// };

// document.querySelector(".check").addEventListener("click", function () {
//   const guess = Number(document.querySelector(".guess").value);
//   console.log(guess, typeof guess);

//   // When there is no input
//   if (!guess) {
//     // Same as guess == 0
//     displayMessage("No Number");

//     // when player wins
//   } else if (guess === secretNumber) {
//     displayMessage("Correct Number");
//     document.querySelector(".number").textContent = secretNumber;
//     document.querySelector("body").style.backgroundColor = "#60b347";
//     document.querySelector(".number").style.width = "30rem";

//     if (score > highscore) {
//       highscore = score;
//       document.querySelector(".highscore").textContent = highscore;
//     }

//     // When guess is wrong - refactoring code bellow
//   } else if (guess !== secretNumber) {
//     if (score > 1) {
//       displayMessage(guess > secretNumber ? "Too High" : "Too Low");
//       if (guess >= 21) {
//         displayMessage("Numbers between 1 and 20");
//       }
//       score--;
//       document.querySelector(".score").textContent = score;
//       document.querySelector(".tries").textContent += `${guess} `;
//     } else {
//       displayMessage("You lost the game");
//       document.querySelector(".score").textContent = 0;
//     }
//   }
// });

// document.querySelector(".again").addEventListener("click", function () {
//   secretNumber = Math.trunc(Math.random() * 20) + 1;
//   score = 20;

//   displayMessage("Start guessing...");
//   document.querySelector(".score").textContent = score;
//   document.querySelector(".number").textContent = "?";
//   document.querySelector(".guess").value = "";
//   document.querySelector(".tries").textContent = "Tries: ";

//   document.querySelector("body").style.backgroundColor = "#222";
//   document.querySelector(".number").style.width = "15rem";
// });

let randomNumber = Math.trunc(Math.random() * 20) + 1;
console.log(randomNumber);

const btnCheck = document.querySelector(".check");
const body = document.querySelector("body");
const message = document.querySelector(".message");
const scoreCounter = document.querySelector(".score");
const highscoreCounter = document.querySelector(".highscore");

btnCheck.addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess);

  if (guess === randomNumber) {
    message.textContent = "Win";
  } else if (guess !== randomNumber) {
    if (guess < randomNumber) {
      message.textContent = "Too Below";
    }
  }
});

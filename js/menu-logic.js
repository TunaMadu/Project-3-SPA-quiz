"use strict";

function createQuizMenu() {
  console.log("yo");
  document.addEventListener("DOMContentLoaded", () => {
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");

    button1.classList.add("option-button", "btn");
    button2.classList.add("option-button", "btn");

    button1.innerText = "Take a multiple choice quiz.";
    button2.innerText = "Take a true or false quiz.";

    const buttonContainer = document.querySelector(".quiz-options");

    buttonContainer.appendChild(button1);
    buttonContainer.appendChild(button2);

    mainMenuLogic(button1);
    mainMenuLogic(button2);
  });
}

function mainMenuLogic(button) {
  button.addEventListener("click", () => {
    if (!document.querySelector(".home-btn")) {
      addHomeNavigation();
    }
  });
}
function addHomeNavigation() {
  const mainContainer = document.querySelector("main");

  let homeBtn = document.createElement("span");
  homeBtn.classList.add("home-btn");
  homeBtn.innerText = "Home";

  mainContainer.appendChild(homeBtn);

  removeQuizMenu();
  homeMenuLogic();
}

function removeQuizMenu() {
  const buttonContainer = document.querySelector(".quiz-options");
  buttonContainer.innerHTML = "";
}

function homeMenuLogic() {
  let homeButton;
  if (document.querySelector(".home-btn")) {
    homeButton = document.querySelector(".home-btn");
    homeButton.addEventListener("click", () => {
      let mainContainer = document.querySelector("main");
      mainContainer.removeChild(homeButton);
    });
  }
}

function intialize() {
  createQuizMenu();
}

intialize();
// homeMenuLogic();

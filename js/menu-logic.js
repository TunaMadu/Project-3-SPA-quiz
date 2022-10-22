"use strict";

const quizMenu = document.querySelector(".quiz-option-section");
const quizButtons = document.querySelectorAll(".option-button");

const homeBtn = document.querySelector(".home-btn");

const question = document.querySelector(".quiz-section");

const removeQuizMenu = function () {
  if (homeBtn.classList.contains("hidden")) {
    quizMenu.classList.add("hidden");
    homeBtn.classList.remove("hidden");
  }
};
const removeHomeMenu = function () {
  if (!homeBtn.classList.contains("hidden")) {
    homeBtn.classList.add("hidden");
    quizMenu.classList.remove("hidden");
  }
};

const removeQuestion = function () {
  if (!question.classList.contains("hidden")) {
    question.classList.add("hidden");
  }
};

const showQuestion = function () {
  if (question.classList.contains("hidden"))
    question.classList.remove("hidden");
};

const intializeQuestions = function () {
  removeQuizMenu();
  showQuestion();
};

const resetDisplay = function () {
  removeHomeMenu();
  removeQuestion();
};

for (let i = 0; i < quizButtons.length; i++)
  quizButtons[i].addEventListener("click", intializeQuestions);

homeBtn.addEventListener("click", resetDisplay);

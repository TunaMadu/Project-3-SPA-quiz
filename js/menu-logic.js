"use strict";

const quizMenu = document.querySelector(".quiz-option-section");
const quizButtons = document.querySelectorAll(".option-button");

const homeBtn = document.querySelector(".home-btn");

const questionSection = document.querySelector(".quiz-section");

const removeAndAddElement = function (hide, show) {
  hide.classList.add("hidden");
  show.classList.remove("hidden");
};

const removeQuizMenu = function () {
  if (homeBtn.classList.contains("hidden"))
    removeAndAddElement(quizMenu, homeBtn);
};
const removeHomeMenu = function () {
  if (!homeBtn.classList.contains("hidden"))
    removeAndAddElement(homeBtn, quizMenu);
};

const removeQuestion = function () {
  if (!questionSection.classList.contains("hidden"))
    questionSection.classList.add("hidden");
};

const showQuestion = function () {
  if (questionSection.classList.contains("hidden"))
    questionSection.classList.remove("hidden");
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

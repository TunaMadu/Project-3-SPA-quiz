"use strict";

const NUMBEROFQUESTIONS = 5;
let correctAnswered = 0;
let randomQuestion;
let generatedNumberList = new Map();

let mcButton = document.querySelector("#MC-quiz");
let generateNumber = (length) => Math.trunc(Math.random() * length);

mcButton.addEventListener("click", () => makeQuestion());

let makeQuestion = () => {
  getRandomQuestion().then((data) => {
    setRandomQuestion(data);
    createHTML(randomQuestion);
    answerLogic(randomQuestion);
    console.log(generatedNumberList);
    console.log(correctAnswered);
  });
};

let getRandomQuestion = async () => {
  let response = await fetch(
    "https://my-json-server.typicode.com/TunaMadu/quiz-questions/mc-questions"
  );
  return await response.json();
};

//set a new question
let setRandomQuestion = (data) => {
  let randomNum = generateNewNumber(data);
  setQuestions(randomNum, data);
};

//if the question has already been asked then will continue to generate a new number.
let generateNewNumber = (data) => {
  let generatedNumber = generateNumber(data.length);

  while (generatedNumberList.has(generatedNumber))
    generatedNumber = generateNumber(data.length);

  return generatedNumber;
};

let setQuestions = (num, data) => {
  generatedNumberList.set(num);
  randomQuestion = data[num];
};

let createHTML = (randomQuestion) => {
  let questionTemplate = document.querySelector("#question-template").innerHTML;
  let compileTemplate = Handlebars.compile(questionTemplate);
  let generatedHTML = compileTemplate(randomQuestion);

  let questionContainer = document.querySelector(".quiz-section");
  questionContainer.innerHTML = generatedHTML;
};

var home = document.querySelector(".home-btn");

//resets the status of the page.

home.addEventListener("click", () => {
  let question = document.querySelector(".quiz-section");
  question.innerHTML = "";
  generatedNumberList.clear();
  correctAnswered = 0;
  console.log(correctAnswered);

  console.log(generatedNumberList);
});

let answerLogic = (question) => {
  let mcQuestionAnswers = document.querySelectorAll(".answer-button");

  for (let i = 0; i < mcQuestionAnswers.length; i++) {
    let choice = mcQuestionAnswers[i];

    choice.addEventListener("click", () => {
      if (choice.innerText === question.answer) {
        correctAnswer();
      } else {
        inCorrectAnswer();
      }
    });
  }
};

let correctAnswer = function () {
  let showSuccess = document.querySelector(".alert-success");
  showSuccess.classList.remove("hidden");

  sleepMessage(showSuccess);
};

let inCorrectAnswer = function () {
  let showIncorrect = document.querySelector(".alert-danger");
  showIncorrect.classList.remove("hidden");

  sleepMessage(showIncorrect);
};

let sleepMessage = (answerStatus) => {
  setTimeout(() => {
    answerStatus.classList.add("hidden");
  }, 1000);
};

"use strict";

const APIREF =
  "https://my-json-server.typicode.com/TunaMadu/quiz-questions/mc-questions";

const NUMBEROFQUESTIONS = 5;
let correctAnswered = 0;
let questionsAsked = 0;
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
  });
};

let getRandomQuestion = async () => {
  let response = await fetch(APIREF);
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

let answerLogic = (question) => {
  let mcQuestionAnswers = document.querySelectorAll(".answer-button");

  for (let i = 0; i < mcQuestionAnswers.length; i++) {
    let choice = mcQuestionAnswers[i];

    choice.addEventListener("click", () => {
      if (choice.innerText === question.answer) {
        correctAnswer();
        setTimeout(() => generateNewQuestion(), 900);
      } else {
        inCorrectAnswer();
        setTimeout(() => generateNewQuestion(), 900);
      }
    });
  }
};

let correctAnswer = function () {
  let showSuccess = document.querySelector(".alert-success");
  showSuccess.classList.remove("hidden");
  correctAnswered++;
  sleepAlert(showSuccess);
};

let inCorrectAnswer = function () {
  let showIncorrect = document.querySelector(".alert-danger");
  showIncorrect.classList.remove("hidden");

  sleepAlert(showIncorrect);
};

let sleepAlert = (answerStatus) => {
  setTimeout(() => {
    answerStatus.classList.add("hidden");
  }, 1000);
};

let generateNewQuestion = () => {
  if (questionsAsked < NUMBEROFQUESTIONS - 1) {
    //make a new question from the top!
    makeQuestion();
    console.log(questionsAsked);

    questionsAsked++;
  } else {
    showResult();
  }
};
//we have to work on this when we get back
let showResult = () => {
  switch (correctAnswered) {
    case 0:
      alert(`Not a single one???`);
      break;
    default:
      console.log(questionsAsked);

      alert(`Your score: ${correctAnswered}/${NUMBEROFQUESTIONS}`);
  }

  resetState();
  resetDisplay();
};

let resetState = () => {
  document.querySelector(".quiz-section").innerHTML = "";
  generatedNumberList.clear();
  correctAnswered = 0;
  questionsAsked = 0;
};

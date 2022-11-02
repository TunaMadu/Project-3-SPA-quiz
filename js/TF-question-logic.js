"use strict";

const APIREFERENCE =
  "https://my-json-server.typicode.com/TunaMadu/quiz-questions/tf-questions";

const NUMBEROFQUESTIONSASKED = 5;
let correcetAnsweredTF = 0;
let questionsAskedTF = 0;
let randomQuestionTF;
let generatedNumberListTF = new Map();

let tfButton = document.querySelector("#TF-quiz");
let generateNumberTF = (length) => Math.trunc(Math.random() * length);

tfButton.addEventListener("click", () => makeQuestionTF());

let makeQuestionTF = () => {
  getRandomQuestionTF().then((data) => {
    setRandomQuestionTF(data);
    createHTMLTF(randomQuestionTF);
    answerLogicTF(randomQuestionTF);
  });
};

let getRandomQuestionTF = async () => {
  let response = await fetch(APIREFERENCE);
  return await response.json();
};

//set a new question
let setRandomQuestionTF = (data) => {
  let randomNum = generateNewNumberTF(data);
  setQuestionsTF(randomNum, data);
};

//if the question has already been asked then will continue to generate a new number.
let generateNewNumberTF = (data) => {
  let generatedNumber = generateNumberTF(data.length);

  while (generatedNumberListTF.has(generatedNumber))
    generatedNumber = generateNumberTF(data.length);

  return generatedNumber;
};

let setQuestionsTF = (num, data) => {
  generatedNumberListTF.set(num);
  randomQuestionTF = data[num];
};

let createHTMLTF = (randomQuestionTF) => {
  let questionTemplate = document.querySelector("#question-template").innerHTML;
  let compileTemplate = Handlebars.compile(questionTemplate);
  let generatedHTML = compileTemplate(randomQuestionTF);

  let questionContainer = document.querySelector(".quiz-section");
  questionContainer.innerHTML = generatedHTML;
};

let answerLogicTF = (question) => {
  let mcQuestionAnswers = document.querySelectorAll(".answer-button");

  for (let i = 0; i < mcQuestionAnswers.length; i++) {
    let choice = mcQuestionAnswers[i];

    choice.addEventListener("click", () => {
      if (choice.innerText === question.answer) {
        correctAnswerTF();
        setTimeout(() => generateNewQuestionTF(), 900);
      } else {
        inCorrectAnswerTF();
        setTimeout(() => generateNewQuestionTF(), 900);
      }
    });
  }
};

let correctAnswerTF = function () {
  let showSuccess = document.querySelector(".alert-success");
  showSuccess.classList.remove("hidden");
  correcetAnsweredTF++;
  sleepAlertTF(showSuccess);
};

let inCorrectAnswerTF = function () {
  let showIncorrect = document.querySelector(".alert-danger");
  showIncorrect.classList.remove("hidden");

  sleepAlertTF(showIncorrect);
};

let sleepAlertTF = (answerStatus) => {
  setTimeout(() => {
    answerStatus.classList.add("hidden");
  }, 1000);
};

let generateNewQuestionTF = () => {
  if (questionsAskedTF < NUMBEROFQUESTIONSASKED - 1) {
    //make a new question from the top!
    makeQuestionTF();
    console.log(questionsAskedTF);

    questionsAskedTF++;
  } else {
    showResultTF();
  }
};
//we have to work on this when we get back
let showResultTF = () => {
  switch (correcetAnsweredTF) {
    case 0:
      alert(`Not a single one???`);
      break;
    default:
      console.log(questionsAskedTF);

      alert(`Your score: ${correcetAnsweredTF}/${NUMBEROFQUESTIONSASKED}`);
  }

  resetStateTF();
  resetDisplay();
};
let resetStateTF = () => {
  document.querySelector(".quiz-section").innerHTML = "";
  generatedNumberList.clear();
  correctAnswered = 0;
  questionsAsked = 0;
};

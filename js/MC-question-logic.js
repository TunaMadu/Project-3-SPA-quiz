"use strict";

let randomQuestion;
let generatedNumberList = new Map();

let generateNumber = (length) => Math.trunc(Math.random() * length);

let mcButton = document.querySelector("#MC-quiz");

let getRandomQuestion = async () => {
  let response = await fetch(
    "https://my-json-server.typicode.com/TunaMadu/quiz-questions/mc-questions"
  );
  return await response.json();
};

let setRandomQuestion = (data) => {
  let generatedNumber = generateNumber(data.length);
  //if the questions was already asked we should choose another question!
  while (generatedNumberList.has(data)) {
    generateNumber = generateNumber(data.length);
  }

  generatedNumberList.set(generatedNumber);
  randomQuestion = data[generatedNumber];
  console.log(randomQuestion);
};

let createHTML = (randomQuestion) => {
  let questionTemplate = document.querySelector("#question-template").innerHTML;
  let compileTemplate = Handlebars.compile(questionTemplate);
  let generatedHTML = compileTemplate(randomQuestion);

  let questionContainer = document.querySelector(".quiz-section");
  questionContainer.innerHTML = generatedHTML;
};
mcButton.addEventListener("click", () => {
  getRandomQuestion().then((data) => {
    setRandomQuestion(data);
    createHTML(randomQuestion);
    console.log(generatedNumberList);
  });
});

var home = document.querySelector(".home-btn");

home.addEventListener("click", () => {
  let question = document.querySelector(".quiz-section");
  question.innerHTML = "";
  generatedNumberList.clear();
  console.log(generatedNumberList);
});

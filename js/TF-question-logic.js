"use strict";

let randomQuestionTF;
let generatedNumberListTF = new Map();

let generateNumberTF = (length) => Math.trunc(Math.random() * length);

let tfButton = document.querySelector("#TF-quiz");

let getrandomQuestionTF = async () => {
  let response = await fetch(
    "https://my-json-server.typicode.com/TunaMadu/quiz-questions/tf-questions"
  );
  return await response.json();
};

let setrandomQuestionTF = (data) => {
  let generatedNumber = generateNumberTF(data.length);
  while (generatedNumberList.has(data)) {
    generateNumber = generateNumber(data.length);
  }
  generatedNumberListTF.set(generatedNumber);
  randomQuestionTF = data[generatedNumber];
  console.log(randomQuestionTF);
};

let createHTMLTF = (randomQuestionTF) => {
  let questionTemplate = document.querySelector("#question-template").innerHTML;
  let compileTemplate = Handlebars.compile(questionTemplate);
  let generatedHTML = compileTemplate(randomQuestionTF);

  let questionContainer = document.querySelector(".quiz-section");
  questionContainer.innerHTML = generatedHTML;
};

tfButton.addEventListener("click", () => {
  getrandomQuestionTF().then((data) => {
    setrandomQuestionTF(data);
    createHTMLTF(randomQuestionTF);
    console.log(generatedNumberListTF);
  });
});
var home = document.querySelector(".home-btn");

home.addEventListener("click", () => {
  let question = document.querySelector(".quiz-section");
  question.innerHTML = "";
  generatedNumberListTF.clear();
  console.log(generatedNumberListTF);
});

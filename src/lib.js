import fs from "fs";

export const chooseRandom = (array = [], numItems) => {
  if (array.length <= 1) {
    return array;
  }
  if (numItems <= 1 || numItems > array.length) {
    numItems = Math.floor((Math.random() * array.length) + 1) ;
  }
  return array.slice(0, numItems).sort(() => 1 - Math.random());
};

export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  let arrPrompt = [];
  for (let questionNumber = 1; questionNumber <= numQuestions; questionNumber++) {
    arrPrompt.push({
      type: "input",
      name: `question-${questionNumber}`,
      message: `Enter question ${questionNumber}`,
    });
    for (let choiceNumber = 1; choiceNumber <= numChoices; choiceNumber++) {
      arrPrompt.push({
        type: "input",
        name: `question-${questionNumber}-choice-${choiceNumber}`,
        message: `Enter answer choice ${choiceNumber} for question ${questionNumber}`,
      });
    }
  }
  return arrPrompt;
};

export const createQuestions = items => {
  let arrQuestion = []
  let item
  for (let key in items) {
    if (key.includes(`-choice-`)) {
      item.choices.push(items[key])
    } 
    else {
      item = {
        type: "list",
        name: key,
        message: items[key],
        choices: [],
      }
      arrQuestion.push(item)
    }
  }
  return arrQuestion;
};

export const readFile = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)));
  });

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) =>
      err ? reject(err) : resolve("File saved successfully")
    );
  });

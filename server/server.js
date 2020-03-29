const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

const calcHist = [];

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));

// GET & POST Routes go here
//POST Route for calculation

//I think this is taking the calculation input and then sending it via post and then its requesting the values
//and then sending them to the client to display?
//When the submit (`=` button) is clicked, capture this input, bundle it up in an object, and send this object to the server via a POST. - done
app.post('/calc', (req, res) => {
  let inputOne = req.body.inputOne;
  let inputTwo = req.body.inputTwo;
  let operator = req.body.operator;
  let calcAnswerDisplay = 0;

  //calculation
  //Keep this for reference. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
  switch (operator) {
    case '+':
      calcAnswerDisplay = Number(inputOne) + Number(inputTwo);
      break;
    case '-':
      calcAnswerDisplay = Number(inputOne) - Number(inputTwo);
      break;
    case '*':
      calcAnswerDisplay = Number(inputOne) * Number(inputTwo);
      break;
    case '/':
      calcAnswerDisplay = Number(inputOne) / Number(inputTwo);
      break;
  }

  let calcObject = {
    inputOne: inputOne,
    inputTwo: inputTwo,
    operator: operator,
    calcAnswerDisplay: calcAnswerDisplay
  };
  calcHist.push(calcObject);
  res.send(calcObject); //should be sending what is calculated over to the client. I think. https://sailsjs.com/documentation/reference/response-res/res-send
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

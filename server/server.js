const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

let history = [];

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('server/public'));

app.get('/calc', (req, res) => {
  res.send(history);
});

app.get('/calc', (req, res) => {
  const equation = {
    num1: parseInt(req.body.num1),
    num2: parseInt(req.body.num2),
    operator: req.body.operator
  };

  if (equation.operation === 'add') {
    equation.answer = equation.num1 + equation.num2;
  } else if (equation.operation === 'sub') {
    equation.answer = equation.num1 - equation.num2;
  } else if (equation.operation === 'mul') {
    equation.answer = equation.num1 * equation.num2;
  } else if (equation.operation === 'div') {
    equation.answer = equation.num1 / equation.num2;
  }

  history.push(equation);

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port, ${PORT}`);
});

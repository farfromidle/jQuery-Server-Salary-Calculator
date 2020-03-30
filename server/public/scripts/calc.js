$(document).ready(init);

let operator = '';

function init() {
  $('#btnAdd').on('click', clickAdd);
  $('#btnSub').on('click', clickSub);
  $('#btnMul').on('click', clickMul);
  $('#btnDiv').on('click', clickDiv);
  $('#btnEql').on('click', clickEql);
  $('#btnClr').on('click', clickClr);

  getEquations();
}

function clickAdd() {
  operator = 'add';
}

function clickSub() {
  operator = 'sub';
}

function clickMul() {
  operator = 'mul';
}

function clickDiv() {
  operator = 'div';
}

function clickEql() {
  const dataServer = {
    num1: $('#inputOne').val(),
    num2: $('#inputTwo').val(),
    operator: operator
  };

  postEquation(dataServer);
}

function postEquation(dataServer) {
  $.ajax({
    type: 'POST',
    url: '/calc',
    data: dataServer
  })
    .then(response => {
      console.log(response);
      getEquations();
    })
    .catch(err => {
      console.warn(err);
    });
}

function getEquations() {
  $.ajax({
    type: 'Get',
    url: 'calc'
  })
    .then(response => {
      console.log(response);
      render(response);
    })
    .catch(err => {
      console.warn(err);
    });
}

function render(equationArray) {
  $('.js-answer').empty();
  $('.js-answer').append(`
        <h4>${equationArray[equationArray.length - 1].answer}</h4>
    `);

  let equationSymbol = '';

  $('.js-history').empty();
  for (let equation of equationArray) {
    if (equation.operation === 'add') {
      equationSymbol = '+';
    } else if (equation.operation === 'sub') {
      equationSymbol = '-';
    } else if (equation.operation === 'mul') {
      equationSymbol = '*';
    } else if (equation.operation === 'div') {
      equationSymbol = '/';
    }

    $('.js-history').append(`
        <p>${equation.num1} ${equationSymbol} ${equation.num2} = ${equation.answer}</p>
    `);
  }
}

function clickClr() {
  $('#inputOne').val('');
  $('#inputTwo').val('');

  operator = '';
}

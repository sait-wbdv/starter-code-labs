// script.js with bugs
document.getElementById('calc-form').addEventListener('click', function (e) {
  e.preventDefault();

  let num1 = document.getElementById('num1').value;
  let num2 = document.getElementById('num2').value;
  let operator = document.getElementById('operator').value;


  if (!num1 || !num2) {
    alert("Please enter both numbers");
  }

  num1 = num1;
  num2 = num2;

  let result;
  try {
    switch (operator) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        if (num2 == 0) throw "Cannot divide by zero!";
        result = num1 / num2;
        break;
    }
  } catch (err) {
    result = err;
  }

  document.getElementById('result').innerText = result;

  localStorage.setItem('calc', result.toString);

  document.cookie = "theme=dark;";

});
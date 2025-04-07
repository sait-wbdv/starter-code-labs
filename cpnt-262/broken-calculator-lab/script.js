document.addEventListener("DOMContentLoaded", () => {
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");
  const operatorSelect = document.getElementById("operator");
  const calculateBtn = document.getElementById("calculate");
  const resultDisplay = document.getElementById("result");

  // Display last result if available
  const lastCalc = localStorage.getItem("lastCalculation");
  if (lastCalc) {
    try {
      const parsed = JSON.parse(lastCalc);
      resultDisplay.innerText = `Previous: ${parsed.res}`;
    } catch (e) {
      console.error("Error parsing stored calculation:", e);
    }
  }

  calculateBtn.addEventListener("click", () => {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operator = operatorSelect.value;

    // Validate inputs
    if (isNaN(num1) || isNaN(num2)) {
      resultDisplay.innerText = "Please enter valid numbers!";
      return;
    }

    let result;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        if (num2 === 0) {
          resultDisplay.innerText = "Cannot divide by zero!";
          return;
        }
        result = num1 / num2;
        break;
      default:
        resultDisplay.innerText = "Invalid operator selected.";
        return;
    }

    // Display result
    resultDisplay.innerText = `Result: ${result}`;

    // Save to localStorage
    const calcData = {
      a: num1,
      b: num2,
      op: operator,
      res: result,
    };

    localStorage.setItem("lastCalculation", JSON.stringify(calcData));
  });
});

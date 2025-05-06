let display = document.getElementById('display');
let errorMsg = document.getElementById('error-message');
display.value = '0';

function appendValue(val) {
  errorMsg.textContent = '';
  if (display.value === '0' && !isOperator(val) && val !== '.') {
    display.value = val;
  } else {
    display.value += val;
  }
}

function clearDisplay() {
  display.value = '0';
  errorMsg.textContent = '';
}

function deleteLast() {
  if (display.value.length <= 1) {
    display.value = '0';
  } else {
    display.value = display.value.slice(0, -1);
  }
  errorMsg.textContent = '';
}

function calculate() {
  let expression = display.value;

  if (!isValidExpression(expression)) {
    display.value = '0';
    errorMsg.textContent = 'Invalid Expression';
    return;
  }

  try {
    let result = eval(expression.replace('%', '/100'));
    display.value = result;
  } catch (e) {
    display.value = 'Error';
  }
}

function isOperator(char) {
  return ['+', '-', '*', '/', '%', '(', ')'].includes(char);
}

function isValidExpression(expr) {
  const invalidPatterns = [
    /[+\-*/%]{2,}/,       
    /\.\./,               
    /^[*/+%]/,            
    /[*/+%-]$/,           
    /\(\)/,               
    /[^0-9+\-*/().%]/    
  ];
  if (!areParenthesesBalanced(expr)) return false;
  return !invalidPatterns.some(p => p.test(expr));
}

function areParenthesesBalanced(expr) {
  let stack = [];
  for (let char of expr) {
    if (char === '(') stack.push(char);
    else if (char === ')') {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}


document.addEventListener('keydown', function(event) {
    const key = event.key;
  
    if (!isNaN(key) || isOperator(key) || key === '.') {
      appendValue(key);
      simulateButtonPress(key);
    } else if (key === 'Enter') {
      event.preventDefault();
      calculate();
      simulateButtonPress('=');
    } else if (key === 'Backspace') {
      deleteLast();
      simulateButtonPress('⌫');
    } else if (key === 'Delete') {
      clearDisplay();
      simulateButtonPress('C');
    }
});
  
function simulateButtonPress(key) {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
      if (btn.textContent === key || (key === "Enter" && btn.textContent === "=")) {
        btn.classList.add("pressed");
        setTimeout(() => btn.classList.remove("pressed"), 100);
      }
    });
  }
  
import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";

function Calculator() {
  const [expression, setExpression] = useState([]);
  const [answer, setAnswer] = useState(0);
  const [openBracket, setOpenBracket] = useState(true);

  const calculateExpression = (expression) => {
    const expressionString = expression.join("");
    try {
      const result = evaluate(expressionString);
      setAnswer(result);
    } catch (error) {}
  };

  const handleExpression = (value) => {
    const operators = ["+", "-", "/", "*", "."];
    const lastChar = expression.slice(-1)[0];
    if (operators.includes(lastChar) && operators.includes(value)) {
      if (value !== lastChar) {
        setExpression((prev) => [...prev.slice(0, -1), value]);
      } else {
        setExpression((prev) => [...prev]);
      }
    } else {
      setExpression((prev) => [...prev, value]);
    }
    if (value === "(") {
      setOpenBracket(false);
    } else if (value === ")") {
      setOpenBracket(true);
    }
  };

  useEffect(() => {
    calculateExpression(expression);
    setExpression(expression);
  }, [expression]);

  const keyMap = {
    0: "button-0",
    1: "button-1",
    2: "button-2",
    3: "button-3",
    4: "button-4",
    5: "button-5",
    6: "button-6",
    7: "button-7",
    8: "button-8",
    9: "button-9",
    "+": "button-plus",
    "-": "button-minus",
    "*": "button-multiply",
    "/": "button-divide",
    "=": "button-equals",
    ".": "button-dot",
    c: "button-c",
    Backspace: "button-backspace",
  };

  useEffect(() => {
    const keyDown = (e) => {
      const buttonId = keyMap[e.key];
      if (buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
          button.classList.add("button-active");

          button.click();

          setTimeout(() => {
            button.classList.remove("button-active");
          }, 100);
        }
      }
    };

    window.addEventListener("keydown", keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, []);

  const clearAll = () => {
    setExpression([]);
    setAnswer(0);
  };
  const backspace = (expression) => {
    setExpression((prev) => [...prev.slice(0, -1)]);
  };

  const containsNumbers = (expression) => {
    return expression.some(
      (char) => !isNaN(parseFloat(char)) && isFinite(char)
    );
  };
  const swap = (expression, answer) => {
    if (containsNumbers(expression)) {
      setExpression(String(answer).split(""));
    } else {
      clearAll();
    }
  };

  return (
    <div className="calculator">
      <div className="result-display">
        <div className="expression">{expression}</div>
        <div className="current">{answer}</div>
      </div>
      <div className="buttons">
        <button id="button-c" onClick={() => clearAll()} className="operation">
          C
        </button>
        <button
          id="button-divide"
          onClick={() => handleExpression("/")}
          className="operation"
        >
          ÷
        </button>
        <button
          id="button-multiply"
          onClick={() => handleExpression("*")}
          className="operation"
        >
          ×
        </button>
        <button
          id="button-backspace"
          className="operation"
          onClick={() => backspace(expression)}
        >
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <button id="button-7" onClick={() => handleExpression(7)}>
          7
        </button>
        <button id="button-8" onClick={() => handleExpression(8)}>
          8
        </button>
        <button id="button-9" onClick={() => handleExpression(9)}>
          9
        </button>
        <button
          id="button-plus"
          className="operation"
          onClick={() => handleExpression("+")}
        >
          +
        </button>

        <button id="button-4" onClick={() => handleExpression(4)}>
          4
        </button>
        <button id="button-5" onClick={() => handleExpression(5)}>
          5
        </button>
        <button id="button-6" onClick={() => handleExpression(6)}>
          6
        </button>
        <button
          id="button-minus"
          onClick={() => handleExpression("-")}
          className="operation"
        >
          -
        </button>

        <button id="button-1" onClick={() => handleExpression(1)}>
          1
        </button>
        <button id="button-2" onClick={() => handleExpression(2)}>
          2
        </button>
        <button id="button-3" onClick={() => handleExpression(3)}>
          3
        </button>
        <button
          id="button-dot"
          onClick={() => handleExpression(".")}
          className="operation"
        >
          .
        </button>

        <button id="button-0" onClick={() => handleExpression("0")}>
          0
        </button>
        <button onClick={() => handleExpression(`${openBracket ? "(" : ")"}`)}>
          ( )
        </button>
        <button className="span" onClick={() => swap(expression, answer)}>
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;

const lengthInput = document.querySelector("#length-input");
const lengthNumber = document.querySelector(".password-length");
const checkBoxes = [...document.querySelectorAll("input[type=checkbox]")];
const strengthText = document.querySelector(".strength-rating-text");
const ratings = [...document.querySelectorAll(".rating")];
const pad = document.querySelector(".password-generator");
const genButton = document.querySelector(".generate-button");
const passwordText = document.querySelector(".password");
const copyBtn = document.querySelector("#copy-svg");

setLengthInputBackground();
checkPasswordStrength();

lengthInput.addEventListener("input", () => {
  setLengthInputBackground();
  checkPasswordStrength();
});

pad.addEventListener("click", (event) => {
  if (event.target.tagName === "INPUT") {
    checkPasswordStrength();
  }
});

genButton.addEventListener("click", () => {
  const password = generatePassword();
  passwordText.value = password;
});

copyBtn.addEventListener("click", () => {
  passwordText.select();
  navigator.clipboard.writeText(passwordText.value);
  window.getSelection().removeAllRanges();
});

function setLengthInputBackground() {
  const value =
    ((lengthInput.value - lengthInput.min) /
      (lengthInput.max - lengthInput.min)) *
    100;
  lengthInput.style.setProperty("--value", `${value}%`);
  lengthNumber.textContent = lengthInput.value;
}

function checkPasswordStrength() {
  let strengthNumber = checkBoxes.reduce((accoumalator, value) => {
    if (value.checked) accoumalator += 1;
    return accoumalator;
  }, 0);
  setPasswordStrength(strengthNumber);
}

function setPasswordStrength(number) {
  let text;
  if (lengthInput.value < 8) {
    number = 1;
  }
  if (number === 1) text = "Very Weak";
  else if (number === 2) text = "Weak";
  else if (number === 3) text = "Medium";
  else if (number === 4) text = "Strong";

  strengthText.textContent = text;

  ratings.forEach((rating, index) => {
    if (index < number) {
      rating.style.backgroundColor = "#f8cd65";
    } else {
      rating.style.backgroundColor = "";
    }
  });
}

function generatePassword() {
  const lowercaseLetters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const uppercaseLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const specialCharacters = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "[",
    "]",
    "{",
    "}",
    "\\",
    "|",
    ";",
    ":",
    "'",
    '"',
    ",",
    ".",
    "<",
    ">",
    "/",
    "?",
    "`",
    "~",
  ];
  let passwordPool = [];
  if (
    checkBoxes[0].checked ||
    checkBoxes[1].checked ||
    checkBoxes[2].checked ||
    checkBoxes[3].checked
  ) {
    if (checkBoxes[0].checked) {
      passwordPool = passwordPool.concat(uppercaseLetters);
    }
    if (checkBoxes[1].checked) {
      passwordPool = passwordPool.concat(lowercaseLetters);
    }
    if (checkBoxes[2].checked) {
      passwordPool = passwordPool.concat(numbers);
    }
    if (checkBoxes[3].checked) {
      passwordPool = passwordPool.concat(specialCharacters);
    }
    let password = [];
    for (let i = 0; i < lengthInput.value; i++) {
      let rand = Math.round(Math.random() * passwordPool.length - 1);
      password.push(passwordPool[rand]);
    }
    passwordPool = [];
    return password.join("");
  }
  return "Check options";
}

var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#color-display");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var easyButton = document.querySelector(".mode");

function init() {
    colorDisplay.textContent = pickedColor;
    setupSquares();
    setupMode();
    reset();
}

//Reset button event
resetButton.addEventListener("click", function () {
    reset();
});

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function () {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct";
                messageDisplay.classList.add("correct");
                messageDisplay.classList.remove("incorrect")
                changeColors(pickedColor);
                setTimeout(reset, 1500);
            }
            else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again";
                messageDisplay.classList.remove("correct");
                messageDisplay.classList.add("incorrect");
            }
        });
    }
}

//Easy and hard squares
function setupMode() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            for (var i = 0; i < modeButtons.length; i++) {
                modeButtons[i].classList.remove("selected");
            }
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numSquares = 3;
            }
            else {
                numSquares = 6;
            }
            reset();
        });
    }
}

//Function to reset colors
function reset() {
    colors = genRandomColors(numSquares);
    pickedColor = chooseColor();
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = "#DE4527";
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
}

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
        h1.style.backgroundColor = color;
    }
}

function chooseColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function genRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(makeColor());
    }
    return arr;
}

function makeColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

init();
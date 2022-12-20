//initiate global variables
const timeLeft = document.getElementById("timer");
const startEl = document.getElementById("start-button");
const answerP = document.getElementById("answerP");
const buttonOneEl = document.getElementById("button-one");
const buttonTwoEl = document.getElementById("button-two");
const buttonThreeEl = document.getElementById("button-three");
const buttonFourEl = document.getElementById("button-four");
var score = timer;
var questionIndex = 0;
var timer = 75;
var countdown = 0;
var points = 0;
//localStorage.clear();
var clearHighScores = document.getElementById("clearHighScores");
clearHighScores.addEventListener("click", function(){
    localStorage.clear();
});
//runs a function when the start button is clicked that starts the timer and displays the first question
startEl.addEventListener("click", function () {
    if (countdown === 0) {
        countdown = setInterval(function () {
            timer--
            timeLeft.innerHTML = "Time Left: " + timer;
            if (timer <= 0) {
                clearInterval(countdown)
                gameOver();
                timeLeft.innerHTML = "Times up!"
            }
        }, 1000)
    }
    displayQuestions(questionIndex);
});
//display the remainder of the questions
function displayQuestions(questionIndex,) {
    if (questionIndex < question.length) {
        //initiate variables for the function
        var startButton = document.querySelector("#start-button");
        var buttons = document.querySelectorAll("button");
        var p = document.getElementById("p");
        document.getElementById("question").innerHTML = question[questionIndex].question;
        //hide the start button and the first paragraph
        startButton.className = "hide";
        p.className = "hide";
        // This for loop creates the buttons and adds the content
        for (let i = 0; i < buttons.length - 1; i++) {
           buttons[i].className = "button-styling";
         buttons[i].innerHTML = question[questionIndex].mc[i]
        }
    }
    else {
        gameOver()
    }
}
//event listeners for the mutiple choice buttons
    buttonOneEl.addEventListener("click", function () {
        clickIndex = 0;
        isCorrect(clickIndex);
    });
    buttonTwoEl.addEventListener("click", function () {
        clickIndex = 1;
        isCorrect(clickIndex);
    });
    buttonThreeEl.addEventListener("click", function () {
        clickIndex = 2;
        isCorrect(clickIndex);
    });
    buttonFourEl.addEventListener("click", function () {
        clickIndex = 3;
        isCorrect(clickIndex);
    });
    // this function figures out if they clicked on the correct button
function isCorrect(clickIndex) {
    if (question[questionIndex].mc[clickIndex] != question[questionIndex].correct) {
        answerP.innerHTML = "Wrong!";
        timer = timer - 10;
        questionIndex++;
        displayQuestions(questionIndex);
    }
    else {
        console.log("correct!");
        answerP.innerHTML = "Correct!";
        questionIndex++;
        points += 5;
        displayQuestions(questionIndex);
    }
}
//when the timer runs out or the questions are finished, creates allows you to enter your initials and score
function gameOver() {
    console.log("game over!");
    score = points + timer;
    if (score < 0){
        score = 0;
    }
    timer = 0;
    document.getElementById("question").innerHTML = "All Done!";
    var p = document.getElementById("p");
    p.setAttribute("style", "display:unset");
    document.getElementById("p").innerHTML = "Your final score is " + score;
    var form = document.querySelector("form");
    form.setAttribute("style", "display:unset; margin-top:2%");
    submit = document.getElementById("submit-button");
    submit.className = "button-styling";
    submit.addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("question").innerHTML = "High Scores!";
        form.setAttribute("style", "display:none; margin-top:2%");
        submit.className = "hide";
        answerP.innerHTML = "";
        document.getElementById("p").innerHTML = "";
        var initials = document.getElementById("initials");
        highScores();
    })
    //this hides the buttons
    var buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length - 1; i++) {
        buttons[i].setAttribute("style", "display:none");
    }
}
//runs when they submit their initials, adds the initials to local storage which is sorted high to low and displayed on the screen
function highScores() {
    var highScore = [];
    highScore.push({ initials: initials.value, score: score });
    var highScores = JSON.parse(localStorage.getItem('highScore')) || [];
    highScores.push({ initials: initials.value, score: score });
    function compare(a, b) {
        return b.score - a.score;
    }
    highScores.sort(compare);
    localStorage.setItem("highScore", JSON.stringify(highScores));
    for (let i = 0; i < highScores.length; i++) {
        answerP.setAttribute("style", "margin-left: 40vh; text-align:left");
        answerP.innerHTML += highScores[i].initials + " " + highScores[i].score + "<br/>";
    }
    submit = document.getElementById("submit-button");
    submit.className = "button-styling";
   return false;
}


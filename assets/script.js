const questionsArr = [
    {
        question: "Which of the following methods can be used to round a number to the nearest integer?:",
        options: {
            a: "A. Math.round()", 
            b: "B. Math.floor()", 
            c: "C. Math.ceil()", 
            d: "D. Math.trunc()",
        },
        answer: "a"
    },
    {
        question: "What does the === operator signify in JavaScript?",
        options: {
            a: "A. Equality in value and type ", 
            b: "B. Equality in value only", 
            c: "C. Inequality in value and type", 
            d: "D. None of the above",
        },
        answer: "a"
    },
    {
        question: "How can you convert the string '123' into a number in JavaScript?",
        options: {
            a: "A. number('123')", 
            b: "B.parseInt('123')", 
            c: "C. '123' * 1", 
            d: "D. all of the above",
        },
        answer: "d"
    },
    {
        question: "Which of these is not a valid way to declare a variable in JavaScript as of ES6?",
        options: {
            a: "A. var", 
            b: "B. let", 
            c: "C. const", 
            d: "D. set",
        },
        answer: "d"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: {
            a: "A. JavaScript", 
            b: "B. terminal/bash", 
            c: "C. for loops", 
            d: "D. console.log",            
        },
        answer: "d"
    }
];






var header = document.querySelector(".header");
var opening = document.querySelector(".opening");
var container = document.querySelector(".container");
var divider = document.querySelector(".divider");
var result = document.querySelector(".result");
var scores = [];
var mark = 0;
var index = 0;
var record = [];

function start() {
    // restart
    var removeAll = container;
    while(removeAll.hasChildNodes()) {
        removeAll.removeChild(removeAll.firstChild);
    };

    // creating the view high scores
    var viewScore = document.createElement("p");
    viewScore.classList.add("banner", "view-score");
    viewScore.textContent = "View High Scores";
    // creating the timer
    var time = document.createElement("p");
    time.classList.add("banner", "time");
    time.textContent = "Time: ";
    var second = document.createElement("span");
    second.setAttribute('id', "second");
    time.appendChild(second);
    
    // create container title, text and button
    var opTitle = document.createElement("h1");
    opTitle.classList.add("title");
    opTitle.textContent = "Coding Quiz Challenge";
  
    var opText = document.createElement("p");
    opText.classList.add("text");
    opText.textContent = "Try to answer the following code-related questions within the time limit. incorrect answers will deduct 10 points and 10 seconds each from your score!";
  
    var startBtn = document.createElement("button");
    startBtn.classList.add("btn", "btn-start");
    startBtn.textContent = "Start Quiz";

    header.appendChild(viewScore);
    header.appendChild(time);
    container.appendChild(opTitle);
    container.appendChild(opText);
    container.appendChild(startBtn);

    // click to start, the timer start countdown
    document.querySelector(".btn-start").addEventListener("click", timer);
    // click to view high scores
    document.querySelector(".view-score").addEventListener("click", viewHighScore);
}

function createQuiz() {
    
    var removeAll = container;
    while(removeAll.hasChildNodes()) {
        removeAll.removeChild(removeAll.firstChild);
    };
    
    if (index < questionsArr.length) {
        // create quiz container and populate with questions and answer options
        var quizHere = document.createElement("div");
        quizHere.classList.add("quiz");
        container.appendChild(quizHere);
        
        var quizTitle = document.createElement("h1");
        quizTitle.classList.add("title");
        quizTitle.textContent = questionsArr[index].question;
        quizHere.appendChild(quizTitle);
       
        var optionsObj = questionsArr[index].options;
        for (var x in optionsObj) {
            var quizOption = document.createElement("button");
            quizOption.classList.add("btn", "btn-answer");
            if (x === questionsArr[index].answer) {
                quizOption.setAttribute("check", "correct");
            }
            quizOption.textContent = optionsObj[x];
            quizHere.appendChild(quizOption);
        }

        index++;

        divider.style.visibility = "visible";

        
        document.querySelector(".quiz").addEventListener("click", checkResult);

    } else {

        // create finished 
        var done = document.createElement("h2");
        done.classList.add("title");
        done.textContent = "finished!";
        container.appendChild(done);

        var sum = document.createElement("p");
        sum.classList.add("text");
        sum.textContent = "Your final score is " + mark + " !";
        container.appendChild(sum);

        // form
        var formEl = document.createElement("form");
        formEl.classList.add = ("form");
        container.appendChild(formEl);

        var label = document.createElement("label");
        label.classList.add("text");
        label.setAttribute("for", "name");
        label.textContent = "Enter initials:";
        formEl.appendChild(label);

        var input = document.createElement("input");
        input.classList.add("text");
        input.setAttribute("type", "text");
        input.setAttribute("name", "name");
        input.setAttribute("id", "name");
        input.setAttribute("placeholder", "name");
        formEl.appendChild(input); 

        var submit = document.createElement("button");
        submit.classList.add("btn", "btn-submit");
        submit.textContent = "Submit";
        formEl.appendChild(submit);

        // click submit button
        document.querySelector(".btn-submit").addEventListener("click", recordHighScore);
    }
}

// create the timer
function timer() {

    var timeLeft = 70;

    var timeInterval = setInterval(function() {

        var timeEl = document.querySelector("#second");
        timeEl.textContent = timeLeft + "s";
        timeLeft--;

        if (result.textContent.match(/wrong/gi)) {
            timeLeft -= 10; 
        }

        if (timeLeft < 0 || scores.length === questionsArr.length) {

            clearInterval(timeInterval);

            alert("Quiz is over");
            timeEl.textContent = 0 + "s";

            index += questionsArr.length;

            createQuiz();
        }
    }, 1000);

    createQuiz();
}

// function to check the results
function checkResult(event) {

    var targetEl = event.target;

    var check = document.createElement("p");
    check.classList.add("check-result");
    if (targetEl.hasAttribute("check")) {
        check.textContent = "Correct!";
        mark += 10;
    } else {
        check.textContent = "Wrong!";
        mark -= 10;
    }
    result.appendChild(check);
    scores.push(mark);

    setTimeout(() => {
        check.remove();
        createQuiz();
    }, 1000);   
}


function recordHighScore(event) {

    event.preventDefault();

    // clear scores array & index
    scores.length = 0;
    index = 0;

    var playerName = document.querySelector("#name").value;

    if (!playerName) {
        alert("please enter a name.");
    } else {
        var recordObj = {
            name: playerName,
            highScore: mark,
        }
    }

    record.push(recordObj);
    saveData();
    // reset mark
    mark = 0;
    viewHighScore();
}

function viewHighScore() {
    // clear page content
    header.style.border = "none";
    var removeHeader = header;
    while (removeHeader.hasChildNodes()) {
        removeHeader.removeChild(removeHeader.firstChild);
    }
    var removeContainer = container;
    while (removeContainer.hasChildNodes()) {
        removeContainer.removeChild(removeContainer.firstChild);
    }

    // create high scores board
    var highScoresTitle = document.createElement("h1");
    highScoresTitle.classList.add("title");
    highScoresTitle.textContent = "High Scores";
    container.appendChild(highScoresTitle);

    loadData();

    // create go back and clear high scores buttons
    var goBack = document.createElement("button");
    goBack.classList.add("btn", "btn-goBack");
    goBack.textContent = "Go Back";
    container.appendChild(goBack);

    var clear = document.createElement("button");
    clear.classList.add("btn", "btn-clear");
    clear.textContent = "Clear High Scores";
    container.appendChild(clear);

    document.querySelector(".btn-goBack").addEventListener("click", start);
    document.querySelector(".btn-clear").addEventListener("click", clearHistory);
}

// function to record the high scores and save them into local storage
function saveData() {
    localStorage.setItem("high scores", JSON.stringify(record));
}

function loadData() {

    var load = localStorage.getItem("high scores");

    if (!load) {
        return false;
    }

    load = JSON.parse(load);

    for (var i = 0; i < load.length; i++) {
        var highScorestext = document.createElement("li");
        highScorestext.classList.add("list", "text");
        highScorestext.setAttribute("id", "quiz-mark");
        highScorestext.textContent = load[i].name + " : " + load[i].highScore;
        container.appendChild(highScorestext);
    }
}

function clearHistory() {
    // clear localstorage
    window.localStorage.clear();
    document.querySelectorAll("#quiz-mark").forEach(removeHistory => removeHistory.remove());
}

start();
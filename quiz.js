const questions = [
    {
        question: "1.which is the structured lang?",
        options: ["css", "js", "html"],
        correctAnswer: 2
    },
    {
        question: "2.From the following which one is self closing tag? ",
        options: ["<h>", "<input>", "both"],
        correctAnswer: 1
    },
    {
        question: "3.Flex is a which dimensional property?",
        options: ["one-dimensional", "two-dimensional", "three-dimensional"],
        correctAnswer: 0
    },
    {
        question: "4.slice creates which array?",
        options: ["new array", "duplicate array", "both"],
        correctAnswer: 1
    },
    {
        question: "5.Arrow function version is?",
        options: ["ES-5", "ES-6", "not both"],
        correctAnswer: 1
    },
    {
        question: "6.In js how objects are created?",
        options: ["key and value", "value and key", "only values"],
        correctAnswer: 0
    },
    {
        question: "7.style tag use in a html page.which is known as?",
        options: ["inline css", "external css", "internal"],
        correctAnswer: 2
    },
    {
        question: "8.which of the following is used to increasing the content space?",
        options: ["margin", "padding", "border"],
        correctAnswer: 1
    },
    {
        question: "9.In js which of the following rounded the float values?",
        options: ["math.floor", "math.random", "math.round"],
        correctAnswer: 0
    },
    {
        question: "10.id name slector is? ",
        options: ["*", ".", "#"],
        correctAnswer: 2
    },
];
// console.log(questions);

let currentQuestion = 0;
let totalQuestions = questions.length;
// console.log(totalQuestions);
let timer;
let score = 0;
let timeLeft = 10;
let answers = [];
let nextEnabled = false;
let timeInterval;

function showQus() {
    if (currentQuestion < totalQuestions) {
        document.getElementById("question").textContent = questions[currentQuestion].question;
        const optionsContainer = document.getElementById("options-container");
        optionsContainer.innerHTML = "";

        questions[currentQuestion].options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option");
            button.onclick = () => selectAnswer(index);
            optionsContainer.appendChild(button);
            // console.log(button);

        });

        timeLeft = 10;
        startTimer();
        timer = setTimeout(showNxtQus, 10000);
        document.getElementById("next-button").style.display = "none";
        nextEnabled = false;
    }
    else {
        document.getElementById("question").textContent = "Quiz Over";
        document.getElementById("options-container").innerHTML = "";
        document.getElementById("timer").textContent = "",
            document.getElementById("next-button").style.display = "none";
        document.getElementById("submit-button").style.display = "block";
    }
}

function startTimer() {
    const timeDis = document.getElementById("timer");
    timeDis.textContent = `Time left:${timeLeft} sec`;
    clearInterval(timeInterval);
    // console.log(timeDis);

    timeInterval = setInterval(() => {
        timeLeft--;
        timeDis.textContent = `Time left:${timeLeft} sec`;
        // console.log(timeDis);
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            if (!nextEnabled) {
                showNxtQus();
            }
        }


        //  console.log(timeLeft);

    }, 1000);

}

function selectAnswer(selectedIndex) {
    clearTimeout(timer);
    // console.log(timer);
    // console.log(selectedIndex)
    clearInterval(timeInterval);

    answers[currentQuestion] = selectedIndex;
    const optionsContainer = document.getElementById("options-container");
    const buttons = optionsContainer.querySelectorAll(".option");
    // console.log(buttons);

    const correctAnswer = questions[currentQuestion].correctAnswer;
    // console.log(correctAnswer);


    buttons.forEach((button, index) => {
        if (index === correctAnswer) {
            button.classList.add("correct");
            // console.log(button);
            // console.log(index);


            if (index === selectedIndex) {
                score+=1;
                // console.log(index);

            }
        }
        else if (index === selectedIndex) {
            button.classList.add("wrong");
            // console.log(button);

        }
        button.onclick = null;
    });
    document.getElementById("next-button").style.display = "block";
    nextEnabled = true;
}
function showNxtQus() {
    currentQuestion++;
    showQus();
}

function subAns() {
    answers.forEach((selectedAnswer, questionIndex) => {
        if (selectedAnswer === questions[questionIndex].correctAnswer) {
            score;
        }
        // console.log(answers);

    });
    document.getElementById("result").textContent = `Your total score is ${score} out of ${totalQuestions * 1}`;
    document.getElementById("submit-button").style.display = "none";
    // document.getElementById("next-button").style.display = "none";
}
window.onload = function () {
    showQus();
    document.getElementById("next-button").onclick = showNxtQus;
};
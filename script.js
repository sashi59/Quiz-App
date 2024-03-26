const questions = [
    {
        question: "First Prime Minister of India?",
        answer: [
            { text: "Pt. Jawaharlal Nehru", correct: "true" },
            { text: "Lal Bahadur Shastri", correct: "false" },
            { text: "Narendra Modi", correct: "false" },
            { text: "Rajiv Gandhi", correct: "false" }
        ]
    },
    {
        question: "World's largest Dam is in which Country?",
        answer: [
            { text: "India", correct: "false" },
            { text: "Australia", correct: "false" },
            { text: "China", correct: "true" },
            { text: "Sweden", correct: "false" }
        ]
    },
    {
        question: "Who is Co-founder of FaceBook?",
        answer: [
            { text: "Elezabeth Olsen", correct: "false" },
            { text: "Steve Smith", correct: "false" },
            { text: "Mark Zukerberg", correct: "true" },
            { text: "Stev Jobs", correct: "false" }
        ]
    },
    {
        question: "What is the capital of Japan?",
        answer: [
            { text: "Yozutushima", correct: "false" },
            { text: "Tokyo", correct: "true" },
            { text: "Paletishita", correct: "false" },
            { text: "Kzuketra", correct: "false" }
        ]
    }
];

const nextButton = document.getElementById("next-button");
const answerButtons = document.getElementById("answer-buttons");
const questionElement = document.getElementById("question");

let score = 0;
let currentQuestionIndex = 0;

function startQuiz() {

    score = 0;
    currentQuestionIndex = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");

        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.answer = answer.correct;
        }

        button.addEventListener("click", selectedAnswer)

    });
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }


}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }

});

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
}

function selectedAnswer(e) {
    const selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.answer === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{

        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    })
    nextButton.style.display = "block";
    
};


startQuiz();
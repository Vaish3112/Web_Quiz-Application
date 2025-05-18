const loginPage = document.getElementById("login-page");
const guidelinesPage = document.getElementById("guidelines-page");
const loginBtn = document.getElementById("login-btn");
const startQuizBtn = document.getElementById("start-quiz-btn");
const quizPage = document.getElementById("quiz-page");
const nextBtn = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const explanationEl = document.getElementById("explanation");
const correctSound = new Audio('correct.mp3');
const incorrectSound = new Audio('incorrect.mp3');

let currentQuestionIndex = 0;
let score = 0;
const timeLimit = 10;
let timer;
let timeLeft = timeLimit;

const questions = [
    {
        question: " Which country has the highest number of official languages?",
        options: ["Switzerland", "India", "South Africa", "Canada"],
        answer: 2,
        explanation: " Explanation: South Africa has 11 official languages, including Zulu, Xhosa, Afrikaans, and English. This diverse linguistic landscape reflects the country's multicultural society."

    },
    {
        question: " What is the only metal that is liquid at room temperature?",
        options: ["Gallium", "Mercury", "Sodium", "Lead"],
        answer: 1,
        explanation: "Explanation: Mercury is the only metal that is liquid at room temperature, with a melting point of -38.83°C. It is commonly used in thermometers and barometers due to its unique properties."

    },
    {
        question: "Which element has the highest atomic number in the periodic table?",
        options: ["Uranium", " Oganesson", "Plutonium", "Californium"],
        answer: 1,
        explanation: " Explanation: Oganesson (Og) has the highest atomic number currently known, 118. It was named after Russian physicist Yuri Oganessian."

    },
    {
        question: "Which ancient civilization is credited with inventing the first writing system?",
        options: ["Ancient China", "Ancient Egypt", "Ancient Greece", "Mesopotamia"],
        answer: 3,
        explanation: " Explanation: The Sumerians of Mesopotamia invented the first known writing system, cuneiform, around 3500 BCE. This system involved using wedge-shaped marks on clay tablets to record information."

    },
    {
        question: "Who was the first woman to win a Nobel Prize?",
        options: ["Marie Curie", "Rosalind Franklin", "Dorothy Hodgkin", " Ada Lovelace"],
        answer: 0,
        explanation: " Explanation: Marie Curie was the first woman to win a Nobel Prize, earning the Nobel in Physics in 1903 alongside her husband Pierre Curie. She later won a second Nobel in Chemistry in 1911 for her discoveries in radioactivity."

    },
    {
        question: "In which year did the Titanic sink?",
        options: ["1921", "1898", " 1912", "1905"],
       answer: 2,
       explanation: " Explanation: The RMS Titanic sank on April 15, 1912, after hitting an iceberg in the North Atlantic Ocean. Over 1,500 people perished in the disaster, which was one of the deadliest maritime tragedies in history."

    },
    {
        question: " What is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        answer: 1,
        explanation: " Explanation: The Nile River, at about 6,650 kilometers (4,130 miles), is traditionally considered the longest river in the world. It flows through northeastern Africa, primarily through Egypt and Sudan. "

    },
    {
        question: "Which of these artists was a pioneer of Cubism?",
        options: [" Pablo Picasso", "Leonardo da Vinci", " Vincent van Gogh", " Claude Monet"], 
        answer: 0,
        explanation: " Explanation: Pablo Picasso, along with Georges Braque, was a founder of Cubism, an avant-garde art movement that revolutionized visual art in the early 20th century. "

    },
    {
        question: "What is the term for a word that is spelled the same forward and backward?",
        options: ["Oxymoron", "Anagram", "Homophone", "Palindrome"],
        answer: 3,
        explanation: " Explanation: A palindrome is a word, phrase, or number that reads the same backward as forward, such as radar or level.It is a form of wordplay and is often used in puzzles and linguistic games."

    },
    {
        question: "Who was the first man to journey into space?",
        options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin" , "John Glenn"],
        answer: 2,
        explanation: " Explanation: Yuri Gagarin, a Soviet cosmonaut, became the first human to journey into space on April 12, 1961, aboard Vostok 1."

    },
];


loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    if (username.trim()) {
        loginPage.classList.add("hidden");
        guidelinesPage.classList.remove("hidden");
    } else {
        alert("Please enter a username.");
    }
});

startQuizBtn.addEventListener("click", () => {
    guidelinesPage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    showQuestion();
});


function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    const options = document.querySelectorAll(".option-btn");
    explanationEl.classList.add("hidden");
    const question = questions[currentQuestionIndex];
    questionContainer.textContent = question.question;
    options.forEach((btn, index) => {btn.textContent = question.options[index];});
    resetTimer();
    startTimer();
    nextBtn.classList.add("hidden");
    document.getElementById("feedback").classList.add("hidden");
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;

}
   
function selectAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");
    const explanationTitle = document.createElement("div");
    explanationTitle.id = "explanation-title";
    explanationTitle.textContent = "Explanation:";
    const explanationText = document.createElement("div");
    explanationText.id = "explanation-text";
    explanationText.textContent = questions[currentQuestionIndex].explanation;

    explanationEl.innerHTML = ""; 
    explanationEl.appendChild(explanationTitle); 
    explanationEl.appendChild(explanationText);
    explanationEl.textContent = questions[currentQuestionIndex].explanation;
    explanationEl.classList.remove("hidden");
    if (selectedIndex === question.answer) {
        score++;
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        explanationEl.style.color = "black";          
        correctSound.play();
    } else {
        feedback.textContent = "Incorrect!";
        feedback.style.color = "red";
        explanationEl.style.color = "black";          
        incorrectSound.play();
    }
    feedback.classList.remove("hidden");

    document.getElementById("next-btn").style.display = "block";
    clearInterval(timer);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
    document.getElementById("next-btn").style.display = "none";
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").textContent = `Your score: ${score} / ${questions.length}`;
    document.getElementById("progress-bar").classList.add("hidden");
    explanationEl.classList.add("hidden");
    feedback.classList.add("hidden");
    clearInterval(timer); 
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz").style.display = "block";
    document.getElementById("result").style.display = "none";
    showQuestion();
}

function startTimer() {
    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    timerDisplay.style.color = "black";

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        
        if (timeLeft === 5) {
            timerDisplay.style.color = "red";
        }
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); 
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = timeLimit;
}

showQuestion();

let currentQuestionIndex = 0;
let score = 0;

// Question List
const originalQuestions = [
  {
    question: "What is 5 + 3?",
    options: ["5", "8", "12", "10"],
    answer: "8",
  },
  {
    question: "Which is a JavaScript library?",
    options: ["HTML", "CSS", "React", "SQL"],
    answer: "React",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Sheet System",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which language is used for web development?",
    options: ["JavaScript", "Python", "HTML", "All of the Above"],
    answer: "All of the Above",
  },
];

// DOM Elements
const homeScreen = document.querySelector(".home-screen");
const quizScreen = document.querySelector(".quiz-screen");
const resultScreen = document.querySelector(".result-screen");
const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question");
const optionsContainer = document.querySelectorAll(".option-btn");
const scoreSpan = document.getElementById("score");
const totalQuestionsSpan = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-btn");

let questions = [];

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// Shuffle Function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Start the quiz
function startQuiz() {
  homeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  currentQuestionIndex = 0;
  score = 0;

  // Shuffle questions and initialize for the game
  questions = [...originalQuestions];
  shuffle(questions);

  displayQuestion();
}

// Display the current question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.innerText = currentQuestion.question;

  optionsContainer.forEach((btn, index) => {
    if (index < currentQuestion.options.length) {
      btn.innerText = currentQuestion.options[index];
      btn.classList.remove("hidden");
      btn.onclick = () => handleAnswerSelection(btn.innerText);
    } else {
      btn.classList.add("hidden");
      btn.onclick = null;
    }
  });
}

// Handle answer selection
function handleAnswerSelection(selectedOption) {
  const correctAnswer = questions[currentQuestionIndex].answer;

  // Store the user's answer in the question object
  questions[currentQuestionIndex].userAnswer = selectedOption;

  if (selectedOption === correctAnswer) {
    alert("Correct Answer!");
    score++;
  } else {
    alert("Incorrect Answer.");
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    showResult();
  }
}

// Show the result screen
function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreSpan.innerText = score;
  totalQuestionsSpan.innerText = questions.length;

  // Add a summary report to the results screen
  const summaryContainer = document.querySelector('.question-ans');
  summaryContainer.innerHTML = ""; // Clear any previous content

  questions.forEach((q, index) => {
    const reportItem = document.createElement("p");
    reportItem.innerHTML = `
      Question ${index + 1}: ${q.question} <br>
      Your Answer: ${q.userAnswer || "No answer"} <br>
      Correct Answer: ${q.answer}
    `;
    summaryContainer.appendChild(reportItem);
  });
}

// Restart the quiz
function restartQuiz() {
  resultScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
  currentQuestionIndex = 0;
  score = 0;

  // Shuffle questions on restart
  questions = [...originalQuestions];
  shuffle(questions);
}

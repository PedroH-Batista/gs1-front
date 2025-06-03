//Criação do Slide Show
let slideIndex = 0;

function mostrarSlides() {
  let slides = document.querySelectorAll(".slide");

  slides.forEach((slide) => (slide.style.display = "none"));

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  slides[slideIndex - 1].style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  let slides = document.querySelectorAll(".slide");
  if (slides.length > 0) {
    slides.forEach((slide) => (slide.style.display = "none"));
    slides[0].style.display = "block";
  }
});

function mudarSlide(n) {
  slideIndex += n;
  let slides = document.querySelectorAll(".slide");

  if (slideIndex > slides.length) slideIndex = 1;
  if (slideIndex < 1) slideIndex = slides.length;

  slides.forEach((slide) => (slide.style.display = "none"));
  slides[slideIndex - 1].style.display = "block";
}

mostrarSlides();

//Criação do QUIZ
const quizData = [
  {
    question: "Você se sente seguro quando começa a chover na sua cidade?",
    options: ["Sim", "Não"],
    answer: 1,
  },
  {
    question: "Você ja este no meio de uma enchente?",
    options: ["Sim", "Não"],
    answer: 1,
  },
  {
    question:
      "Você acha que na sua cidade deveria ter um sistema para ajudar pessoas a prevenir enchentes?",
    options: ["Sim", "Não"],
    answer: 1,
  },
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

function loadQuestion() {
  resultEl.classList.add("hidden");
  answersEl.innerHTML = "";

  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;

  currentQuiz.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="radio" name="answer" value="${index}" />
        ${option}
      </label>
    `;
    answersEl.appendChild(li);
  });
}

function getSelected() {
  const radios = document.querySelectorAll('input[name="answer"]');
  let selected = undefined;
  radios.forEach((radio) => {
    if (radio.checked) selected = Number(radio.value);
  });
  return selected;
}

nextBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer === undefined) {
    alert("Por favor, selecione uma resposta!");
    return;
  }

  if (answer === quizData[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.classList.add("hidden");
  answersEl.classList.add("hidden");
  nextBtn.classList.add("hidden");

  resultEl.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
  resultEl.classList.remove("hidden");
}

loadQuestion();

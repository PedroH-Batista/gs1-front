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
window.addEventListener("DOMContentLoaded", function () {
  const quizData = [
    {
      question: "Você se sente seguro quando começa a chover na sua cidade?",
      options: ["Sim", "Não"],
    },
    {
      question: "Você já esteve no meio de uma enchente?",
      options: ["Sim", "Não"],
    },
    {
      question:
        "Você acha que na sua cidade deveria ter um sistema para ajudar pessoas a prevenir enchentes?",
      options: ["Sim", "Não"],
    },
    {
      question: "Você acha que sua cidade está preparada para enchentes?",
      options: ["Sim", "Não"],
    },
  ];

  let currentQuestion = 0;
  let respostas = [];

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
          <input type="radio" name="answer" value="${index}">
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

    respostas.push(answer);

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

    const naoCount = respostas.filter((r) => r === 1).length;
    const simCount = respostas.filter((r) => r === 0).length;

    let mensagem = "";
    if (naoCount > simCount) {
      mensagem = "Então você precisa conhecer o NOAH!";
    } else {
      mensagem = "Você deve conhecer o NOAH para ajudar pessoas próximas!";
    }

    resultEl.textContent = mensagem;
    resultEl.classList.remove("hidden");
  }

  loadQuestion();
});

//Verificação do Campo de Formulario
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formulario");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Nao envia automatico

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "") {
      alert("Por favor, preencha o nome.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    if (!validateTelefone(telefone)) {
      alert(
        "Por favor, insira um telefone válido (apenas números, mínimo 8 dígitos)."
      );
      return;
    }

    if (mensagem === "") {
      alert("Por favor, escreva uma mensagem.");
      return;
    }

    // Confirmacao do formulario
    alert("Formulário enviado com sucesso!");
    form.reset();
  });

  // Validação do Email
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Validação do telefone
  function validateTelefone(telefone) {
    const regex = /^\d{8,}$/;
    return regex.test(telefone);
  }
});

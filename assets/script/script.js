// ----------------------------------------------
// MENU HAMBURGUER E SCROLL SUAVE
// ----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // Scroll suave para menu e logo
  document.querySelectorAll('a.menu-link').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
  document.querySelectorAll('.logo-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('home').scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Menu hamburguer responsivo
  const btn = document.getElementById('hamburguer-btn');
  const links = document.getElementById('navbar-links');
  if (btn && links) {
    btn.addEventListener('click', function () {
      links.classList.toggle('open');
      btn.classList.toggle('active');
      btn.setAttribute('aria-expanded', btn.classList.contains('active'));
    });
    // Fecha menu ao clicar em link no mobile
    document.querySelectorAll('.menu-link').forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 900) {
          links.classList.remove('open');
          btn.classList.remove('active');
          btn.setAttribute('aria-expanded', false);
        }
      });
    });
  }
});

// ----------------------------------------------
// QUIZ INTERATIVO
// ----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // Perguntas do Quiz
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
      question: "Você acha que na sua cidade deveria ter um sistema para ajudar pessoas a prevenir enchentes?",
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

  // Carrega a pergunta e opções
  function loadQuestion() {
    resultEl.classList.add("hidden");
    answersEl.innerHTML = "";

    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;

    currentQuiz.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <label style="display: flex; align-items: center; gap: 8px; width:100%; cursor:pointer">
          <input type="radio" name="answer" value="${index}" />
          <span style="font-size: 1.09rem; width:100%">${option}</span>
        </label>
      `;
      // Seleção visual ao clicar
      li.addEventListener("click", function () {
        document.querySelectorAll('#answers li').forEach(l => l.classList.remove('selected'));
        li.classList.add('selected');
        li.querySelector('input').checked = true;
      });
      answersEl.appendChild(li);
    });
  }

  // Pega resposta selecionada
  function getSelected() {
    const radios = answersEl.querySelectorAll('input[name="answer"]');
    let selected = undefined;
    radios.forEach((radio) => {
      if (radio.checked) selected = Number(radio.value);
    });
    return selected;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const answer = getSelected();
      if (answer === undefined) {
        // Foco visual no campo não respondido
        answersEl.classList.add('shake');
        setTimeout(() => answersEl.classList.remove('shake'), 300);
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
  }

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

    // Botão para refazer quiz
    let restartBtn = document.createElement("button");
    restartBtn.textContent = "Recomeçar Quiz";
    restartBtn.className = "btn";
    restartBtn.style.marginTop = "20px";
    restartBtn.onclick = function () {
      currentQuestion = 0;
      respostas = [];
      questionEl.classList.remove("hidden");
      answersEl.classList.remove("hidden");
      nextBtn.classList.remove("hidden");
      loadQuestion();
      resultEl.textContent = "";
      resultEl.classList.add("hidden");
      restartBtn.remove();
    };
    resultEl.parentNode.appendChild(restartBtn);
  }

  if (questionEl && answersEl && nextBtn && resultEl) {
    loadQuestion();
  }
});

// ----------------------------------------------
// FORMULÁRIO DE CONTATO
// ----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formulario");
  if (!form) return;

  // Mensagem visual (feedback)
  let feedback = document.createElement("div");
  feedback.id = "form-feedback";
  feedback.style.fontSize = "1.06rem";
  feedback.style.marginTop = "12px";
  form.appendChild(feedback);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const mensagem = document.getElementById("mensagem");

    feedback.textContent = "";
    feedback.style.color = "#fff";

    if (nome.value.trim() === "") {
      feedback.textContent = "Por favor, preencha o nome.";
      feedback.style.color = "#e63946";
      nome.focus();
      return;
    }
    if (!validateEmail(email.value.trim())) {
      feedback.textContent = "Por favor, insira um e-mail válido.";
      feedback.style.color = "#e63946";
      email.focus();
      return;
    }
    if (!validateTelefone(telefone.value.trim())) {
      feedback.textContent = "Por favor, insira um telefone válido (apenas números, mínimo 8 dígitos).";
      feedback.style.color = "#e63946";
      telefone.focus();
      return;
    }
    if (mensagem.value.trim() === "") {
      feedback.textContent = "Por favor, escreva uma mensagem.";
      feedback.style.color = "#e63946";
      mensagem.focus();
      return;
    }

    feedback.textContent = "Formulário enviado com sucesso!";
    feedback.style.color = "#38b000";
    form.reset();
    setTimeout(() => { feedback.textContent = ""; }, 3500);
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

// ----------------------------------------------
// CARROSSEL DE IMAGENS - PRODUTO NOAH + SINCRONIZAÇÃO DE TEXTO
// ----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".produto-noah .slide");
  const prevBtn = document.querySelector(".produto-noah .carousel-btn.prev");
  const nextBtn = document.querySelector(".produto-noah .carousel-btn.next");
  const dots = document.querySelectorAll(".produto-noah .carousel-indicators .dot");
  const descricao = document.querySelector(".produto-descricao p");
  const titDesc = document.querySelector(".produto-descricao h2");
  let slideIndex = 0;

  // Textos sincronizados com os slides
  const textosDoCarrossel = [
    {
      titulo: "Conheça o NOAH",
      texto: "O NOAH é um dispositivo inovador de alerta contra enchentes, desenvolvido para ser instalado em pontos estratégicos de zonas de risco. Ele monitora o nível da água em tempo real e envia alertas para a população e órgãos responsáveis, garantindo prevenção e segurança mesmo em locais com pouca infraestrutura."
    },
    {
      titulo: "Tecnologia: Arduino NOAH",
      texto: "O coração do NOAH é um projeto robusto em Arduino, programado e montado por nossa equipe. Ele utiliza sensores para monitorar o nível da água e acionar sirenes e alertas instantâneos, garantindo confiabilidade e resposta rápida, inclusive em regiões com infraestrutura limitada."
    },
    {
      titulo: "Comunicação: Software Python",
      texto: "Desenvolvemos um software em Python que faz a ponte entre o NOAH e a comunidade. Ele permite o envio automático de alertas para grupos no WhatsApp, SMS ou órgãos públicos, conectando tecnologia e pessoas em situações críticas."
    }
  ];

  function showSlide(n) {
    slideIndex = (n + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === slideIndex);
      if (dots[i]) dots[i].classList.toggle("active", i === slideIndex);
    });
    // Atualiza texto sincronizado
    if (descricao && titDesc) {
      descricao.textContent = textosDoCarrossel[slideIndex].texto;
      titDesc.textContent = textosDoCarrossel[slideIndex].titulo;
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => showSlide(slideIndex - 1));
    nextBtn.addEventListener("click", () => showSlide(slideIndex + 1));
  }
  if (dots.length) {
    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => showSlide(idx));
    });
  }
  if (slides.length) showSlide(slideIndex);
});

// ======================
// Alternância de Tema (Escuro/Claro)
// ======================
(function() {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  // Salva tema no localStorage
  function setTheme(theme) {
    document.body.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem('noah-theme', theme);
    btn.innerHTML = theme === 'light' ? '☀️' : '🌙';
  }
  // Define tema ao abrir
  const stored = localStorage.getItem('noah-theme');
  setTheme(stored === 'light' ? 'light' : 'dark');

  btn.addEventListener('click', () => {
    const atual = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    setTheme(atual === 'dark' ? 'light' : 'dark');
  });
})();

// Troca da logo pelo tema
function atualizarLogoTema() {
  const logoImg = document.getElementById("logo-img");
  if (!logoImg) return;
  if (document.body.classList.contains("light-theme")) {
    logoImg.src = "assets/img/logoNoah-branca.png";
  } else {
    logoImg.src = "assets/img/logoNoah.png";
  }
}

// Sempre que mudar o tema, troca a logo também
const themeToggleBtn = document.getElementById("theme-toggle-btn");
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", atualizarLogoTema);
}

// Troca na primeira carga da página também (por segurança)
document.addEventListener("DOMContentLoaded", atualizarLogoTema);


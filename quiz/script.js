const quizData = [
  {
    question: "1.Which tag is used to embed on external web page in HTML?",
    options: ["<embed>", "<object>", "<iframe>", "<external>"],
    answerIndex: 2 // <iframe>
  },
  {
    question: "2.Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answerIndex: 3 // JavaScript
  },
  {
    question: "3.Which tag is used to add a comment in HTML?",
    options: ["<!-- comment -->", "//comment", "/* comment */", "#comment"],
    answerIndex: 0 // <!-- comment -->
  },
  {
    question: "4.What is the use of z-index?",
    options: ["Adjusts zoom level", "Sets stacking order", "Applies opacity", "Animates elements"],
    answerIndex: 1 // Sets stacking order
  },
  {
    question: "5.What is the box model in css?",
    options: ["Layout structure", "A type of animation", "Javascript function", "Method to apply flex layout"],
    answerIndex: 0 // Layout structure
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');

function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = '';

  currentQuiz.options.forEach((option, idx) => {
    const label = document.createElement('label');
    label.classList.add('option');

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = idx;          // store index as value
    input.id = `opt-${idx}`;

    const span = document.createElement('span');
    span.appendChild(document.createTextNode(option));

    label.appendChild(input);
    label.appendChild(span);

    optionsEl.appendChild(label);
  });
}

function getSelectedOptionIndex() {
  const options = document.getElementsByName('option');
  for (let option of options) {
    if (option.checked) {
      return parseInt(option.value, 10);
    }
  }
  return null;
}

nextBtn.addEventListener('click', () => {
  const selectedIndex = getSelectedOptionIndex();
  if (selectedIndex === null) {
    alert("Please select an answer before proceeding!");
    return;
  }

  if (selectedIndex === quizData[currentQuestion].answerIndex) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById('quiz').classList.add('hidden');
    resultEl.classList.remove('hidden');
    scoreEl.textContent = `${score} / ${quizData.length}`;
  }
});

loadQuestion();

let currentQuestion = 1;
const totalQuestions = 15;
let incorrectAnswers = [];

// Håll reda på de rätta svaren för varje fråga
const correctAnswers = {
    1: "Alla har rätt att rösta och yttrandefrihet",
    2: "En person eller liten grupp har all makt",
    3: "Genom att gå till en vallokal eller rösta via post",
    4: "Direkt demokrati innebär att alla röstar om varje fråga...",
    5: "Visa respekt genom att lyssna på andra",
    6: "Påverka beslut genom klassråd och elevråd",
    7: "Kompromiss innebär att alla ger upp lite för en gemensam lösning",
    8: "Representera sin klass i elevråd",
    9: "Påverka genom att rösta och delta i demonstrationer",
    10: "Yttrandefrihet innebär att alla får säga vad de tycker",
    11: "Folkomröstning innebär att alla medborgare får delta",
    12: "Exempel på länder som övergått till demokrati är Sydafrika",
    13: "Stärka demokratin i skolan genom att delta i klassråd",
    14: "Att följa majoriteten betyder att acceptera beslutet men uttrycka sin åsikt",
    15: "Påverka skolans regler genom att delta i elevråd och klassråd"
};

// Visa aktuell fråga och dölj andra
function showQuestion(questionNumber) {
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById('q' + i).style.display = 'none'; // Dölj alla frågor
    }
    document.getElementById('q' + questionNumber).style.display = 'block'; // Visa aktuell fråga

    // Hantera navigeringsknappar
    if (questionNumber === 1) {
        document.getElementById('prevButton').style.display = 'none';
    } else {
        document.getElementById('prevButton').style.display = 'inline-block';
    }
    if (questionNumber === totalQuestions) {
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('submitButton').style.display = 'inline-block';
    } else {
        document.getElementById('nextButton').style.display = 'inline-block';
        document.getElementById('submitButton').style.display = 'none';
    }
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function submitQuiz() {
    let correctCount = 0;
    incorrectAnswers = [];

    // Kontrollera flervalsfrågor
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === "correct") {
            correctCount++;
        } else {
            incorrectAnswers.push(i); // Lägg till felaktiga frågor i listan
        }
    }

    const score = (correctCount / totalQuestions) * 100;
    document.getElementById('quizForm').style.display = 'none';
    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block';
    resultElement.textContent = `Du fick ${correctCount} av ${totalQuestions} rätt (${score.toFixed(2)}%)`;

    if (incorrectAnswers.length > 0) {
        const incorrectList = document.getElementById('incorrectList');
        incorrectList.innerHTML = ''; // Töm listan
        incorrectAnswers.forEach(q => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = "#";
            link.textContent = `Fråga ${q}`;
            link.onclick = function() {
                toggleDropdown(q); // Visa rätt svar i en dropdown
            };
            listItem.appendChild(link);
            incorrectList.appendChild(listItem);
        });
        document.getElementById('incorrectQuestions').style.display = 'block';
    }

    document.getElementById('retryButton').style.display = 'block'; // Visa "Börja om"-knappen

    // Log för att se felaktiga svar
    console.log("Felaktiga svar:", incorrectAnswers);
}

// Funktion för att visa rätt svar i en dropdown när användaren klickar på en fråga
function toggleDropdown(questionNumber) {
    const questionElement = document.getElementById('q' + questionNumber);
    const correctAnswer = correctAnswers[questionNumber]; // Hämta det rätta svaret

    if (questionElement.classList.contains('active')) {
        questionElement.classList.remove('active');
        questionElement.innerHTML = ''; // Töm frågan när den stängs
    } else {
        questionElement.classList.add('active');
        questionElement.innerHTML = `<p><strong>Rätt svar:</strong> ${correctAnswer}</p>`;
    }
}

function restartQuiz() {
    // Nollställ frågor och visa första frågan
    document.getElementById('quizForm').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('incorrectQuestions').style.display = 'none';
    document.getElementById('retryButton').style.display = 'none';

    // Nollställ flervalsfrågor
    for (let i = 1; i <= totalQuestions; i++) {
        const answers = document.querySelectorAll(`input[name="q${i}"]`);
        answers.forEach((answer) => {
            answer.checked = false;
        });

        // Nollställ fritextsvar
        const textArea = document.getElementById(`q${i}text`);
        if (textArea) {
            textArea.value = ''; // Nollställ textinmatning
        }

        // Döljer alla frågor som standard
        const questionElement = document.getElementById('q' + i);
        questionElement.style.display = 'none';
    }
    currentQuestion = 1;
    showQuestion(currentQuestion);

    console.log("Quizet har startats om");
}

// Visa första frågan när sidan laddas
window.onload = function() {
    showQuestion(currentQuestion);
};

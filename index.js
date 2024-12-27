
// konstante
const slider = document.getElementById("#-of-questions");
const output = document.getElementById("demo");
const startContainer = document.querySelector(".start-screen");
const questionsContainer = document.querySelector(".question-container");
const currentQuestionNumber = document.getElementById("question-level");
const currentQuestionText = document.getElementById("question-text");
const optionFieldLabels = {
    A: document.getElementById("labelA"),
    B: document.getElementById("labelB"),
    C: document.getElementById("labelC"),
    D: document.getElementById("labelD"),
};
const optionField = {
    A: document.getElementById("optionA"),
    B: document.getElementById("optionB"),
    C: document.getElementById("optionC"),
    D: document.getElementById("optionD"),
};
const checkButton = document.getElementById("check-button");
const endGameContainer = document.querySelector(".result-container");
const restartButton = document.getElementById("restart-button");


// spremenljivke za igro
let numberOfQuestions = slider.value;
let currentQuestionLevel = 0;
let correctAnswers = 0;


// dolocanje stevila vprasanj s sliderjom
function initializeSlider() {
    output.textContent = slider.value; // nastavs stevilo vprasanj
    slider.oninput = function () {
        numberOfQuestions = this.value;
        output.textContent = numberOfQuestions;
    };
}

let randomizedQuestions = []; 

function startGame() {
    resetGame(); 
    startContainer.hidden = true; 
    questionsContainer.hidden = false; 
    endGameContainer.hidden = true;

    // Preden začneš premešaš vprašanja
    randomizedQuestions = shuffleArray([...questions]).slice(0, numberOfQuestions);

    displayQuestion(randomizedQuestions[currentQuestionLevel]);
    setupCheckButton();
}




// reset game
function resetGame() {
    currentQuestionLevel = 0;
    correctAnswers = 0;
    numberOfQuestions = slider.value;
}


// Prikaz vprašanj
function displayQuestion(questionData) {
    currentQuestionNumber.textContent = `Question ${currentQuestionLevel + 1} of ${numberOfQuestions}`;
    currentQuestionText.textContent = questionData.question;

    Object.keys(optionField).forEach((key) => {
        optionField[key].checked = false; 
        optionField[key].disabled = false;
        optionFieldLabels[key].classList.remove("correct-answer", "wrong-answer"); 
    });

    // Posodablanje label texta in value
    optionFieldLabels.A.textContent = questionData.options[0].trim();
    optionField.A.value = questionData.options[0].trim();

    optionFieldLabels.B.textContent = questionData.options[1].trim();
    optionField.B.value = questionData.options[1].trim();

    optionFieldLabels.C.textContent = questionData.options[2].trim();
    optionField.C.value = questionData.options[2].trim();

    optionFieldLabels.D.textContent = questionData.options[3].trim();
    optionField.D.value = questionData.options[3].trim();

    startTimer();
}


function checkAnswer(correctAnswer) {
    // Poiščeš izbran odgovor
    const selectedOption = Object.keys(optionField).find(
        (key) => optionField[key].checked
    );

    // Če ni izbran noben option, dobiš alert, da morš izbrat nekej
    if (!selectedOption) {
        alert("Please select an option before checking the answer!");
        return;
    }

    // disejblaš gumb - onemogočš večkratno preverjanje
    checkButton.disabled = true;

    // disejblaš vse optione
    Object.keys(optionField).forEach((key) => {
        optionField[key].disabled = true;
    });

    const selectedAnswer = optionField[selectedOption].value.trim();
    const trimmedCorrectAnswer = correctAnswer.trim();

    // označiš ali je odgovor pravilen ali napačen
    if (selectedAnswer === trimmedCorrectAnswer) {
        correctAnswers++;
        optionFieldLabels[selectedOption].classList.add("correct-answer");
    } else {
        optionFieldLabels[selectedOption].classList.add("wrong-answer");

        // označiš pravilen odgovor
        const correctKey = Object.keys(optionFieldLabels).find(
            (key) => optionFieldLabels[key].textContent.trim() === trimmedCorrectAnswer
        );

        if (correctKey) {
            optionFieldLabels[correctKey].classList.add("correct-answer");
        }
    }

    setTimeout(() => {
        proceedToNextQuestion();
        checkButton.disabled = false;
    }, 2000);
}







// nastavljanje timerja
let timer; 
let timeRemaining = 10; // 10 sekund na vprašanje

function startTimer() {
    timeRemaining = 10;
    document.getElementById("timer").textContent = timeRemaining;

    clearInterval(timer); // odstranš prejšne timerje

    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById("timer").textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer); 
            autoSubmitAnswer(); 
        }
    }, 1000);
}

// avtomatsko pošiljanje odgovorov (po koncu timerja)
function autoSubmitAnswer() {
    const selectedOption = Object.keys(optionField).find(
        (key) => optionField[key].checked
    );

    // če je izbran en option
    if (selectedOption) {
        checkAnswer(randomizedQuestions[currentQuestionLevel].correct);
    } else {        // če ni izbran, samo označiš pravilen odgovor
        
        const correctKey = Object.keys(optionFieldLabels).find(
            (key) => optionFieldLabels[key].textContent === randomizedQuestions[currentQuestionLevel].correct
        );

        if (correctKey) {
            optionFieldLabels[correctKey].classList.add("correct-answer");
        }

        setTimeout(() => {
            proceedToNextQuestion();
        }, 2000);
    }
}



// gremo na naslednje vprašanje - resetiranje optionov
function proceedToNextQuestion() {
    Object.keys(optionFieldLabels).forEach((key) => {
        optionField[key].checked = false;
        optionField[key].disabled = false;
        optionFieldLabels[key].classList.remove("correct-answer", "wrong-answer");
    });

    if (currentQuestionLevel < numberOfQuestions - 1) {
        currentQuestionLevel++;
        displayQuestion(randomizedQuestions[currentQuestionLevel]);
    } else {
        endGame();
    }
}





// start button
function setupStartButton() {
    document.getElementById("start-game").onclick = function () {
        console.log(`Number of Questions: ${numberOfQuestions}`);
        startGame();
    };
}


// check button
function setupCheckButton() {
    checkButton.onclick = function () {

        if (randomizedQuestions[currentQuestionLevel]) {
            checkAnswer(randomizedQuestions[currentQuestionLevel].correct);
        } else {
            alert("No question is active!");
        }
    };
}


// end game
function endGame() {
    questionsContainer.hidden = true;
    endGameContainer.hidden = false;
    clearInterval(timer);

    document.getElementById("result-text").textContent = 
    `You got ${correctAnswers} answers out of ${numberOfQuestions} correct!`;

    restartButton.onclick = function () {
        startGame();
    }
}



// ustvarjanje random zaporedja vprašanj
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



// prvi koraki v kvizu
function initializeApp() {
    initializeSlider();
    setupStartButton();
}

initializeApp();        // začni kviz





// DATABASE - UPDEJTEJ KO SE NAUČIŠ SQL
const questions = [
    {
        question: "What is the capital of Germany?",
        options: ["Berlin", "Vienna", "Amsterdam", "Brussels"],
        correct: "Berlin"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: "Mars"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "HO"],
        correct: "H2O"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
        correct: "Leonardo da Vinci"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: "Blue Whale"
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correct: "7"
    },
    {
        question: "What is the capital city of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correct: "Tokyo"
    },
    {
        question: "Which year did World War II end?",
        options: ["1942", "1945", "1948", "1950"],
        correct: "1945"
    },
    {
        question: "What is the square root of 81?",
        options: ["7", "8", "9", "10"],
        correct: "9"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        correct: "William Shakespeare"
    },
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: "Canberra"
    },
    {
        question: "What is the boiling point of water in Celsius?",
        options: ["50°C", "100°C", "150°C", "200°C"],
        correct: "100°C"
    },
    {
        question: "Which gas do plants use during photosynthesis?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correct: "Carbon Dioxide"
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correct: "2"
    },
    {
        question: "What is the capital of Italy?",
        options: ["Milan", "Venice", "Florence", "Rome"],
        correct: "Rome"
    },
    {
        question: "Who discovered penicillin?",
        options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Isaac Newton"],
        correct: "Alexander Fleming"
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Makalu"],
        correct: "Mount Everest"
    },
    {
        question: "What is the primary language spoken in Brazil?",
        options: ["Spanish", "Portuguese", "English", "French"],
        correct: "Portuguese"
    },
    {
        question: "How many degrees are there in a circle?",
        options: ["90", "180", "270", "360"],
        correct: "360"
    },
    {
        question: "Who is known as the father of computers?",
        options: ["Charles Babbage", "Alan Turing", "Tim Berners-Lee", "John von Neumann"],
        correct: "Charles Babbage"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Quartz"],
        correct: "Diamond"
    },
    {
        question: "Which country is famous for the Great Wall?",
        options: ["India", "China", "Japan", "Russia"],
        correct: "China"
    },
    {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
        correct: "Ottawa"
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Mercury", "Venus", "Earth", "Mars"],
        correct: "Mercury"
    },
    {
        question: "Who invented the telephone?",
        options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Samuel Morse"],
        correct: "Alexander Graham Bell"
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara", "Gobi", "Antarctic Desert", "Kalahari"],
        correct: "Antarctic Desert"
    },
    {
        question: "How many colors are there in a rainbow?",
        options: ["5", "6", "7", "8"],
        correct: "7"
    },
    {
        question: "What is the freezing point of water in Fahrenheit?",
        options: ["0°F", "32°F", "50°F", "100°F"],
        correct: "32°F"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Pb", "Go"],
        correct: "Au"
    },
    {
        question: "Which organ in the human body filters blood?",
        options: ["Heart", "Lungs", "Liver", "Kidneys"],
        correct: "Kidneys"
    }
];

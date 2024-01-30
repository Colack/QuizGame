const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

const SCORE_POINTS = 100
var MAX_QUESTIONS = 12

let questions = [
    {
        question: 'What is God/Goddess in Spanish?',
        choice1: 'el dios(a)',
        choice2: 'el enemigo(a)',
        choice3: 'casarse',
        choice4: 'el presonaje',
        answer: 1,
    },
    {
        question: 'What is Army in Spanish?',
        choice1: 'llevar',
        choice2: 'la guerra',
        choice3: 'el ejercito',
        choice4: 'la batalla',
        answer: 3,
    },
    {
        question: 'What is el emperador in English?',
        choice1: 'battle',
        choice2: 'war',
        choice3: 'hero',
        choice4: 'emperor',
        answer: 4,
    },
    {
        question: 'What is Enemy in Spanish?',
        choice1: 'el guerrero',
        choice2: 'el heroe',
        choice3: 'el enemigo',
        choice4: 'la heroina',
        answer: 3,
    },
    {
        question: 'What is el guerrero in English?',
        choice1: 'to get married',
        choice2: 'narration',
        choice3: 'warrior',
        choice4: 'character',
        answer: 3,
    },
    {
        question: 'What is el heroe in English?',
        choice1: 'hero',
        choice2: 'heroine',
        choice3: 'young man/woman',
        choice4: 'princess',
        answer: 1,
    },
    {
        question: 'What is Heroine in Spanish?',
        choice1: 'el joven',
        choice2: 'la heroina',
        choice3: 'el ejercito',
        choice4: 'casarse',
        answer: 2,
    },
    {
        question: 'What is el joven in English?',
        choice1: 'battle',
        choice2: 'volcano',
        choice3: 'young man/woman',
        choice4: 'palace',
        answer: 3,
    },
    {
        question: 'What is Princess in Spanish?',
        choice1: 'llorar',
        choice2: 'la princesa',
        choice3: 'morir',
        choice4: 'transformar',
        answer: 2,
    },
    {
        question: 'What is Battle in Spanish?',
        choice1: 'la batalla',
        choice2: 'pelear',
        choice3: 'llorar',
        choice4: 'ue',
        answer: 1,
    },
    {
        question: 'What is La Guerra in English?',
        choice1: 'llorar',
        choice2: 'la guerra',
        choice3: 'la montana',
        choice4: 'casarse',
        answer: 2,
    },
    {
        question: 'What is Character in Spanish?',
        choice1: 'los celos',
        choice2: 'azteca',
        choice3: 'hermoso',
        choice4: 'el personaje',
        answer: 4,
    }
]

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
startGame()

let state = {
    quiz: [
        {question: 'q1', answer: 'a'},
        {question: 'q2', answer: 'a'},
        {question: 'q3', answer: 'a'},
        {question: 'q4', answer: 'a'},
        {question: 'q5', answer: 'a'},
        {question: 'q6', answer: 'a'}
    ],
    timeRemaining: 60,
    correct: 0,
    incorrect: 0,
    unanswered: 0
}

function checkAnswer(question, answer) {
    let answerA = document.getElementById(`${question}a`)
    let answerB = document.getElementById(`${question}b`)
    let answerC = document.getElementById(`${question}c`)
    let answerD = document.getElementById(`${question}d`)

    if (!answerA.checked &&
        !answerB.checked &&
        !answerC.checked &&
        !answerD.checked) {
            state.unanswered++
    } else if (document.getElementById(`${question}${answer}`).checked) {
        state.correct++
    } else {
        state.incorrect++
    }
}

function getScoreMarkup() {
    return `
        <h1>All Done!</h1>
        <p>Correct: ${state.correct}</p>
        <p>Incorrect: ${state.incorrect}</p>
        <p>Unanswered: ${state.unanswered}</p>
    `
}

function intervalHandler() {
    console.log('tick')
    state.timeRemaining -= 1

    if (state.timeRemaining === 0) {
        for (let q of state.quiz) {
            checkAnswer(q.question, q.answer)
        }
    }

    render()
}

function render() {
    let content = document.getElementById('content')
    if (state.timeRemaining <= 0) {
        content.innerHTML = getScoreMarkup()
    } else {
        let timer = document.getElementById('timer')
        timer.innerText = `Time Remaining: ${state.timeRemaining}`
    }
}

window.onload = () => {
    // set initial render & ticker
    render()
    window.setInterval(intervalHandler, 1000)
}
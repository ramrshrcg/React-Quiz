function Progress({totalQuestions,currentQuestionIndex , answer,maxPossoblePoints, score}) {
    return (
        <header className="progress">
        <progress
          max={totalQuestions}
          value={currentQuestionIndex + Number(answer !== null)}
        />
        <p>
          Question No: {currentQuestionIndex + 1}/{totalQuestions}
        </p>
        <p>
          Total Score:{score}/{maxPossoblePoints}
        </p>
      </header>
    )
}

export default Progress

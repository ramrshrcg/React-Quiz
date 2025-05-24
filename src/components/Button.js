function Button({ dispatch, answer, totalQuestions, currentQuestionIndex }) {
  if (answer === null) return null;

  if (currentQuestionIndex + 1 < totalQuestions) {
    return (
      <div>
        <button
          className="btn btn-ui  "
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );
  }
  if (currentQuestionIndex + 1 === totalQuestions)
    return (
      <div>
        <button
          className="btn btn-ui "
          onClick={() => dispatch({ type: "finished" })}
        >
          Finish
        </button>
      </div>
    );
}

export default Button;

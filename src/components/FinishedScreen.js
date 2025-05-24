
function FinishedScreen({
  score,
  maxPossoblePoints,
  totalQuestions,
  correctAnswer,
  highscore,
  dispatch
}) {
  return (
    <>
      <div className="result">
        <p className="result">Total Questions: {totalQuestions}</p>
        <p className="result">Correct Answers: {correctAnswer}</p>
        <p className="result">
          Score: {score} out of {maxPossoblePoints}
        </p>
      </div>
      <p className="result">
        Highscore: {highscore} 
      </p>
     <button className="btn btn-ui "  onClick={()=>dispatch({type:"restart",})}> play again</button>
    </>
  );
}

export default FinishedScreen;

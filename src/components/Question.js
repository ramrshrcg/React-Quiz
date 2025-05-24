import Options from "./Options";

function Question({ questions, dispatch, answer , score}) {
  return (
    <div>
      <h3>

      {questions.question}
      </h3>
     <Options question={questions} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;

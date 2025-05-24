import { useEffect, useReducer } from "react";
import "../App.css";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Button from "./Button";
import Progress from "./Progress";

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "failed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions.at(state.currentQuestionIndex);

      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };

    case "nextQuestion":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };

    default:
      throw new Error("Unknown action type");
  }
}

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  //ready,active, start, finidhed, error,loading,
  status: "loading",
  answer: null,
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, currentQuestionIndex, score, answer, status } = state;

  const totalQuestions = questions.length;
  let maxPossoblePoints = 0;
  for (let index = 0; index < totalQuestions; index++) {
    maxPossoblePoints = maxPossoblePoints + questions[index].points;
  }

  useEffect(function () {
    fetch("http://localhost:8000/Allquestions ")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "failed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen totalQuestions={totalQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
           <Progress totalQuestions={totalQuestions} answer={answer} currentQuestionIndex={currentQuestionIndex} score={score} maxPossoblePoints={maxPossoblePoints} />
            <Question
              questions={questions[currentQuestionIndex]}
              dispatch={dispatch}
              answer={answer}
              score={score}
            />
            <Button dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;

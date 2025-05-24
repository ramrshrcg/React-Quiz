import {  useEffect, useReducer } from "react";
import "../App.css";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Button from "./Button";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SEC_PER_QUESTION=30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "failed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active",remainingSecond:state.questions.length*SEC_PER_QUESTION };

    case "newAnswer":
      const question = state.questions.at(state.currentQuestionIndex);

      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
        correctAnswer:
          action.payload === question.correctOption
            ? state.correctAnswer + 1
            : state.correctAnswer,
      };

    case "nextQuestion":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };

    case "finished":
      return {
        ...state,
        status:'finished',
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
      };
    case "restart":
      return {
        ...state,
        currentQuestionIndex: 0,
        score: 0,
        status: "active",
        answer: null,
        correctAnswer: 0,
        remainingSecond: 10,
      };
    case "countDown":
      return {
        ...state,
        remainingSecond: state.remainingSecond - 1,
        status: state.remainingSecond <=0 ? "finished" : state.status,

        highscore:
          state.score > state.highscore ? state.score : state.highscore,
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
  correctAnswer: 0,
  highscore: 0,
  remainingSecond: null,
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    currentQuestionIndex,
    score,
    answer,
    status,
    correctAnswer,
    highscore,
    remainingSecond,
  } = state;

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
            <Progress
              totalQuestions={totalQuestions}
              answer={answer}
              currentQuestionIndex={currentQuestionIndex}
              score={score}
              maxPossoblePoints={maxPossoblePoints}
            />
            <Question
              questions={questions[currentQuestionIndex]}
              dispatch={dispatch}
              answer={answer}
              score={score}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                remainingSecond={remainingSecond}
              ></Timer>
              <Button
                dispatch={dispatch}
                answer={answer}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            score={score}
            maxPossoblePoints={maxPossoblePoints}
            totalQuestions={totalQuestions}
            correctAnswer={correctAnswer}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

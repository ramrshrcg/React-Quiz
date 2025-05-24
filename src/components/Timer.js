import { useEffect } from "react";

function Timer({ dispatch, remainingSecond }) {
  const minutes = Math.floor(remainingSecond / 60);
  const second = remainingSecond % 60;
  //   const sec = second < 10 ? `0${second}` : second;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "countDown" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {/* {minutes < 10 ? `0${minutes}` : { minutes }}:{second < 10 && "0"}
      {second}  */}
      {minutes < 10 ? `0${minutes}` : { minutes }}:
      {second < 10 ? `0${second}` : second}
    </div>
  );
}

export default Timer;

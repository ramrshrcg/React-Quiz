function StartScreen({totalQuestions, dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{totalQuestions} questions to test your intelligence</h3>  
            <button className="btn btn-ui" onClick={()=>{
                dispatch({type:"start"})
            }}>Start</button>          
        </div>
    )
}

export default StartScreen

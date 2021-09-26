import React, { useState, useEffect } from "react"
import questions from "../Questions/questions.json"
import QuestionPanel from "./QuestionPanel"
function Questions() {
    const [data, setData] = useState(questions)
    const [currentquestion, setCurrentquestion] = useState(null)
    const [current_question_no, setCurrent_question_no] = useState(1)
    const [total_question, setTotalQuestion] = useState(data.length)
    const [progress, setProgress] = useState(5)
    const [score, setScore] = useState(0)
    const [maxScore, setMaxScore] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)

    useEffect(() => {
        setCurrentquestion(
            data[0]
        )
        console.log("current", currentquestion)
    }, []);

    const nextQuestion = () => {
        let current = current_question_no + 1;
        if (current <= total_question) {
            setCurrent_question_no(
                current
            )
            setCurrentquestion( data[current - 1] )

            setProgress(
                current / total_question * 100
            )
        }
    }

    const checkUserAnswer = (useranswer) => {
        console.log("answer",useranswer)
        
        if (decodeURIComponent(currentquestion["correct_answer"]) === useranswer) {

            setCorrectAnswers(
                correctAnswers + 1
            )
            const yourScore = (((correctAnswers + 1) / (total_question)) * 100).toFixed(0);
            setScore(yourScore);

        }
        else {
            
            const yourScore = (((correctAnswers ) / (total_question)) * 100).toFixed(0);
            setScore(yourScore);
        }

        let yourMaxScore = (((current_question_no) / (total_question)) * 100).toFixed(0);
        setMaxScore(yourMaxScore)
    }

    return <>
        {
            currentquestion
                !== null ?
                <QuestionPanel question={currentquestion}
                    nextQuestion={nextQuestion}
                    total={total_question}
                    questionNo={current_question_no}
                    progress={progress}
                    checkUserAnswer={checkUserAnswer}
                    maxScore={maxScore}
                    score={score} />
                : ""
        }
    </>
}


export default Questions;
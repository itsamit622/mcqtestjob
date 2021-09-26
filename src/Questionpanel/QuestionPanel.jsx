import React, { useState } from "react";
import { ProgressBar, Container, Row, Col, Button } from "react-bootstrap"
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';

import './questionpanel.css';


const levels = {
    hard: 3,
    medium: 2,
    easy: 1
}

function QuestionPanel(props) {


    const [answered, setAnswered] = useState('');
    const [message, setMessage] = useState('');

    const answerHandler = (ans) => {
        setAnswered(ans);
        console.log("ans",ans)
        props.checkUserAnswer(ans);
        if (decodeURIComponent(props.question['correct_answer']) === ans) {
            setMessage('Correct')
        }
        else {
            setMessage('Sorry. Please try again.')
        }

    }

    function difficultyLevelChecker(currentLevel) {
        console.log("currentLevel", currentLevel)
        let levelNumber = levels[currentLevel];
        console.log("lvl",currentLevel)
        if (isNaN(levelNumber)) {
            levelNumber = 0;
        }
        return Array(5).fill(1).map((v, index) => {
            if (levelNumber > index) {
                return <AiFillStar />
            }
            return <AiOutlineStar />
        })
    }

    

    let questionAns = [...props.question['incorrect_answers'], props.question['correct_answer']];
    return <>

        <Container>
            <Row >
                <Col md={2}> </Col>
                <Col md={8}>
                    <ProgressBar now={props.progress} />
                </Col>
                <Col md={2}> </Col>
            </Row>

            <Row>
                <Col md={3}> </Col>
                <Col md={6}>
                    <h3 className="pt-5"> Question {props.questionNo} of {props.total}</h3>

                    {decodeURIComponent(props.question["category"])}

                    <div className="list">
                        {difficultyLevelChecker(props.question['difficulty'])}
                    </div>
                    <h3 className="pt-4">
                        {decodeURIComponent(props.question['question'])}
                    </h3>

                    <Row className="question-options">
                        {
                            questionAns.map((singleOption) => {

                                return <>
                                    <Col md={6} className="  mt-5">
                                        <Button variant={answered === decodeURIComponent(singleOption) ? "dark" : "outline-dark"}
                                            key={decodeURIComponent(singleOption)}
                                            onClick={() => answerHandler(decodeURIComponent(singleOption))}
                                            disabled={answered !== '' ? true : false}
                                        >
                                            {decodeURIComponent(singleOption)}
                                        </Button>
                                    </Col>
                                </>

                            })
                        }
                    </Row>

                    <h3 className="mt-5 text-center">{answered && message} </h3>

                    <Col className="text-center">
                        {answered !== '' && props.progress !== 100 ?
                            <Button variant="outline-dark"
                                className="next-button"
                                onClick={() => { props.nextQuestion(); setAnswered(''); }}
                            >
                                Next Question
                    </Button>

                            : ''}
                    </Col>
                    <Row>
                    <Col md={8}>
                        <p>Score :{props.score}%</p>
                        </Col>
                        <Col md={2}>
                        <p>MaxScore:{props.maxScore}%</p>
                        </Col>
                    </Row>
                    <ProgressBar striped variant="success" now={props.score} key={1} />
                </Col>
            </Row>

        </Container>
    </>
}

export default QuestionPanel;
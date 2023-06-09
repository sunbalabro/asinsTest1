import React, { useEffect, useState } from 'react'
import { quizData } from '../../QuizData/questions'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Col, Progress, Row } from 'antd';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import { ResultProgress } from '../ResultProgress';
export const QuestionsScreen = ({ results, setResults }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selection, setSelection] = useState(false)
    const [clicked , setClicked] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const navigate = useNavigate()
    let [currentPer, setCurrentPer] = useState(0)
    let [maxPer, setMaxPer] = useState(100)
    let [minPer, setMinPer] = useState(0)
    const [timer, setTimer] = useState(46)
    const [intervalId, setIntervalId] = useState(null)
    const [shuffledChoices, setShuffledChoices] = useState([]);
    const [extra, setExtra] = useState(null)
    const questions = quizData
    const correctAns = questions[currentQuestion].correct_answer
    const shuffleArray = (array) =>
        [...array].sort(() => Math.random() - 0.5)
    const quiz = questions.map((item) => {
        return {
            quizQuestion: item.question,
            quizChoices: shuffleArray(item.incorrect_answers.concat(item.correct_answer)),
            quizCorrectAnswer: item.correct_answer,
        }
    })
    const data = [
        {
            val: 100,
            color: 'green',

        },
        {
            val: currentPer,
            color: 'yellow',

        },
        {
            val: maxPer,
            color: "orange",

        },
        {
            val: minPer,
            color: 'red'
        }
    ]
    useEffect(() => {
        setShuffledChoices(quiz[currentQuestion].quizChoices);
    }, [currentQuestion])
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevCount) => {
                if (prevCount <= 0) {
                    clearInterval(interval);
                    if (currentQuestion !== questions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1)
                        setSelection(false)
                        setExtra(null)
                    } else {
                        setCurrentQuestion(0);
                        navigate('/results')
                    }
                    setTimer(45)
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentQuestion]);


    const handleChange = (item) => {
        setClicked(true)
        setSelectedOption(item)
        setResults((prev) =>
            item === correctAns
                ? {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswers: prev.correctAnswers + 1,
                }
                : {
                    ...prev,
                    wrongAnswers: prev.wrongAnswers + 1,
                    failure: prev.failure + 5,
                }
        )
        item === correctAns ? setExtra(true) : setExtra(false)

        setSelection(!selection)
        setMinPer(results.correctAnswers * 100 / questions.length)
        setCurrentPer(results.correctAnswers * 100  / (currentQuestion))
        setMaxPer((results.correctAnswers + (questions.length - (currentQuestion))) * 100 / questions.length)
    }

    const handleSubmit = () => {
        setClicked(false)
        setSelectedOption('')
        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            clearInterval(intervalId)
            setIntervalId(null)
            setShuffledChoices(quiz[currentQuestion].quizChoices)
            setTimer(46)
            setSelection(false)
            setExtra(null)
        }
        else {
            setCurrentQuestion(0)
            navigate('/results')
        }
    }
      return (
        <div className='quizContainer'>
            <Progress percent={currentQuestion / questions.length * 100} className='topProgress' showInfo={false} />
            <Row>
                <Col xs={{ span: 5, }} sm={{ span: 8 }} md={{ span: 16, }} lg={{ span: 12, }}><h4>Entertainment : Board Games</h4></Col>
                <Col xs={{ span: 5, }} sm={{ span: 8 }} md={{ span: 16, }} lg={{ span: 12, }}>
                    <h3>
                        <FontAwesomeIcon icon={faClock} style={{ color: timer < 10 ? 'red' : 'blue' }} />
                        &nbsp; 00:{timer < 10 ? '0' : ''}{timer}</h3>

                </Col>
            </Row>

            <h1> Question {currentQuestion + 1} of {questions.length}</h1>
            <FontAwesomeIcon
                style={{
                    color: questions[currentQuestion].difficulty === 'easy' || questions[currentQuestion].difficulty === "medium" || questions[currentQuestion].difficulty === 'hard' ? '#FCA120' : '#dedede"'
                }}
                icon={faStar} />
            <FontAwesomeIcon style={{
                color: questions[currentQuestion].difficulty === "medium" || questions[currentQuestion].difficulty === 'hard' ? "#FCA120" : "#dedede"
            }} icon={faStar} />
            <FontAwesomeIcon style={{
                color: questions[currentQuestion].difficulty === "hard" ? '#FCA120' : "#dedede"
            }} icon={faStar} />
            <h2 style={{ whiteSpace: 'pre-wrap' }}>{decodeURIComponent(quiz[currentQuestion].quizQuestion)}</h2>
            <Row gutter={16} style={{ marginTop: '50px' }}>
                {
                    shuffledChoices.map((item, index) => (
                        <Col xs={{ span: 12, }} sm={{ span: 8 }} md={{ span: 16, }} lg={{ span: 12, }}>
                            <button
                                key={index} onClick={() => handleChange(item)} style={{
                                    backgroundColor: extra === null ? "white" : (
                                        item === selectedOption ? (extra ? "#40ff00" : "red") : (
                                            questions[currentQuestion].correct_answer === item ? "#40ff00" : "white"
                                        )
                                    )
                                }}  disabled={clicked} >
                                {decodeURIComponent(item)}
                            </button>
                        </Col>

                    ))
                }
            </Row>
            <br />
            {extra !== null ? (extra === true ? (<h1 className='crAns'>Correct!</h1>) : (<h1 className='wrAns'>Sorry!</h1>)) : ''}
            <br />
            <div className='nextContainer'>
                <Button onClick={() => handleSubmit()} style={{ display: selection ? 'initial' : 'none' }} className='nextBtn' >Next Question</Button>
            </div>
            <br />
            <div className='progressContainer'>
                <div>
                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "5px", marginLeft: "25px", marginRight: "50px", justifyContent: "space-between" }}>
                        <span>Score : {results.score}%</span>
                        <span>Max Score : {maxPer}%</span>
                    </div>
                    <ResultProgress data={data.sort((x, y) => y.val - x.val)} />
                </div>
            </div>
            
            


        </div>
    )

}
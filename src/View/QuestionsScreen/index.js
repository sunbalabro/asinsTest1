import React, { useEffect, useState } from 'react'
import { quizData } from '../../QuizData/questions'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import { Col, Progress, Row } from 'antd';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/index.css'
import Timer from '../../Assets/timer.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockFour, faStar } from '@fortawesome/free-solid-svg-icons';
export const QuestionsScreen = ({ results, setResults }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedOption, setSelectedOption] = useState('')
    const navigate = useNavigate()
    const [totalScore, setTotalScore] = useState(0)
    const [timer, setTimer] = useState(46)
    const [intervalId , setIntervalId]  = useState(null)
    const [shuffledChoices, setShuffledChoices] = useState([]);
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
    useEffect(()=>{
        setShuffledChoices(quiz[currentQuestion].quizChoices);
    },[currentQuestion])
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevCount) => {
              if (prevCount <= 0) {
                clearInterval(interval);
                setCurrentQuestion(currentQuestion + 1)
                setTimer(45)
                return 0;
              }
              return prevCount - 1;
            });
          }, 1000);
      
          return () => clearInterval(interval);
    }, [currentQuestion]);
    console.log({ selectedOption })

    const handleSubmit = (item) => {

        setSelectedOption(item)
        setResults((prev) =>
            item == correctAns
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

        const TotalSocre = quiz.length * 5
        setTotalScore(TotalSocre)

        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            clearInterval(intervalId)
            setIntervalId(null)
            setShuffledChoices(quiz[currentQuestion].quizChoices)
            setTimer(46)
        }
        else {
            setCurrentQuestion(0)
            navigate('/results')

        }
        console.log({ item })
    }
    return (
        <div className='quizContainer'>
            <Progress percent={currentQuestion/questions.length *100} showInfo={false} />
            <Row>
           <Col xs={{span: 5,}} sm={{span: 8}} md={{span: 16,}} lg={{span: 12,}}><h4>Entertainment : Board Games</h4></Col> 
           <Col xs={{span: 5,}} sm={{span: 8}} md={{span: 16,}} lg={{span: 12,}}> 
           <h3> <img src={Timer} width='30px' height='30px' alt="timer" />
                 {timer}</h3>
            
            </Col>
            </Row>
            
            <h1> Question {currentQuestion + 1} of {questions.length}</h1>
            <FontAwesomeIcon
              style={{
                color: questions[currentQuestion].difficulty === 'easy' || questions[currentQuestion].difficulty === "medium" || questions[currentQuestion].difficulty === 'hard' ? '#FCA120' : '#dedede"'
              }}
            icon={faStar} />
            <FontAwesomeIcon style={{
                color:questions[currentQuestion].difficulty==="medium" || questions[currentQuestion].difficulty === 'hard' ? "#FCA120" : "#dedede"
            }} icon={faStar} />
            <FontAwesomeIcon style={{
                color: questions[currentQuestion].difficulty==="hard" ?'#FCA120' : "#dedede"
            }} icon={faStar} />
            <h2   style={{ whiteSpace: 'pre-wrap' }}>{decodeURIComponent(quiz[currentQuestion].quizQuestion)}</h2>
            <Row gutter={16} style={{marginTop: '50px'}}>
            {
                shuffledChoices.map((item, index) => (
                    <Col xs={{span: 5,}} sm={{span: 8}} md={{span: 16,}} lg={{span: 12,}}>
                    <button
                      key={index} onClick={() => handleSubmit(item)}>
                        {decodeURIComponent(item)}
                    </button>
                    </Col>
                    
                ))
            }
            </Row>
             <br/>           
            <ProgressBar className='progressBar'>
                <ProgressBar striped variant="success" now={results.score} key={1} />
                <ProgressBar variant="warning" now={results.score == 45 && results.failure == 25 ? 10 : 0} key={2} />
                <ProgressBar striped variant="danger" now={results.failure} key={3} />
            </ProgressBar>

        </div>
    )

}
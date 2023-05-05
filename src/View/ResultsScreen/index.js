import React from 'react'
import { Progress } from 'antd';
import { Button, Result } from 'antd';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
export const ResultsScreen = ({ results, setResults }) => {

  const navigate = useNavigate()
  const handleClick = () => {
    setResults({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      failure: 0,
    })
    navigate('/')
  }
  return (
    <div className='resultsContainer text-center' >
      <h1>Results</h1>
      <Result
        status="success"
        title="Your Quiz is Complete Congratulations"
        extra={[
          <Button type="primary" onClick={() => handleClick()}>
            Retake Quiz
          </Button>
        ]}
      />
      <h3>
        Score: {results.score}
      </h3>
      <Progress
        percent={results.score}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        showInfo={false}
      />
      <h3>
        Correct Answers: {results.correctAnswers}
      </h3>
      <h3>
        Wrong Answers: {results.wrongAnswers}
      </h3>
    </div>
  )

}
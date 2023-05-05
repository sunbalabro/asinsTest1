import React from 'react'
import {
    Routes,
    Route
} from 'react-router-dom'
import { QuestionsScreen } from '../View/QuestionsScreen'
import { ResultsScreen } from '../View/ResultsScreen'
export const AppRouter = ({results , setResults}) => {
  return(
    <Routes>
        <Route path='/' element={<QuestionsScreen results={results} setResults={setResults} />} />
        <Route path='/results' element={<ResultsScreen results={results} setResults={setResults} />} />
    </Routes>
   )

 }
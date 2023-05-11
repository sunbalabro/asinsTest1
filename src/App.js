import './App.css';
import { AppRouter } from './AppRouter';
import { useState } from 'react';

function App() {
  const [results , setResults] = useState({
     score: 0,
     correctAnswers: 0,
     wrongAnswers: 0,
     failure: 0,
  })
  return (
    <AppRouter results={results} setResults={setResults} />
  );
}

export default App;

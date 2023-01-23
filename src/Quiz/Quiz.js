import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Quiz() {

const [posts, setPosts] = useState([])
const [count, setCount] = useState(0)
const [score, setScore] = useState(0)
const [isShown, setIsShown] = useState(true);
const [isShown1, setIsShown1] = useState(false);


const handleClick = option => () => {
  const currentQuestion = posts[count]; 

  if (currentQuestion.answer == option) {
    setScore(score + 1);
  }

  if(options[count] === undefined) {
    console.log("hello")
  }

  if(count == posts.length - 1){
    setIsShown(current => !current)
    setIsShown1(current => !current)
  } else {
    setCount(count + 1)
  }
}

const handleClick1 = () => {
  setCount(0)
  setScore(0)
  setIsShown(current => !current)
  setIsShown1(current => !current)
} 
  
useEffect(() => {
  axios.get('http://localhost:8080/quiz')
  .then(res => {
  setPosts(res.data)
  })
  .catch(err => {
    console.log(err)
  })
}, []);

const question = posts.map(question => {
  return question.question
})

const options = posts.map(options => {
  return options.options
})


  return (
    <div className="Container">
    {isShown && (
      <div className='Quiz'>
        <div className='Question'>
            {!!posts.length && <h1 id="question">{question[count]}</h1>}
        </div>  
        <div className='Option'>
            {!! posts.length && options[count].map(option => (
                <button className='button' key={option} onClick={handleClick(option)}>{option}</button>
            ))}
        </div>
      </div>
    )}
    {isShown1 && (
      <div className='Score'>
        <h1 className='score' >Your Score is {score}</h1>
        <button  className='button' onClick={handleClick1} >Reset</button>
      </div>
    )}
    </div>
  );  
}
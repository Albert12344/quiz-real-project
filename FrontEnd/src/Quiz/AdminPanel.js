import React, { useState,useRef } from 'react'
import axios from 'axios';
import TextField from '@mui/material/TextField'

export default function Admin() {
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [answer, setAnswer] = useState("");
    const inputReset = useRef(null);

const submitValue = () => {
    axios.post('http://localhost:8080/quiz', {
        question: question,
        options: [option1, option2, option3, option4],
        answer: answer
    })
}

  return (
    <div className='Admin'>
        <form action="">
          <div className='postDiv'>
            <label className='label'>Question</label> 
              <TextField sx={{ m: 0.8 }} id="standard-basic"  variant="standard" ref={inputReset} onChange={(e) => setQuestion(e.target.value)}/>
            <label className='label'>Options</label> 
              1<TextField sx={{ m: 0.8 }} id="standard-basic" variant="standard" ref={inputReset} onChange={(e) => setOption1(e.target.value)}/>
              2<TextField sx={{ m: 0.8 }} id="standard-basic" variant="standard" ref={inputReset} onChange={(e) => setOption2(e.target.value)}/>
              3<TextField sx={{ m: 0.8 }} id="standard-basic" variant="standard" ref={inputReset} onChange={(e) => setOption3(e.target.value)}/>
              4<TextField sx={{ m: 0.8 }} id="standard-basic" variant="standard" ref={inputReset} onChange={(e) => setOption4(e.target.value)}/>
            <label className='label'>Answer</label> 
              <TextField sx={{ m: 0.8 }} id="standard-basic" variant="standard" ref={inputReset} onChange={(e) => setAnswer(e.target.value)}/>
            <button className='button' onClick={submitValue}>Create</button>
            <a href="http://localhost:3000/quiz" className='editanything'>You Can Check your Quiz</a>
            <a href="http://localhost:3000/editdelete" className='editanything'>Edit Or Delete Anything</a>
          </div>
        </form>
    </div>
  )
}

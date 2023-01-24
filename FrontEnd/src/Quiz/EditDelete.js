import React, { useEffect, useState,useRef } from 'react'
import axios from 'axios';
import TextField from '@mui/material/TextField'

export default function EditDelete() {
    const [posts, setPosts] = useState("")
    const [updatedOption1, setUpdatedOption1] = useState("");
    const [updatedOption2, setUpdatedOption2] = useState("");
    const [updatedOption3, setUpdatedOption3] = useState("");
    const [updatedOption4, setUpdatedOption4] = useState("");
    const [updatedQuestion, setUpdatedQuestion] = useState("");
    const [updatedAnswer, setUpdatedAnswer] = useState("");
    const [isShown, setIsShown] = useState(false);
  

const onDelete = (_id) => {
    axios.delete(`http://localhost:8080/quiz/${_id}`)
}

const Edit = (_id) => {
    setIsShown(current => !current);
}

const onUpdate = (_id) => {
    axios.put(`http://localhost:8080/quiz/${_id}`, {
        question: updatedQuestion,
        options: [updatedOption1, updatedOption2, updatedOption3, updatedOption4],
        answer: updatedAnswer
    })
    setIsShown(current => !current);
}

useEffect(() => {
    axios.get('http://localhost:8080/quiz')
    .then(res => {
    setPosts(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}, [onDelete, onUpdate]);  

  return (
    <div>
      {!!posts.length && posts.map(post => { 
          return( 
            <div key={post._id} className='quizDiv'>
                <h2 className='quiz'>{"Question:" + " " + post.question}</h2>
                <h2 className='quiz'>{"Options:" + " " + post.options}</h2>
                <h2 className='quiz'>{"Answer:" + " " + post.answer}</h2>
                  <button className='updatebutton' onClick={() => onDelete(post._id)}>Delete</button>
                    {isShown && (
                      <div className='editDiv'>
                        <form action="">
                          <label>Question</label> 
                          <TextField sx={{ m: 0.8, width: 400}} type="text" id="standard-basic"  variant="standard"  onChange={(e) => setUpdatedQuestion(e.target.value)}/> 
                          <label>Options</label><br /> 
                          1<TextField sx={{ m: 0.8, width: 400}} type="text" id="standard-basic"  variant="standard" onChange={(e) => setUpdatedOption1(e.target.value)}/> 
                          2<TextField sx={{ m: 0.8, width: 400}} type="text" id="standard-basic"  variant="standard" onChange={(e) => setUpdatedOption2(e.target.value)}/> 
                          3<TextField sx={{ m: 0.8, width: 400}} type="text" id="standard-basic"  variant="standard" onChange={(e) => setUpdatedOption3(e.target.value)}/> 
                          4<TextField sx={{ m: 0.8, width: 400}} type="text" id="standard-basic"  variant="standard" onChange={(e) => setUpdatedOption4(e.target.value)}/> 
                          <label>Answer</label>
                          <TextField sx={{ m: 0.8, width: 400 }} type="text" id="standard-basic"  variant="standard" onChange={(e) => setUpdatedAnswer(e.target.value)}/> 
                          <button className='updatebutton' onClick={() => onUpdate(post._id)}>Update</button>                            
                        </form>
                      </div>)}
            </div>)})}
          <div className='EditDiv1'>
            {!!posts.length && <button  className='updatebutton' onClick={Edit}>Edit</button>}
          </div> 
    </div>
  )
}

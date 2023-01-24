import React, {useState, useRef, useEffect} from 'react'
import TextField from '@mui/material/TextField'
import axios from 'axios';

export default function Login() {
    const [posts, setPosts] = useState("")
    const [isShownUp, setIsShownUp] = useState(false);
    const [isShownIn, setIsShownIn] = useState(true);
    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const inputReset = useRef(null);
    const inputReset1 = useRef(null);
    const [isShownUsername, setIsShownUsername] = useState(false);
    const [failLogin, setFailLogin] = useState(false)
    const [goToMake, setGoToMake] = useState(false)


const submitSignIn = () => {

    {posts?.map((p)=>{
        if(userName === p.username) {
            setIsShownUsername(true)
        } else {
            axios.post('http://localhost:8080/login', {        
                username: userName,
                firstname: name,
                lastname: lastName,
                password: password,
            })
        }
    })}
}

const submitLogin = () => {

    {posts?.map((p)=>{
        if(userName == p.username && password == p.password) {
            console.log("adsad")
            setFailLogin(false)
            setGoToMake(true)
        }else {
            setFailLogin(true)
        }
    })}
}

const onSignUp = () => {
    setIsShownUp(!isShownUp)
    setIsShownIn(!isShownIn)
}

const onSignIn = () => {
    setIsShownIn(!isShownIn)
    setIsShownUp(!isShownUp)
}

useEffect(() => {
    axios.get('http://localhost:8080/login')
    .then(res => {
    setPosts(res.data)
    })
}, []); 

  return (
    <div className='Login'>
            <button onClick={onSignUp} className='login'>Sign Up</button>
            <button onClick={onSignIn} className='login'>Sign In</button>
            {isShownUp && (
                <div className='signup'>
                    <label>Username</label>
                    <TextField sx={{ m: 0.8, }} type="text" ref={inputReset1} variant="standard" onChange={(e) => setUserName(e.target.value)}/>
                    {isShownUsername && (
                        <p>Username already exists</p>
                    )}
                    <label>Name</label>
                    <TextField sx={{ m: 0.8, }} type="text"  variant="standard" onChange={(e) => setName(e.target.value)}/> 
                    <label>Surname</label>
                    <TextField sx={{ m: 0.8, }} type="text"  variant="standard" onChange={(e) => setLastName(e.target.value)}/> 
                    <label>Password</label>
                    <TextField sx={{ m: 0.8, }} type="password"  variant="standard" onChange={(e) => setPassword(e.target.value)}/>
                    <button className='button' onClick={submitSignIn}>Submit</button>
                </div>
            )}
            {isShownIn && (
                <div className='signup'>
                    <label>Username</label>
                    <TextField sx={{ m: 0.8, }} type="text" ref={inputReset} variant="standard" onChange={(e) => setUserName(e.target.value)}/> 
                    <label>Password</label>
                    <TextField sx={{ m: 0.8, }} type="password" ref={inputReset} variant="standard" onChange={(e) => setPassword(e.target.value)}/> 
                    <button className='button' onClick={submitLogin}>Submit</button>
                    {failLogin && (
                        <p>oops please check your login or password</p>
                    )}
                    {goToMake && (
                        <a href="http://localhost:3000/admin" className='editanything'>Make Your Quiz</a>
                    )}
                </div>
            )}
    </div>
  )
}

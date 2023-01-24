import Quiz from './Quiz/Quiz';
import AdminPanel from './Quiz/AdminPanel';
import './App.css'
import {Route, Routes } from "react-router-dom"
import EditDelete from './Quiz/EditDelete'
import Login from './Quiz/Login';

function App() {

  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/quiz' element={<Quiz/>}/>
          <Route path="/admin" element={<AdminPanel/>} />
          <Route path='/editdelete' element={<EditDelete/>}/>
        </Routes>
    </div>
  );
}

export default App;

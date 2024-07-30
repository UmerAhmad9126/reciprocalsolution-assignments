 
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignupForm from './components/core/SignupForm';
import LoginForm from './components/core/LoginForm';
import Profile from './components/Instructor/Profile';
import ProfileStudent from './components/Student/ProfileStudent';
// import CreateTodo from "./components/Todo/CreatTodo"
import TodoForm from './components/Todo/CreatTodo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignupForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/profileInstructor" element={<Profile/>}/>
        <Route path="/profileStudent" element={<ProfileStudent/>}/>
        <Route path="/createTodo" element={<TodoForm/>}/>
      </Routes>
    </div>
  );
}

export default App;

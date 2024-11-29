import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'lazysizes';

import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Courses from './pages/Courses.jsx'
import Learning from './pages/Learning.jsx'
import Profile from './pages/Profile.jsx'
import Rank from './pages/Rank.jsx'
import Misson from './pages/Misson.jsx'
import Alphabet from './pages/Alphabet.jsx'
import Character from './pages/Character.jsx'
import Milestone from './pages/Milestone.jsx'
import Lesson from './pages/Lesson.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'

import UserInfoProvide from './stores/user.store.jsx'
function App() {
  return (
    <>
    <Router>
    <UserInfoProvide >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element= {<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot_password' element={<ForgotPassword />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/learning' element={<Learning />} >
        </Route>
        <Route path='/milestones' element={<Milestone />} />
        <Route path='/rank' element={<Rank />} />
        <Route path='/missons' element={<Misson />} />
        <Route path='/alphabet' element={<Alphabet />} />
        <Route path='/character' element={<Character />} />
        <Route path='/lesson' element={<Lesson />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' />
      </Routes>
    </UserInfoProvide>
    </Router>
    </>
  )
}

export default App

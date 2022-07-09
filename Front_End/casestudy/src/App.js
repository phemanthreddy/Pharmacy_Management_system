import logo from './logo.svg';
import './App.css';
import Loginpage from './components/Loginpage';
import Signuppage from './components/Signuppage';
import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import bootstrap from 'bootstrap';
import Homepage from './components/Homepage';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState('doctor')
  const [uiUpdate, setUiUpdate] = useState(1)
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage setUser={setUser} user={user} />} />
          <Route path="/login" element={<Loginpage setUser={setUser} user={user} />} />
          <Route path="/signup" element={<Signuppage setUser={setUser} user={user} />} />
          <Route path="/dashboard" element={<Dashboard user={user} uiUpdate = {uiUpdate} setUiUpdate = {setUiUpdate} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import LoginRegister from './components/LoginRegister';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConversationPage from './pages/ConversationPage';
import HomePage from './pages/HomePage';
import History from './components/History';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(0);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleSetUserID = (id: number | ((prevState: number) => number)) => {
    setUserID(id);
  };
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<LoginRegister onLogin={handleLogin} userID={userID} setUserID={handleSetUserID} />} />
            <Route path={"/" + userID} element={<ConversationPage userID={userID}/>} />
            <Route path="/home" element={<HomePage/>} />
          </Routes>
        </Router>
    </>
  );
}

export default App;

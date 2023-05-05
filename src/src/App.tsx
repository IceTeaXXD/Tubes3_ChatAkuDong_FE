import React, { useState } from 'react';
import LoginRegister from './pages/LoginRegister';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConversationPage from './pages/ConversationPage';
import HomePage from './pages/HomePage';
import History from './components/History';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(parseInt(localStorage.getItem('userID') || '0'));
  const [convID, setConvID] = useState(parseInt(localStorage.getItem('convID') || '0'));
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleSetUserID = (id: number | ((prevState: number) => number)) => {
    setUserID(id);
    localStorage.setItem('userID', id.toString());
  };
  
  const handleSetConvID = (id: number) => {
    setConvID(id);
    localStorage.setItem('convID', id.toString());
  };
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<LoginRegister onLogin={handleLogin} setUserID={handleSetUserID} userID={userID} />} />
            <Route path={`/${userID}/${convID}`} element={<ConversationPage userID={userID} convID={convID} setConvID={handleSetConvID}/>} />
            <Route path={"/" + userID} element={<HomePage userID={userID} convID={convID} setConvID={handleSetConvID}/>} />
          </Routes>
        </Router>
    </>
  );
}

export default App

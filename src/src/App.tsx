import React, { useState } from 'react';
import SideBar from './components/SideBar';
import History from './components/History';
import Chat from './components/Chat';
import LoginRegister from './components/LoginRegister';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <>
        {/* <div className="bg-bg w-screen h-screen overflow-x-auto">
          <div className="flex flex-row">
            <div className="w-1/12">
              <SideBar />
            </div>
            <div className="w-7/8">
              <History />
            </div>
            <div className="w-full bg-white">
              <Chat />
            </div>
          </div>
        </div> */}
        <Router>
          <Routes>
            <Route path="/login" element={<LoginRegister onLogin={handleLogin} />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;

import React, { useState } from 'react';
import SideBar from './components/SideBar';
import History from './components/History';
import Chat from './components/Chat';
import LoginRegister from './components/LoginRegister';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginRegister onLogin={handleLogin} />
      ) : (
        <div className="bg-bg w-screen h-screen overflow-x-auto">
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
        </div>
      )}
    </>
  );
}

export default App;

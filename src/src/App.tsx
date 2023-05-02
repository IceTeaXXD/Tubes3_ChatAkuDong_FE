import React from 'react';
import SideBar from './components/SideBar';
import History from './components/History';
import Chat from './components/Chat';

function App() {
  return (
    <div className="bg-bg w-screen h-screen overflow-x-auto">
      <div className="flex flex-row">
        <div className = "w-1/12">
          <SideBar />
        </div>
        <div className = "w-7/8">
          <History />
        </div>
        <div className='w-full bg-white'>
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;

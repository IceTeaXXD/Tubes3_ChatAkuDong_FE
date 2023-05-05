import React, { useEffect, useState } from 'react';

interface Props {
  userID: number;
  flagCol : boolean;
}

const SideBar: React.FC<Props> = ({ userID , flagCol}) => {
  const [submit, setSubmit] = useState(false);
  const [conversation, setConversation] = useState<{ Topic: string }[]>([]);
  const [collapsed, setCollapsed] = useState(false); 
  useEffect (() => {
      setCollapsed(flagCol);
    },[flagCol]);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const response = await fetch(
        'https://tubes3chatakudongbe-production.up.railway.app/' + userID + '/conversation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Topic: 'New Conversation',
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      console.log('=================================');
    } catch (error) {
      console.log(error);
    }
    setSubmit(false);
  };

  return (
    <div
      className={`sidebar fixed left-3 ${
        collapsed ? '' : 'bottom-3'
      } top-3 p-2 w-${collapsed ? '70' : '70'}px overflow-y-auto text-center bg-primary rounded-3xl transition-all duration-500 ease-in-out`}
    >
      <div>
        <button onClick={() => setCollapsed(!collapsed)}>
          <img
            className="mx-auto m-3"
            src={require('../assets/logo.png')}
            alt="logo"
            width={"45px"}
          />
        </button>
      </div>
      {!collapsed && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="mt-12">
              <button type="submit">
                <img
                  className="mx-auto m-3"
                  src={require('../assets/new_chat.png')}
                  alt="logo"
                  width="25px"
                />
              </button>
            </div>
          </form>

          <div>
            <button>
              <img
                className="mx-auto m-3"
                src={require('../assets/history.png')}
                alt="logo"
                width="23px"
              />
            </button>
          </div>
          <div>
            <button>
              <img
                className="mx-auto m-3"
                src={require('../assets/info.png')}
                alt="logo"
                width="25px"
              />
            </button>
          </div>

          <div className="absolute bottom-3">
            <button>
              <img
                className="m-3"
                src={require('../assets/about-us.png')}
                alt="logo"
                width="25px"
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;

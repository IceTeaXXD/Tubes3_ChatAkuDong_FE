import React, { useState } from 'react';

interface Props {
    userID: number;
}
const SideBar: React.FC<Props> = ({userID}) => {
    const [submit, setSubmit] = useState(false);
    const [conversation, setConversation] = useState<{
        Topic : string,
    }[]>([]);
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setSubmit(true);
        try {
          const response = await fetch('https://tubes3chatakudongbe-production.up.railway.app/'+userID+'/conversation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Topic: "New Conversation",
            })
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log(response);
          console.log("=================================")
        } catch (error) {
          console.log(error);
        }
        setSubmit(false);
      };
      
    return (
        <div className="sidebar fixed left-3 bottom-3 top-3 p-2 w-[60px] overflow-y-auto text-center bg-primary rounded-3xl">
            <div>
                <img className = "mx-auto m-3" src={require('../assets/logo.png')} alt = "logo" width="35px"></img>
            </div>

            <form onSubmit={handleSubmit}>
                <div className = "mt-12">
                    <button type="submit">
                        <img className = "mx-auto m-3" src={require('../assets/new_chat.png')} alt = "logo" width="25px"></img>
                    </button>
                </div>
            </form>

            <div className = "mt-6">
                <img className = "mx-auto m-3" src={require('../assets/history.png')} alt = "logo" width="23px"></img>
            </div>
            <div className = "mt-6">
                <img className = "mx-auto m-3" src={require('../assets/info.png')} alt = "logo" width="25px"></img>
            </div>

            <div className = "absolute bottom-3 mx-auto">
                <img className = "m-3"src={require('../assets/about-us.png')} alt = "logo" width="25px"></img>
            </div>
        </div>
    );
};
export default SideBar;

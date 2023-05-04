import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HistProps{
    userID: number;
    convID: number;
    setConvID: (id: number) => void;
}

const History : React.FC<HistProps>= ({userID,convID, setConvID}) => {
    const [histData, setHistData] = useState<{ IDConversation: number, IDUser: number, Topic : string,  Date :Date }[]>([]);
    // const [curConvId, setConvID] = useState(0);
    async function fetchData() {
        try {
            const response = await fetch(`https://tubes3chatakudongbe-production.up.railway.app/${userID}`);
            const data = await response.json();

            // Transform each object in the data.conversation array to the required format
            const transformedData = data.conversation.map((obj: any) => ({
                IDConversation: obj.IDConversation,
                IDUser: obj.IDUser,
                Topic: obj.Topic,
                Date: new Date(obj.Date),
            }));

            // Update state
            console.log(transformedData)
            setHistData(transformedData);
        } catch (error) {
            console.log(error);
        }
    }
      
    useEffect(() => {
        fetchData();
    }, []);
    
    const navigate = useNavigate();
    
    const handleButtonClick = (obj: { IDConversation: number }) => {
        navigate(`/${userID}/${obj.IDConversation}`);
        setConvID(obj.IDConversation);
    };      

    return (
        <div className="container mx-auto my-10 items-center justify-center p-2">
            <div className = "flex flex-row mb-5">
                <img src={require('../assets/hist-black.png')} alt = "logo" width="25px"></img>
                <h1 className = "text-lg font-bold ml-3">History Messages</h1>
            </div>
            <div>
                {histData.map((obj, index) => ( 
                    <div key={index}>
                        <button className="w-full" onClick={() => handleButtonClick(obj)}>
                            <div className="flex flex-col overflow-y-auto">
                                <div className="flex flex-row py-2 px-2 justify-center items-center border-l-2 border-primary">
                                    <div className="w-1/4">
                                        <img
                                            src={require('../assets/chat.png')}
                                            alt="chat logo"
                                            width="40px"
                                        />
                                    </div>
                                    <div className="w-full ml-2">
                                        <div className="text-sm font-semibold">{obj.Date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                        <p className="text-xs text-gray-500">{obj.Topic}</p>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default History;

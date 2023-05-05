import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HistProps {
  userID: number;
  convID: number;
  setConvID: (id: number) => void;
}

const History: React.FC<HistProps> = ({ userID, convID, setConvID }) => {
  const [histData, setHistData] = useState<{
    IDConversation: number;
    IDUser: number;
    Topic: string;
    Date: Date;
  }[]>([]);
  const [clickedIndex, setClickedIndex] = useState(-1);
  async function fetchData() {
    try {
      const response = await fetch(
        `https://tubes3chatakudongbe-production.up.railway.app/${userID}`
      );
      const data = await response.json();

      // Transform each object in the data.conversation array to the required format
      const transformedData = data.conversation.map((obj: any) => ({
        IDConversation: obj.IDConversation,
        IDUser: obj.IDUser,
        Topic: obj.Topic,
        Date: new Date(obj.Date),
      }));
      // sort by IDConversation
      const sortedData = transformedData.sort((a: { IDConversation: number }, b: { IDConversation: number }) => a.IDConversation - b.IDConversation);
      // Update state
      console.log(transformedData);
      setHistData(sortedData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  });

  const navigate = useNavigate();
  // if IDConversation is not null, change button color
    useEffect(() => {
        if (convID !== -1) {
            const index = histData.findIndex((obj) => obj.IDConversation === convID);
            setClickedIndex(index);
        }
    }, [convID, histData]);
  const handleButtonClick = (obj: { IDConversation: number }, index: number) => {
    navigate(`/${userID}/${obj.IDConversation}`);
    setConvID(obj.IDConversation);
    setClickedIndex(index); // update clicked button state
  };
  async function handleClose(obj: { IDConversation: number }) {
    try {
      const response = await fetch(
        `https://tubes3chatakudongbe-production.up.railway.app/${userID}/${obj.IDConversation}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
      fetchData();
      setConvID(-1);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container mx-auto my-10 items-center justify-center p-2">
      <div className="flex flex-row mb-5">
        <img src={require("../assets/hist-black.png")} alt="logo" width="25px"/>
        <h1 className="text-lg font-bold ml-3">History Messages</h1>
      </div>
      <div>
        {histData.map((obj, index) => (
          <div key={index} className="relative">
          <button
            className={`w-full ${clickedIndex === index ? "bg-blue-200" : "bg-white"}`}
            onClick={() => handleButtonClick(obj, index)}
          >
            <div className="flex flex-col overflow-y-auto">
              <div className="flex flex-row py-2 px-2 justify-center items-center border-l-2 border-primary">
                <div className="w-1/4">
                  <img src={require("../assets/chat.png")} alt="chat logo" width="40px" />
                </div>
                <div className="w-full ml-2">
                  <div className="text-sm font-semibold">{obj.Date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</div>
                  <p className="text-xs text-gray-500">{obj.Topic}</p>
                </div>
                <div className="opacity-0 hover:opacity-100">
                  <button className="ml-auto" onClick={() => handleClose(obj)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </button>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default History;

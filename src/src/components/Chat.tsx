import React, { useState, useEffect, useRef } from "react";
import ReactSwitch from 'react-switch';

interface Props {
    userID: number;
    convID: number;
}
const Chat: React.FC<Props> = ({userID,convID}) => { 
    const [message, setMessage] = useState('');
    const [method, setMethod] = useState(0);
    const [answer, setAnswer] = useState('');
    const [checked, setChecked] = useState(false);
    const [submit, setSubmit] = useState(false);
    const handleChange = (val: boolean | ((prevState: boolean) => boolean)) => {
        setChecked(val)
        setMethod(val ? 0 : 1);
    }
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setSubmit(true);
        try{
            const response = await fetch('https://tubes3chatakudongbe-production.up.railway.app/'+userID+'/' + convID + '/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Question: message,
                    Answer: answer,
                    SearchMethod: method
                })
            });
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
        //reset messagenya
        setMessage('');
        setSubmit(false);
    };    
    const [chatData, setChatData] = useState<{ Question: string, Answer: string, IDChat: number, IDConversation: number, IDUser: number }[]>([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://tubes3chatakudongbe-production.up.railway.app/${userID}/${convID}`);
                const data = await response.json();
                // Transform each object in the data.chat array to the required format
                const transformedChatData = data.chat.map((chatObject: any) => ({
                    Question: chatObject.Question,
                    Answer: chatObject.Answer,
                    IDChat: chatObject.IDChat,
                    IDConversation: chatObject.IDConversation,
                    IDUser: chatObject.IDUser,
                }));
                const sortedChatData = transformedChatData.sort((a: { IDChat: number }, b: { IDChat: number }) => a.IDChat - b.IDChat);
                setChatData(sortedChatData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [submit, userID, convID]);
    const [filteredConvData, setFilteredConvData] = useState<{ IDConversation: number; IDUser: number; Date: Date ; Topic : string}>();
    const [histData, setHistData] = useState<{
        IDConversation: number;
        IDUser: number;
        Topic: string;
        Date: Date;
      }[]>([]);
    async function getConv() {
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
          const filteredData = transformedData.filter((item: { IDConversation: number; }) => item.IDConversation === convID);
          console.log(filteredData);
          // Update state
          console.log(transformedData);
          setHistData(transformedData);
        } catch (error) {
          console.log(error);
        }
      }
    useEffect(() => {
        getConv()
        const filteredData = histData.filter((item: { IDConversation: number; }) => item.IDConversation === convID);
        setFilteredConvData(filteredData[0]);
    }, [convID, histData]);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    }, [chatData]);

    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-col flex-auto p-6">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-bg h-full p-4">
                <div className="flex flex-row p-3 border-2 rounded-xl shadow-md m-3 items-center">
                    <img src={require("../assets/chat.png")} width="40px" />
                    <div className="flex flex-col pl-4">
                        <p className="font-bold text-xm">{filteredConvData?.Date.toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">{filteredConvData?.Topic}</p>
                    </div>
                    <div className="flex items-center justify-between ml-auto">
                        <p className="text-xs text-gray-500 m-2">KMP</p>
                        <ReactSwitch
                            checked={checked}
                            onChange={handleChange}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#4849A3"
                        />
                        <p className="text-xs text-gray-500 m-2">BM</p>
                    </div>
                </div>
                    {/* isi chat */}
                    <div className="flex flex-col h-full overflow-x-auto mb-4">
                        <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">

                            <div className="col-start-1 col-end-8 p-3 rounded-lg">
                            </div>
                                {/* BLOCK 1 */}
                                <div className="col-start-13 col-end-1 p-3 rounded-lg justify-end self-end" ref={messagesEndRef}>
                                    {chatData.length > 0 && chatData.map((chatItem, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-start flex-row-reverse mb-2">
                                                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl rounded-tr-none text-right w-max">
                                                    <div>{chatItem.Question}</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <div className = "relative ml-3 text-sm bg-primary py-2 px-4 shadow rounded-xl rounded-tl-none" style={{ whiteSpace: 'pre-wrap' }}>
                                                    <div className = "text-white">{chatItem.Answer}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                        </div>
                        </div>
                    </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                        <div className="flex-grow ml-4">
                            <div className="relative w-full">
                            <input
                                type="text"
                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                placeholder="Type your message here...."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className="ml-4">
                        <button type="submit" className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-white px-4 py-1 flex-shrink-0">
                            <img src={require("../assets/send.png")} width="25px" className="rounded-full"></img>
                        </button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}
export default Chat;
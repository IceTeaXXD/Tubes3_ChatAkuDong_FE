import { error } from "console";
import React, { useState, useEffect } from "react";
import ReactSwitch from 'react-switch';

interface Props {
    userID: number;
}
const Chat: React.FC<Props> = ({userID}) => { 
    const [message, setMessage] = useState('');
    const [answer, setAnswer] = useState('');
    const [checked, setChecked] = useState(true);
    const [submit, setSubmit] = useState(false);
    const handleChange = (val: boolean | ((prevState: boolean) => boolean)) => {
        setChecked(val)
    }
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setSubmit(true);
        try{
            const response = await fetch('https://tubes3chatakudongbe-production.up.railway.app/'+userID+'/1/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Question: message,
                    Answer: answer
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
                const response = await fetch('https://tubes3chatakudongbe-production.up.railway.app/'+userID+'/1');
                const data = await response.json();
                // console.log(data);

                // Transform each object in the data.chat array to the required format
                const transformedChatData = data.chat.map((chatObject: any) => ({
                    Question: chatObject.Question,
                    Answer: chatObject.Answer,
                    IDChat: chatObject.IDChat,
                    IDConversation: chatObject.IDConversation,
                    IDUser: chatObject.IDUser
                }));

                // Update the state with the transformed chat data
                setChatData(transformedChatData);
                // console.log(chatData)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [submit]);
    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-col flex-auto p-6">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-bg h-full p-4">
                <div className="flex flex-row p-3 border-2 rounded-xl shadow-md m-3 items-center">
                    <img src={require("../assets/chat.png")} width="" />
                    <div className="flex flex-col pl-4">
                        <p className="font-bold text-xm">DD/MM/YYYY</p>
                        <p className="text-xs text-gray-500">Lorem ipsum dolor sir amet consectetur</p>
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
                                <div className="flex flex-row items-center">
                                    <div className = "relative ml-3 text-sm bg-primary py-2 px-4 shadow rounded-xl rounded-tl-none">
                                        <div className = "text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </div>
                                    </div>
                                </div>
                            </div>
                                {/* BLOCK 1 */}
                                <div className="col-start-13 col-end-1 p-3 rounded-lg justify-end self-end">
                                    {chatData.length > 0 && chatData.map((chatItem, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-start flex-row-reverse mb-2">
                                                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl rounded-tr-none text-right w-max">
                                                    <div>{chatItem.Question}</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <div className = "relative ml-3 text-sm bg-primary py-2 px-4 shadow rounded-xl rounded-tl-none">
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

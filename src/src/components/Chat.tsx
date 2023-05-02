import { error } from "console";
import React, { useState, useEffect } from "react";

const Chat = () => {
    const [description, setDescription] = useState("");
    const [chat, setChat] = useState([]); 
    const getChats = async () => {
        try {
            const response = await fetch("http://localhost:5000/chats");
            const jsonData = await response.json();
            console.log(jsonData);
            setChat(jsonData);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getChats();
    }, []);

    const onSendChat = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const body = { description };
            await fetch("http://localhost:5000/chats", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            setDescription(""); // Clear the input field after the chat is sent
            const updatedChatsResponse = await fetch("http://localhost:5000/chats");
            const updatedChatsJsonData = await updatedChatsResponse.json();
            setChat(updatedChatsJsonData); // Update the chat state with the updated chats
        } catch (err) {
            console.error(err);
        }
    };    
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
                        <label htmlFor="toggle" className="flex items-center cursor-pointer">
                            <span className="text-xs font-medium mr-2">KMP</span>
                            <div className="relative">
                            <input type="checkbox" id="toggle" className="sr-only" />
                            <div className="block bg-primary w-10 h-5 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition"></div>
                            </div>
                            <span className="text-xs font-medium mr-2">BM</span>
                        </label>
                    </div>
                </div>
                    {/* isi chat */}
                    <div className="flex flex-col h-full overflow-x-auto mb-4">
                        <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">

                            {/* <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                <div className="flex flex-row items-center">
                                    <div className = "relative ml-3 text-sm bg-primary py-2 px-4 shadow rounded-xl rounded-tl-none">
                                        <div className = "text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </div>
                                    </div>
                                </div>
                            </div> */}
                            
                            <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                {chat.map((chatItem: { description: string }, index: number) => (
                                    <div key={index} className="flex items-center justify-start flex-row-reverse mb-2">
                                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl rounded-tr-none">
                                            <div>{chatItem.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        </div>
                    </div>
                <form onSubmit={onSendChat}>
                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                        <div className="flex-grow ml-4">
                            <div className="relative w-full">
                            <input type="text" className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" placeholder="Type your message here...." value={description} onChange={e => setDescription(e.target.value)}/>
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

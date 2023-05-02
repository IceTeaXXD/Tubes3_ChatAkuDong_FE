import React from "react";

const History = () => {
    return (
        <div className="container mx-auto my-10 items-center justify-center p-2">
            <div className = "flex flex-row mb-5">
                <img src={require('../assets/hist-black.png')} alt = "logo" width="25px"></img>
                <h1 className = "text-lg font-bold ml-3">History Messages</h1>
            </div>
            <div className="flex flex-col overflow-y-auto">
                <div className="flex flex-row py-2 px-2 justify-center items-center border-l-2 border-primary bg-blue-200">
                    <div className="w-1/4">
                        <img
                        src={require('../assets/chat.png')}
                        alt="chat logo"
                        width="40px"
                        />
                    </div>
                    <div className="w-full ml-2">
                        <div className="text-sm font-semibold">DD/MM/YYYY</div>
                        <p className="text-xs text-gray-500">Lorem ipsum dolor sir amet consectetur</p>
                    </div>
                </div>

                <div className="flex flex-row py-2 px-2 justify-center items-center">
                <div className="w-1/4">
                    <img
                    src={require('../assets/chat.png')}
                    alt="chat logo"
                    width="40px"
                    />
                </div>
                <div className="w-full ml-2">
                    <div className="text-sm font-semibold">DD/MM/YYYY</div>
                    <p className="text-xs text-gray-500">Lorem ipsum dolor sir amet consectetur</p>
                </div>
                </div>

                <div className="flex flex-row py-2 px-2 justify-center items-center">
                <div className="w-1/4">
                    <img
                    src={require('../assets/chat.png')}
                    alt="chat logo"
                    width="40px"
                    />
                </div>
                <div className="w-full ml-2">
                    <div className="text-sm font-semibold">DD/MM/YYYY</div>
                    <p className="text-xs text-gray-500">Lorem ipsum dolor sir amet consectetur</p>
                </div>
                </div>

                <div className="flex flex-row py-2 px-2 justify-center items-center">
                <div className="w-1/4">
                    <img
                    src={require('../assets/chat.png')}
                    alt="chat logo"
                    width="40px"
                    />
                </div>
                <div className="w-full ml-2">
                    <div className="text-sm font-semibold">DD/MM/YYYY</div>
                    <p className="text-xs text-gray-500">Lorem ipsum dolor sir amet consectetur</p>
                </div>
                </div>

                <div className="flex flex-row py-2 px-2 justify-center items-center">
                <div className="w-1/4">
                    <img
                    src={require('../assets/chat.png')}
                    alt="chat logo"
                    width="40px"
                    />
                </div>
                <div className="w-full ml-2">
                    <div className="text-sm font-semibold">DD/MM/YYYY</div>
                    <p className="text-xs text-gray-500">Lorem ipsum dolor sir amet consectetur</p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default History
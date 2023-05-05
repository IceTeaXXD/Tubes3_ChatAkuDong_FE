import React from "react";
import SideBar from "../components/SideBar";
import History from "../components/History";

interface HistProps{
    userID: number;
    convID : number;
    setConvID : (id: number) => void;
}

const HomePage: React.FC<HistProps> = ({userID, convID,setConvID}) => {
    return(
        <div className="bg-bg w-screen h-screen overflow-x-auto">
        <div className="flex flex-row">
            <div className="w-1/12">
            <SideBar userID={userID}/>
            </div>
            <div className="w-3/12">
            <History userID={userID} convID={convID} setConvID={setConvID} />
            </div>
            <div className="w-full bg-white">
            <div className="flex h-screen antialiased">
                <div className="flex flex-col flex-auto">
                <img src={require("../assets/logo-bg.png")} className="rounded-full mx-auto h-1/2 my-auto"></img>
                </div>
            </div>
            </div>
        </div>
        </div>

    );
};

export default HomePage;
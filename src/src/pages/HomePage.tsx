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
        <div>
            <div className="bg-bg w-screen h-screen overflow-x-auto">
                <div className="flex flex-row">
                    <div className="w-1/12">
                    <SideBar />
                    </div>
                    <div className="w-7/8">
                    <History userID={userID} convID={convID} setConvID={setConvID} />
                    </div>
                    <div className="w-full">
                        <p>PLACEHOLDER</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
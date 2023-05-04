import React from "react";
import SideBar from "../components/SideBar";
import History from "../components/History";

const HomePage = () => {
    return(
        <div>
            <div className="bg-bg w-screen h-screen overflow-x-auto">
                <div className="flex flex-row">
                    <div className="w-1/12">
                    <SideBar />
                    </div>
                    <div className="w-7/8">
                    <History />
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
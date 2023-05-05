import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import History from "../components/History";
import Chat from "../components/Chat";
import { useMediaQuery } from "@react-hook/media-query";
interface Props {
    userID: number;
    convID : number;
    setConvID : (id: number) => void;
}
const ConvesationPage: React.FC<Props> = ({userID, convID,setConvID}) => {
    const [checker, setChecker] = React.useState(false);
    const isSmallScreen = useMediaQuery("(max-width: 1000px)");
    useEffect (() => {
      setChecker(isSmallScreen);
      });
    return(
        <div>
            <div className="bg-bg w-screen h-screen overflow-x-auto">
                <div className="flex flex-row">
                    <div className="w-1/12">
                    <SideBar userID={userID} flagCol={checker}/>
                    </div>
                    <div className="w-2/6">
                    <History userID={userID} convID={convID} setConvID={setConvID}/>
                    </div>
                    <div className="w-full bg-white">
                    <Chat userID={userID} convID={convID}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConvesationPage;
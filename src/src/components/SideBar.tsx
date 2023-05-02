import React from 'react';

const SideBar = () => {
    return (
        <div className="sidebar fixed left-3 bottom-3 top-3 p-2 w-[60px] overflow-y-auto text-center bg-primary rounded-3xl">
            <div>
                <img className = "mx-auto m-3" src={require('../assets/logo.png')} alt = "logo" width="35px"></img>
            </div>

            <div className = "mt-12">
                <img className = "mx-auto m-3" src={require('../assets/new_chat.png')} alt = "logo" width="25px"></img>
            </div>
            <div className = "mt-6">
                <img className = "mx-auto m-3" src={require('../assets/history.png')} alt = "logo" width="23px"></img>
            </div>
            <div className = "mt-6">
                <img className = "mx-auto m-3" src={require('../assets/info.png')} alt = "logo" width="25px"></img>
            </div>

            <div className = "absolute bottom-3 mx-auto">
                <img className = "m-3"src={require('../assets/about-us.png')} alt = "logo" width="25px"></img>
            </div>
        </div>
    );
};
export default SideBar;

import React from "react";
import LoginRegister from "../components/LoginRegister";

const LoginRegisterPages = () => {
    return(
        <div>
            <LoginRegister onLogin={
                function () {
                throw new Error("Function not implemented.");
                } 
            } 
            userID={0} setUserID={function (value: React.SetStateAction<number>): void {
                throw new Error("Function not implemented.");
            } } />
        </div>
    );
};

export default LoginRegisterPages;
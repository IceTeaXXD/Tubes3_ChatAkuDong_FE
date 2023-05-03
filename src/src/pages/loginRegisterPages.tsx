import React from "react";
import LoginRegister from "../components/LoginRegister";

const LoginRegisterPages = () => {
    return(
        <div>
            <LoginRegister onLogin={function () {
                throw new Error("Function not implemented.");
            } } />
        </div>
    );
};

export default LoginRegisterPages;
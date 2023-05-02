import React, { useState } from "react";

const LoginRegister = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [activeTab, setActiveTab] = useState("login");

    const handleLogin = () => {
        console.log("Logging in with username:", username, "and password:", password);
        // Add code to handle login form submission
    };

    const handleRegister = () => {
        console.log("Registering with username:", registerUsername, "and password:", registerPassword);
        // Add code to handle register form submission
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-center mb-6">
                        <button
                            className={`${
                                activeTab === "login"
                                ? "bg-primary text-white"
                                : "text-gray-500"
                            } px-4 py-2 rounded-l-lg font-[Poppins]`}
                            onClick={() => setActiveTab("login")}
                        >
                        Login
                        </button>
                        <button
                            className={`${
                                activeTab === "register"
                                ? "bg-primary text-white"
                                : "text-gray-500"
                            } px-4 py-2 rounded-r-lg font-[Poppins]`}
                            onClick={() => setActiveTab("register")}
                        >
                        Register
                        </button>
                    </div>
                    
                    {activeTab === "login" ? 
                        (
                            <form onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-[Poppins] font-bold mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-[Poppins]"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-[Poppins] font-bold mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-[Poppins]"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <button
                                    className="bg-primary hover:bg-secondary text-white font-[Poppins] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    >
                                    Login
                                    </button>
                                </div>
                            </form>
                        ): 
                        (
                            <form onSubmit={handleRegister}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-[Poppins] font-bold mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-[Poppins]"
                                        placeholder="Enter a username"
                                        value={registerUsername}
                                        onChange={(e) => setRegisterUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-[Poppins] font-bold mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-[Poppins]"
                                        placeholder="Enter a password"
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-center">
                                <button
                                    className="bg-primary hover:bg-secondary text-white font-[Poppins] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    >
                                    Register
                                </button>
                                </div>
                            </form>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;

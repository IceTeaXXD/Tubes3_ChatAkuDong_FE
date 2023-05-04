import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    IDUser: number;
    Username: string;
    Password: string;
}

interface LoginProps {
    onLogin: () => any;
}

const LoginRegister: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [activeTab, setActiveTab] = useState("login");
    const [users, setUsers] = useState<User[]>([]);
    const [loginFailed, setLoginFailed] = useState(false);
    const [registerFailed, setRegisterFailed] = useState(false);
    useEffect(() => {
        fetchUsers();
    }, []);
        
    const fetchUsers = () => {
        fetch("https://tubes3chatakudongbe-production.up.railway.app/login")
            .then((response) => response.json())
            .then((data) => setUsers(data.users))
            .catch((error) => console.error("Error fetching users: ", error));
    };

    const navigate = useNavigate()
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchUsers();
        console.log("Logging in with username:", username, "and password:", password);
        if (users.length > 0) {
            const user = users.find(
                (u: User) => u.Username === username && u.Password === password
            );
            if (user) {
                console.log("Login successful:", user);
                navigate('/home');
                onLogin();
            } else {
                console.error("Login failed: incorrect username or password");
                setLoginFailed(true)
            }
        } else {
            console.error("Login failed: no users found");
            setLoginFailed(true)
        }
    };

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Registering with username:",registerUsername,"and password:",registerPassword);
        try {
            const user = users.find((u: User) => u.Username === registerUsername);
            if (user) {
                console.error("Registration failed: username already exists");
                setRegisterFailed(true)
            } else {
                const response = await fetch("https://tubes3chatakudongbe-production.up.railway.app/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: registerUsername,
                        password: registerPassword,
                    }),
                });
                const data = await response.json();
                console.log("Registration successful:", data);
                setActiveTab("login");
                fetchUsers();
                setRegisterFailed(false)
            }
        } catch (error) {
            console.error("Error registering user: ", error);
            setRegisterFailed(true)
        }
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
                            onClick={() => {
                                setActiveTab("login")
                                setRegisterUsername("")
                                setRegisterPassword("")
                                setLoginFailed(false)
                                setRegisterFailed(false)
                            }}
                        >
                        Login
                        </button>
                        <button
                            className={`${
                                activeTab === "register"
                                ? "bg-primary text-white"
                                : "text-gray-500"
                            } px-4 py-2 rounded-r-lg font-[Poppins]`}
                            onClick={() => {
                                setActiveTab("register")
                                setUsername("")
                                setPassword("")
                                setLoginFailed(false)
                                setRegisterFailed(false)
                            }}
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
                    
                    {loginFailed && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
                            <p className="font-bold">Login failed.</p>
                            <p>Please check your username and password and try again.</p>
                        </div>
                    )}

                    {registerFailed && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
                            <p className="font-bold">Registration failed.</p>
                            <p>Please try again with a different username.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;

import React, {useState, useEffect} from "react";
import SideBar from "../components/SideBar";
import { useMediaQuery } from "@react-hook/media-query";

interface Props {
    userID: number;
}

const AboutUs: React.FC<Props> = ({userID}) => {
    const [checker, setChecker] = useState(false);
    const isSmallScreen = useMediaQuery("(max-width: 1000px)");
    useEffect (() => {
        setChecker(isSmallScreen);
        });
    const [isHovered, setIsHovered] = useState(false);
    const [image, setImage] = useState(require("../assets/ChatAkuDong.jpg"));

    const handleMouseEnter = () => {
        setIsHovered(true);
        setImage(require("../assets/AltChatAkuDong.jpg"));
    };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
        setImage(require("../assets/ChatAkuDong.jpg"));
      };

    return(
        <div>
            <div className="bg-bg w-screen h-screen overflow-x-auto">
                <div className="flex flex-row">
                    <div className="w-1/12">
                        <SideBar userID={userID} flagCol={checker}/>
                    </div>
                    <div className="w-full">
                        <div className="flex-row h-screen antialiased text-gray-800 font-[Poppins]">
                            <div className="container p-8 text-2xl font-bold">
                                About Us
                            </div>
                            <div className="container p-9">
                                <div className="flex justify-center">
                                    <img 
                                    src={image} 
                                    width="500rem" 
                                    className={`rounded-full transition duration-500 ease-in-out transform ${
                                        isHovered ? "scale-150" : ""
                                    }`}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave} 
                                    />
                                </div>
                                

                                <div className="pt-3">
                                    Aplikasi ChatBot "ChatAkuDong" adalah ChatBot yang mengimplementasikan algoritma Knuth-Morris-Pratt
                                    dan Boyer-Moore dalam proses menjawab pertanyaan dari pengguna. Kedua algoritma tersebut merupakan
                                    algoritma pencarian string yang efektif dan 'pintar'. Algoritma ini juga menggunakan Regular Expression
                                    untuk menentukan perintah-perintah di dalam aplikasi.
                                </div>
                                <div className="pt-3">
                                    ChatAkuDong dapat digunakan untuk menanyakan hari pada suatu tanggal dengan format dd/mm/yyyy, melakukan
                                    operasi matematika sederhana, dan menjawab pertanyaan yang pengguna berikan. Pertanyaan sudah terdapat dalam 
                                    basis data dan dapat ditambahkan oleh pengguna melalui perintah 'Tambah pertanyaan X dengan jawaban Y'.
                                </div>
                                <div className="pt-3">
                                    ChatAkuDong didevelop oleh sekelompok mahasiswa Informatika ITB yaitu Henry Anand Septian Radityo, Matthew Mahendra
                                    , dan Ahmad Nadil menggunakan bahasa pemrograman React sebagai frontend dan Go sebagai backend.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
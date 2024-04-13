import React,{useEffect} from 'react';
import Navbar from "../component/Navbar"


const Home = () => {

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = 'unset';
        };
    }, []);
    return (
        <div className="h-screen w-screen overflow-hidden">
            <Navbar/>
        
            <div className='flex justify-center items-center h-full w-full bg-gradient-to-b from-black to-gray-800 p-6 pb-4'>
               <div className="text-center">
                    <h1 className="text-6xl font-bold text-white mb-4">Explore FinTech's Depths with InFinBlock Unleashing Blockchain’s Future Today. </h1>

                    <h2 className="mt-5 text-2xl text-white">FinTech’s revolutionary evolution, distilled into clarity and simplicity. Finance redefined, innovation realized — welcome aboard.</h2>
               </div>
            </div>
        </div>
    );
}

export default Home;

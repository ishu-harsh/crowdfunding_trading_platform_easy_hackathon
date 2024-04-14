import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InFinBlockImage from '../resource/INFINBLOCK__1_-ai-brush-removebg-iyxg5peq.png';


const DashboardNavbar = () => {
    const navigate = useNavigate();
    const [provider, setProvider] = useState(null);
    const [error,seterror] = useState(null);
    const [showAddress,setAddress] = useState(null);

   
    const handleConnectWallet = async () => {
     if(window.ethereum){

        window.ethereum.request({method: "eth_requestAccounts"}).then(result => {

            fetchAllData(result[0]);

        });

     }else{
        seterror('Error ');
     }
    };

    const fetchAllData=(fetch)=>{
        setAddress(fetch);
    }
    

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className='bg-black flex justify-between items-center h-24 max-w-full mx-auto px-4 text-white shadow-lg'>
            {/* Logo */}
            <img src={InFinBlockImage} alt='InFinBlock' className='h-[120px] w-[200px] shadow-xl' />

            {/* Connect Wallet */}
            <div
                onClick={handleConnectWallet}
                className='font-semibold text-center w-[180px] cursor-pointer bg-white text-black py-2 px-4 rounded-lg ml-4 hover:bg-[#00df9a] hover:text-white'>
                Connect Wallet
            </div>
        </div>
    );
};



export default DashboardNavbar;

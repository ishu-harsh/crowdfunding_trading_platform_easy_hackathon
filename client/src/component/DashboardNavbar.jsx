import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
  import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
   

const DashboardNavbar = () => {
    // const [nav, setNav] = useState(false);


    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const [open, setOpen] = React.useState(0);
 
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

   

    return(

    <div className='bg-black flex justify-between items-center h-24 max-w-full mx-auto px-4 text-white shadow-lg'>
        {/* Logo */}
        <h1  onClick={() => handleNavigation("/dashboard")} className=' cursor-pointer w-full text-3xl font-bold text-[#00df9a]'>InFinBlock</h1>

       {/* Connect Wallet */}
       <div 
                onClick={() => {
                    // Action when Connect Wallet is clicked
                }} 
                className='font-semibold text-center w-[180px] cursor-pointer bg-white text-black py-2 px-4 rounded-lg ml-4 hover:bg-[#00df9a] hover:text-white'
                // style={{width: '180px', textAlign: 'center'}}
            >
                Connect Wallet
        </div>
  
    </div>
    );

}

export default DashboardNavbar;
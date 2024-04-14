import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import InFinBlockImage from '../resource/INFINBLOCK__1_-ai-brush-removebg-iyxg5peq.png';


const Navbar = () =>{
    const [nav, setNav] = useState(false);


    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    
  

    const handleNav = () => {
      setNav(!nav);
    };
  

    const navItems = [
      { id: 1, text: 'About', path: '/' },
      { id: 2, text: 'Contact', path: '/contact' },
      { id: 3, text: 'Login', path: '/login' },
      { id: 4, text: 'Register', path: '/register' },
  ];
  
    return (
      <div className='bg-black flex justify-between items-center h-24 max-w-full mx-auto px-4 text-white shadow-lg'>
        {/* Logo */}
        <img src={InFinBlockImage} alt='InFinBlock' className='h-[120px] w-[200px] shadow-xl' />

        {/* Desktop Navigation */}
        <ul className='hidden md:flex'>
          {navItems.map(item => (
            <li 
            onClick={() => handleNavigation(item.path)}
              key={item.id}
            
              className='p-4 cursor-pointer duration-300 hover:text-[#00df9a]'
              >
              {item.text}
            </li>
          ))}
        </ul>
  
        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'></h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Navbar;
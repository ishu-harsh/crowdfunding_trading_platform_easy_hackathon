import React, { useEffect, useState } from 'react';
import DashboardNavbar from "../component/DashboardNavbar";
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import TransactionTable from '../component/TransactionTable'; // Import the TransactionTable component

import {
  Card,
  List,
  ListItem,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  InboxIcon,
  ChartBarIcon
} from "@heroicons/react/24/solid";
import { AiOutlineMoneyCollect } from 'react-icons/ai';


const Dashboard = () => {
  const web3 = new Web3(window.ethereum);
  const [currentAccount, setCurrentAccount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get current account
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentAccount(account);
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    };

    fetchAccount();
  }, []);

  return (
    <div className='h-screen w-screen'>
      <DashboardNavbar />
      <div className='h-screen w-screen bg-gradient-to-b from-black to-gray-800 flex'>

        {/* Left Navbar */}
        <div className="bg-black w-64 h-full">
          <Card className="bg-gradient-to-b from-black to-gray-800 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <List>
              <ListItem onClick={() => navigate('/dashboard')} className="mt-2" style={{ color: 'white' }}>
                <PresentationChartBarIcon className="h-5 w-5" />
                Dashboard
              </ListItem>
              <ListItem onClick={() => navigate('/exchange')} className=' mt-2' style={{ color: 'white' }}>
                <ShoppingBagIcon className="h-5 w-5 " />
                Exchange
              </ListItem>
              <ListItem className='mt-2' style={{ color: 'white' }} onClick={() => navigate('/marketplace')}>
                <InboxIcon className="h-5 w-5  " />
                Marketplace
              </ListItem>
              <ListItem className='mt-2' style={{ color: 'white' }} onClick={() => navigate('/chart')}>
                <ChartBarIcon className="h-5 w-5  " />
                Chart
              </ListItem>
              <ListItem className='mt-2' style={{ color: 'white' }} onClick={() => navigate('/lending')}>
                <AiOutlineMoneyCollect className="h-5 w-5 " />
                Lending
              </ListItem>
            </List>
          </Card>
        </div>

        <div className="mt-4 flex flex-col justify-start items-center w-full">
          <div className="container">
            {/* Display current account */}
            <h2 className="text-white mb-4">Current Account: {currentAccount}</h2>
            
            {/* Transaction table */}
            <TransactionTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

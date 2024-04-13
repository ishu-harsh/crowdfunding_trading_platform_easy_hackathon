import React, { useState } from 'react';
import DashboardNavbar from "../component/DashboardNavbar";
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
  ChevronRightIcon,
  ChevronDownIcon,
  ChartBarIcon
} from "@heroicons/react/24/solid";

const Dashboard = () => {

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/chart');
      };

 

  return (
    <div className='h-screen w-screen bg-gradient-to-b from-black to-gray-800'>
      <DashboardNavbar />
      <div className="flex flex-col h-full">

      <Card className="bg-gradient-to-b from-black to-gray-800 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
        <ListItem style={{ color: 'white' }}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem style={{ color: 'white' }}>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Exchange
        </ListItem>
        <ListItem style={{ color: 'white' }}> 
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Marketplace
          <ListItemSuffix>
          </ListItemSuffix>
        </ListItem>
        <ListItem style={{ color: 'white' }} onClick={handleNavigate}> 
          <ListItemPrefix>
            <ChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Chart
          <ListItemSuffix>
          </ListItemSuffix>
        </ListItem>

        
      </List>
    </Card>
      
  
      </div>
      <div className="flex flex-col h-full justify-center items-end mr-8"> 
    
      </div>
    </div>
  );
};

export default Dashboard;

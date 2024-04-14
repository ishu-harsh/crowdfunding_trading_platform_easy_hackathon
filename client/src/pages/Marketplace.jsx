import React, { useEffect, useState } from 'react';
import DashboardNavbar from "../component/DashboardNavbar";
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';

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

const Marketplace = () => {
  const [quantity, setQuantity] = useState(1); // Initialize quantity state
  const web3 = new Web3(window.ethereum);
  const contractABI = [ /* Contract ABI */ ];
  const contractAddress = '0x9f0372aac474f396579051509f9e10d1e32b3307';
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStock, setFilteredStock] = useState([]);
  const [ethAmount, setEthAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const filtered = stockprice.filter(stock => stock.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredStock(filtered);
  };

  const buyTokens = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const weiAmount = web3.utils.toWei(ethAmount, 'ether');

    try {
      const transaction = await contract.methods.buyStockToken().send({
        from: account,
        value: weiAmount
      });

      setTransactionHash(transaction.transactionHash);
    } catch (error) {
      console.error('Error buying tokens:', error);
    }
  };

  const stockprice = [
    {
        "name": "Apple",
        "USDT": 176.00,
        "XRP": 369.79,
        "qty": 144,
        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Apple_Computer_Logo_rainbow.svg/412px-Apple_Computer_Logo_rainbow.svg.png"
      },
    {
      "name": "Apple",
      "USDT": 176.00,
      "XRP": 369.79,
      "qty": 25,
      "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Apple_Computer_Logo_rainbow.svg/412px-Apple_Computer_Logo_rainbow.svg.png"
    },
    {
      "name": "Meta",
      "USDT": 511.91,
      "XRP": 1079.55,
      "qty": 5,
      "url": "https://signsalad.com/wp-content/uploads/2021/11/Screenshot-2021-11-03-at-12.14.11.png"
    },
    {
      "name": "Amazon",
      "USDT": 186.13,
      "XRP": 392.52,
      "qty": 55,
      "url": "https://i.pinimg.com/736x/0a/06/60/0a06600cc3cedeb49280b54114c88ce6.jpg"
    },
    {
        "name": "NVIDIA",
        "USDT": 881.86,
        "XRP": 1859.72,
        "qty": 113,
        "url": "https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/02-nvidia-logo-color-grn-500x200-4c25-p@2x.png"
      },
  ];

  useEffect(() => {
    setFilteredStock(stockprice);
  }, []); // Initialize filteredStock with stockprice array on component mount

  return (
    <div className='h-full w-screen'>
      <DashboardNavbar />
      <div className='h-full w-screen bg-gradient-to-b from-black to-gray-800 flex'>

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

        <div className="mt-4 flex justify-center items-center w-full">
          <div className="container mx-auto">
            <div className="grid grid-cols-3 gap-4">
              {filteredStock.map((stock, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img className="p-8 rounded-t-lg" src={stock.url} alt="product image" style={{ maxWidth: '80%', maxHeight: '50%' }} />
                  </a>
                  <div className="px-5 pb-5">
                    <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{stock.name}</h2>
                    <p className="mt-2 text-yellow-100 text-lg">USDT Price: ${stock.USDT.toFixed(2)}</p>
                    <p className="text-yellow-100 text-lg">XRP Price: ${stock.XRP.toFixed(2)}</p>
                    <p className="text-yellow-100 text-lg">Qty: {stock.qty}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">XRP {(quantity * stock.XRP.toFixed(2)).toFixed(2)}</span>
                      <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

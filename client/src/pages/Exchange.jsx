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

const Exchange = () => {
    const [quantity, setQuantity] = useState(1); // Initialize quantity state

    // Function to handle incrementing the quantity
    const incrementQuantity = () => {
      setQuantity(prevQuantity => prevQuantity + 1);
    };
  
    // Function to handle decrementing the quantity
    const decrementQuantity = () => {
      if (quantity > 1) {
        setQuantity(prevQuantity => prevQuantity - 1);
      }
    };

  const web3 = new Web3(window.ethereum);
  const contractABI = [
	{
		"inputs": [],
		"name": "buyStockToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endDay",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "sellStockToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_totalSupply",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_symbol",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "updateStockValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stockValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
  const contractAddress = '0x4e6d79120066fbd6574c5b8f2cf2f4f8e4c0cc7a';
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStock, setFilteredStock] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [ethAmount, setEthAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
 

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const filtered = stockprice.filter(stock => stock.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredStock(filtered);
    setShowCard(searchQuery.trim() !== "");
  };

  const buyTokens = async() => {
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
      //console.error('Error buying tokens:', error);
    }
    
    setTimeout(() => {
        alert(`Bought ${searchQuery}  ${quantity}`);
      }, 800);
  };

  const stockprice =  [
    {
        "name": "Apple",
        "USDT": 176.00,
        "XRP": 369.79,
        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Apple_Computer_Logo_rainbow.svg/412px-Apple_Computer_Logo_rainbow.svg.png"
    },
    {
        "name": "Meta",
        "USDT": 511.91,
        "XRP": 1079.55,
        "url": "https://signsalad.com/wp-content/uploads/2021/11/Screenshot-2021-11-03-at-12.14.11.png"
    },
    {
        "name": "Tesla",
        "USDT": 171.05,
        "XRP": 360.72,
        "url": "https://cdn.logojoy.com/wp-content/uploads/20240110153809/Black-tesla-logo-600x600.png"
    },
    {
        "name": "Amazon",
        "USDT": 186.13,
        "XRP": 392.52,
        "url": "https://i.pinimg.com/736x/0a/06/60/0a06600cc3cedeb49280b54114c88ce6.jpg"
    },
    {
        "name": "Microsoft",
        "USDT": 421.90,
        "XRP": 889.73,
        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png"
    },
    {
        "name": "NVIDIA",
        "USDT": 881.86,
        "XRP": 1859.72,
        "url": "https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/02-nvidia-logo-color-wht-500x200-4c25-p.png"
    }
]

  const navigate = useNavigate();

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

        <div className="mt-4 flex justify-center items-top w-full">
          <div className="container mx-auto">
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="rounded-lg px-4 py-2 w-64 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <button
                  onClick={handleSearch}
                  className="ml-2 rounded-lg px-4 py-2 bg-blue-800 text-white rounded-md"
                >
                  Search
                </button>
              </div>
              {showCard && filteredStock.length > 0 && (
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                  <img className="p-8 rounded-t-lg" src={filteredStock[0].url} alt="product image" style={{ maxWidth: '80%', maxHeight: '50%' }} />
                  </a>
                  <div className="px-5 pb-5">
                    {/* <a href="#">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                    </a> */}
                    <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{filteredStock[0].name}</h2>
                    <p className="mt-2 text-yellow-100 text-lg">USDT Price: ${filteredStock[0].USDT.toFixed(2)}</p>
                    <p className="text-yellow-100 text-lg">XRP Price: ${filteredStock[0].XRP.toFixed(2)}</p>

                    <div className="flex items-center mt-2.5 mb-5">
                      <button onClick={decrementQuantity}>-</button>
                      <input className='px-2' type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} />
                      <button onClick={incrementQuantity}>+</button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">XRP {(quantity * filteredStock[0].XRP.toFixed(2)).toFixed(2) }</span>
                      <a onClick={buyTokens} href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy</a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;





              {/* <div className="w-[200px] grid grid-cols-1 lg:grid-cols gap-2">
                {showCard && filteredStock.length > 0 && (
                  <div className="w-full flex justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                      <h2 className="text-3xl font-bold mb-4">{filteredStock[0].name}</h2>
                      <p className="text-gray-600 text-lg">USDT Price: ${filteredStock[0].USDT.toFixed(2)}</p>
                      <p className="text-gray-600 text-lg">XRP Price: ${filteredStock[0].XRP.toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div> */}
            {/* </div>
            {showCard && filteredStock.length > 0 && (
              <div className="flex items-center justify-center mt-4">
                <input
                  type="number"
                  placeholder="QTY"
                  className="rounded-lg px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  value={ethAmount}
                  onChange={(e) => setEthAmount(e.target.value)}
                />
                <button onClick={buyTokens} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Buy Tokens</button>
              </div>
            )} */}

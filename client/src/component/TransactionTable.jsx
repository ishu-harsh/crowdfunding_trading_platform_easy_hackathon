import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get current account
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];

        // Get recent transactions
        const latestBlockNumber = await web3.eth.getBlockNumber();
        const latestBlock = await web3.eth.getBlock(latestBlockNumber, true);

        // Check if latestBlock.transactions is an array
        if (latestBlock.transactions && Array.isArray(latestBlock.transactions)) {
          // Filter successful transactions
          const successfulTransactions = latestBlock.transactions.filter(
            transaction => transaction.from.toLowerCase() === currentAccount.toLowerCase() && transaction.status === true
          );

          // Log each transaction to the console and set state
          successfulTransactions.forEach(transaction => {
            console.log('Transaction ID:', transaction.hash);
          });
          setTransactions(successfulTransactions);
        } else {
          setError('Error fetching transactions: No transactions found in the latest block');
        }
      } catch (error) {
        setError('Error fetching transactions: ' + error.message);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2 style={{ color: 'white' }}>Successful Transactions</h2>
      {error ? (
        <p style={{ color: 'white' }}>{error}</p>
      ) : (
        <div>
          <h3 style={{ color: 'white' }}>Transaction IDs:</h3>
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.hash} style={{ color: 'white' }}>{transaction.hash}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;

import React, { useState } from 'react';
import './TransactionPage.css';
import Header from './Header';

function TransactionPage() {
  const [senderId, setSenderId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleTransfer = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await fetch('http://localhost:5000/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add the Authorization header
        },
        body: JSON.stringify({ senderId, recipientId, amount: parseFloat(amount) }),
      });

      const result = await response.json();

      if (response.ok) {  
        setMessage(result.message);
        // Clear the form fields
        setSenderId('');
        setRecipientId('');
        setAmount('');
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Error occurred while transferring');
    }
  };

  return (
    <div className="TransactionPage">
      <Header />
      <h2>Currency Transfer</h2>
      <form onSubmit={handleTransfer}>
        <div>
          <label>
            Sender User ID:
            <input
              type="text"
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Recipient User ID:
            <input
              type="text"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Transfer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TransactionPage;

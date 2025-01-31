// ExchangeRatesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoinsValueConverter.css';
import Header from './Header';

function ExchangeRatesPage() {
  const [coins, setCoins] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [convertedValue, setConvertedValue] = useState(0);
  const [rates, setRates] = useState({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        // Replace 'your-api-key' with your actual API key
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setRates({ USD: 1, GBP: 0.785,LKR:303.06 }); // Fallback rates
      }
    };

    fetchExchangeRates();
  }, []);

  const handleConvert = () => {
    const rate = rates[currency];
    const value = coins * rate;
    setConvertedValue(value);
  };

  return (
    <div className="ExchangeRatesPage">
      <Header />
      <h2>Coins Value Converter</h2>
      <div className='show'>
        <label>
          Coins:
          <input
            type="number"
            value={coins}
            onChange={(e) => setCoins(e.target.value)}
          />
        </label>
        <label>
          Currency:
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleConvert}>Convert</button>
      </div>
      {convertedValue !== 0 && (
        <div>
          <p>{coins} coins is equal to:</p>
          <p>{convertedValue.toFixed(2)} {currency}</p>
        </div>
      )}
    </div>
  );
}

export default ExchangeRatesPage;

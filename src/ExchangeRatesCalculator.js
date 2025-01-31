import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExchangeRatesCalculator.css';
import Header from './Header';

function ExchangeRatesPage() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setRates(response.data.rates);
        setCurrencies(Object.keys(response.data.rates));
      } catch (error) {
        setError('Error fetching currencies.');
        console.error(error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    if (!amount || !fromCurrency || !toCurrency) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');

    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      if (rate) {
        const convertedAmount = (amount * rate).toFixed(2);
        setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
      } else {
        setError('Invalid currency code.');
      }
    } catch (error) {
      setError('Error fetching exchange rates.');
      console.error(error);
    }
  };

  return (
    <div className="ExchangeRatesPage">
      <Header />
      <h2>Exchange Rates Calculator</h2>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          From Currency:
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <label>
          To Currency:
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleConvert}>Convert</button>
      </div>
      {error && <p className="error">{error}</p>}
      {result && <p className="result">{result}</p>}
    </div>
  );
}

export default ExchangeRatesPage;

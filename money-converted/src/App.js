import React, { useState, useEffect } from 'react';
import './App.css'

import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS
import '@fortawesome/fontawesome-free/js/all.js'; // Import Font Awesome JS
const App = () => {
  const [originalAmount, setOriginalAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then((res) => res.json())
      .then((data) => {
        const options = Object.keys(data.rates);
        setCurrencyOptions(options);
      });
  }, []);

  useEffect(() => {
    calculate();
  }, [fromCurrency, toCurrency]);

  const handleExchangeClick = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const calculate = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        const rate = data.rates[toCurrency];
        setExchangeRate(rate);
        const converted = (originalAmount * rate).toFixed(3);
        setConvertedAmount(converted);
      });
  };

  const handleConvertClick = () => {
    calculate();
    const element = document.getElementById('output-text');
    element.style.display = 'block';
  };

  return (
    <div>
      <h1> Currency Converter</h1>
      <p className="convert">
        Convert:
        <input
          type="number"
          id="original-currency-amount"
          placeholder="0"
          value={originalAmount}
          onChange={(e) => setOriginalAmount(e.target.value)}
        />
      </p>
      <div>
        <select
          id="from_currency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <button id="exchange" onClick={handleExchangeClick}>
          <i className="fas fa-exchange-alt"></i>
        </button>
        <select
          id="to_currency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>


      <div class="form-group">
												<select class="transfer-way input-lg" id="bit_gateway_receive" name="bit_gateway_receive" onchange="bit_refresh('2');">
													<option value="18" selected="">Vodafone Cash EGP</option><option value="19">Transfer Bank EGP</option>												</select>
											</div>

      <p className="exchange">
        Exchange Rate:
        <input type="text" id="exchange-rate" value={exchangeRate} readOnly />
      </p>
      <button id="exchange_button" onClick={handleConvertClick}>
        Exchange my money now!
      </button>
      <p id="output-text">
        <span id="from">{originalAmount} {fromCurrency}</span> converted to{' '}
        <span id="to">{convertedAmount} {toCurrency}</span>
      </p>
     
    </div>
  );
};

export default App;
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

      <p className="convert">
        Send{' '}
        <input
          type="number"
          id="original-currency-amount"
          placeholder="0"
          value={originalAmount}
          onChange={(e) => setOriginalAmount(e.target.value)}
        />
      </p>
      <p className="exchange">
        
        <input type="text" id="to" value={convertedAmount}  readOnly />
        {' '} Receive
     
      </p>

      <div class="form-group">
        <select class="transfer-way input-lg"  >
          <option value="18" selected="">Vodafone Cash EGP <img src="../logos/vodafone.webp" alt="Image 1" /></option>
          <option value="19">PayPal USD <img alt="image2.jpg" src="../logos/paypal-logo.png" /></option>
          <option value="20">PAYEER USD <img alt="image3.jpg" src="../logos/payeer.png" /></option>
          <option value="21">USDT (TRC20) <img alt="image4.jpg" src="../logos/TRC20.png" /></option>
          <option value="22">USDT (BEP20) <img alt="image5.jpg" src="../logos/BEP20.webp" /></option>
          <option value="23">InstaPay EGP <img alt="image6.jpg" src="../logos/instapay.jpg" /></option>
          <option value="24">Etsalat Cash EGP <img alt="image7.jpg" src="../logos/etisalat.png" /></option>
          <option value="25">CIB Smart Wallet <img alt="image8.jpg" src="../logos/cIB.png" /></option>
          <option value="26">Fawry  <img alt="image9.jpg" src="../logos/fawary.png" /></option>
          <option value="27">USDT (ERC20)  <img alt="image10.jpg" src="../logos/ERC20.png" /></option>
          <option value="28">Pi Network <img alt="image11.jpg" src="../logos/PI network.jpg" /></option>
        </select>
      </div>

     
      <button id="exchange_button" onClick={handleConvertClick}>
        Exchange my money now!
      </button>
      <p id="output-text">
        <span id="exchange-rate"> Exchange Rate = {exchangeRate}</span>
      </p>
     
    </div>
  );
};

export default App;
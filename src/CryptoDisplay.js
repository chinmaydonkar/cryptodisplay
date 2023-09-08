import React, { useState } from "react";
import styled from "styled-components";

const CryptoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CryptoCard = styled.div`
  border: 1px solid grey;
  padding: 10px;
  width: 300px;
  margin: 10px;
  text-align: center;
`;

const CartContainer = styled.div`
  border: 1px solid grey;
  padding: 20px;
  margin-top: 20px;
  max-height: 300px; /* Set a maximum height for the cart container */
  overflow-y: auto; /* Add vertical scroll if cart items exceed the container height */
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
 
`;

function CryptoDisplay() {
  const [cart, setCart] = useState([]);
  const cryptoData = [
    { name: "Bitcoin", price: 40000 },
    { name: "Ethereum", price: 2800 },
    { name: "Litecoin", price: 150 },
  ];

  const addToCart = (cryptoName, quantity) => {
    if (quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const cryptoItem = {
      name: cryptoName,
      quantity: quantity,
      price: getCryptoPrice(cryptoName),
    };

    setCart([...cart, cryptoItem]);
  };

  const getCryptoPrice = (cryptoName) => {
    const crypto = cryptoData.find((crypto) => crypto.name === cryptoName);
    return crypto ? crypto.price : 0;
  };

  const calculateTotalCost = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h1>Crypto Display</h1>
      <CryptoContainer>
        {cryptoData.map((crypto) => (
          <CryptoCard key={crypto.name}>
            <h2>{crypto.name}</h2>
            <p>Price: ${crypto.price}</p>
            <input
              type="number"
              placeholder="Quantity"
              onChange={(e) => addToCart(crypto.name, parseInt(e.target.value))}
            />
            <button
              onClick={(e) => addToCart(crypto.name, parseInt(e.target.value))}
            >
              Buy
            </button>
          </CryptoCard>
        ))}
      </CryptoContainer>
      <CartContainer>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <CartItem key={index}>
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>Total: ${item.price * item.quantity}</span>
              </CartItem>
            ))}
            <p>Total: ${calculateTotalCost()}</p>
          </>
        )}
      </CartContainer>
    </div>
  );
}

export default CryptoDisplay;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css'

function HomePage() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5500/src/api.json') 
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCardClick = (laptop) => {
    navigate('/comparison', { state: { selectedProduct: laptop } });
  };

  return (
    <div style={{padding:"2%"}}>
      <h1>Home Page</h1>
      <div className="card-container">
        {apiData && apiData.GeM.map((laptop, index) => (
          <div key={index} className="card" onClick={() => handleCardClick(laptop)}>
            <h3>{laptop.model}</h3>
            <p>Brand: {laptop.brand}</p>
            <p>Best Price: ${laptop.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

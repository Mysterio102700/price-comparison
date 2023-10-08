import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function ComparisonPage() {
  const [apiData, setApiData] = useState([]);
  const { state } = useLocation();
  const selectedProduct = state?.selectedProduct;
  let model = selectedProduct.model;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5500/src/api.json") 
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  let gemPrice = 0;
  let amazonPrice = 0;
  let flipkartPrice = 0;

  for (const source in apiData) {
    const laptops = apiData[source];

    for (let i = 0; i < laptops.length; i++) {
      const laptop = laptops[i];
      if (laptop.model === model) {
        if (source === "GeM") {
          gemPrice = laptop.price;
        } else if (source === "Amazon") {
          amazonPrice = laptop.price;
        } else if (source === "Flipkart") {
          flipkartPrice = laptop.price;
        }
      }
    }
  }

  return (
    <div className="compare">
      <h1>Comparison</h1>
      {selectedProduct && (
        <div className="comparison-card">
          <div className="">
            <h2>{selectedProduct.model}</h2>
            <p>Brand: {selectedProduct.brand}</p>
            <p>Processor: {selectedProduct.processor}</p>
            <p>RAM: {selectedProduct.ram}</p>
            <p>Capacity: {selectedProduct.capacity}</p>
            <p>Size: {selectedProduct.size}"</p>
            <p>Resolution: {selectedProduct.resolution}</p>
            <p>Graphics: {selectedProduct.graphics}</p>
          </div>
          <div  style={{marginLeft:"100px"}}>
          <p style={{marginLeft:"45px"}}>Price:</p>
            <ul>
              <li>GeM: ${gemPrice}</li>
              <li>Amazon: ${amazonPrice}</li>
              <li>Flipkart: ${flipkartPrice}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComparisonPage;

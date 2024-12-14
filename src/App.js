import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Load data from JSON
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCategories(Object.keys(data));
        setSelectedCategory(Object.keys(data)[0]); // Select the first category by default
        setProducts(data);
      })
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Showcase</h1>
      </header>
      <div className="main-container">
        {/* Sidebar for Categories */}
        <aside className="sidebar">
          <h2>Categories</h2>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                className={selectedCategory === category ? "active" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Display */}
        <section className="products">
          <h2>{selectedCategory.toUpperCase()}</h2>
          <div className="product-grid">
            {products[selectedCategory]?.map((product, index) => (
              <div key={index} className="product-card">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="product-image"
                />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">{product.price}</p>
                <button className="buy-now-button">Buy Now</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;

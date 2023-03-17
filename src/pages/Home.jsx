import React from "react";
import "../Home.css";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.png";
import img6 from "../images/img6.jpg";
const Home = () => {
  return (
    <div className="container">
      <h1 className="headline">Welcome to Shopping Mart</h1>
      <p className="tagline">
        Welcome to our online store! We offer a wide range of products at great
        prices. Browse our selection and start shopping today.
      </p>
      <div className="image-container">
        <img src={img2} alt="Product 2" />
        <img src={img1} alt="Product 1" />
        <img src={img3} alt="Product 3" />
        <img src={img4} alt="Product 4" />
        <img src={img5} alt="Product 5" />
        <img src={img6} alt="Product 6" />
      </div>
    </div>
  );
};

export default Home;

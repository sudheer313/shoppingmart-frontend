import "./App.css";

import Navbar from "./component/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Register } from "./pages/Register";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";
import Success from "./component/Success";
import Cancel from "./component/Cancel";

function App() {
  const { loggedInUser } = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            index
            path="/"
            element={loggedInUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="register" element={<Register />} />
          <Route
            path="login"
            element={loggedInUser ? <Navigate to="/" /> : <Login />}
          />
          {/* <Route path="products"> */}
          <Route exact path="Products" element={<ProductList />} />
          <Route path="products/:id" element={<Product />} />
          {/* //</Route> */}
          <Route path="about" element={<About />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="cart" element={<Cart />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router";
import Loading from "../component/Loading";
import { Link } from "react-router-dom";
import { addProduct } from "../redux/cartSlice";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await response.json());
      console.log(response);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const ShowProduct = () => {
    const handleAddtoCart = () => {
      dispatch(
        addProduct({ ...product, cartItemId: cart.products.length + 1 })
      );
    };
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="dislay-5">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating{product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={handleAddtoCart}
          >
            Add to Cart
          </button>
          <Link className="btn btn-dark ms-2 " to="/cart">
            Go to cart
          </Link>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
    </div>
  );
};

export default Product;

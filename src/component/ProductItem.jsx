import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({product}) => {
  return  <div className="col-md-3 mb-4" >
  <div className="card h-100 text-center p-4">
    <img
      src={product.image}
      className
      alt={product.title}
      height="250px"
    />
    <div className="card-body">
      <h5 className="card-title mb-0">
        {product.title.substring(0, 12)}
      </h5>
      <p className="card-text">${product.price}</p>
      <Link to={`/products/${product.id}`} className="btn btn-outline-dark ">
        Buy NOW
      </Link>
    </div>
  </div>
</div>;
};

export default ProductItem;

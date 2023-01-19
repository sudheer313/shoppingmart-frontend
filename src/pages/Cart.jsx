import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/cartSlice";
import { axiosInstance } from "../utils/axiosConfig";
import { useStripe } from "@stripe/react-stripe-js";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { loggedInUser } = useSelector((state) => state.user);
  console.log(cart);
  const stripe = useStripe();
  const dispatch = useDispatch();
  const handleDeleteProduct = (product) => {
    dispatch(deleteProduct({ cartItemId: product.cartItemId }));
  };

  const fetchCheckoutsession = async () => {
    try {
      const res = await axiosInstance.post("/payment/create-checkout-session", {
        items: cart.products.map((product) => {
          return {
            id: product.id,
            quantity: 1,
            name: product.title,
            description: product.description,
            image: product.image,
            price: product.price,
          };
        }),
        customer_email: loggedInUser?.email,
      });

      return res.data.sessionId;
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckout = async () => {
    try {
      const sessionId = await fetchCheckoutsession();
      console.log(sessionId);
      await stripe.redirectToCheckout({
        sessionId,
      });
    } catch (error) {
      console.log(error);
    }

    console.log("test");
  };
  return (
    <div>
      {cart.products.map((product) => (
        <>
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width="400px"
            key={product.image}
          />
          <p>{product.title}</p>
          <p>{product.description}</p>
          <button
            onClick={() => {
              handleDeleteProduct(product);
            }}
          >
            remove
          </button>
          <button onClick={handleCheckout}>checkout</button>
        </>
      ))}
    </div>
  );
};

export default Cart;

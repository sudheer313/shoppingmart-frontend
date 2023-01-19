import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  loginError,
  loginStart,
  loginSucess,
  logout,
} from "../redux/userSlice";
import Loading from "../component/Loading";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((state) => state.user);
  //useNavigateHook
  const navigate = useNavigate();
  const handleLoginWithGoogle = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const apiResponse = await axiosInstance.post("/auth/google", {
        username: result.user.displayName,
        email: result.user.email,
      });
      dispatch(loginSucess(apiResponse.data));
      console.log(result.user);
      Swal.fire(
        `Welcome ${apiResponse.data?.user.username}`,
        "Login Successful!",
        "success"
      );
      navigate("/");
    } catch (error) {
      dispatch(loginError());
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response.data.message ||
          "Error while handling google authentication",
      });
    }
  };
  const handleSignoutWithGoogle = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate("/login");
      console.log("signout sucessfull");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axiosInstance.post("/auth/signin", { email, password });
      dispatch(loginSucess(res.data));
      Swal.fire(
        `Welcome ${res.data?.user.username}`,
        "Login Successful!",
        "success"
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response.data.message ||
          "Error while handling custom authentication",
      });
      dispatch(loginError());
    }
  };
  const handlesignup = async (e) => {};
  if (loading) {
    <Loading />;
  }
  return (
    <div>
      <button onClick={handleLoginWithGoogle}>login</button>
      <button onClick={handleSignoutWithGoogle}>Signout</button>
      <button onClick={handlesignup}>SignUp</button>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="sumbit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;

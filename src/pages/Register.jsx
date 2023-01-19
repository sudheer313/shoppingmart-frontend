import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginError,
  loginStart,
  loginSucess,
  signupStart,
  signupSucess,
} from "../redux/userSlice";
import { axiosInstance } from "../utils/axiosConfig";
import { auth, googleProvider } from "../firebase";
import Loading from "../component/Loading";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((state) => state.user);

  //useNavigatehook
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //signup

  const handleSignup = async (e) => {
    e.preventDefault();

    if (name.length === 0 || email.length === 0 || password.length === 0) {
      console.log("please enter valid email and password");
      return;
    }

    dispatch(signupStart());
    try {
      const res = await axiosInstance.post("/auth/signup", {
        username: name,
        email,
        passwordstr: password,
      });
      dispatch(signupSucess(res.data.message));
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  //handle signup with google

  const handleSignupWithGoogle = async (e) => {
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
      navigate("/");
    } catch (error) {
      dispatch(loginError());
      console.log(error);
    }
  };
  if (loading) {
    <Loading />;
  }
  return (
    <div>
      <h1> Create your account</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>signUp</button>
      <span>OR</span>
      <button onClick={handleSignupWithGoogle}>Signup With google</button>
    </div>
  );
};

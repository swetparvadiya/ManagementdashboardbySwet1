import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.module.css";
import { googleSignInInitiate, loginInitiate } from "../redux/actions";
import styles from "./Login.module.css";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const dispatch = useDispatch();

  const { email, password } = state;

  const handleGoogleSignIn = () => {
    dispatch(googleSignInInitiate());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginInitiate(email, password));
    setState({ email: "", password: "" });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div>
      <div id={styles.logregforms}>
        <form className={styles.formsignin} onSubmit={handleSubmit}>
          <h1 className="h3 mb-3">Sign In</h1>
          <p>
            <div className={styles.sociallogin}>
              <button
                className={styles.google}
                type="button"
                onClick={handleGoogleSignIn}
              >
                <span>
                  <i className="fab fa-google-plus-g f"></i>
                  <h6>Sign in with Google</h6>
                </span>
              </button>
            </div>
            OR
          </p>
          <div className={styles.leg}>
            <span>Enter Email :</span>
            <input
              type="email"
              id="inputEmail"
              className="formcontrol"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={email}
              required
            />
            <span className={styles.pas}>Enter Pass:</span>
            <input
              type="password"
              id="inputPassword"
              className="formcontrol"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={password}
              required
            />
          </div>
          <div className={styles.by}>
            <button className="btn btn-secondary " type="submit">
              <i className="fas fa-sign-in-alt"></i> Sign In
            </button>
          </div>
          <hr />
          <Link to="/register">
            <p className={styles.bu}>
              Don't have an account ?
              <button className="btn btn-primary" type="button" id="btn-signup">
                <i className="fas fa-user-plus"></i> Sign Up New Account
              </button>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

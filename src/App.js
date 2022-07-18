import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserRoute from "./components/UserRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase";
import { setUser } from "./redux/actions";
import Body from "./components/Body/Body";
import styles from "./App.module.css";
import Card from "./components/card/card";
import Auth from "./pages/Auth";
import { DragDropContext } from "react-beautiful-dnd";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route element={<UserRoute />}>
          <Route path="/" exact element={<Home />} />
        </Route>
        <Route element={<UserRoute />}>
          <Route path="/project/:id" element={<Auth />} />
        </Route>

        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;

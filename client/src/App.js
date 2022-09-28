import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Switch ,Route } from "react-router-dom";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import MyCart from "./pages/MyCart";
import Order from "./pages/Order";
import "./App.css";
import NavBar from "./components/NavBar";
import { getUser } from "./actions";
import "./App.css";

if (typeof window !== "undefined") {
  injectStyle();
}

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state?.data?.isLoggedIn);

  useEffect(() => {
    toast.configure();
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUser(token));
    } else {
      history.push("/login");
    }
  }, [dispatch, history]);

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? (
            <Dashboard />
          ) : (
            <div className="login">
              {" "}
              <Login />
            </div>
          )}
        </Route>
        <Route exact path="/cart">
          {isLoggedIn ? (
            <MyCart />
          ) : (
            <div className="login">
              {" "}
              <Login />{" "}
            </div>
          )}
        </Route>
        <Route exact path="/orders">
          {isLoggedIn ? (
            <Order />
          ) : (
            <div className="login">
              {" "}
              <Login />{" "}
            </div>
          )}
        </Route>
        <Route path="/login">
          <div className="login">{!isLoggedIn ? <Login /> : <Dashboard />}</div>
        </Route>
        <Route path="/signup">
          <div className="register">{!isLoggedIn ? <SignUp /> : <Dashboard />}</div>
        </Route>
        <Route path="*">
          <div className="register">
            <PageNotFound />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

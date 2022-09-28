import React, { useState } from "react";
import Button from "@restart/ui/esm/Button";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { getUser, userLogin } from "../actions";

const Login = () => {
  const [user, setuser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin(user))
      .then((res) => {
        localStorage.setItem("token", res?.data.token);
        dispatch(getUser(res?.data?.token));
        toast("login successfully!", { type: "success" });
        history.push("/");
      })
      .catch((err) => {
        toast(err?.response.data, { type: "error" });
      });
  };

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-form bg-light border border-warning">
      <h4
        className="text-center text-decoration-underLine text-uppercase"
        style={{ textAlign: "center" }}
      >
        Login
      </h4>
      <form onSubmit={(e) => handleLogin(e)}>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  onChange={(e) => handleChange(e)}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ textAlign: "center" }}>
          <div style={{ margin: "10px" }}>
            <Button className="btn btn-warning text-white" type="submit">
              Login
            </Button>
          </div>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "#ffc720",
              fontweight: "bold",
            }}
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

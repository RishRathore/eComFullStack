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
        if (res && res.data) {
          localStorage.setItem("token", res?.data?.token);
          dispatch(getUser(res?.data?.token));
          toast("login successfully!", { type: "success" });
          history.push("/");
        }
      })
  };

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-form bg-light border border-success">
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
            <Button className="btn btn-success text-white" type="submit">
              Login
            </Button>
          </div>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "#00ff00",
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

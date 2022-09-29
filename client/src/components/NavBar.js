import React ,{ useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaBoxes, FaCartPlus, FaHome, FaPlus, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useHistory } from "react-router";

import { removeUser } from "../actions";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [activeTab, setActive] = useState(window.location.pathname);
  const handleLogout = (e) => {
    e.preventDefault();
    setActive("/login");
    localStorage.removeItem("token");
    dispatch(removeUser());
    history.push("/login");
  };
  const signInUser = useSelector((state) => state?.data?.userData);
  const isSignIn = useSelector((state) => state?.data?.isLoggedIn);

  return (
    <div className="">
      <Navbar bg="secondary" className="flex-wrap px-4">
          <Navbar.Brand href="/" className="text-white d-flex align-items-center  border-bottom px-0 py-3 mx-0 my-2">
          <div className="bg-white text-warning rounded-circle d-flex align-items-center justify-content-center logo-icon"> 
          <FaCartPlus />
          </div>
          <span className="ms-1"> <h6 className="mb-0">Ecommerce Clothing </h6></span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="text-capitalize"
          >
            <Nav className="justify-content-end  w-100 py-2">
              {isSignIn && (
                <>
                <Nav.Link className="text-white py-2">
                    <div
                      style={{ textDecoration: "none" }}
                    >
                      <FaUserCircle />
                      <span className="ms-1 ">Hello, {signInUser?.username}{" "}</span>
                    </div>
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/"
                    onClick={()=> setActive("/")}
                    className={activeTab === "/" ? "text-white py-2 active" : "text-white py-2" }
                    style={{ textDecoration: "none" }}
                  >
                   <FaHome />
                    <span> Home</span> 
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/orders"
                    onClick={() => setActive("/orders")}
                    className={activeTab === "/orders" ? "text-white py-2 active" : "text-white py-2" }
                    style={{ textDecoration: "none" }}
                  ><FaBoxes />
                    <span className="ms-1">My Orders{" "} </span>
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/cart"
                    onClick={() => setActive("/cart")}
                    className={activeTab === "/cart" ? "text-white py-2 active" : "text-white py-2" }
                    style={{ textDecoration: "none" }}
                  >
                    <FaShoppingCart /> <span className="ms-1">My Cart{" "}</span>
                  </Nav.Link>
                </>
              )}

              {!isSignIn && (
                <Nav.Link
                onClick={() => setActive("/register")}
                className={activeTab === "/register" ? "text-white py-2 active" : "text-white py-2" }
                  as={Link}
                  to="/signup"
                  style={{ textDecoration: "none" }}
                >
                  <FaPlus/>
                  <span className="ms-1">Sign up</span>
                </Nav.Link>
              )}

              {!isSignIn ? (
                <Nav.Link
                  as={Link}
                  to="/login"
                  onClick={() => setActive("/login")}
                  className={activeTab === "/login" ? "text-white py-2 active" : "text-white py-2" }
                  style={{ textDecoration: "none" }}
                >
                  <FaSignInAlt />
                  <span className="ms-1">Sign In</span>
                </Nav.Link>
              ) : (
                <Nav.Link
                  className="text-white py-2 "
                  onClick={(e) => handleLogout(e)}
                  style={{ textDecoration: "none" }}
                >
                  <FaSignOutAlt />
                  <span className="ms-1">Sign Out </span>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;

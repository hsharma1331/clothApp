import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../pages/Cart";
import { useCart } from "./ContextReducer";

function Navbar() {

  let data = useCart();

  const [showCart,setShowCart] =useState(false);
  const navigate = useNavigate();

  function logoutUser() {
    localStorage.removeItem("authToken")
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic fw-bold" to="/">MastHead</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto fs-5 mx-5">
              <Link className="nav-link active" aria-current="page" to="#">Home</Link>
              {
                localStorage.getItem("authToken") ? <Link className="nav-link active" aria-current="page" to="/myOrder">My Orders</Link>
                  : ''
              }
            </div>
            {
              (!localStorage.getItem("authToken")) ?
                <div className="d-flex mx-2">
                  <Link className="btn bg-white text-primary mx-2" to="/login">Login</Link>
                  <Link className="btn bg-white text-primary mx-2" to="/createuser">SignUp</Link>
                </div>
                :
                <div className="d-flex mx-2">
                  <Link className="btn bg-white text-primary mx-2 position-relative" onClick={()=>setShowCart(true)}>My Cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {data.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </Link>
                  {
                    showCart ? <Modal onClose={()=>setShowCart(false)} ><Cart /></Modal> : null
                  }
                  <Link className="btn bg-white text-danger mx-2" onClick={logoutUser}>Logout</Link>
                </div>

            }


          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
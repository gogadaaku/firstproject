import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../navigations/Routes";
import "./Header.css";
function Header() {
  return (
    <div>
      <nav
        class="navbar navbar-expand-lg bg-black"
        // style={{ backgroundColor: "#1a1a1a", height: "75px" }}
      >
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link
                className="nav-link text-white"
                // style={{
                //   fontFamily: "fantasy",
                //   fontWeight: "200",
                //   fontSize: "30px",
                // }}
                to={ROUTES.home.name}
              >
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link
                className="nav-link text-white"
                // style={{
                //   fontFamily: "fantasy",
                //   fontWeight: "200",
                //   fontSize: "30px",
                // }}
                to={ROUTES.support.name}
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                className="nav-link text-white"
                // style={{
                //   fontFamily: "fantasy",
                //   fontWeight: "200",
                //   fontSize: "30px",
                // }}
                to={ROUTES.contact.name}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                // style={{
                //   fontFamily: "fantasy",
                //   fontWeight: "200",
                //   fontSize: "30px",
                // }}
                className="nav-link text-white"
                to={ROUTES.universityAdmin.name}
              >
                University
              </Link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <Link
              // style={{
              //   fontFamily: "fantasy",
              //   fontWeight: "200",
              //   fontSize: "30px",
              // }}
              to={ROUTES.login.name}
              class="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Login
            </Link>
            <Link
              // style={{
              //   fontFamily: "fantasy",
              //   fontWeight: "200",
              //   fontSize: "30px",
              // }}
              to={ROUTES.register.name}
              class="btn btn-outline-success my-2 my-sm-0 ml-1"
              type="submit"
            >
              Register
            </Link>
            <Link
              // style={{
              //   fontFamily: "fantasy",
              //   fontWeight: "200",
              //   fontSize: "30px",
              // }}
              // to={ROUTES.register.name}
              class="btn btn-outline-success my-2 my-sm-0 ml-1"
            >
              Logout
            </Link>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Header;

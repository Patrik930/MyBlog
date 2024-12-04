import React, { useState, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FaBlog } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { UserContext } from "../context/UserContext";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(UserContext);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        fixed="top"
        dark
        expand="md"
        style={{
          backgroundColor: "#283593", 
          padding: "15px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <NavbarBrand href="/">
        <link href="/blog-seo-optimization-search-svgrepo-com.svg   " />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink
                className="nav-link"
                to="/"
                style={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                Főoldal
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="nav-link"
                to="/posts"
                style={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                Posztok
              </NavLink>
            </NavItem>
          </Nav>

          <Nav navbar>
            {!user ? (
              <>
                <NavItem>
                  <NavLink
                    className="nav-link"
                    to="/auth/in"
                    style={buttonStyle}
                  >
                    Belépés
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link"
                    to="/auth/up"
                    style={buttonStyle}
                  >
                    Regisztráció
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink
                    className="nav-link"
                    to="/"
                    onClick={() => logOut()}
                    style={buttonStyle}
                  >
                    Kijelentkezés
                  </NavLink>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret style={iconButtonStyle}>
                    <RxAvatar style={{ fontSize: "24px", color: "white" }} />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>Személyes adatok</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Fiók törlése</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
};

// Button Styles
const buttonStyle = {
  background: "linear-gradient(90deg, #ff8a00, #e52e71)", // Gradient button background
  padding: "10px 20px",
  color: "white",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "500",
  textDecoration: "none",
  margin: "5px",
  transition: "all 0.3s ease-in-out",
};

const iconButtonStyle = {
  background: "#283593", // Match the navbar background for a consistent look
  border: "none",
  padding: "5px 15px",
  borderRadius: "50%",
  transition: "background 0.3s ease",
};

iconButtonStyle["&:hover"] = {
  background: "#3f51b5", // Lighten the background on hover
};


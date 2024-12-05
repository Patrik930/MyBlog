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
          <link rel="icon" type="image/svg+xml" href="blog-seo-optimization-search-svgrepo-com.svg" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink
                className="nav-link"
                to="/"
                style={({ isActive }) => ({
                  ...navLinkStyle,
                  ...(isActive ? navLinkActiveStyle : {}),
                })}
                onMouseEnter={(e) => e.target.style.color = "#ff8a00"}  // Hover effect
                onMouseLeave={(e) => e.target.style.color = ""}  // Reset hover effect
              >
                Főoldal
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="nav-link"
                to="/posts"
                style={({ isActive }) => ({
                  ...navLinkStyle,
                  ...(isActive ? navLinkActiveStyle : {}),
                })}
                onMouseEnter={(e) => e.target.style.color = "#ff8a00"}  // Hover effect
                onMouseLeave={(e) => e.target.style.color = ""}  // Reset hover effect
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
                    <DropdownItem>
                      <NavLink className='nav-link' to='/profile'>Személyes adatok</NavLink>
                      
                      </DropdownItem>
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


const buttonStyle = {
  background: "linear-gradient(90deg, #ff8a00, #e52e71)", 
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
  background: "#283593", 
  border: "none",
  padding: "5px 15px",
  borderRadius: "50%",
  transition: "background 0.3s ease",
};


const navLinkStyle = {
  color: "#f5f5f5",  
  fontSize: "18px",
  fontWeight: "400",  
  textDecoration: "none",
  padding: "8px 15px", 
  margin: "5px",  
  letterSpacing: "0.5px",  
  transition: "color 0.3s ease, border-bottom 0.3s ease" 
};

const navLinkHoverStyle = {
  color: "#ff8a00",  
  borderBottom: "2px solid #ff8a00", 
};

const navLinkActiveStyle = {
  color: "#ff8a00",
  fontWeight: "600",  
  borderBottom: "2px solid #ff8a00"
};

import React, { useState, useContext, useEffect } from "react";
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
import { extractUrlAndId } from "../utility/utils";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url);
    !user && setAvatar(null);
  }, [user, user?.photoURL]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        fixed="top"
        dark
        expand="md"
        style={{
          backgroundColor: "#000000",
          padding: "15px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <NavbarBrand href="/"></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar style={{ display: "flex" }}>
            <NavItem>
              <NavLink
                className="nav-link"
                to="/"
                style={({ isActive }) => ({
                  ...navLinkStyle,
                  ...(isActive ? navLinkActiveStyle : {}),
                })}
                onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
                onMouseLeave={(e) => (e.target.style.color = "")}
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
                onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
                onMouseLeave={(e) => (e.target.style.color = "")}
              >
                Posztok
              </NavLink>
            </NavItem>
            {user && (
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/create"
                  style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? navLinkActiveStyle : {}),
                  })}
                  onMouseEnter={(e) => (e.target.style.color = "#ff8a00")}
                  onMouseLeave={(e) => (e.target.style.color = "")}
                >
                  Új bejegyzés
                </NavLink>
              </NavItem>
            )}
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
                    {avatar ? (
                      <img
                        className="myavatar"
                        src={avatar}
                        alt="User Avatar"
                      />
                    ) : (
                      <RxAvatar title={user.displayName} />
                    )}
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>
                      <NavLink
                        className="nav-link"
                        to="/profile"
                        style={{ color: "black" }}
                      >
                        Személyes adatok
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
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
  background: "#000000",
  border: "none",
  padding: "5px 15px",
  borderRadius: "50%",
  transition: "background 0.3s ease",
};

const navLinkStyle = {
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "400",
  textDecoration: "none",
  padding: "8px 15px",
  margin: "5px",
  letterSpacing: "0.5px",
  transition: "color 0.3s ease, border-bottom 0.3s ease",
};

const navLinkActiveStyle = {
  color: "#ff8a00",
  fontWeight: "600",
  borderBottom: "2px solid #ff8a00",
};

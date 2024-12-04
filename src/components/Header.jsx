import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  NavbarText,
} from 'reactstrap'
import { FaBlog } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {user,logOut}=useContext(UserContext)
   

    const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      
  <div>
    <Navbar fixed='top' dark expand="md" style={{borderBottom:'1px solid gray', backgroundColor:'#852af5'}}>
      <NavbarBrand href="/"><FaBlog/></NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink className='nav-link' to='/'>Főoldal</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='nav-link' to='/posts'>
                Posztok
            </NavLink>
          </NavItem>
        </Nav>

        <Nav navbar>
          { !user ? <>
            <NavItem>
                <NavLink className='nav-link' to='/auth/in'>Belépés</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className='nav-link' to='/auth/up'>Regisztráció</NavLink>
            </NavItem>
          </>
          :
          <>
           <NavItem>
                <NavLink className='nav-link' to='/'
                onClick={()=>logOut()}
                >Kijelentkezés</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    <RxAvatar/>
                </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Személyes adatok</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Fiók törlése</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          </>
           
}
        </Nav>

      </Collapse>
    </Navbar>
    <Outlet />
  </div>
    </div>
  )
}
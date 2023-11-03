
import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtnLink,
} from "./navbarElements";
import Button from '../Button';

 
const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
 
                <NavMenu>
                    <NavLink to="/" >
                        Começo
                    </NavLink>
                    
                    <NavLink to="/events" activeStyle>
                        Demo
                    </NavLink>
                    <NavLink to="/contato" activeStyle>
                        Contato
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                        Sign Up
                    </NavLink>
                   
                    
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <Button>
                    <NavBtnLink to="/login">
                        Login
                    </NavBtnLink>
                    <NavBtnLink to="/logout">
                        Logout
                    </NavBtnLink>
                </Button>
            </Nav>
        </>
    );
};
 
export default Navbar;
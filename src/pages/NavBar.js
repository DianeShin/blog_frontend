import {Outlet, Link} from "react-router-dom"
import './NavBar.css'
import React, {useContext} from "react";
import {AuthContext} from "./auth/Authenticator";
const NavBar = () => {
    const {userId} = useContext(AuthContext);

    return (
        <>
            <nav className = "navigationBar">
                <Link className = "navBarLink" to = "/">Home</Link>
                <Link className = "navBarLink" to = "/blog">Blog</Link>

                {userId === '' ? (
                    <>
                        <Link className = "navBarLink" to = "/sign-in" onClick={() => alert("You need to sign in to post.")}>Text Editor</Link>
                        <Link id = "signInNavBarLink" className = "navBarLink" to = "/sign-in">Sign In</Link>
                    </>
                ) : (
                    <>
                        <Link className = "navBarLink" to = "/text-editor">Text Editor</Link>
                        <Link id = "signInNavBarLink" className = "navBarLink" to = "/sign-out">Sign Out</Link>
                    </>
                )}
            </nav>
            <Outlet/>
        </>
    )
}

export default NavBar;
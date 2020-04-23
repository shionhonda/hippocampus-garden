import React from 'react';
import { Link } from 'gatsby';
import './navbar.scss'

const Navbar = () => {
    const navMenuItem = ["Home", "About", "Blog", "Misc."];

    const navMenuLiTag = navMenuItem.map((item) => {
        let pageLink = "";
        if (item === "Home") {
            pageLink = "/";
        }
        else if (item === "Misc.") {
            pageLink = "/misc/";
        }
        else pageLink = "/" + item.toLowerCase() + "/";

        return (
            <li key={pageLink}>
                <Link to={pageLink}>
                    {item}
                </Link>
            </li>
        )
    });

    return (
        <nav className="navbar">
            <div className="navbar-item">
                <ul>
                    {navMenuLiTag}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
import React from 'react';
import { Link } from 'gatsby';
import './header.css'

const Header = (props) => {
    const NavMenuItem = ["Home", "About", "Blog", "Misc"];

    const NavMenuLiTag = NavMenuItem.map((item) => {
        let page_link = "";
        if (item === "Home") {
            page_link = "/";
        }
        else page_link = "/" + item.toLowerCase() + "/";

        return (
            <li key={page_link}>
                <Link to={page_link}
                    className="page-link"
                    style={{
                        boxShadow: `none`,
                        textDecoration: `none`,
                        color: `inherit`,
                    }}
                >
                    {item}
                </Link>
            </li>
        )
    });

    return (
        <header className="App-header">
            <nav className="App-navbar">
                <div className="App-navbar-item"
                style={{align: `center`}}>
                    <ul>
                        {NavMenuLiTag}
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
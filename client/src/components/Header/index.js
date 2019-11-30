import React from "react";
import "./style.css";

function Header(props) {
    return (
        <div className="navigation-bar">
            <ul>
                <li><a className="navbar-brand" href="/"><img src="./../../images/brits-wine-logo.png" height="40" alt=""></img></a></li>
                <li><a href="/">Login</a></li>
            </ul>
        </div>
    );
}

export default Header;
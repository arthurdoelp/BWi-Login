import React from "react";
import "./style.css";

function Footer(props) {
    return (

        <footer>
            <div className="footer-container col-sm-12 col-md-12 col-lg-12">
                <div className="footer-links">
                    <a>Terms</a>
                    <a href="/">Contact</a>
                </div>
                <p>All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
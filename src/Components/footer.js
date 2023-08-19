import React from "react";
import "../Styles/footer.css";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/explore">Explore</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="social-icons">
            <IconButton aria-label="Facebook">
              <Facebook />
            </IconButton>
            <IconButton aria-label="Twitter">
              <Twitter />
            </IconButton>
            <IconButton aria-label="Instagram">
              <Instagram />
            </IconButton>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 JossBee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import '../Styles/footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/explore">Explore</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          {/* <div className="footer-social">
            <tr>
              <td><Link to="/"><i className="fab fa-facebook"></i></Link></td>
              <td><Link to="/"><i className="fab fa-twitter"></i></Link></td>
              <td><Link to="/"><i className="fab fa-instagram"></i></Link></td>
            </tr>
          </div> */}
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 JossBee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

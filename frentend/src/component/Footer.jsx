import React from "react";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";

import "../design/footer.css"
function Footer() {
  return (
    <footer className="footer">

      {/* ================================
          MAIN FOOTER
      ================================= */}

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-brand">

          <h2 className="footer-logo">
            Shop<span>Zone</span>
          </h2>

          <p className="footer-description">
            Discover quality products at great prices.
            Shop easily, securely, and confidently.
          </p>

          <div className="footer-social">

            <a href="#" aria-label="Facebook">
              <FiFacebook />
            </a>

            <a href="#" aria-label="Instagram">
              <FiInstagram />
            </a>

            <a href="#" aria-label="Twitter">
              <FiTwitter />
            </a>

            <a href="#" aria-label="YouTube">
              <FiYoutube />
            </a>

          </div>

        </div>


        {/* Shop */}

        <div className="footer-column">

          <h3>Shop</h3>

          <a href="#">All Products</a>
          <a href="#">New Arrivals</a>
          <a href="#">Best Sellers</a>
          <a href="#">Special Offers</a>

        </div>


        {/* Support */}

        <div className="footer-column">

          <h3>Support</h3>

          <a href="#">Contact Us</a>
          <a href="#">FAQ</a>
          <a href="#">Shipping & Delivery</a>
          <a href="#">Returns & Refunds</a>

        </div>


        {/* Contact */}

        <div className="footer-column footer-contact">

          <h3>Contact</h3>

          <div className="contact-item">

            <FiMapPin />

            <span>
              Jaipur, Rajasthan, India
            </span>

          </div>

          <div className="contact-item">

            <FiPhone />

            <span>
              +91 0000000000
            </span>

          </div>

          <div className="contact-item">

            <FiMail />

            <span>
             t@t.com
            </span>

          </div>

        </div>

      </div>


      {/* ================================
          NEWSLETTER
      ================================= */}

      <div className="footer-newsletter">

        <div className="newsletter-content">

          <h3>
            Stay updated
          </h3>

          <p>
            Get updates about new products and offers.
          </p>

        </div>

        <div className="newsletter-form">

          <input
            type="email"
            placeholder="Enter your email"
          />

          <button>
            Subscribe
            <FiArrowRight />
          </button>

        </div>

      </div>


      {/* ================================
          BOTTOM FOOTER
      ================================= */}

      <div className="footer-bottom">

        <p>
          © 2026 ShopZone. All rights reserved.
        </p>

        <div className="footer-bottom-links">

          <a href="#">Privacy Policy</a>

          <a href="#">Terms & Conditions</a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
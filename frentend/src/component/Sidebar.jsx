import React from "react";
import {  FiX,  FiHome,  FiShoppingBag,  FiPackage,  FiHeart,  FiTag,  FiTruck,  FiClock,  FiStar,  FiSettings,  FiHelpCircle,
  FiUser,  FiChevronRight,} from "react-icons/fi";
import User_account from "./User_account";
import "../design/sidebar.css"
import { Link } from "react-router-dom";

function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "sidebar-overlay-show" : ""}`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>

        {/* Header */}
        <div className="sidebar-header">

          <div className="sidebar-title">
            <div className="sidebar-logo">
              E
            </div>

            <div>
              <h2>Explore</h2>
              <span>Discover products</span>
            </div>
          </div>

          <button
            className="sidebar-close"
            onClick={closeSidebar}
          >
            <FiX />
          </button>

        </div>


        {/* User */}
        <div className="sidebar-user"    >
           <Link to="/user_account"></Link>
          <div className="sidebar-user-icon">
            <FiUser />
          </div>

          <div className="sidebar-user-info">
            <Link to='/user_account'>
            <strong>My Account</strong>
            <span>View your profile</span>
            </Link>
          </div>

          <FiChevronRight className="sidebar-arrow" />

        </div>


        {/* Main Menu */}
        <div className="sidebar-section">

          <p className="sidebar-section-title">
            MENU
          </p>

          <button className="sidebar-menu-item active">
            <span className="sidebar-menu-icon">
              <FiHome />
            </span>

            <span>Home</span>

            <FiChevronRight className="sidebar-menu-arrow" />
          </button>


          <button className="sidebar-menu-item">
            <span className="sidebar-menu-icon">
              <FiShoppingBag />
            </span>

            <span>Shop</span>

            <FiChevronRight className="sidebar-menu-arrow" />
          </button>


          <button className="sidebar-menu-item">
            <span className="sidebar-menu-icon">
              <FiPackage />
            </span>

            <span>My Orders</span>

            <FiChevronRight className="sidebar-menu-arrow" />
          </button>


          <button className="sidebar-menu-item">
            <span className="sidebar-menu-icon">
              <FiHeart />
            </span>

            <span>Wishlist</span>

            <span className="sidebar-count">
              4
            </span>
          </button>

        </div>


        {/* Shopping */}
        <div className="sidebar-section">

          <p className="sidebar-section-title">
            SHOPPING
          </p>

          <button className="sidebar-menu-item">

            <span className="sidebar-menu-icon">
              <FiTag />
            </span>

            <span>Deals & Offers</span>

            <span className="sidebar-new">
              NEW
            </span>

          </button>


          <button className="sidebar-menu-item">

            <span className="sidebar-menu-icon">
              <FiTruck />
            </span>

            <span>Track Order</span>

          </button>


          <button className="sidebar-menu-item">

            <span className="sidebar-menu-icon">
              <FiClock />
            </span>

            <span>Recently Viewed</span>

          </button>


          <button className="sidebar-menu-item">

            <span className="sidebar-menu-icon">
              <FiStar />
            </span>

            <span>Top Rated</span>

          </button>

        </div>


        {/* Bottom */}
        <div className="sidebar-bottom">

          <button className="sidebar-menu-item">

            <span className="sidebar-menu-icon">
              <FiSettings />
            </span>

            <span>Settings</span>

          </button>


          <button className="sidebar-menu-item">

            <span className="sidebar-menu-icon">
              <FiHelpCircle />
            </span>

            <span>Help & Support</span>

          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;
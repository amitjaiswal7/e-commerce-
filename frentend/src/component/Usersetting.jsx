import React from "react";
import {
  FiUser,
  FiLock,
  FiBell,
  FiMapPin,
  FiCreditCard,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

import "../design/user.setting.css"

const UserSettings = () => {
  return (
    <div className="user-settings">
      <div className="user-settings-header">
        <h2>Settings</h2>
        <p>Manage your account settings</p>
      </div>

      {/* Profile */}
      <div className="user-settings-profile">
        <div className="user-settings-avatar">
          <FiUser />
        </div>

        <div>
          <h3>My Account</h3>
          <p>Manage your personal information</p>
        </div>
      </div>

      {/* Settings Options */}
      <div className="user-settings-card">

        <div className="user-settings-item">
          <div className="user-settings-icon">
            <FiUser />
          </div>

          <div className="user-settings-info">
            <h4>Personal Information</h4>
            <p>Update your name, email and phone number</p>
          </div>

          <FiChevronRight className="user-settings-arrow" />
        </div>

        <div className="user-settings-item">
          <div className="user-settings-icon">
            <FiLock />
          </div>

          <div className="user-settings-info">
            <h4>Password & Security</h4>
            <p>Change your account password</p>
          </div>

          <FiChevronRight className="user-settings-arrow" />
        </div>

        <div className="user-settings-item">
          <div className="user-settings-icon">
            <FiMapPin />
          </div>

          <div className="user-settings-info">
            <h4>My Addresses</h4>
            <p>Manage your delivery addresses</p>
          </div>

          <FiChevronRight className="user-settings-arrow" />
        </div>

        <div className="user-settings-item">
          <div className="user-settings-icon">
            <FiCreditCard />
          </div>

          <div className="user-settings-info">
            <h4>Payment Methods</h4>
            <p>Manage your saved payment methods</p>
          </div>

          <FiChevronRight className="user-settings-arrow" />
        </div>

        <div className="user-settings-item">
          <div className="user-settings-icon">
            <FiBell />
          </div>

          <div className="user-settings-info">
            <h4>Notifications</h4>
            <p>Manage your notification preferences</p>
          </div>

          <FiChevronRight className="user-settings-arrow" />
        </div>

      </div>

      {/* Logout */}
      <button className="user-settings-logout">
        <FiLogOut />
        <span>Logout</span>
      </button>

    </div>
  );
};

export default UserSettings;
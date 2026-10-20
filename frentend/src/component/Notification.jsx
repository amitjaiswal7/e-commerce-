import React, { useState } from "react";
import {
  FiCheck,
  FiTrash2,
  FiCheckCircle,
  FiTag,
  FiInfo,
} from "react-icons/fi";

import "../design/notification.css";

function Notification() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "offer",
      title: "New Offer Available",
      message:
        "Get up to 30% OFF on selected products. Offer available for a limited time.",
      date: "Today",
      time: "05:20 PM",
      unread: true,
    },

    {
      id: 2,
      type: "offer",
      title: "Special Weekend Deal",
      message:
        "Special discounts are now available on selected products. Check them out before the offer ends.",
      date: "Today",
      time: "02:15 PM",
      unread: true,
    },

    {
      id: 3,
      type: "info",
      title: "New Products Added",
      message:
        "New products have been added to our store. Explore the latest collection.",
      date: "Yesterday",
      time: "06:30 PM",
      unread: false,
    },

    {
      id: 4,
      type: "offer",
      title: "Limited Time Offer",
      message:
        "Save more on your next purchase with our latest special offer.",
      date: "Yesterday",
      time: "11:10 AM",
      unread: false,
    },
  ]);

  const [filter, setFilter] = useState("all");


  /* =========================
     MARK AS READ
  ========================= */

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, unread: false }
          : item
      )
    );
  };


  /* =========================
     DELETE
  ========================= */

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };


  /* =========================
     MARK ALL AS READ
  ========================= */

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };


  /* =========================
     FILTER
  ========================= */

  const filteredNotifications =
    notifications.filter((item) => {

      if (filter === "unread") {
        return item.unread;
      }

      if (filter === "offers") {
        return item.type === "offer";
      }

      return true;
    });


  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;


  return (
    <div className="notification-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="notification-header">

        <div>
          <h1>Notifications</h1>

          <p>
            Stay updated with the latest offers and updates.
          </p>
        </div>


        {unreadCount > 0 && (
          <button
            className="mark-all-btn"
            onClick={markAllAsRead}
          >
            <FiCheckCircle />

            Mark all as read
          </button>
        )}

      </div>


      {/* =========================
          SUMMARY
      ========================= */}

      <div className="notification-summary">

        <div className="summary-item">
          <span>Total</span>
          <strong>{notifications.length}</strong>
        </div>

        <div className="summary-item">
          <span>Unread</span>
          <strong>{unreadCount}</strong>
        </div>

      </div>


      {/* =========================
          FILTER
      ========================= */}

      <div className="notification-filter">

        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "unread" ? "active" : ""}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>

        <button
          className={filter === "offers" ? "active" : ""}
          onClick={() => setFilter("offers")}
        >
          Offers
        </button>

      </div>


      {/* =========================
          NOTIFICATION LIST
      ========================= */}

      <div className="notification-list">

        {filteredNotifications.length === 0 ? (

          <div className="notification-empty">

            <FiCheckCircle />

            <h3>No notifications</h3>

            <p>
              You're all caught up.
            </p>

          </div>

        ) : (

          filteredNotifications.map((item) => (

            <div
              key={item.id}
              className={`notification-card ${
                item.unread ? "unread" : ""
              }`}
            >

              {/* Left */}

              <div className="notification-type">

                {item.type === "offer" ? (
                  <FiTag />
                ) : (
                  <FiInfo />
                )}

              </div>


              {/* Content */}

              <div className="notification-content">

                <div className="notification-title-row">

                  <h3>
                    {item.title}
                  </h3>

                  {item.unread && (
                    <span className="new-badge">
                      New
                    </span>
                  )}

                </div>


                <p className="notification-message">
                  {item.message}
                </p>


                <div className="notification-time">

                  <span>
                    {item.date}
                  </span>

                  <span>•</span>

                  <span>
                    {item.time}
                  </span>

                </div>

              </div>


              {/* Actions */}

              <div className="notification-actions">

                {item.unread && (
                  <button
                    title="Mark as read"
                    onClick={() =>
                      markAsRead(item.id)
                    }
                  >
                    <FiCheck />
                  </button>
                )}

                <button
                  className="delete-btn"
                  title="Delete"
                  onClick={() =>
                    deleteNotification(item.id)
                  }
                >
                  <FiTrash2 />
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Notification;
import  "../design/navbar.css"
import { useAuth } from "../context/User.login.context";
import {  FiSearch,  FiUser,  FiBell,  FiLogOut,  FiSettings,  FiMessageSquare,  FiChevronDown} from "react-icons/fi";
import { useEffect, useState } from "react";
import { product_search_input } from "../axios/product.axios";
import { user_logout_axio } from "../axios/user.axios";
import  {Link} from "react-router-dom";

function Navbar() {
  const { accessToken, setAccessToken, setUser, user , setsearchproduct } = useAuth();

const [search, setsearch] = useState("");

  async function user_logout_handle() {
    try {
      const response = await user_logout_axio();

      if (response?.data?.success) {
        setAccessToken(null);
        setUser(null);
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }


  function hendle_serach_input(e){
  const value = e.target.value;
  setsearch(value);
 }

useEffect(() => {
  if (!search?.trim()){
    setsearchproduct(null);
    return;
  }

  const timer = setTimeout(async () => {
    try {
      const response = await product_search_input(search);

        setsearchproduct(response.data.data);
        console.log(response.data.data)
    } catch (error) {
      console.error("Search failed:", error);
    }
  }, 2000);

  return () => {
    clearTimeout(timer);
  };
}, [search]);

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="navbar-left">

        <div className="brand">
          <div className="brand-icon">
            E
          </div>

          <div>
            <h2>Ecom</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <div className="page-info">
          <span className="page-label">Dashboard</span>
          <span className="page-subtitle">
            Manage your store
          </span>
        </div>

      </div>


      {/* CENTER SEARCH */}
      {accessToken && (
        <div className="navbar-search">

          <FiSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search products, orders..."
            onChange={hendle_serach_input}
          />

          <span className="search-shortcut">
            Ctrl K
          </span>

        </div>
      )}


      {/* RIGHT */}
      <div className="navbar-right">

        {accessToken ? (
          <>

            {/* Messages */}
            <button className="nav-action">
           <Link to='/user-product'> <FiMessageSquare /></Link>

              <span className="badge">
                3
              </span>
            </button>


            {/* Notifications */}
            <button className="nav-action">
           
           <Link to='/notification'><FiBell /></Link>

              <span className="notification-dot"></span>
            </button>


            {/* Settings */}
            <button className="nav-action">
             <Link to= "/user-setting"><FiSettings /></Link>
            </button>


            {/* User */}
            <div className="user-profile">

              <div className="user-avatar">
                <FiUser />
              </div>

              <div className="user-details">

                <strong>
                  {user?.name || ""}
                </strong>

                <span>
                 {user?.role || "user"}
                </span>

              </div>

              <FiChevronDown className="user-arrow" />

            </div>


            {/* Logout */}
            <button
              onClick={user_logout_handle}
              className="logout-btn"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>

          </>
        ) : (

          <div className="not-logged">
            Not logged in
          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;
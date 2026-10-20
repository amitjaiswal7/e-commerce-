import Upperline from "./Upperline";

const Layout = ({ children }) => {
  return (
  <div className="dashboard-layout">

      {/* Main Area */}
      <div className="dashboard-main">

        {/* Navbar */}

        

        {/* Page Content */}
        <main className="dashboard-content">
          {children}
        </main>

      </div>

    </div>

  );
};

export default Layout;
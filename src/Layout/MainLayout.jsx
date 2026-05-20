import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import "./MainLayout.module.scss";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

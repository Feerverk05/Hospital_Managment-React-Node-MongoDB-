import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const handleLogout = async () => {
        await axios
          .get("http://localhost:4000/api/v1/user/patient/logout", {
            withCredentials: true,
          })
          .then((res) => {
            toast.success(res.data.message);
            setIsAuthenticated(false);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      };
    
      const navigateTo = useNavigate();
    
      const goToLogin = () => {
        navigateTo("/login");
      };
    
  return (
    <nav className="container">
        <div className="logo">Health</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
            <div className="links">
                <Link to ={"/"}>Головна</Link>
                <Link to ={"/appointments"}>Призначення</Link>
                <Link to ={"/about"}>Про нас</Link>
            </div>
            {isAuthenticated ? (
                <button className="logoutBtn btn" onClick={handleLogout}>Вийти</button>
            ) : (
                <button className="loginBtn btn" onClick={goToLogin}>Увійти</button>
            )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>        </nav>
  );
};

export default Navbar

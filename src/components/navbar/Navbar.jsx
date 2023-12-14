import React ,{useContext,useState,useEffect}from "react";
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import MyContext from "../../context/data/MyContext";
import {NavLink} from 'react-router-dom'
import MyState from "../../context/data/MyState";
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi';
import  "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const context = useContext(MyContext);
  const { toggleMode, mode } = context;
  const show = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = "flex";
}
const hide = () =>{
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = "none";

}
const handleThemeToggle = () => {
  toggleMode(); 
};
const user = JSON.parse(localStorage.getItem('user'))
const logout = () =>{
  localStorage.clear("user");
  window.location.href="./Login"
}
const cartItems = useSelector((state) => state.Cart);
  return (
    <>
    <MyState>
       <nav>
        <ul class="sidebar">
            <li><a className="ham" href="#" onClick={hide}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a></li>
            <li><a href="#">E-Shop</a></li>
            <li><NavLink to = "/ProductCard">All Products</NavLink></li>
            
            {user?.user?.email === "subha234@gmail.com"?
            <li><NavLink to = "/Dashboard">Admin</NavLink></li>:""}
            {user?
            <li onClick={logout}><a href="#">Logout</a></li>:""}
            {user?
            <li class="mobile"><NavLink to = "/Order">Order</NavLink></li>:""}
            <li><a href="#">profile</a></li>
            <li><a href="#" onClick={handleThemeToggle} style={{ backgroundColor: mode === 'dark' ? 'yellow' : 'green', color: mode === 'dark' ? 'white' : '', }}>Theme</a></li>
            <Link to="./Card">
            <li><NavLink to = "/Cart"> Cart- {cartItems.length}</NavLink></li></Link>
        </ul>
        <ul>
            <li><a href="#">E-Shop</a></li>
            <li class="mobile"><NavLink to ="/ProductCard">All Products</NavLink></li>
           
            {user?.user?.email === "subha234@gmail.com"?
            <li><NavLink NavLink to="/Dashboard">Admin</NavLink></li>:""}
            {user?
            <li onClick={logout}><a href="#">Logout</a></li>:""}
            <li class="mobile"><NavLink to = "/Order">Order</NavLink></li>
            <li className="mobile"><a href="#">profile</a></li>
            <li className="mobile"><a href="#" onClick={handleThemeToggle} style={{ backgroundColor: mode === 'dark' ? 'yellow' : 'green', color: mode === 'dark' ? 'white' : '', }}>Theme</a></li>
            <li className="mobile"><NavLink to ="/Cart"> Cart -  {cartItems.length}</NavLink></li>
            <li className="menu" onClick={show}><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></li>
        </ul>
    </nav>
    </MyState>
    </>
  )
}

export default Navbar;

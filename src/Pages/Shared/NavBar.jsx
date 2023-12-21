import { Link, NavLink } from 'react-router-dom';
import { FaBell} from "react-icons/fa";

const Navbar = () => {
  
  const totalAnnouncements = null
  const navLinks = <>
      <NavLink to = "/" >Home</NavLink>
      <NavLink to = "/dashboard" >Dashboard</NavLink>
      <NavLink to = "/about" >About</NavLink>
      <NavLink to = "/services" >Services</NavLink>
  </>
  return (
    <div className="navbar  max-w-screen-xl mx-auto bg-blue-300">
    <div className="navbar-start">
        <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {navLinks}
            </ul>
        </div>
        <div className=" flex gap-1">
            <img src="https://i.ibb.co/ydSCFSR/rsz-2firendfusion-logo2.jpg" className=" w-12  rounded-br-lg rounded-tl-lg" alt="" />
            <h3 className="btn btn-ghost hidden md:block lg:block normal-case text-xl">Task Management </h3>
        </div>
    </div>
    <div className="navbar-center hidden md:flex">
        <ul className="menu flex gap-2 menu-horizontal px-1">
            {navLinks}
        </ul>
    </div>
    <div className="navbar-end">
        <div className="flex gap-3 items-center">
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        {/* <FaNotif></FaNotif> */}
                        {
                            totalAnnouncements > 0 ? <Link to ="/announcements"> <FaBell className=" text-2xl"></FaBell>
                            <span className="badge badge-sm indicator-item">{ totalAnnouncements }</span>
                            </Link> 
                            : <>
                            <FaBell></FaBell> 
                            </> 
                        }
                       
                    </div>
                </label>
            </div>
        
        </div>
    </div>
</div>
  );
};

export default Navbar;

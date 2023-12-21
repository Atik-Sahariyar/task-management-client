import {  FaBook, FaHome, FaTasks, FaUpload, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import { Helmet } from "react-helmet-async";

const Dashboard = () => {

    return (
    <div>
      <Helmet>
        <title>Dashboard | Task Management</title>
      </Helmet>
      <div className="flex flex-col md:flex-row">
        <div className=" w-full md:w-64  md:min-h-screen bg-blue-400 ">
          <ul className=" p-2 flex flex-row justify-center md:flex-col gap-6 md:gap-1 ">
            {/* user routes */}
            <li>
              <NavLink to="/dashboard/myProfile">
                
                <span className=" flex gap-2 my-3 items-center hover:bg-blue-600 hover:text-white">
                  <FaUser></FaUser>
                  <span className=" hidden md:block">My Profile</span>
                  <span className=" hidden hover:text-white">My Profile</span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/allTasks">
                
                <span className=" flex gap-2 my-3 items-center hover:bg-blue-600 hover:text-white">
                  <FaTasks></FaTasks>
                  <span className=" hidden md:block">All Tasks</span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/taskCreate">
                
                <span className=" flex gap-2 my-3 items-center hover:bg-blue-600 hover:text-white">
                  <FaUpload></FaUpload>
                  <span className=" hidden md:block">Create a task</span>
                  <span className=" hidden hover:text-white ">Create a task</span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myTasks">
                
                <span className=" flex gap-2 my-3 items-center hover:bg-blue-600 hover:text-white">
                  <FaBook></FaBook>
                  <span className=" hidden md:block">My Tasks</span>
                  <span className=" hidden hover:block  hover:text-white">My Tasks</span>
                </span>
              </NavLink>
            </li>
            {/* Shaered Navlink */}
            <div className=" divider"></div>
            <li>
              <NavLink to="/">
                
                <span className=" flex gap-2 my-3 items-center hover:bg-blue-600 hover:text-white">
             
                <FaHome ></FaHome>

                  <span className=" hidden md:block">Go to Home</span>
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

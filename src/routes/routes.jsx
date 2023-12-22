import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import SignupPage from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import TaskCreationPage from "../Pages/Dashboard/TaskCreatePage/TaskCreatePage";
import AllTask from "../Pages/Dashboard/AllTask/AllTask";
import UpdateTask from "../Pages/Dashboard/UpdateTask/UpdateTask";
import About from "../Pages/About/About";
import Services from "../Pages/Services/Services";
import MyTask from "../Pages/Dashboard/MyTasks/MyTasks";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element:<Home></Home>
            },
            {
                path: "signup",
                element: <SignupPage></SignupPage>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "about",
                element: <About></About>
            },
            {
                path: "services",
                element: <Services></Services>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [

            {
                path: "myProfile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "taskCreate",
                element: <TaskCreationPage></TaskCreationPage>
            },
            {
                path: "allTasks",
                element: <AllTask></AllTask>
            },
            {
                path: "updateTask/:id",
                element: <UpdateTask></UpdateTask>
            },
            {
                path: "myTasks",
                element: <MyTask></MyTask>
            }
        ]
    }
])

export default routes;
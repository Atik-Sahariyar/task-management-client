import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import SignupPage from "../Pages/SignUp/SignUp";

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
            }
        ]
    }
])

export default routes;
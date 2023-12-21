import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

// image hosting
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignupPage = () => {
  const { createUser, updateUserProfiole } = useAuth(); 
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

// new user registration function
  const onSubmit = async(data) => {
    const email = data.email;
    const password = data.password;
    const imageFiile = { image: data.profilePic[0] }
    console.log(data);
    const url = await axios.post(image_hosting_api, imageFiile, {   
        headers: {
            'content-type': 'multipart/form-data'
        }
    }); 
    let photoURL = '';
    if(url.data){
        photoURL = url.data?.data?.display_url
    }

    createUser(email, password)
    .then(async() => {
          
        updateUserProfiole(data.name, photoURL )
        .then(() => {
            const userInfo = {
                name: data.name,
                email: data.email,
                profilePic: photoURL,
                password
            }
            console.log('user info: ', userInfo);
            axiosPublic.post('/users', userInfo)
                .then(res => {
                    console.log(res.data);
                    if (res.data?._id) {
                        Swal.fire('Sign up successfull')
                        navigate('/');
                        reset();
                    }
                })

        })
        .catch(error => {
            console.log(error);
        })
       }
 
      
    )

  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full sm:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">Name is required</span>
            )}
          </div>
          <div className="  form-control w-full my-6">
            <label className="label">
              <span className="label-text">Choose Photo</span>
            </label>
            <input
              {...register("profilePic")}
              type="file"
              className=" file-input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email Address"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                Please enter a valid email address
              </span>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                Password must be at least 6 characters
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <hr className="my-6 border-t" />
        {/* Social signup buttons */}
        {/* ... */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

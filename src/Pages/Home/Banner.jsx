import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Banner = () => {
  const { user } = useAuth();
  return (
    <section className="bg-blue-600 text-white py-16 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-start md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to SCC Technovision Inc.
            </h1>
            <p className="text-lg md:text-xl">
              Your collaborative Task Management Platform powered by React.js,
              Firebase, and more!
            </p>
            {user ? (
              <Link to = '/dashboard'>
                <button className="bg-white text-2xl text-blue-600 font-bold py-2 px-6 rounded-full mt-6 hover:bg-opacity-90 transition duration-300">
                  {`Let's Explore`}
                </button>
              </Link>
            ) : (
              <Link to = "/login">
                <button className="bg-white text-2xl text-blue-600 font-bold py-2 px-6 rounded-full mt-6 hover:bg-opacity-90 transition duration-300">
                  {`Let's Explore`}
                </button>
              </Link>
            )}
          </div>
          <div className="w-full md:w-1/2">
            {/* Placeholder Image */}
            <img
              src="https://i.ibb.co/89qrfLc/banner.jpg"
              alt="Illustration"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

import { useNavigate } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';

const SocialLogin = () => {
    const { googleSignIn , gitHubSignin} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // handle google sign in function
    const handleGooogleSignIn = async() => {
      try{
        const result = await googleSignIn();
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          photo: result.user?.photoURL,
        }
       
        axiosPublic.post('/api/users', userInfo)
        .then(res => {
          console.log(res.data);
           navigate('/');
        })
      } catch (error) {
        console.error('Error during Google sign-in:', error);
    }
    }
    // handle google sign in function
    const handleGitHubSignIn = async() => {
      try{
        const result = await gitHubSignin();
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          photo: result.user?.photoURL,
        }
       
        axiosPublic.post('/api/users', userInfo)
        .then(res => {
          console.log(res.data);
           navigate('/');
        })
      } catch (error) {
        console.error('Error during github sign-in:', error);
    }
    }

    return (
        <div className=" px-8 ">
            <div className=" divider"></div>
            <h3 className=' text-center'>Continue with</h3>
            <div className='flex gap-2 justify-center'>
            <div onClick={handleGooogleSignIn} className='flex text-blue-700 hover:text-white justify-center rounded-lg hover:bg-primary items-center space-x-2 border  p-2 border-gray-300 border-rounded cursor-pointer'>
                <FaGoogle size={32} className="" />
                <p> Google</p>
            </div>
            <div onClick={handleGitHubSignIn} className='flex text-blue-700 hover:text-white justify-center rounded-lg hover:bg-primary items-center space-x-2 border  p-2 border-gray-300 border-rounded cursor-pointer'>
                <FaGithub size={32} className="" />
                <p> GitHub</p>
            </div>
            </div>
        </div>
    );
};

export default SocialLogin;
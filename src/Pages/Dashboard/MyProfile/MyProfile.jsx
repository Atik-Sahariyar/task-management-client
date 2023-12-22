
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const MyProfile = () => {
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="flex items-center space-x-4">
          <img
            src={user.photoURL || 'default-avatar-url'} 
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{user.displayName}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default MyProfile;

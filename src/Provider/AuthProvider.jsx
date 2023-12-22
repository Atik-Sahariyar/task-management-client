import { createContext, useEffect, useState } from "react";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import app from "../firebase/firebase.config";



export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    // create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // create user with google
    const googleSignIn = async () => {
        setLoading(true);
        const result = await signInWithPopup(auth, googleProvider);
        return result;
    }
 
    // create user with github
    const gitHubSignin = async () => {
        try {
          setLoading(true);
          console.log('github auth: ', auth);
          console.log(githubProvider);
          const result = await signInWithPopup(auth, githubProvider);
        
          return result;
        } catch (error) {
          console.error('GitHub signin error:', error);
          throw error; 
        } finally {
          setLoading(false); 
        }
      };

    // update user profile

    const updateUserProfiole = (name, photo) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            console.log('Profile updated successfully');
          })
          .catch((error) => {
            console.error('Error updating profile:', error);
            throw error;
          });
      };
      
    // sign in user
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Logout user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          if (currentUser) {
            setLoading(false);
          }
          console.log('Current user:', currentUser ? currentUser.uid : 'Not logged in');
        });
        return unsubscribe;
      }, []);


    // auth information
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfiole,
        googleSignIn,
        gitHubSignin
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
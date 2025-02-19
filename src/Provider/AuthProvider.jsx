import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser] =useState(null)
    const [loading,setLoading] = useState(true)
    const provider = new GoogleAuthProvider()
    const axiosPublic = useAxiosPublic()




    //create a new user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //sign in a user
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //sign Out
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    //update user profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    //google login
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)

    }

      // create a observer
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                //get token and store client
                const userInformation = { email: currentUser.email }
                axiosPublic.post('/jwt', userInformation)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('asset-token', res.data.token)
                            setLoading(false)

                        }
                    })
            }
            else {
                //remove token (if token stored in the client site ,Local storage,caching , in memory)
                localStorage.removeItem('asset-token')
                setLoading(false)

            }
        })
        return () => {
            return unsubscribe()
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleLogin
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
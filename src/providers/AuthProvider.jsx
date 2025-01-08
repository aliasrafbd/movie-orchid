import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allMovies, setAllMovies] = useState([]);

    const createANewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }



    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
            offset: 120,
        });
    }, []);


    const [isDarkTheme, setIsDarkTheme] = useState(() => {

        const savedTheme = localStorage.getItem('homeTheme');
        return savedTheme ? savedTheme === 'dark' : false;
    });

    const logInAUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleNavigation = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };


    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }

    const googleLogIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        Swal.fire({
            title: 'Logged Out...',
            icon: 'info',
            timer: 1000,
            showConfirmButton: false,
            timerProgressBar: true,
        });
        setLoading(false)

        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)

            if (currentUser?.email) {
                const user = { email: currentUser?.email }

                axios.post('https://movie-portal-server-three.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        setLoading(false);
                    })

            }
            else {
                axios.post('https://movie-portal-server-three.vercel.app/logout', {}, { withCredentials: true })
                    .then(res => {
                        setLoading(false);
                    })
            }




            
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        createANewUser,
        logInAUser,
        googleLogIn,
        logOut,
        user,
        setUser,
        loading,
        setLoading,
        allMovies,
        setAllMovies,
        isDarkTheme,
        setIsDarkTheme,
        handleNavigation,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            <div>
                {children}
            </div>
        </AuthContext.Provider>
    );
};

export default AuthProvider;
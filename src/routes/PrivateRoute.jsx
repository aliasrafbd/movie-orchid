import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({children}) => {

    const { user, loading } = useContext(AuthContext);
    // const location = useLocation();

    if(loading) {
        return <Loading></Loading>
    }

    if(user && user?.email) {
        return children;
    }

    return <Navigate to = {"/login"}></Navigate>

};

export default PrivateRoute;
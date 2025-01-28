import React from 'react';
import useAuth from '../Hooks/useAuth';
import useManager from '../Hooks/useManager';
import { useLocation } from 'react-router-dom';

const ManagerRoute = ({children}) => {
    const {user,loading} = useAuth()
    const [isManager,isManagerLoading] = useManager()
    const location = useLocation()

    if(loading || isManagerLoading){
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if(user && isManager){
        return children;
    }
    return <Navigate to='/' state={{from:location}} replace></Navigate>
    
};

export default ManagerRoute;
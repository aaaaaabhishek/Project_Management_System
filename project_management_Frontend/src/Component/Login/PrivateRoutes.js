// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const PrivateRoutes = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     isAuthenticated ? <Outlet /> : <Navigate to='/login' />
//   );
// };

// export default PrivateRoutes;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const  PrivateRoutes= () => {
    const { isAuthenticated, loading } = useAuth();

    // Prevent rendering while loading
    if (loading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    // Allow access if authenticated, otherwise redirect to login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;

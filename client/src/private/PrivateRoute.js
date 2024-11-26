import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({element}) =>{
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        if (!token) return false;
    
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp > currentTime;
        } catch (error) {
            return false;
        }
    };

    return isAuthenticated()?element:<Navigate to="/login" />;
}

export default PrivateRoute;
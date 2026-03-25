
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * A component to protect routes based on authentication and roles.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The components to render if authorized
 * @param {boolean} props.adminOnly - Whether the route requires admin privileges
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading, isAdmin } = useAuth();
    const location = useLocation();

    // While checking authentication state, we can show nothing or a spinner
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Redirect to home if admin privilege is required but user is not an admin
    if (adminOnly && !isAdmin()) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

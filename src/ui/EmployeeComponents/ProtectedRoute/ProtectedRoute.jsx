import useAuth from "../../../hooks/useAuth";
import { Navigate, Outlet } from "react-router";


const ProtectedRoute = () => {

    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;



};

export default ProtectedRoute;


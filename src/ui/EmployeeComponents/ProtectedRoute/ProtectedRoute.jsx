import useAuth from "../../../hooks/useAuth";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

const ProtectedRoute = () => {
    const { isLoggedIn, loading, user } = useAuth();
    const isRegular = user?.employeeType === "REGULAR";
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isRegular && location.pathname === "/") {
            navigate("/uploads", { replace: true });
        }
    }, [loading, isRegular, location.pathname, navigate]);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;



import { Navigate, Outlet } from "react-router";
import useAuth from "../../../hooks/useAuth";

const AdminRoute = () => {

    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const isAdmin = user.role === "ADMIN";

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet/>

};

export default AdminRoute;
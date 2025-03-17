import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedLayout = ({ roles }) => {
    const { isAuthenticated, hasAnyRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !hasAnyRole(roles)) {
        return <Navigate to="/acesso-negado" replace />;
    }

    return <Outlet />;
};

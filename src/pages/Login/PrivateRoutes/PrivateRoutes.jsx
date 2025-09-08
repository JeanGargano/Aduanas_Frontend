import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext"
import Loading from "../../../components/Loading/Loading.jsx";


const PrivateRoutes = () => {
    const { estaAutenticado, isAdmin, loading } = useAuth();

    if (loading) return <Loading open={loading} />;
    if (!estaAutenticado()) return <Navigate to="/" replace />;

    if (window.location.pathname.includes("/admin") && !isAdmin()) {
        return <Navigate to="/clientes" replace />;
    }
    return <Outlet />;
    // Renderiza los componentes hijos si el usuario está autenticado
};

export default PrivateRoutes;

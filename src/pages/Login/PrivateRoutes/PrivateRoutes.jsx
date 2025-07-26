import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext"


const PrivateRoutes = () => {
    const { estaAutenticado, isAdmin, usuario, loading } = useAuth();

    if (loading) return <div>Cargando...</div>; // evita redirección antes de montar
    if (!estaAutenticado()) return <Navigate to="/" replace />;

    if (window.location.pathname.includes("/admin") && !isAdmin()) {
        return <Navigate to="/clientes" replace />;
    }
    return <Outlet />;
    // Renderiza los componentes hijos si el usuario está autenticado
};

export default PrivateRoutes;

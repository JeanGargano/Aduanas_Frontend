import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
        setLoading(false);
    }, []);

    const iniciarSesion = (usuarioData) => {
        setUsuario(usuarioData);
        localStorage.setItem("usuario", JSON.stringify(usuarioData));
    };

    const cerrarSesion = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
    };

    const estaAutenticado = () => !!usuario;

    const isAdmin = usuario?.usuario?.rol === "Administrador";

    return (
        <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion, estaAutenticado, isAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

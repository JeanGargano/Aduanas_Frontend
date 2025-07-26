import { useNavigate, useLocation } from "react-router-dom";
import Logo from '../../assets/logo.png';
import { SidebarData } from '../../Data/Data';
import { UilSignOutAlt } from '@iconscout/react-unicons';
import { useAuth } from "../../Context/AuthContext";
import Swal from "sweetalert2";

import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const { usuario, cerrarSesion } = useAuth();

    const location = useLocation();

    const rolUsuario = usuario?.rol || "";

    // Determinar cuál está activo basado en la ruta actual
    const activeIndex = SidebarData.findIndex(item => item.link === location.pathname);

    const handleNavigation = (link) => {
        navigate(link);
    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "¿Cerrar sesión?",
            text: "Tu sesión actual se cerrará y deberás volver a iniciar sesión.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#E7423E",
            cancelButtonColor: "#6E81A4",
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar",
            background: "#fff",
            customClass: {
                popup: "swal2-rounded",
                confirmButton: "swal2-confirm-custom",
            },
        });

        if (result.isConfirmed) {
            localStorage.clear(); // Borra el almacenamiento local
            cerrarSesion();       // Llama a tu función de cierre de sesión
            navigate("/");        // Redirige al login
            window.location.reload(); // Fuerza reinicio del contexto
        }
    };

    return (
        <div className="Sidebar">
            {/* logo */}
            <div className="logo">
                <img src={Logo} alt="" />
                <span>
                    Tit<span></span>ulo
                </span>
            </div>

            {/* Menu Items*/}
            <div className="menu">
                {SidebarData.filter(item => item.roles.includes(rolUsuario)).map((item, index) => (
                    <div
                        className={activeIndex === index ? 'menuItem active' : 'menuItem'}
                        key={index}
                        onClick={() => handleNavigation(item.link)}
                    >
                        <item.icon />
                        <span>{item.heading}</span>
                    </div>
                ))}
                <div className="menuItem" onClick={handleLogout}>
                    <UilSignOutAlt />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

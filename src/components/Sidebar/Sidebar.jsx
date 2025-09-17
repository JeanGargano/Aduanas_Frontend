import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import { SidebarData } from '../../Data/Data';
import { UilSignOutAlt } from '@iconscout/react-unicons';
import { useAuth } from "../../Context/AuthContext";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const { usuario, cerrarSesion } = useAuth();
    const location = useLocation();

    const [expanded, setExpanded] = useState(true);

    const sidebarVariants = {
        true: {
            left: '0'
        },
        false: {
            left: '-60%'
        }
    }

    const rolUsuario = usuario?.usuario?.rol || "";
    // Determinar cuál está activo basado en la ruta actual
    const activeIndex = SidebarData.findIndex(item => location.pathname.startsWith(item.link));

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
        <>
            <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpanded(!expanded)}>
                <UilBars />
            </div>

            <motion.div className="Sidebar"
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ''}
            >
                {/* logo */}
                <div className="logo">
                    {/* <img src={Logo} alt="" /> */}
                    <span>
                        BAHÍA<span><br />PACIFIC</span>

                    </span>
                </div>

                {/* Menu Items*/}
                <div className="menu">
                    {SidebarData.filter(item => item.roles.includes(rolUsuario)).map((item, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div
                                key={index}
                                className={`menuItem ${isActive ? `active ${rolUsuario}` : ''}`}
                                onClick={() => handleNavigation(item.link)}
                            >
                                <item.icon />
                                <span>{item.heading}</span>
                            </div>
                        );
                    })}
                    <div className="menuItem" onClick={handleLogout}>
                        <UilSignOutAlt />
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Sidebar;

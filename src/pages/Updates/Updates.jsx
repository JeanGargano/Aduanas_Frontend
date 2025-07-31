import "./Updates.css";
import { useEffect, useState } from "react";
import { listarNotificaciones, listarMisNotificaciones } from "../../Services/notificacionesApi";
import { useAuth } from "../../Context/AuthContext";

const Updates = () => {
    const [updates, setUpdates] = useState([]);
    const { usuario } = useAuth();

    const usuarioId = usuario?.identificacion;
    const rolUsuario = usuario?.rol || "Cliente"; // por defecto cliente

    useEffect(() => {
        if (!usuario) return;

        const fetchUpdates = async () => {
            try {
                let data;
                if (rolUsuario.toLowerCase() === "administrador") {
                    // 🔹 Admin ve todas
                    data = await listarNotificaciones();
                } else {
                    // 🔹 Cliente ve solo las suyas
                    data = await listarMisNotificaciones(usuarioId);
                }
                setUpdates(data);
            } catch (error) {
                console.error("Error al cargar notificaciones:", error);
            }
        };

        fetchUpdates();
    }, [usuarioId, rolUsuario, usuario]);

    return (
        <div className="Updates">
            {updates.length > 0 ? (
                updates.map((update, index) => (
                    <div className="update" key={index}>
                        <div className="noti">
                            <div style={{ marginBottom: "0.5rem" }}>
                                <span>{update.name}</span>
                                <span> {update.noti}</span>
                            </div>
                            <span>{update.time}</span>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay notificaciones disponibles.</p>
            )}
        </div>
    );
};

export default Updates;
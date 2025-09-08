import "./Updates.css";
import Loading from "../../components/Loading/Loading.jsx";
import { useEffect, useState } from "react";
import { listarNotificaciones, listarMisNotificaciones } from "../../Services/notificacionesApi";
import { useAuth } from "../../Context/AuthContext";

const Updates = () => {
    const [updates, setUpdates] = useState([]);
    const { usuario } = useAuth();
    const [loading, setLoading] = useState(false);

    const usuarioId = usuario?.usuario?.identificacion;
    const rolUsuario = usuario?.usuario?.rol || "Cliente"; // por defecto cliente

    const token_type = usuario?.token_type;
    const access_token = usuario?.access_token;

    useEffect(() => {
        if (!usuario) return;

        const fetchUpdates = async () => {
            try {
                setLoading(true);
                let data;
                if (rolUsuario.toLowerCase() === "administrador") {
                    // 🔹 Admin ve todas
                    data = await listarNotificaciones(token_type, access_token);
                } else {
                    // 🔹 Cliente ve solo las suyas
                    data = await listarMisNotificaciones(usuarioId, token_type, access_token);
                }
                setUpdates(data.reverse());
            } catch (error) {
                console.error("Error al cargar notificaciones:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUpdates();
    }, [usuarioId, rolUsuario, usuario, token_type, access_token]);

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
            <Loading open={loading} />
        </div>
    );
};

export default Updates;
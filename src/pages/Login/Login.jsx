import { useState } from "react";
import "./Login.css";
import Loading from "../../components/Loading/Loading.jsx";
import { useNavigate } from "react-router-dom";
import { logearUsuario, asignarContrasena } from "../../Services/usuariosApi";
import { useAuth } from "../../Context/AuthContext";
import Swal from "sweetalert2";

export default function Auth() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const { iniciarSesion } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();

        const { value: formValues } = await Swal.fire({
            title: "Asignar Contraseña",
            icon: "question",
            html: `
            <div class="swal2-custom-input-container">
                <input type="password" id="swal-pass" class="swal2-input" placeholder="Nueva contraseña">
                <input type="password" id="swal-pass-confirm" class="swal2-input" placeholder="Confirmar contraseña">
            </div>
        `,
            showCancelButton: true,
            confirmButtonText: "Asignar",
            cancelButtonText: "Cancelar",
            focusConfirm: false,
            customClass: {
                popup: "swal2-modern-popup",
                confirmButton: "swal2-confirm-modern",
                cancelButton: "swal2-cancel-modern",
            },
            preConfirm: () => {
                const pass = document.getElementById("swal-pass").value.trim();
                const confirm = document.getElementById("swal-pass-confirm").value.trim();

                if (!pass || !confirm) {
                    Swal.showValidationMessage("⚠️ Ambos campos son obligatorios.");
                    return false;
                }

                if (pass !== confirm) {
                    Swal.showValidationMessage("❌ Las contraseñas no coinciden.");
                    return false;
                }

                return { pass };
            },
        });

        if (formValues) {
            try {
                setLoading(true);
                const res = await asignarContrasena({
                    identificacion: username,
                    contraseña: formValues.pass,
                });
                Swal.fire({
                    icon: "success",
                    title: "Contraseña asignada",
                    text: res.message || "La contraseña se asignó correctamente.",
                    timer: 2500,
                    showConfirmButton: false,
                });
                setActive(false);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message || "No se pudo asignar la contraseña.",
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            logearUsuario({ username, password })
                .then((datos) => {
                    iniciarSesion(datos);
                    navigate("/dashboard"); // Redirige al dashboard después de iniciar sesión
                })
                .catch((error) => {
                    console.error("Login failed:", error.message);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.message || "No se pudo iniciar sesión.",
                    });
                });
        } catch (error) {
            console.error("Error in handleLogin:", error.message);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al iniciar sesión: " + error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <div className={`container ${active ? "active" : ""}`} id="container">
                {/* Sign Up */}
                <div className="form-container sign-up">
                    <form onSubmit={handleRegister}>
                        <h1>Registrar Cuenta</h1>
                        <span>Utiliza tu numero de identificación para registrarte</span>
                        <input
                            type="number"
                            value={username}
                            className="noSpinner"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Identificación o NIT"
                        />
                        <button className={`toggleBtn ${active ? "btn-right" : "btn-left"}`} type="submit">Registrar Cuenta</button>
                    </form>
                </div>

                {/* Sign In */}
                <div className="form-container sign-in">
                    <form onSubmit={handleLogin}>
                        <h1>Iniciar Sesión</h1>
                        <span>Utiliza tu número de identificación y Contraseña</span>
                        <input
                            type="number"
                            value={username}
                            className="noSpinner"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Identificación o NIT"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                        />
                        {/* <a href="#">¿Olvidaste tu password?</a> */}
                        <button className={`toggleBtn ${active ? "btn-right" : "btn-left"}`} type="submit">Iniciar Sesión</button>
                    </form>
                </div>

                {/* Toggle */}
                <div className="toggle-container">
                    <div className={`toggle ${active ? "toggle-right-color" : "toggle-left-color"}`}>
                        <div className="toggle-panel toggle-left">
                            <h1>Bienvenido Por Primera vez!</h1>
                            <p>Ingresa el número de identificación personal para poder registrarte</p>
                            <button
                                className={`toggleBtn ${active ? "btn-right" : "btn-left"}`}
                                id="login"
                                type="button"
                                onClick={() => setActive(false)}
                            >
                                No es mi primera vez
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hola, Amigo!</h1>
                            <p>Ingresa con tus credenciales para utilizar todas las funciones del sitio</p>
                            <button
                                className={`toggleBtn ${active ? "btn-right" : "btn-left"}`}
                                id="register"
                                type="button"
                                onClick={() => setActive(true)}
                            >
                                Es mi primera vez
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Loading open={loading} />
        </div>
    );
}

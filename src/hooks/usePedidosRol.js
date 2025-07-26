import { useAuth } from "../Context/AuthContext";
import { usePedidos } from "./usePedidos";
import { usePClientes } from "./usePClientes";

export const usePedidosRol = () => {
  const { usuario } = useAuth();

  const hookData =
    usuario?.rol === "Cliente"
      ? usePClientes(usuario?.identificacion)
      : usePedidos();

  return hookData;
};

import { useAuth } from "../Context/AuthContext";
import { usePedidos } from "./usePedidos";
import { usePClientes } from "./usePClientes";

export const usePedidosRol = () => {
  const { usuario, isAdmin } = useAuth();

  const esAdmin = isAdmin();

  const pedidosData = usePedidos(esAdmin);
  const clientesData = usePClientes(
    usuario?.identificacion,
    usuario?.rol,
    !esAdmin,
  );

  return esAdmin ? pedidosData : clientesData;
};

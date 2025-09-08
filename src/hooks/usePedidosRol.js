import { useAuth } from "../Context/AuthContext";
import { usePedidos } from "./usePedidos";
import { usePClientes } from "./usePClientes";

export const usePedidosRol = () => {
  const { usuario, isAdmin } = useAuth();

  const token_type = usuario?.token_type;
  const access_token = usuario?.access_token;

  const esAdmin = isAdmin;

  const pedidosData = usePedidos(esAdmin, token_type, access_token);
  const clientesData = usePClientes(
    usuario?.usuario?.identificacion,
    usuario?.usuario?.rol,
    token_type,
    access_token,
    !esAdmin,
  );

  return esAdmin ? pedidosData : clientesData;
};

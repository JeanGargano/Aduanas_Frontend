import { useAuth } from "../Context/AuthContext.jsx";

export const useToken = () => {
  const { usuario } = useAuth();
  return { token_type: usuario.token_type, access_token: usuario.access_token };
};

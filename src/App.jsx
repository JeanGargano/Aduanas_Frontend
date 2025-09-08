import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
import PrivateRoutes from "./pages/Login/PrivateRoutes/PrivateRoutes.jsx";
import FinisherBackground from "./components/Bg/FinisherBackground.jsx";
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Login from './pages/Login/Login.jsx';
import MainDash from './pages/MainDash/MainDash.jsx';
import RightSide from './components/RightSide/RightSide.jsx';
import Pedidos from './pages/Pedidos/Pedidos.jsx';
import PedidoNuevo from './pages/PedidoNuevo/PedidoNuevo.jsx';
import PedidoEditar from './pages/PedidoEditar/PedidoEditar.jsx';
import PedidosCliente from './pages/PedidosCliente/PedidosCliente.jsx';
import Clientes from "./pages/Clientes/Clientes.jsx";
import ClienteNuevo from "./pages/ClienteNuevo/ClienteNuevo.jsx";
import ClientesEditar from "./pages/ClientesEditar/ClientesEditar.jsx";
import Analytics from "./pages/Analytics/Analytics.jsx";
import './App.css';


const Layout = ({ children }) => {

  const location = useLocation();
  const dynamicRoutePrefixes = [
    "/pedidos/editar/",
    "/pedidos/cliente/",
    "/clientes/editar/"
  ];

  const noColumnsRoutes = ["/pedidos", "/pedidos/crear", "/analytics", "/clientes", "/clientes/crear"];
  const isNoColumnsView =
    noColumnsRoutes.includes(location.pathname) ||
    dynamicRoutePrefixes.some((prefix) => location.pathname.startsWith(prefix));

  const noHiddenOverflowRoutes = ["/pedidos/crear", "/dashboard", "/pedidos", "/clientes", "/analytics"];
  const isNoHiddenOverflow =
    noHiddenOverflowRoutes.includes(location.pathname) ||
    dynamicRoutePrefixes.some((prefix) => location.pathname.startsWith(prefix));


  const getAppGlassClass = () => {
    let classes = ["AppGlass"];
    if (isNoColumnsView) classes.push("no-columns");
    if (isNoHiddenOverflow) classes.push("no-hidden-overflow");
    return classes.join(" ");
  };


  return (
    <div className="App">
      <div className={getAppGlassClass()}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
}

function App() {

  return (
    <AuthProvider>
      <Router>
        <FinisherBackground />

        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Login />} />

          {/* Rutas Privadas */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={
              <Layout>
                <MainDash />
                <RightSide />
              </Layout>
            } />
            <Route path="/pedidos" element={
              <Layout>
                <Pedidos />
              </Layout>
            } />
            <Route path="/pedidos/crear" element={
              <Layout>
                <PedidoNuevo />
              </Layout>
            } />
            <Route path="/pedidos/editar/:id" element={
              <Layout>
                <PedidoEditar />
              </Layout>
            } />
            <Route path="/pedidos/cliente/:id" element={
              <Layout>
                <PedidosCliente />
              </Layout>
            } />
            <Route path="/clientes" element={
              <Layout>
                <Clientes />
              </Layout>
            } />
            <Route path="/clientes/crear" element={
              <Layout>
                <ClienteNuevo />
              </Layout>
            } />
            <Route path="/clientes/editar/:id" element={
              <Layout>
                <ClientesEditar />
              </Layout>
            } />
            <Route path="/analytics" element={
              <Layout>
                <Analytics />
              </Layout>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
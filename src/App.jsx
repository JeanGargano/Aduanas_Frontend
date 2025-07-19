import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import FinisherBackground from "./components/Bg/FinisherBackground.jsx";
import Sidebar from './components/Sidebar/Sidebar.jsx';
import MainDash from './components/MainDash/MainDash.jsx';
import Pedidos from './components/Pedidos/Pedidos.jsx';
import PedidoNuevo from './components/PedidoNuevo/PedidoNuevo.jsx';
import PedidoEditar from './components/PedidoEditar/PedidoEditar.jsx';
import PedidosCliente from './components/Client/PedidosCliente/PedidosCliente.jsx';
import './App.css';


const Layout = ({ children }) => {

  const location = useLocation();
  const dynamicRoutePrefixes = [
    "/pedidos/editar/",
    "/pedidos/cliente/"
  ];
  const noColumnsRoutes = ["/pedidos", "/pedidos/crear", "/analytics"];
  const isNoColumnsView =
    noColumnsRoutes.includes(location.pathname) ||
    dynamicRoutePrefixes.some((prefix) => location.pathname.startsWith(prefix));

  const noHiddenOverflowRoutes = ["/pedidos/crear", "/dashboard", "/pedidos"];
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
    <Router>
      <FinisherBackground />

      <Routes>

        <Route path="/dashboard" element={
          <Layout>
            <MainDash />
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

      </Routes>

    </Router>
  )
}

export default App;
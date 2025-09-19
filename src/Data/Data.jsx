// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilChart,
  UilUsdSquare,
  UilMoneyWithdrawal,
} from "@iconscout/react-unicons";

//Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Inicio",
    link: "/dashboard",
    roles: ["Administrador", "Cliente"],
  },
  {
    icon: UilClipboardAlt,
    heading: "Pedidos",
    link: "/pedidos",
    roles: ["Administrador", "Cliente"],
  },
  {
    icon: UilUsersAlt,
    heading: "Clientes",
    link: "/clientes",
    roles: ["Administrador"],
  },
  {
    icon: UilChart,
    heading: "Analíticas",
    link: "/analiticas",
    roles: ["Administrador", "Cliente"],
  },
];

// función para calcular porcentaje sin NaN
const calcularPorcentaje = (parte, total) => {
  if (!total || total === 0) return 0;
  return ((parte / total) * 100).toFixed(0);
};


export const generarCardsPedidos = (resumen) => [
  {
    title: "Pedidos",
    color: {
      backGround: "linear-gradient(180deg, #E7423E 0%, 	#E7423E 100%)",
      boxShadow: "0px 10px 20px 0px #E7423E",
    },
    barValue: 100,
    value: `${resumen.cantidadTotalPedidos}`,
    png: UilUsdSquare,
    series: [
      {
        name: "Pedidos",
        data: resumen.seriesPedidos,
      },
    ],
  },
  {
    title: "Entregados",
    color: {
      backGround: "linear-gradient(180deg,#6E81A4 0%, #6E81A4 100%)",
      boxShadow: "0px 10px 20px 0px #6E81A4",
    },
    barValue: calcularPorcentaje(resumen.cantidadEntregados, resumen.cantidadTotalPedidos),
    value: `${resumen.cantidadEntregados}`,
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Entregados",
        data: resumen.seriesEntregados,
      },
    ],
  },
  {
    title: "En Proceso",
    color: {
      backGround: "linear-gradient(180deg, #052462 0%, #052462 100%)",
      boxShadow: "0px 10px 20px 0px #052462",
    },
    barValue: calcularPorcentaje(resumen.cantidadEnProceso, resumen.cantidadTotalPedidos),
    value: `${resumen.cantidadEnProceso}`,
    png: UilClipboardAlt,
    series: [
      {
        name: "En Proceso",
        data: resumen.seriesEnProceso,
      },
    ],
  },
];






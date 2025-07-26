// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilUsdSquare,
  UilMoneyWithdrawal,
} from "@iconscout/react-unicons";
import { minWidth, width } from "@mui/system";
import { Link } from "react-router-dom";

//Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
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
    icon: UilPackage,
    heading: "Nuevo Pedido",
    link: "/pedidos/crear",
    roles: ["Administrador"],
  },
  {
    icon: UilChart,
    heading: "Analytics",
    link: "/analytics",
    roles: ["Administrador", "Cliente"],
  },
];

export const cardsData = [
  {
    title: "Pedidos",
    color: {
      backGround: "linear-gradient(180deg, #E7423E 0%, 	#E7423E 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 99,
    value: "120",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Entregados",
    color: {
      backGround: "linear-gradient(180deg, #535ac8 0%, #535ac8 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 40,
    value: "40",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Procesos Activos",
    color: {
      backGround: "linear-gradient(180deg,#6E81A4 0%, #6E81A4 100%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "80",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

export const UpdatesData = [
  {
    name: "Andrew Thomas",
    noti: "El estado de su pedido ha cambiado a Entregado.",
    time: "25 seconds ago",
  },
  {
    name: "James Bond",
    noti: "El estado de su pedido ha cambiado a Enviado.",
    time: "30 minutes ago",
  },
  {
    name: "Iron Man",
    noti: "El estado de su pedido ha cambiado a Recibido.",
    time: "2 hours ago",
  },
];



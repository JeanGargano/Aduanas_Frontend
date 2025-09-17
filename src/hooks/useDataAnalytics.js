export const useAnalyticsData = () => {
  const datos = localStorage.getItem("cache_pedidos");
  const parsed = datos ? JSON.parse(datos) : {};

  const cantidadTotalPedidos = parsed.cantidadTotalPedidos || 0;
  const cantidadEntregados = parsed.cantidadEntregados || 0;
  const cantidadEnProceso = parsed.cantidadEnProceso || 0;
  const cantidadEnPuerto = parsed.cantidadEnPuerto || 0;
  const cantidadRegistrados = parsed.cantidadRegistrados || 0;
  const cantidadTotalSinEntregados = parsed.cantidadTotalSinEntregados || 0;

  const seriesEnPuerto = parsed.seriesEnPuerto || [];
  const seriesPedidos = parsed.seriesPedidos || [];
  const seriesRegistrados = parsed.seriesRegistrados || [];
  const seriesEntregados = parsed.seriesEntregados || [];
  const seriesEnProceso = parsed.seriesEnProceso || [];
  const seriesEnProcesoGeneral = parsed.seriesEnProcesoGeneral || [];

  // Usuarios
  const datosUsuarios = localStorage.getItem("usuarios_resumen");
  const parsedUsuarios = datosUsuarios ? JSON.parse(datosUsuarios) : {};
  const cantidadTotalUsuarios = parsedUsuarios.cantidadTotalUsuarios || 0;

  const dataUsuarios = [
    { name: "Usuarios", cantidad_usuarios: cantidadTotalUsuarios },
  ];

  // Generar días (para LineChart)
  const hoy = new Date();
  const dias = [];
  for (let i = 29; i >= 0; i--) {
    const fecha = new Date();
    fecha.setDate(hoy.getDate() - i);
    dias.push(fecha.toISOString()); // formato ISO
  }

  // Configuración del gráfico de líneas
  const options = {
    chart: { id: "basic-line" },
    colors: ["#052462", "#E7423E"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      type: "datetime",
      categories: dias,
      labels: {
        rotate: -90,
        rotateAlways: true,
        maxHeight: 120,
        offsetY: -10,
      },
    },
    legend: { height: 40 },
    tooltip: { x: { format: "dd/MM/yy" } },
  };

  const series = [
    { name: "Pedidos En Progreso", data: seriesEnProcesoGeneral },
    { name: "Pedidos Completados", data: seriesEntregados },
  ];

  // Generador de data por estado para BarChart
  const getDataByEstado = (estado) => {
    let series = [];
    if (estado === "EN PUERTO") series = seriesEnPuerto;
    else if (estado === "ENTREGADOS") series = seriesEntregados;
    else if (estado === "EN PROCESO") series = seriesEnProceso;
    else if (estado === "REGISTRADO") series = seriesRegistrados;
    else if (estado === "GENERAL") series = seriesEnProcesoGeneral;
    else series = seriesPedidos;

    // Formatear días para las barras
    const opciones = { month: "short", day: "2-digit" };
    const diasFormateados = dias.map((iso) => {
      const fecha = new Date(iso);
      return fecha
        .toLocaleDateString("es-CO", opciones)
        .replace(" de ", " ")
        .replace(" ", "-")
        .replace(/^./, (c) => c.toUpperCase());
    });

    return diasFormateados.map((dia, i) => ({
      name: dia,
      cantidad: series[i] || 0,
    }));
  };

  return {
    cantidadTotalPedidos,
    cantidadEntregados,
    cantidadEnProceso,
    cantidadEnPuerto,
    cantidadRegistrados,
    dataUsuarios,
    options,
    series,
    seriesPedidos,
    seriesEntregados,
    seriesEnProceso,
    seriesEnPuerto,
    seriesRegistrados,
    getDataByEstado,
    cantidadTotalSinEntregados,
  };
};

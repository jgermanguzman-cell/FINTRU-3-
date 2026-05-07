// ==========================================
// POLICÍA DE TRÁNSITO: ENRUTA LOS EVENTOS
// ==========================================
function onEdit(e) {
  if (!e) return;
  const range = e.range;
  const sheetName = range.getSheet().getName();
  const columna = range.getColumn();
  const fila = range.getRow();

  // 1. DELEGAR FECHAS (TIMESTAMPS)
  // Ignoramos encabezados o selecciones múltiples para las fechas
  if (fila > 1 && range.getHeight() === 1 && range.getWidth() === 1) {
    ejecutarTimestamps(e, sheetName, fila, columna);
  }

  // 2. DELEGAR FORMATOS DE MONEDA
  const hojasConMoneda = ["Cuentas", "Tarjetas", "Deudas", "Movimientos", "Presupuesto", "Metas"];
  if (hojasConMoneda.includes(sheetName) && columna >= 4) {
    aplicarFormatosMonedaFintru();
  }

  // Revisar si se cambió la moneda global
  try {
    const rangoGlobal = e.source.getRangeByName('conf_MonedaGlobal');
    if (rangoGlobal && range.getA1Notation() === rangoGlobal.getA1Notation()) {
      aplicarFormatosMonedaFintru();
    }
  } catch (err) {
    // Falla silenciosa si no existe el rango
  }
}

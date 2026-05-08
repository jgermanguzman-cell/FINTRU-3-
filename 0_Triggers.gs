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
  if (fila > 1 && range.getHeight() === 1 && range.getWidth() === 1) {
    ejecutarTimestamps(e, sheetName, fila, columna);
  }

  // 2. DELEGAR FORMATOS DE MONEDA
  const hojasConMoneda = ["Cuentas", "Tarjetas", "Deudas", "Movimientos", "Presupuesto", "Metas"];
  if (hojasConMoneda.includes(sheetName) && columna >= 4) {
    aplicarFormatosMonedaFintru();
  }

  try {
    const rangoGlobal = e.source.getRangeByName('conf_MonedaGlobal');
    if (rangoGlobal && range.getA1Notation() === rangoGlobal.getA1Notation()) {
      aplicarFormatosMonedaFintru();
    }
  } catch (err) {}

  // 3. DELEGAR VALIDACIONES DEPENDIENTES (Naturaleza → Categoría → Etiqueta)
  if (fila > 1 && range.getHeight() === 1 && range.getWidth() === 1) {
    ejecutarValidacionesDependientes(e, sheetName, fila, columna);
  }
}

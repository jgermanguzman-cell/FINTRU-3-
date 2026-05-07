// ==========================================
// MÓDULO: MARCAS DE TIEMPO AUTOMÁTICAS
// ==========================================
function ejecutarTimestamps(e, sheetName, fila, columna) {
  const sheet = e.range.getSheet();
  const fechaActual = new Date();
  const formatoFecha = "dd/MM/yyyy HH:mm:ss";

  // Mapeo lógico de columnas: [Columna Editada, Columna Destino]
  if (sheetName === "Cuentas" && columna === 5) { 
    sheet.getRange(fila, 6).setValue(fechaActual).setNumberFormat(formatoFecha);
  } 
  else if (sheetName === "Tarjetas") {
    if (columna === 5) sheet.getRange(fila, 6).setValue(fechaActual).setNumberFormat(formatoFecha); 
    else if (columna === 9) sheet.getRange(fila, 10).setValue(fechaActual).setNumberFormat(formatoFecha); 
    else if (columna === 13) sheet.getRange(fila, 14).setValue(fechaActual).setNumberFormat(formatoFecha); 
  } 
  else if (sheetName === "Deudas" && columna === 5) { 
    sheet.getRange(fila, 6).setValue(fechaActual).setNumberFormat(formatoFecha);
  }
}

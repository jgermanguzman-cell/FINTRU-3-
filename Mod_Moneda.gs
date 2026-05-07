// ==========================================
// MÓDULO: FORMATOS Y DIVISAS
// ==========================================
function aplicarFormatosMonedaFintru() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let monedaGlobal = "COP";
  
  try {
    monedaGlobal = ss.getRangeByName('conf_MonedaGlobal').getValue();
  } catch (e) {
    console.log("No se encontró conf_MonedaGlobal, usando COP por defecto");
  }

  const formatos = {
    'COP': '"$"#,##0',
    'USD': '"$"#,##0.00',
    'EUR': '"€"#,##0.00',
    'MXN': '"$"#,##0.00'
  };
  const formatoGlobal = formatos[monedaGlobal] || '"$"#,##0.00';

  const configuracion = [
    ['Cuentas', 4, [5, 7], [8]],               
    ['Tarjetas', 4, [5, 7, 9, 11, 13, 15, 26], [8, 12, 16, 27]], 
    ['Deudas', 4, [5, 7, 9], [8]],
    ['Metas', 5, [4, 10, 13], [12]],           
    ['Movimientos', 10, [3], [11]],
    ['Presupuesto', 10, [3], [11]]
  ];

  configuracion.forEach(conf => {
    const hoja = ss.getSheetByName(conf[0]);
    if (!hoja) return;
    const ultimaFila = hoja.getLastRow();
    if (ultimaFila < 2) return;

    const datosMoneda = hoja.getRange(2, conf[1], ultimaFila - 1).getValues();
    datosMoneda.forEach((fila, i) => {
      const monedaFila = fila[0];
      const formatoLocal = formatos[monedaFila] || '"$"#,##0.00';
      const numFila = i + 2;
      conf[2].forEach(col => hoja.getRange(numFila, col).setNumberFormat(formatoLocal));
    });
    conf[3].forEach(col => hoja.getRange(2, col, ultimaFila - 1).setNumberFormat(formatoGlobal));
  });
}

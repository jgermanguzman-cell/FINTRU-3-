// ==========================================
// MÓDULO: VALIDACIONES DEPENDIENTES
// Presupuesto: Naturaleza → Categoría → Etiqueta
// Fuente: tbl_EtiquetasRelacionales (col 1=Naturaleza, 2=Categoría, 3=Etiqueta)
// ==========================================

function ejecutarValidacionesDependientes(e, sheetName, fila, columna) {
  console.log("VALIDACIONES — hoja:", sheetName, "col:", columna);
  if (sheetName !== "Presupuesto") return;
  if (columna !== 13 && columna !== 14) return;
  console.log("Pasó filtros — leyendo tabla");

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = e.range.getSheet();
  const tbl = ss.getRangeByName('tbl_EtiquetasRelacionales').getValues();

  if (columna === 13) {
    hoja.getRange(fila, 14).clearContent().clearDataValidations();
    hoja.getRange(fila, 15).clearContent().clearDataValidations();

    const naturaleza = e.range.getValue();
    console.log("Naturaleza:", naturaleza);
    if (!naturaleza) return;

    const categorias = [...new Set(
      tbl.filter(r => r[0] === naturaleza && r[1] !== "").map(r => r[1])
    )];
    console.log("Categorías:", JSON.stringify(categorias));
    if (categorias.length === 0) return;

    hoja.getRange(fila, 14).setDataValidation(
      SpreadsheetApp.newDataValidation()
        .requireValueInList(categorias, true)
        .setAllowInvalid(false)
        .build()
    );

    if (categorias.length === 1) {
      hoja.getRange(fila, 14).setValue(categorias[0]);
      _aplicarValidacionEtiqueta(hoja, fila, tbl, naturaleza, categorias[0]);
    }
  }

  if (columna === 14) {
    hoja.getRange(fila, 15).clearContent().clearDataValidations();

    const naturaleza = hoja.getRange(fila, 13).getValue();
    const categoria = e.range.getValue();
    console.log("Categoría seleccionada:", categoria, "Naturaleza:", naturaleza);
    if (!naturaleza || !categoria) return;

    _aplicarValidacionEtiqueta(hoja, fila, tbl, naturaleza, categoria);
  }
}

function _aplicarValidacionEtiqueta(hoja, fila, tbl, naturaleza, categoria) {
  const etiquetas = tbl
    .filter(r => r[0] === naturaleza && r[1] === categoria && r[2] !== "")
    .map(r => r[2]);

  console.log("Etiquetas:", JSON.stringify(etiquetas));
  if (etiquetas.length === 0) return;

  hoja.getRange(fila, 15).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(etiquetas, true)
      .setAllowInvalid(false)
      .build()
  );

  if (etiquetas.length === 1) {
    hoja.getRange(fila, 15).setValue(etiquetas[0]);
  }
}

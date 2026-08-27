/* =========================================================================
   MENESTER — Registre d'avaluacions a Google Sheets
   Codi de Google Apps Script (Web App)

   COM INSTAL·LAR-HO (instruccions completes al fitxer INSTRUCCIONS-BACKEND.md):
   1. Crea un full de càlcul nou a Google Sheets.
   2. Menú Extensions → Apps Script.
   3. Esborra el contingut i enganxa AQUEST fitxer sencer.
   4. Desa i fes Implementa → Nova implementació → Aplicació web.
      - "Executa com a": Jo mateix
      - "Qui hi té accés": Qualsevol
   5. Copia la URL del web app i posa-la a src/MENESTER.jsx (CONFIG.endpoint).
   ========================================================================= */

// Ordre i noms de les columnes. Si n'afegeixes, posa-les també aquí.
var COLUMNES = [
  "data",
  "institucio",
  "global",
  "context",
  "OBRIR",
  "CONNECTAR",
  "COCREAR",
  "EXPERIMENTAR",
  "ARRELAR",
];

function doPost(e) {
  try {
    var dades = JSON.parse(e.postData.contents);
    var full = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Si el full és buit, escriu la capçalera primer.
    if (full.getLastRow() === 0) {
      full.appendRow(COLUMNES);
    }

    // Construeix la fila SEGONS els noms de columna (no per posició).
    // Així l'ordre de les columnes mai no descol·loca les dades.
    var fila = COLUMNES.map(function (col) {
      if (col === "data") {
        return dades.data || new Date().toISOString();
      }
      var valor = dades[col];
      return valor === undefined || valor === null ? "" : valor;
    });

    full.appendRow(fila);

    return resposta({ ok: true });
  } catch (err) {
    return resposta({ ok: false, error: String(err) });
  }
}

// Permet comprovar al navegador que el web app està viu.
function doGet() {
  return resposta({ ok: true, missatge: "MENESTER backend actiu" });
}

function resposta(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}


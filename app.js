import { fillForm } from "./pdfLib.js";
import XLSX from "xlsx";
import fs from "fs";

function leerDatosDesdeExcel(ruta, evento) {
  var workbook = XLSX.readFile(ruta);
  var workbookSheets = workbook.SheetNames;

  workbookSheets.map(function (sheet) {
    //Chequeo que exista la carpeta /Certificados/NombreSheet y si no existe la creo
    var dir = "./Certificados/" + sheet;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    //Convierto la hoja en json y se ejecuta el llenado y guardado de pdf
    var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    data.map(function (record) {
      fillForm(record.Nombre + " " + record.Apellido, evento, sheet);
    });
  });
}
leerDatosDesdeExcel("BD.xlsx", "carefaBsAs");

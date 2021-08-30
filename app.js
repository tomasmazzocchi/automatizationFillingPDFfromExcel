import { fillForm } from "./pdfLib.js";
import XLSX from "xlsx";
import fs from "fs";
import capitalize from "capitalize";

function leerDatosDesdeExcel(ruta, evento) {
  var workbook = XLSX.readFile(ruta);
  var workbookSheets = workbook.SheetNames;

  workbookSheets.forEach(function (sheet) {
    //Chequeo que exista la carpeta /Certificados/NombreSheet y si no existe la creo
    console.log("Creando pdf's de hoja " + sheet);
    var dir = "./Certificados/" + sheet;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    //Convierto la hoja en json y se ejecuta el llenado y guardado de pdf
    var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    data.forEach(function (record) {
      try {
        var nombreCompleto = capitalize.words(record.NombreApellido);
        fillForm(nombreCompleto, evento).then((bytes) => {
          //Guardo PDF
          fs.writeFileSync(
            "./Certificados/" +
              sheet +
              "/" +
              nombreCompleto +
              " - Certificado.pdf",
            bytes
          );
        });
      } catch (e) {
        console.log(e);
      }
    });
  });
}
leerDatosDesdeExcel("BD.xlsx", "Cleveland Clinic");

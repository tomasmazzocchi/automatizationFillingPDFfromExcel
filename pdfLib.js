import pdfLib from "pdf-lib";
import fs from "fs";
const { PDFDocument } = pdfLib;

async function fillForm(nombreCompleto, evento) {
  var formPdfBytes = fs.readFileSync(evento + ".pdf");

  var pdfDoc = await PDFDocument.load(formPdfBytes);

  var form = pdfDoc.getForm();

  var nameField = form.getTextField("nombreApellido");
  nameField.setText(nombreCompleto);

  form.flatten();

  var pdfBytes = await pdfDoc.save();

  return pdfBytes;
}

export { fillForm };

import pdfLib from "pdf-lib";
import fs from "fs";
const { PDFDocument } = pdfLib;

async function fillForm(nombreCompleto, evento, sheet) {
  const formPdfBytes = fs.readFileSync(evento + ".pdf");

  const pdfDoc = await PDFDocument.load(formPdfBytes);

  const form = pdfDoc.getForm();

  const nameField = form.getTextField("nombreApellido");
  nameField.setText(nombreCompleto);

  form.flatten();

  const pdfBytes = await pdfDoc.save();

  //Guardo PDF
  fs.writeFileSync(
    "./Certificados/" + sheet + "/" + nombreCompleto + " - Certificado.pdf",
    pdfBytes
  );
}

export { fillForm };

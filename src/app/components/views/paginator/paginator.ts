import { Component } from '@angular/core';


// usar EXCEL
import * as XLSX from 'xlsx';

import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable'
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-paginator',
  imports: [MatTabsModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  pdfUrl: SafeResourceUrl;

constructor(private sanitizer: DomSanitizer){
    const url = 'https://tec.mx/sites/default/files/repositorio/TestPDF.pdf?srsltid=AfmBOopm176jrTnoszR3fuShjp-3thbK15l82Qbc3Brlj51GqjAmmIKv';
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
generarTablaPDF() {
const doc = new jsPDF()

// It can parse html:
// <table id="my-table"><!-- ... --></table>
autoTable(doc, { html: '#my-table' })

// Or use javascript directly:
autoTable(doc, {
  head: [['Name', 'Email', 'Country']],
  body: [
    ['David', 'david@example.com', 'Sweden'],
    ['Castille', 'castille@example.com', 'Spain'],
    // ...
  ],
})

doc.save('table.pdf')
}

  previsualizarPDF() {
    const doc = new jsPDF();

    // Añadir texto al PDF
    doc.text("¡Este es un PDF que puedes previsualizar antes de guardar!", 20, 30);

    // Abrir el PDF en una nueva ventana
    const pdfOutput = doc.output('bloburl'); // Genera una URL de tipo Blob
    window.open(pdfOutput, '_blank'); // Abre en una nueva ventana
  }

   generarPDF() {
    // Crear una nueva instancia de jsPDF
    const doc = new jsPDF();

    // Añadir texto al PDF
    doc.text("¡Hola, este es un PDF generado en Angular!", 20, 30);

    // Guardar el PDF con un nombre
    doc.save('archivo.pdf');
  }

  onFileChange(event: any) {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.readAsBinaryString(file);

  reader.onload = (e: any) => {
    const binaryData = e.target.result;

    const workbook = XLSX.read(binaryData, { type: 'binary' });

    // Primera hoja
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convertir a JSON
    const data = XLSX.utils.sheet_to_json(sheet);

    console.log(data);
  };
}
}

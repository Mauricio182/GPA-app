import {ChangeDetectionStrategy, Component, inject, ViewChild} from '@angular/core';

// usar EXCEL
import * as XLSX from 'xlsx';

import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable'
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TableViewer } from '../table-viewer/table-viewer';
import { Navbar } from '../../navbar/navbar';
import { Progresbar } from '../../progresbar/progresbar';
import { TableTurnover } from '../table-turnover/table-turnover';
import { NgIf } from '@angular/common';
import { Http } from '../../../services/http';
import {MatDialog} from '@angular/material/dialog';
import { NewAdvisorForm } from '../../new-advisor-form/new-advisor-form';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-paginator',
  imports: [MatTabsModule, TableViewer,Navbar, TableTurnover, NgIf],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  pdfUrl: SafeResourceUrl;
  public lastEmploysXlsData: any[]= []
  public currentEmploysXlsData: any[]= []
  public turnOverEmployeeXlsData: any[]= []
  public calculado: boolean = false
  readonly dialog = inject(MatDialog);
  steps:number = 1
 @ViewChild('tableViewerturnover') tableViewer!: TableTurnover;

 currentUserRol:any
 
constructor(private sanitizer: DomSanitizer, private _http:Http, private _auth:AuthService){
    const url = 'https://tec.mx/sites/default/files/repositorio/TestPDF.pdf?srsltid=AfmBOopm176jrTnoszR3fuShjp-3thbK15l82Qbc3Brlj51GqjAmmIKv';
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.currentUserRol = this._auth.currentUser.puesto
    console.log(this.currentUserRol)
}

  openDialog() {
  this.dialog.open(NewAdvisorForm, {
    disableClose: true  // ❌ esto bloquea el click fuera y ESC
  });
}

    closeDialog() {
    this.dialog.closeAll()
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

   // console.log(data);
    this.lastEmploysXlsData= data
       this.steps = 2
  };
}

  onFileChange2(event: any) {
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

   // console.log(data);
    this.currentEmploysXlsData= data
    this.steps = 3
  };
}


calcTurnOver(): any[] {
  const curpsLista1 = new Set(this.lastEmploysXlsData.map(emp => emp["Empleado"]));


  ///////// demo
const turnOverObj: any = {};
this.turnOverEmployeeXlsData.forEach(emp => {
  // usa el número de empleado como clave
  turnOverObj[emp["Empleado"]] = emp;
});
///////// demo


  const turnOver = this.currentEmploysXlsData.filter(
    emp => !curpsLista1.has(emp["Empleado"])
  );

  console.log('Altas detectadas:', turnOver);
  this.turnOverEmployeeXlsData = turnOver

  this.tableViewer.updateGrid(turnOver)
     
      console.log('step3')
      this.calculado=true

// ////////codigo demo

// this._http.crearPost(turnOverObj).subscribe({
//     next: (res) => {
//       console.log('Empleado creado correctamente', res);
//       // res.name contiene el ID generado por Firebase
//     },
//     error: (err) => {
//       console.error('Error al crear empleado', err);
//     }
//   });

// ////////codigo demo

  return this.turnOverEmployeeXlsData;
}
}

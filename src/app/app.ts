import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AllCommunityModule, ModuleRegistry, SideBarDef } from 'ag-grid-community';

import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

//para el ag enterprice
import { AllEnterpriseModule } from 'ag-grid-enterprise';
ModuleRegistry.registerModules([AllEnterpriseModule]);

import {MatTabsModule} from '@angular/material/tabs';
/// <reference types="jspdf-autotable" /> 

// usar EXCEL
import * as XLSX from 'xlsx';

import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AgGridAngular, MatTabsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GPA-app');

    rowData = [
    { make: 'KIA', model: 'K3', price: 35000, electric: false },
    { make: 'Ford', model: 'Mondeo', price: 32000, electric: true },
    { make: 'Porsche', model: 'Boxster', price: 72000, electric: true },
  ];

  colDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ];
defaultColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true,
  sortable: true,
  filter: true    // <-- Esto activa filtros en TODAS las columnas
};

  sideBar = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
    }
  ],
  defaultToolPanel: ''
};

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
}

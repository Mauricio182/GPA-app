import { Component, Input, SimpleChanges } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Http } from '../../../services/http';
import { AuthService } from '../../../services/auth';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table-turnover',
  imports: [AgGridAngular, MatButtonModule],
  templateUrl: './table-turnover.html',
  styleUrls: ['./table-turnover.css'],
})
export class TableTurnover {
  @Input() turnOverEmployee: any[] = [];

  private gridApi: any;
  private gridColumnApi: any;

  rowData: any[] = [];
  colDefs: any[] = [];

  constructor(private _http:Http, private _auth:AuthService) {}

  ngOnInit(): void {}

  private fieldMap: { [key: string]: string } = {
    'Nombre Depto.': 'nombreDepto',
    'Nombre Puesto': 'nombrePuesto',
    'F. Ingreso': 'fIngreso',
    'Reg. Patronal': 'regPatronal',
    'S. Diario': 'sDiario',
    'S. Laboral': 'sLaboral',
    'S. Mensual': 'sMensual',
    'Saldo Plan de Ahorro': 'saldoAhorro',
  };

  private headerMap: { [key: string]: string } = {
    nombreDepto: 'Nombre Depto.',
    nombrePuesto: 'Nombre Puesto',
    fIngreso: 'F. Ingreso',
    regPatronal: 'Reg. Patronal',
    sDiario: 'S. Diario',
    sLaboral: 'S. Laboral',
    sMensual: 'S. Mensual',
    saldoAhorro: 'Saldo Plan de Ahorro',
  };


  defaultColDef = {
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true,
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
      },
    ],
    defaultToolPanel: '',
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['turnOverEmployee']) {
      if (this.turnOverEmployee && this.turnOverEmployee.length) {
        this.updateGrid(this.turnOverEmployee);
      } else {
        this.clearGrid();
      }
    }
  }

  updateGrid(data: any[]) {
  if (!data || !data.length) return;

  // Crear nueva referencia de rowData con campos limpios
  this.rowData = data.map(emp => {
    const newObj: any = {};
    Object.keys(emp).forEach(key => {
      // Usar fieldMap si existe, sino el mismo key
      const field = this.fieldMap[key] || key;
      newObj[field] = emp[key];
    });
    return newObj;
  });

  // Generar columnas usando headerMap si existe, sino formatear
  this.colDefs = Object.keys(this.rowData[0]).map(key => ({
    field: key,
    headerName: this.headerMap[key] || this.formatHeaderName(key),
  }));

  // Si ya tienes gridApi, actualizar la grilla
  if (this.gridApi) {
    // this.gridApi.setColumnDefs(this.colDefs);
    // this.gridApi.setRowData(this.rowData);
    // this.autoSizeColumns();
  }

  console.log('Tabla cols:', this.colDefs);
  console.log('Tabla rows:', this.rowData);



console.warn('lo que mandamos bien:', this.rowData)


}

////////codigo demo

sendTableToDB(){
  console.warn('empresa:', this.rowData[0])
    console.warn('array:', this.rowData)

  this._http.crearPost(
    {
      asesor:  `${this._auth.currentUser.nombre} ${this._auth.currentUser.apellido} `,
      puesto: this._auth.currentUser.puesto,
      cliente:this.rowData.length > 0 ? this.rowData[0]["Nombre Empresa"] : '',
      fecha: new Date(),
      altas_bajas: this.rowData
    }
  ).subscribe({
    next: (res) => {
      console.log('Empleado creado correctamente', res);
      // res.name contiene el ID generado por Firebase
    },
    error: (err) => {
      console.error('Error al crear empleado', err);
    }
  });
}



////////codigo demo

  clearGrid() {
    this.rowData = [];
    this.colDefs = [];
    if (this.gridApi) {
      this.gridApi.setRowData([]);
      this.gridApi.setColumnDefs([]);
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.rowData.length) {
      this.gridApi.setColumnDefs(this.colDefs);
      this.gridApi.setRowData(this.rowData);
      this.autoSizeColumns();
    }
  }

  private autoSizeColumns() {
    if (!this.gridColumnApi) return;

    const allColumnIds: string[] = [];
    this.gridColumnApi.getAllColumns()?.forEach((col: any) =>
      allColumnIds.push(col.getId())
    );
    this.gridColumnApi.autoSizeColumns(allColumnIds, true);
  }

  // Opcional: formatea las cabeceras para que se vean legibles
  private formatHeaderName(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1') // separa mayúsculas con espacio
      .replace(/^./, (str) => str.toUpperCase()) // primera letra en mayúscula
      .trim();
  }

exportPDF() {
  if (!this.rowData || !this.rowData.length || !this.colDefs || !this.colDefs.length) {
    console.warn('No hay datos para exportar');
    return;
  }

  // Crear PDF horizontal A2
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a2',
  });

  // Cargar logo desde public/img
  const logo = new Image();
  logo.src = '/img/Gp_logo.png'; // ruta relativa desde public

  logo.onload = () => {
    // Agregar logo
    doc.addImage(logo, 'PNG', 40, 20, 100, 50);

    // Título
    doc.setFontSize(16);
    doc.text('Reporte de Altas y Bajas', 160, 50);

    // Headers y body
    const headers = this.colDefs.map(c => c.headerName || c.field);
    const body = this.rowData.map(row =>
      this.colDefs.map(c => row[c.field] ?? '')
    );

    // Generar tabla
    autoTable(doc, {
      startY: 80, // espacio debajo del logo y título
      head: [headers],
      body: body,
      styles: {
        fontSize: 9,
        cellPadding: 4,
        overflow: 'linebreak', // divide texto largo en varias líneas
        valign: 'middle',
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        halign: 'center',
      },
      columnStyles: headers.reduce((acc, _, idx) => {
        acc[idx] = { cellWidth: 'wrap', halign: 'center' };
        return acc;
      }, {} as any),
      theme: 'striped',
      showHead: 'everyPage', // repetir encabezados en cada página
      pageBreak: 'auto',     // permite cortar filas automáticamente
      margin: { top: 80, bottom: 40 }, // espacio superior e inferior
    });

    // Guardar PDF
    doc.save('reporte_aggrid_logo.pdf');
    console.log('PDF generado correctamente con logo');
  };

  logo.onerror = () => {
    console.error('No se pudo cargar el logo desde /img/Gp_logo.png');
  };
}


// exportPDF() {

// ;

//   if (!this.rowData || !this.rowData.length || !this.colDefs || !this.colDefs.length) {
//     console.warn('No hay datos para exportar');
//     return;
//   }

//   const doc = new jsPDF({
//     orientation: 'landscape',
//     unit: 'pt',
//     format: 'a2',
//   });



//   doc.setFontSize(16);
//   doc.text('Reporte de Altas y Bajas', 40, 40);

//   const headers = this.colDefs.map(col => col.headerName || col.field);

//   const body = this.rowData.map(row =>
//     this.colDefs.map(col => row[col.field] !== undefined ? row[col.field] : '')
//   );

//   autoTable(doc, {
//     startY: 60, // deja espacio para el título
//     head: [headers],
//     body: body,
//     styles: {
//       fontSize: 9,
//       cellPadding: 4,
//       overflow: 'linebreak', // divide texto largo en varias líneas
//       valign: 'middle',
//     },
//     headStyles: {
//       fillColor: [22, 160, 133],
//       textColor: 255,
//       halign: 'center',
//     },
//     columnStyles: headers.reduce((acc, _, idx) => {
//       acc[idx] = { cellWidth: 'wrap', halign: 'center' }; // ancho automático y centrado
//       return acc;
//     }, {} as any),
//     theme: 'striped',
//     showHead: 'everyPage', // repetir encabezados en cada página
//     pageBreak: 'auto',     // permite cortar filas automáticamente
//     margin: { top: 60, bottom: 40 } // espacio superior e inferior
//   });

//   // Guardar PDF
//   doc.save('reporte_aggrid_horizontal_a3.pdf');
//   console.log('PDF generado correctamente en A3 horizontal');
// }



// exportPDF() {
//   if (!this.rowData || !this.rowData.length || !this.colDefs || !this.colDefs.length) {
//     console.warn('No hay datos para exportar');
//     return;
//   }

//   const doc = new jsPDF({
//     orientation: 'landscape',
//     unit: 'pt',
//     format: 'a3',
//   });

//   doc.setFontSize(16);
//   doc.text('Reporte de Altas y Bajas', 40, 40);

//   const MAX_COLS_PER_BLOCK = 8;
//   let startIndex = 0;

//   while (startIndex < this.colDefs.length) {
//     const blockCols = this.colDefs.slice(startIndex, startIndex + MAX_COLS_PER_BLOCK);

//     const headers = blockCols.map(c => c.headerName || c.field);
//     const body = this.rowData.map(row =>
//       blockCols.map(c => row[c.field] !== undefined ? row[c.field] : '')
//     );

//     const startY = startIndex === 0 ? 60 : (doc as any).lastAutoTable.finalY + 20;

//     autoTable(doc, {
//       startY: startY,
//       head: [headers],
//       body: body,
//       styles: {
//         fontSize: 9,
//         cellPadding: 4,
//         overflow: 'linebreak',
//         valign: 'middle',
//       },
//       headStyles: {
//         fillColor: [22, 160, 133],
//         textColor: 255,
//         halign: 'center',
//       },
//       columnStyles: headers.reduce((acc, _, idx) => {
//         acc[idx] = { cellWidth: 'wrap', halign: 'center' };
//         return acc;
//       }, {} as any),
//       theme: 'striped',
//       showHead: 'everyPage',
//       pageBreak: 'auto',
//     });

//     startIndex += MAX_COLS_PER_BLOCK;
//   }

//   doc.save('reporte_aggrid_completo.pdf');
//   console.log('PDF completo generado correctamente');
// }

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

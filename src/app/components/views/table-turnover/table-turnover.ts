import { Component, Input, SimpleChanges } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Http } from '../../../services/http';

@Component({
  selector: 'app-table-turnover',
  imports: [AgGridAngular],
  templateUrl: './table-turnover.html',
  styleUrls: ['./table-turnover.css'],
})
export class TableTurnover {
  @Input() turnOverEmployee: any[] = [];

  private gridApi: any;
  private gridColumnApi: any;

  rowData: any[] = [];
  colDefs: any[] = [];
  
  constructor(private _http:Http) {}

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

  this._http.crearPost(this.rowData).subscribe({
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
}
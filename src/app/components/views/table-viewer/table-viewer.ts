import { Component, Input, SimpleChanges, viewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Http } from '../../../services/http';

@Component({
  selector: 'app-table-viewer',
  imports: [AgGridAngular],
  templateUrl: './table-viewer.html',
  styleUrl: './table-viewer.css',
})
export class TableViewer {
  @Input() lastEmploys: any[] = [];
  @Input() currentEmploys: any[] = [];
  @Input() turnOverEmployee: any[] = [];

  
  colDefs: any[] = [];
  rowData: any[] = [];

  constructor(private _http:Http) {}

  ngOnInit(): void {}

postEmpleado() {
  this._http.crearPost({
    nombre: 'Mauricio',
    edad: 34,
    id: "121212121"
  }).subscribe({
    next: (res) => {
      console.log('Empleado creado correctamente', res);
      // res.name contiene el ID generado por Firebase
    },
    error: (err) => {
      console.error('Error al crear empleado', err);
    }
  });
}
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

  ngOnChanges(changes: SimpleChanges) {
    this.setRowColsForlastEmploys(changes);
    this.setRowColsForCurrentEmploys(changes);
  }

  setRowColsForlastEmploys(changes: SimpleChanges) {
    if (changes['lastEmploys'] && this.lastEmploys?.length) {
      this.rowData = this.lastEmploys.map((emp) => {
        const newObj: any = {};
        Object.keys(emp).forEach((key) => {
          const field = this.fieldMap[key] || key;
          newObj[field] = emp[key];
        });
        return newObj;
      });

      this.colDefs = Object.keys(this.rowData[0]).map((key) => ({
        field: key,
        headerName: this.headerMap[key] || key,
      }));
     // console.warn('empleados semana pasada', this.lastEmploys);
    }
        console.log('Tabla cols:', this.colDefs);
    console.log('Tabla rows:', this.rowData);
  }


  public updateGrid(data: any[]) {
    if (!data || !data.length) {
      this.rowData = [];
      this.colDefs = [];
      return;
    }

    // Crear nuevas referencias para que Angular detecte el cambio
    this.rowData = [...data];

    // Generar columnas automáticamente según las claves del primer objeto
    this.colDefs = Object.keys(data[0]).map(key => ({
      field: key,
      headerName: key, // aquí puedes poner nombres más amigables si quieres
    }));

    console.log('Tabla cols:', this.colDefs);
    console.log('Tabla rows:', this.rowData);

  }


    setRowColsForCurrentEmploys(changes: SimpleChanges) {
    if (changes['currentEmploys'] && this.currentEmploys?.length) {
      this.rowData = this.currentEmploys.map((emp) => {
        const newObj: any = {};
        Object.keys(emp).forEach((key) => {
          const field = this.fieldMap[key] || key;
          newObj[field] = emp[key];
        });
        return newObj;
      });

      this.colDefs = Object.keys(this.rowData[0]).map((key) => ({
        field: key,
        headerName: this.headerMap[key] || key,
      }));
     // console.warn('empleados actuales', this.currentEmploys);
    }
  }

  defaultColDef = {
    minWidth: 100,
    sortable: false,
    filter: false,
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
  onGridReady(params: any) {
    const allColumnIds: string[] = [];
    params.columnApi.getAllColumns()?.forEach((col: any) => allColumnIds.push(col.getId()));
    params.columnApi.autoSizeColumns(allColumnIds, true); // true = incluye header
  }
}

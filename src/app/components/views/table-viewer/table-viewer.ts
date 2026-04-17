import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Http } from '../../../services/http';

@Component({
  selector: 'app-table-viewer',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './table-viewer.html',
  styleUrls: ['./table-viewer.css'],
})
export class TableViewer {
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  @Input() lastEmploys: any[] = [];
  @Input() currentEmploys: any[] = [];
  @Input() turnOverEmployee: any[] = [];

  public rowData: any[] = [];
  public colDefs: any[] = [];
  public clearFlag: boolean = false;

  constructor(private _http: Http) {}

  defaultColDef = {
    minWidth: 100,
    sortable: false,
    filter: false,
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
    if (changes['lastEmploys'] && this.lastEmploys?.length) {
      this.updateGrid(this.lastEmploys, true);
    }

    if (changes['currentEmploys'] && this.currentEmploys?.length) {
      this.updateGrid(this.currentEmploys, true);
    }
  }

  onGridReady(params: any) {
    // Auto-ajustar columnas al iniciar
    const allColumnIds: string[] = [];
    params.columnApi
      ?.getAllColumns()
      ?.forEach((col: any) => allColumnIds.push(col.getId()));
    params.columnApi?.autoSizeColumns(allColumnIds, true);
  }

  // Limpiar filas y columnas
  public clearGrid() {
    this.clearFlag = true;
    this.rowData = [];
    this.colDefs = [];


    setTimeout(() => {
      this.clearFlag = false;
    }, 1000);
  }

  /**
   * Actualiza la grilla con nuevas filas y columnas
   * @param data Array de objetos
   * @param mapHeaders Si es true, aplica fieldMap/headerMap
   */
  public updateGrid(data: any[], mapHeaders: boolean = false) {
    if (!data || !data.length) {
      this.rowData = [];
      this.colDefs = [];
      return;
    }

    // Mapear datos si se requiere
    const rows = mapHeaders
      ? data.map((emp) => {
          const newObj: any = {};
          Object.keys(emp).forEach((key) => {
            const field = this.fieldMap[key] || key;
            newObj[field] = emp[key];
          });
          return newObj;
        })
      : [...data];

    // Generar columnas
    const columns = Object.keys(rows[0]).map((key) => ({
      field: key,
      headerName: mapHeaders ? this.headerMap[key] || key : key,
    }));

    // Actualizar bindings de Angular
    this.rowData = rows;
    this.colDefs = columns;
  }

  // Ejemplo de POST
  postEmpleado() {
    this._http.crearPost({
      nombre: 'Mauricio',
      edad: 34,
      id: '121212121',
    }).subscribe({
      next: (res) => console.log('Empleado creado correctamente', res),
      error: (err) => console.error('Error al crear empleado', err),
    });
  }
}

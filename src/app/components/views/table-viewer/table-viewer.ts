import { Component, Input, input, SimpleChanges } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-table-viewer',
  imports: [AgGridAngular],
  templateUrl: './table-viewer.html',
  styleUrl: './table-viewer.css',
})
export class TableViewer {
  @Input() lastEmploys: any[] = [];
  colDefs: any[] = [];
  rowData: any[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log('oninit');
    console.warn(this.lastEmploys);
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

      console.log('RowData transformado:', this.rowData);
      console.log('ColumnDefs dinámico:', this.colDefs);
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

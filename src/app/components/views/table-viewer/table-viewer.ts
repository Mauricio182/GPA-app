import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-table-viewer',
  imports: [AgGridAngular],
  templateUrl: './table-viewer.html',
  styleUrl: './table-viewer.css',
})
export class TableViewer {

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
}

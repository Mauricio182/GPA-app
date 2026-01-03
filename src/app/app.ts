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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AgGridAngular],
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
}

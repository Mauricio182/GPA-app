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

import { LoginForm } from './components/views/login-form/login-form';
import { Paginator } from './components/views/paginator/paginator';
import { TableViewer } from './components/views/table-viewer/table-viewer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginForm, Paginator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GPA-app');

   




 

}

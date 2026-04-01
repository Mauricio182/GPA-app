import { Component, OnInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { Http } from '../../services/http';

@Component({
  selector: 'app-check-old-turnover',
  standalone: true,
  imports: [
    Navbar,
    CommonModule,
    RouterModule,
    MatButton,
    FormsModule,
    AgGridModule
  ],
  templateUrl: './check-old-turnover.html',
  styleUrls: ['./check-old-turnover.css'],
})
export class CheckOldTurnover implements OnInit {

  // 🔥 Dropdowns
  empresas: string[] = [];
  fechas: string[] = [];

  // 🔥 Selecciones
  selectedEmpresa: string = '';
  selectedFecha: string = '';

  // 🔥 Datos
  rowData: any[] = [];
  dataFromApi: any[] = [];

  // 🔥 Columnas AG GRID
  columnDefs = [
    { field: 'RFC' },
    { field: 'Sexo' },
    { field: 'fIngreso' },
    { field: 'nombreDepto' },
    { field: 'nombrePuesto' },
    { field: 'regPatronal' },
    { field: 'sDiario' },
    { field: 'sLaboral' },
    { field: 'sMensual' },
    { field: 'saldoAhorro' }
  ];

  constructor(private _http: Http) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  // 🔥 Cargar datos desde Firebase/API
  cargarDatos() {
    this._http.getOldturnOver().subscribe({
      next: (resp: any) => {

        // ✅ Convertir objeto Firebase → array
        const resArray = Object.values(resp || {});

        this.dataFromApi = resArray;

        // ✅ Obtener clientes únicos
        this.empresas = [...new Set(
          resArray.map((item: any) => item.cliente)
        )];

        console.log('DATA:', this.dataFromApi);
        console.log('CLIENTES:', this.empresas);
      },
      error: (err) => {
        console.error('ERROR API:', err);
      }
    });
  }

  // 🔥 Cuando cambias cliente
  onEmpresaChange() {
    const filtrados = this.dataFromApi.filter(
      (item: any) => item.cliente === this.selectedEmpresa
    );

    // ✅ Fechas únicas
    this.fechas = [...new Set(
      filtrados.map((item: any) => item.fecha)
    )];

    // Reset
    this.rowData = [];
    this.selectedFecha = '';

    console.log('FECHAS:', this.fechas);
  }

  // 🔥 Cuando cambias fecha
  onFechaChange() {
    if (!this.selectedEmpresa || !this.selectedFecha) {
      this.rowData = [];
      return;
    }

    const registro = this.dataFromApi.find(
      (item: any) =>
        item.cliente === this.selectedEmpresa &&
        item.fecha === this.selectedFecha
    );

    // ✅ Cargar AG GRID
    this.rowData = registro?.altas_bajas || [];

    console.log('ROWDATA:', this.rowData);
  }
}

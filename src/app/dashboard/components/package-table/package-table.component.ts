import { Component } from '@angular/core';
import { Movimientos, MovimientosList } from '../../interfaces/movimientos';
import { MovimientosService } from '../../services/movimientos.service';
import { Package } from '../../interfaces/package';
import { PackageService } from '../../services/package.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-package-table',
  templateUrl: './package-table.component.html',
  styleUrls: ['./package-table.component.css']
})
export class PackageTableComponent {
  packagesList: MovimientosList[] = [];

  // Modal
  displayModel: boolean = false;
  displayModelPackage: boolean = false;

  // Form
  nombrePaquete: string = '';
  apalancamientoPaquete: number = 0;
  depositoPaquete: number = 0;
  spreadPaquete: string = '';
  spreadPipPaquete: number = 0;
  openOrdersPaquete: number = 0;

  constructor(private movimientosService: MovimientosService, private packageService: PackageService,
      private messageService: MessageService) { 
    this.getAllPackages();
  }

  getAllPackages() {
    this.packagesList = [];
    this.movimientosService.getMovimientosPackage().subscribe((resp: any) => {
      resp.movimientos.forEach((x: Movimientos) => {
        const movimiento: MovimientosList = {
          movimiento: x,
          colorStatus: this.setColorStatus(x.status),
        }
        this.packagesList.push(movimiento);
      });;
    })
  }

  setColorStatus(status: string) {
    if (status === 'Creado' || status === 'Pagado') {
      return status;
    } else {
      return 'new';
    }
  }

  openNuevoPaquete() {
    this.displayModel = true;
  }

  crearPaquete() {
    let paqueteNuevo: Package = {
        name: this.nombrePaquete,
        apalancamiento: this.apalancamientoPaquete,
        deposit: this.depositoPaquete,
        spreadType: this.spreadPaquete,
        spredPip: this.spreadPipPaquete,
        openOrders: this.openOrdersPaquete
    };
    this.packageService.createPackage(paqueteNuevo).subscribe((resp: any) => {
      this.messageService.clear();
      this.messageService.add({ severity: 'success', summary: 'Ok', detail: 'Paquete creado' });
      this.limpiarCampos();
      this.displayModel = false;
    });
  }

  limpiarCampos() {
    this.nombrePaquete = '';
    this.apalancamientoPaquete = 0;
    this.depositoPaquete = 0;
    this.spreadPaquete = '';
    this.spreadPipPaquete = 0;
    this.openOrdersPaquete = 0;
  }

  listaDePaquetes() {
    this.displayModelPackage = true;
  }

  actualizarEstado(movimiento: Movimientos, status: string) {
    this.movimientosService.updateStatus(movimiento, status).subscribe((res: any) => {
      this.messageService.clear();
      this.messageService.add({ severity: 'success', summary: 'Ok', detail: 'Estado actualizado' });
      this.getAllPackages();
    });
  }
}

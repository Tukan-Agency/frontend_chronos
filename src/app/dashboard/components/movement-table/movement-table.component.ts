import { Component, OnInit } from '@angular/core';
import { MovimientosService } from '../../services/movimientos.service';
import { MovimientosList, Movimientos } from '../../interfaces/movimientos';
import { ActivatedRoute } from '@angular/router';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-movement-table',
  templateUrl: './movement-table.component.html',
  styleUrls: ['./movement-table.component.css']
})
export class MovementTableComponent implements OnInit {
  movementsList: MovimientosList[] = [];
  byClient: boolean = false;

  constructor(private movimientosService: MovimientosService, private router: ActivatedRoute, private messageService: MessageService) {

    this.router.queryParams.subscribe(params => {
      this.byClient = params['byClient'];
    });
    if (this.byClient) {
      // OBTENER POR CLIENTE
      this.getAllMovementsByClient();
    } else {
      // OBTENER TODOS
      this.getAllMovements();
    }

  }

  ngOnInit(): void {
  }


  getAllMovements() {
    this.movementsList = [];
    this.movimientosService.getAllTypeMovements().subscribe((resp: any) => {
      resp.movimientos.forEach((x: Movimientos) => {
        let value;
        if (x.type === 'Paquete') {
          value = x.value
        } else {
          value = `$${x.value}.00`
        }
        const movimiento: MovimientosList = {
          movimiento: x,
          colorStatus: this.setColorStatus(x.type),
          valor: value
        }
        this.movementsList.push(movimiento);
      });
    })
  }

  getAllMovementsByClient(){
    this.movementsList = [];
    this.movimientosService.getMovementByClient().subscribe((resp: any) => {
      resp.movimientos.forEach((x: Movimientos) => {
        let value;
        if (x.type === 'Paquete') {
          value = x.value
        } else {
          value = `$${x.value}.00`
        }
        const movimiento: MovimientosList = {
          movimiento: x,
          colorStatus: this.setColorStatus(x.type),
          valor: value
        }
        this.movementsList.push(movimiento);
      });
    })
  }

  setColorStatus(status: string) {
    if (status === 'Paquete' || status === 'Deposito' || status === 'Retiro') {
      return status;
    } else {
      return 'new';
    }
  }

  deleteMovement(movimiento:MovimientosList){
    console.log(movimiento)
    this.movimientosService.deleteMovement(movimiento).subscribe((resp: any) => {
      this.messageService.clear();
      this.messageService.add({ severity: 'success', summary: 'Ok', detail: 'Orden eliminada' });
      this.getAllMovements();
    })
  }
}

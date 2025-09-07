import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Request } from '../../interfaces/request';
import { RequestService } from '../../services/request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-retire',
  templateUrl: './retire.component.html',
  styleUrls: ['./retire.component.css']
})
export class RetireComponent {
  items: MenuItem[];
  itemActivo: number = 1;
  activeItem: MenuItem;
  date = new Date();
  ibanAccount: string = '';
  bankName: string = '';
  numberAccount: number = 0;
  requestedValue: number = 0;

  constructor(private requestServices: RequestService, private router: ActivatedRoute, private messageService: MessageService) {
    this.items = [
      // {id: '1', label: 'Debito o Tarjeta de Credito', icon: 'pi pi-id-card', command: e => this.prueba(e)},
      { id: '1', label: 'Banco', icon: 'pi pi-fw pi-money-bill', command: e => this.prueba(e) },
    ];

    this.activeItem = this.items[0];
  }

  prueba(prueba: any) {
    this.itemActivo = Number(prueba.item.id);
  }

  clearInputs(){
    this.ibanAccount = '',
    this.bankName = '',
    this.numberAccount = 0,
    this.requestedValue = 0
  }

  createRequest() {
    const newDate = new Date();
    let retireNew: Request = {
      _id: '',
      clientId: '',
      clientName: '',
      ibanAccount: this.ibanAccount,
      bankName: this.bankName,
      numberAccount: this.numberAccount,
      requestedValue: this.requestedValue,
      requestStatus: 'Creado',
      requestDate: newDate,
      requestType: 'Retiro'
    };
    this.requestServices.createRequest(retireNew).subscribe((resp: any) => {
      this.messageService.clear();
      this.messageService.add({ severity: 'success', summary: 'Ok', detail: 'Solicitud de Retiro Exitoso' });
      this.clearInputs();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Request, RequestList } from '../../interfaces/request';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.css']
})
export class RequestTableComponent implements OnInit {
  requestList: RequestList[] = [];

  constructor(private requestService: RequestService, private messageService: MessageService) { 
    this.getAllRequets();
  }

  ngOnInit(): void {
  }

  getAllRequets() {
    this.requestList = [];
    this.requestService.getRequest().subscribe((resp: any) => {
      resp.requests.forEach((x: Request) => {
        const solicitud: RequestList = {
          solicitud: x,
          colorStatus: this.setColorStatus(x.requestStatus),
        }
        this.requestList.push(solicitud);
      });
    })
  }

  setColorStatus(status: string) {
    if (status === 'Creado' || status === 'Finalizado' || status === 'Rechazado') {
      return status;
    } else {
      return 'new';
    }
  }

  updateStatusRequest(solicitud: Request, status: string){
    this.requestService.updateStatus(solicitud, status).subscribe((res: any) => {
      this.messageService.clear();
      this.messageService.add({ severity: 'success', summary: 'ok', detail: 'Estado actualizado' });
      this.getAllRequets();
    })
  }
}

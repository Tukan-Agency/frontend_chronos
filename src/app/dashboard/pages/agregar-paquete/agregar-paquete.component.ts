import { Component, Input } from '@angular/core';
import { Package } from '../../interfaces/package';
import { PackageService } from '../../services/package.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'app-agregar-paquete',
  templateUrl: './agregar-paquete.component.html',
  styleUrls: ['./agregar-paquete.component.css']
})
export class AgregarPaqueteComponent {
  packages: Package[] = [];
  @Input() listaPaquete: boolean = false;

  constructor(private packageService: PackageService, private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.getAllPackages();
  }

  getAllPackages() {
    this.packageService.getPackages().subscribe((packages: any) => {
      this.packages = packages.packages;
    });
  }

  savePackage(pack: Package) {
    this.packageService.updatePackage(pack).subscribe((res: any) => {
      this.messageService.clear();
      this.messageService.add({ severity: 'success', summary: 'Ok', detail: 'Cliente Actualizado' });
    });
  }

  openConfirm(pack: Package) {
    this.confirmationService.confirm({
      message: '¿Deseas adquirir este paquete?',
      header: 'Confirmación de paquete',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.savePackage(pack);
      },
      reject: (type: any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
              this.messageService.add({severity:'error', summary:'Rechazado', detail:'Rechasaste la solicitud'});
          break;
          case ConfirmEventType.CANCEL:
              this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Cancelaste la solicitud'});
          break;
        }
      },
      key: 'positionDialog'
    })
  }

}

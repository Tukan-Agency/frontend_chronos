import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CustomerService } from '../../services/customer.service';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router'; // Importar Router para la navegación

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit {
  cliente = this.customerService.usuarioSeleccionado;
  ordersList: any[] = [];
  today = new Date();
  firstDate = '';
  lastDate = '';
  totalCapital = 0;
  totalGanancia = 0;
  totalPerdida = 0;
  totalRetiros = 0;
  balance = 0;
  authCode = '';

  constructor(
    private customerService: CustomerService,
    private ordersService: OrdersService,
    private router: Router // Inyectar Router
  ) {}

  ngOnInit(): void {
    this.authCode = this.generateAuthCode();

    if (!this.cliente || !this.cliente._id) return;

    this.ordersService.getOrdersByClient(this.cliente).subscribe((res: any) => {
      this.ordersList = res.ordenes.map((x: any) => {
        let total = 0;
        x.operationActions.forEach((a: any) => total += a.benefit * a.quantity);
        let valor = '$0.00';
        if (x.operationValue < 0) valor = `-$${Math.abs(x.operationValue)}.00`;
        else if (x.operationValue > 0) valor = `$${x.operationValue}.00`;

        return {
          total,
          orders: x,
          valorFinal: valor,
          isCapital: x.isCapital,
          isWithdrawl: x.isWithdrawl
        };
      });

      // Fechas
      if (this.ordersList.length > 0) {
        const first = new Date(this.ordersList[0].orders.operationDate);
        const last = new Date(this.ordersList[this.ordersList.length - 1].orders.operationDate);
        this.firstDate = first.toLocaleDateString('en-GB');
        this.lastDate = last.toLocaleDateString('en-GB');
      }

      // Totales y balance
      this.ordersList.forEach(order => {
        if (order.isCapital) this.totalCapital += order.total;
        if (!order.isWithdrawl && order.valorFinal[1] !== '-') {
          this.totalGanancia += parseFloat(order.valorFinal.replace(/[^0-9.-]+/g, ''));
        }
        if (!order.isWithdrawl && order.valorFinal[1] === '-') {
          this.totalPerdida += parseFloat(order.valorFinal.replace(/[^0-9.-]+/g, ''));
        }
        if (order.isWithdrawl) this.totalRetiros += order.total;
      });

      this.balance = this.totalGanancia - this.totalPerdida - this.totalRetiros + this.totalCapital;

      setTimeout(() => this.generatePDF(), 500);
    });
  }

  generatePDF() {
    const content = document.getElementById('pdf-content');
    if (!content) return;

    html2canvas(content, {
      scale: 3,
      useCORS: true,
      allowTaint: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'letter');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`reporte-${this.cliente.name}-${this.cliente.surname}.pdf`);
      
      // Después de descargar, mostrar mensaje de éxito
      setTimeout(() => {
        const loadingDiv = document.querySelector('.div-cargando');
        const successDiv = document.getElementById('exito-downlader');
        
        if (loadingDiv && successDiv) {
          loadingDiv.classList.remove('show');
          loadingDiv.classList.add('oculto');
          successDiv.classList.remove('oculto');
          successDiv.classList.add('show');
        }
      }, 2000); // 2 segundos después de la descarga
    });
  }

  // Función para el botón "Volver"
  volverDashboard() {
    this.router.navigate(['/dashboard/clientList']);
  }

  // Función para el botón "Descargar de nuevo"
  descargarNuevo() {
    // Ocultar mensaje de éxito y mostrar loader nuevamente
    const loadingDiv = document.querySelector('.div-cargando');
    const successDiv =  document.querySelector('.exito-downlader');
    
    if (loadingDiv && successDiv) {
      successDiv.classList.remove('show');
      successDiv.classList.add('oculto');
      loadingDiv.classList.remove('oculto');
      loadingDiv.classList.add('show');
    }
    
    // Volver a generar el PDF después de un pequeño delay
    setTimeout(() => this.generatePDF(), 500);
  }

  generateAuthCode(length: number = 30): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
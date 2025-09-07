import { Component, Input, OnInit } from '@angular/core';
import {Charts, DataSet} from '../../interfaces/charts';
import {ChartModule} from 'primeng/chart';
import {OrdersService} from "../../services/orders.service";
import {Order, OrderList} from "../../interfaces/order-customer";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  orderClient: any;
  @Input() dataChart: Charts;
  @Input() showOrdenChart: boolean = false;
  windowHeight: number = 0;

  constructor() {
    this.dataChart= {
      labels: [],
      datasets: [
        {
          label: '',
          backgroundColor: '',
          data: []
        },
      ]
    };
  }

  ngOnInit(): void {

    this.windowHeight = window.screen.height;

    this.orderClient = {
      labels: ['Enero', 'Febrero', 'Marzo', ],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#FFA726',
          data: [28, 48, 40]
        }
      ]
    };
  }


}

import { Component, OnInit } from '@angular/core';
import { trimestre } from '../../interfaces/trimestre';
import { Charts } from '../../interfaces/charts';
import { Datachart, Month, Trimestre, Semestre, Data } from '../../interfaces/datacharts';
import { DatePipe } from '@angular/common';
import { Actions, Order, OrderList } from '../../interfaces/order-customer';
import { OrdersService } from '../../services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  ordersList: OrderList[] = [];
  orders: Order[] = [];
  orderSelected: Order;
  total: number = 0;
  byClient: boolean = false;
  nameClient: string = '';
  numOrdenNueva: number = 0;
  date = new Date()

  // Form
  accionistas: Actions[] = [];
  accionistaName: string = '';
  accionistaQuantity: number = 0;
  accionistaBenefit: number = 0;

  totalFinalizado: number = 0;

  // Charts
  date2: Date = new Date();
  date1: Date = new Date();
  selectedOption: any = {
    name: '',
    key: ''
  };
  options: any[] = [{ name: 'Mes', key: 'M' }, { name: 'Trimestre', key: 'T' }, { name: 'Semestre', key: 'S' }];
  semestreOption: any = null;
  semestres: any[] = [{ id: '1', name: '1° Semestre' }, { id: '2', name: '2° Semestre' }];
  trimestres: trimestre[] = [];
  selectedTrimestre: trimestre = { id: '', name: '' };
  dataChart: Charts = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Capital',
        backgroundColor: '#EEC137',
        data: []
      },
      {
        label: 'Ganancias',
        backgroundColor: '#66BB6A',
        data: []
      },
      {
        label: 'Perdidas',
        backgroundColor: '#EC407A',
        data: []
      }
    ]
  };
  dataCharts!: Datachart;
  months: Month = {
    ene: {
      winnings: 3,
      losses: 7,
      inversion: 10
    },
    feb: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },
    mar: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },
    abr: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },
    may: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },
    jun: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },
    jul: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },
    ago: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },
    sep: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },
    oct: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },
    nov: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },
    dic: {
      winnings: 0,
      losses: 0,
      inversion: 0
    }
  };
  trimestre: Trimestre = {
    trimestre1: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },

    trimestre2: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },

    trimestre3: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },

    trimestre4: {
      winnings: 0,
      losses: 0,
      inversion: 0
    }
  }
  semestre: Semestre = {
    semestre1: {
      winnings: 0,
      losses: 0,
      inversion: 0
    },
    semestre2: {
      winnings: 0,
      losses: 0,
      inversion: 0
    }
  }

  constructor(private ordersServices: OrdersService,
    private router: ActivatedRoute, private messageService: MessageService, private datePipe: DatePipe) {
    const date = new Date();
    this.orderSelected = {
      clientId: '',
      operationActions: [],
      operationDate: date,
      operationNumber: 0,
      operationStatus: '',
      operationValue: 0,
      isCapital: false
    }

    this.trimestres = [
      { id: '1', name: '1° Trimestre' },
      { id: '2', name: '2° Trimestre' },
      { id: '3', name: '3° Trimestre' },
      { id: '4', name: '4° Trimestre' }
    ];

    this.router.queryParams.subscribe(params => {
      this.byClient = params['byClient'];
    });
    if (this.byClient) {
      // OBTENER POR CLIENTE
      this.getByClient();
    } else {
      // OBTENER TODOS
      this.getByClientNoAdmin();
    }
  }
  ngOnInit(): void {
    this.router.queryParams
      .subscribe(params => {
          console.log(params);
        }
      );
  }
  getByClient() {
    this.ordersList = [];
    this.ordersServices.getOrdersByClient().subscribe((ordenes: any) => {
      this.orders = ordenes.ordenes;
      this.orders.forEach(x => {
        let partial = 0;
        x.operationActions.forEach(operarion => {
          if(x.isCapital){
            partial = partial + (operarion.benefit * operarion.quantity);
          }
        });
        let valor = '$0.00';
        if (x.operationValue < 0) {
          valor = `$-${Math.abs(x.operationValue)}.00`
        } else if (x.operationValue > 0) {
          valor = `$${x.operationValue}.00`
        }
        const orderList = {
          total: partial,
          orders: x,
          colorStatus: this.setColorStatus(x.operationStatus),
          valorFinal: valor,
          isCapital: x.isCapital,
          isWithdrawl: x.isWithdrawl
        }
        this.ordersList.push(orderList);

      });
      this.getDataOnCharts();
    });

    const user = this.ordersServices.getUserName();
    this.nameClient = `${user.name} ${user.surname}`;
  }

  getByClientNoAdmin() {
    this.ordersList = [];
    this.ordersServices.getOrdersByClientNoAdmin().subscribe((ordenes: any) => {
      this.orders = ordenes.ordenes;
      this.orders.forEach(x => {
        let partial = 0;
        x.operationActions.forEach(operarion => {
          if(x.isCapital){
            partial = partial + (operarion.benefit * operarion.quantity);
          }
        });
        let valor = '$0.00';
        if (x.operationValue < 0) {
          valor = `$-${Math.abs(x.operationValue)}.00`
        } else if (x.operationValue > 0) {
          valor = `$${x.operationValue}.00`
        }
        const orderList = {
          total: partial,
          orders: x,
          colorStatus: this.setColorStatus(x.operationStatus),
          valorFinal: valor,
          isCapital: x.isCapital,
          isWithdrawl: x.isWithdrawl
        }
        this.ordersList.push(orderList);
      });
      this.getDataOnCharts();
    });

    const user = this.ordersServices.getUserName();
    this.nameClient = `${user.name} ${user.surname}`;
  }

  setColorStatus(status: string) {
    if (status === 'Finalizado' || status === 'Cancelado') {
      return status;
    } else {
      return 'new';
    }
  }
  // Colocar Data Graficas
  getDataOnCharts() {
    this.dataChart = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Capital',
          backgroundColor: '#EEC137',
          data: []
        },
        {
          label: 'Ganancias',
          backgroundColor: '#66BB6A',
          data: []
        },
        {
          label: 'Perdidas',
          backgroundColor: '#EC407A',
          data: []
        }
      ]
    };
    this.months = {
      ene: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },
      feb: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },
      mar: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },
      abr: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },
      may: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },
      jun: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },
      jul: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },
      ago: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },
      sep: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },
      oct: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },
      nov: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },
      dic: {
        winnings: 0,
        losses: 0,
        inversion: 0
      }
    };
    this.trimestre = {
      trimestre1: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },

      trimestre2: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },

      trimestre3: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },

      trimestre4: {
        winnings: 0,
        losses: 0,
        inversion: 0
      }
    }
    this.semestre = {
      semestre1: {
        winnings: 0,
        losses: 0,
        inversion: 0
      },
      semestre2: {
        winnings: 0,
        losses: 0,
        inversion: 0
      }
    }
    this.ordersList.forEach(x => {
      const newYear = this.datePipe.transform(x.orders.operationDate, 'yyyy');
      const newMonth = this.datePipe.transform(x.orders.operationDate, 'MM');
      if (newYear === this.datePipe.transform(this.date1, 'yyyy')) {
        // Switch Data para Mes,Trimestre,Semestre
        switch (newMonth) {
          case '01':
            const valueMonthEne: Data = this.asginarValueMonth(x);
            this.months.ene.winnings = this.months.ene.winnings + valueMonthEne['winnings'];
            this.months.ene.losses = this.months.ene.losses + valueMonthEne['losses'];
            this.months.ene.inversion = this.months.ene.inversion + valueMonthEne['inversion'];
            // Trimestre
            this.trimestre.trimestre1.winnings = this.trimestre.trimestre1.winnings + valueMonthEne['winnings'];
            this.trimestre.trimestre1.losses = this.trimestre.trimestre1.losses + valueMonthEne['losses'];
            this.trimestre.trimestre1.inversion = this.trimestre.trimestre1.inversion + valueMonthEne['inversion'];
            // Semestre
            this.semestre.semestre1.winnings = this.semestre.semestre1.winnings + valueMonthEne['winnings'];
            this.semestre.semestre1.losses = this.semestre.semestre1.losses + valueMonthEne['losses'];
            this.semestre.semestre1.inversion = this.semestre.semestre1.inversion + valueMonthEne['inversion'];
            break;
          case '02':
            const valueMonthFeb: Data = this.asginarValueMonth(x);
            this.months.feb.winnings = this.months.feb.winnings + valueMonthFeb['winnings'];
            this.months.feb.losses = this.months.feb.losses + valueMonthFeb['losses'];
            this.months.feb.inversion = this.months.feb.inversion + valueMonthFeb['inversion'];
            // Trimestre
            this.trimestre.trimestre1.winnings = this.trimestre.trimestre1.winnings + valueMonthFeb['winnings'];
            this.trimestre.trimestre1.losses = this.trimestre.trimestre1.losses + valueMonthFeb['losses'];
            this.trimestre.trimestre1.inversion = this.trimestre.trimestre1.inversion + valueMonthFeb['inversion'];
            // Semestre
            this.semestre.semestre1.winnings = this.semestre.semestre1.winnings + valueMonthFeb['winnings'];
            this.semestre.semestre1.losses = this.semestre.semestre1.losses + valueMonthFeb['losses'];
            this.semestre.semestre1.inversion = this.semestre.semestre1.inversion + valueMonthFeb['inversion'];
            break;
          case '03':
            const valueMonthMar: Data = this.asginarValueMonth(x);
            this.months.mar.winnings = this.months.mar.winnings + valueMonthMar['winnings'];
            this.months.mar.losses = this.months.mar.losses + valueMonthMar['losses'];
            this.months.mar.inversion = this.months.mar.inversion + valueMonthMar['inversion'];
            // Trimestre
            this.trimestre.trimestre1.winnings = this.trimestre.trimestre1.winnings + valueMonthMar['winnings'];
            this.trimestre.trimestre1.losses = this.trimestre.trimestre1.losses + valueMonthMar['losses'];
            this.trimestre.trimestre1.inversion = this.trimestre.trimestre1.inversion + valueMonthMar['inversion'];
            // Semestre
            this.semestre.semestre1.winnings = this.semestre.semestre1.winnings + valueMonthMar['winnings'];
            this.semestre.semestre1.losses = this.semestre.semestre1.losses + valueMonthMar['losses'];
            this.semestre.semestre1.inversion = this.semestre.semestre1.inversion + valueMonthMar['inversion'];
            break;
          case '04':
            const valueMonthAbr: Data = this.asginarValueMonth(x);
            this.months.abr.winnings = this.months.abr.winnings + valueMonthAbr['winnings'];
            this.months.abr.losses = this.months.abr.losses + valueMonthAbr['losses'];
            this.months.abr.inversion = valueMonthAbr['inversion'];
            // Trimestre
            this.trimestre.trimestre2.winnings = this.trimestre.trimestre2.winnings + valueMonthAbr['winnings'];
            this.trimestre.trimestre2.losses = this.trimestre.trimestre2.losses + valueMonthAbr['losses'];
            this.trimestre.trimestre2.inversion = this.trimestre.trimestre2.inversion + valueMonthAbr['inversion'];
            // Semestre
            this.semestre.semestre1.winnings = this.semestre.semestre1.winnings + valueMonthAbr['winnings'];
            this.semestre.semestre1.losses = this.semestre.semestre1.losses + valueMonthAbr['losses'];
            this.semestre.semestre1.inversion = this.semestre.semestre1.inversion + valueMonthAbr['inversion'];
            break;
          case '05':
            const valueMonthMay: Data = this.asginarValueMonth(x);
            this.months.may.winnings = this.months.may.winnings + valueMonthMay['winnings'];
            this.months.may.losses = this.months.may.losses + valueMonthMay['losses'];
            this.months.may.inversion = this.months.may.inversion + valueMonthMay['inversion'];
            // Trimestre
            this.trimestre.trimestre2.winnings = this.trimestre.trimestre2.winnings + valueMonthMay['winnings'];
            this.trimestre.trimestre2.losses = this.trimestre.trimestre2.losses + valueMonthMay['losses'];
            this.trimestre.trimestre2.inversion = this.trimestre.trimestre2.inversion + valueMonthMay['inversion'];
            // Semestre
            this.semestre.semestre1.winnings = this.semestre.semestre1.winnings + valueMonthMay['winnings'];
            this.semestre.semestre1.losses = this.semestre.semestre1.losses + valueMonthMay['losses'];
            this.semestre.semestre1.inversion = this.semestre.semestre1.inversion + valueMonthMay['inversion'];
            break;
          case '06':
            const valueMonthJun: Data = this.asginarValueMonth(x);
            this.months.jun.winnings = this.months.jun.winnings + valueMonthJun['winnings'];
            this.months.jun.losses = this.months.jun.losses + valueMonthJun['losses'];
            this.months.jun.inversion = this.months.jun.inversion + valueMonthJun['inversion'];
            // Trimestre
            this.trimestre.trimestre2.winnings = this.trimestre.trimestre2.winnings + valueMonthJun['winnings'];
            this.trimestre.trimestre2.losses = this.trimestre.trimestre2.losses + valueMonthJun['losses'];
            this.trimestre.trimestre2.inversion = this.trimestre.trimestre2.inversion + valueMonthJun['inversion'];
            // Semestre
            this.semestre.semestre1.winnings = this.semestre.semestre1.winnings + valueMonthJun['winnings'];
            this.semestre.semestre1.losses = this.semestre.semestre1.losses + valueMonthJun['losses'];
            this.semestre.semestre1.inversion = this.semestre.semestre1.inversion + valueMonthJun['inversion'];
            break;
          case '07':
            const valueMonthJul: Data = this.asginarValueMonth(x);
            this.months.jul.winnings = this.months.jul.winnings + valueMonthJul['winnings'];
            this.months.jul.losses = this.months.jul.losses + valueMonthJul['losses'];
            this.months.jul.inversion = this.months.jul.inversion + valueMonthJul['inversion'];
            // Trimestre
            this.trimestre.trimestre3.winnings = this.trimestre.trimestre3.winnings + valueMonthJul['winnings'];
            this.trimestre.trimestre3.losses = this.trimestre.trimestre3.losses + valueMonthJul['losses'];
            this.trimestre.trimestre3.inversion = this.trimestre.trimestre3.inversion + valueMonthJul['inversion'];
            // Semestre
            this.semestre.semestre2.winnings = this.semestre.semestre2.winnings + valueMonthJul['winnings'];
            this.semestre.semestre2.losses = this.semestre.semestre2.losses + valueMonthJul['losses'];
            this.semestre.semestre2.inversion = this.semestre.semestre2.inversion + valueMonthJul['inversion'];
            break;
          case '08':
            const valueMonthAgo: Data = this.asginarValueMonth(x);
            this.months.ago.winnings = this.months.ago.winnings + valueMonthAgo['winnings'];
            this.months.ago.losses = this.months.ago.losses + valueMonthAgo['losses'];
            this.months.ago.inversion = this.months.ago.inversion + valueMonthAgo['inversion'];
            // Trimestre
            this.trimestre.trimestre3.winnings = this.months.ago.winnings + valueMonthAgo['winnings'];
            this.trimestre.trimestre3.losses = this.months.ago.losses + valueMonthAgo['losses'];
            this.trimestre.trimestre3.inversion = this.months.ago.inversion + valueMonthAgo['inversion'];
            // Semestre
            this.semestre.semestre2.winnings = this.months.ago.winnings + valueMonthAgo['winnings'];
            this.semestre.semestre2.losses = this.months.ago.losses + valueMonthAgo['losses'];
            this.semestre.semestre2.inversion = this.months.ago.inversion + valueMonthAgo['inversion'];
            break;
          case '09':
            const valueMonthSep: Data = this.asginarValueMonth(x);
            this.months.sep.winnings = this.months.sep.winnings + valueMonthSep['winnings'];
            this.months.sep.losses = this.months.sep.losses + valueMonthSep['losses'];
            this.months.sep.inversion = this.months.sep.inversion + valueMonthSep['inversion'];
            // Trimestre
            this.trimestre.trimestre3.winnings = this.trimestre.trimestre3.winnings + valueMonthSep['winnings'];
            this.trimestre.trimestre3.losses = this.trimestre.trimestre3.losses + valueMonthSep['losses'];
            this.trimestre.trimestre3.inversion = this.trimestre.trimestre3.inversion + valueMonthSep['inversion'];
            // Semestre
            this.semestre.semestre2.winnings = this.semestre.semestre2.winnings + valueMonthSep['winnings'];
            this.semestre.semestre2.losses = this.semestre.semestre2.losses + valueMonthSep['losses'];
            this.semestre.semestre2.inversion = this.semestre.semestre2.inversion + valueMonthSep['inversion'];
            break;
          case '10':
            const valueMonthOct: Data = this.asginarValueMonth(x);
            this.months.oct.winnings = this.months.oct.winnings + valueMonthOct['winnings'];
            this.months.oct.losses = this.months.oct.losses + valueMonthOct['losses'];
            this.months.oct.inversion = this.months.oct.inversion + valueMonthOct['inversion'];
            // Trimestre
            this.trimestre.trimestre4.winnings = this.trimestre.trimestre4.winnings + valueMonthOct['winnings'];
            this.trimestre.trimestre4.losses = this.trimestre.trimestre4.losses + valueMonthOct['losses'];
            this.trimestre.trimestre4.inversion = this.trimestre.trimestre4.inversion + valueMonthOct['inversion'];
            // Semestre
            this.semestre.semestre2.winnings = this.semestre.semestre2.winnings + valueMonthOct['winnings'];
            this.semestre.semestre2.losses = this.semestre.semestre2.losses + valueMonthOct['losses'];
            this.semestre.semestre2.inversion = this.semestre.semestre2.inversion + valueMonthOct['inversion'];
            break;
          case '11':
            const valueMonthNov: Data = this.asginarValueMonth(x);
            this.months.nov.winnings = this.months.nov.winnings + valueMonthNov['winnings'];
            this.months.nov.losses = this.months.nov.losses + valueMonthNov['losses'];
            this.months.nov.inversion = this.months.nov.inversion + valueMonthNov['inversion'];
            // Trimestre
            this.trimestre.trimestre4.winnings = this.trimestre.trimestre4.winnings + valueMonthNov['winnings'];
            this.trimestre.trimestre4.losses = this.trimestre.trimestre4.losses + valueMonthNov['losses'];
            this.trimestre.trimestre4.inversion = this.trimestre.trimestre4.inversion + valueMonthNov['inversion'];
            // Semestre
            this.semestre.semestre2.winnings = this.semestre.semestre2.winnings + valueMonthNov['winnings'];
            this.semestre.semestre2.losses = this.semestre.semestre2.losses + valueMonthNov['losses'];
            this.semestre.semestre2.inversion = this.semestre.semestre2.inversion + valueMonthNov['inversion'];
            break;
          case '12':
            const valueMonthDic: Data = this.asginarValueMonth(x);
            this.months.dic.winnings = this.months.dic.winnings + valueMonthDic['winnings'];
            this.months.dic.losses = this.months.dic.losses + valueMonthDic['losses'];
            this.months.dic.inversion = this.months.dic.inversion + valueMonthDic['inversion'];
            // Trimestres
            this.trimestre.trimestre4.winnings = this.trimestre.trimestre4.winnings + valueMonthDic['winnings'];
            this.trimestre.trimestre4.losses = this.trimestre.trimestre4.losses + valueMonthDic['losses'];
            this.trimestre.trimestre4.inversion = this.trimestre.trimestre4.inversion + valueMonthDic['inversion'];
            // Semestre
            this.semestre.semestre2.winnings = this.semestre.semestre2.winnings + valueMonthDic['winnings'];
            this.semestre.semestre2.losses = this.semestre.semestre2.losses + valueMonthDic['losses'];
            this.semestre.semestre2.inversion = this.semestre.semestre2.inversion + valueMonthDic['inversion'];
            break;

          default:
            break;
        }
      }
    });
    this.selectMonth()
  }

  asginarValueMonth(x: any) {
    let partial = 0;
    let valueMonth: Data = {
      winnings: 0,
      losses: 0,
      inversion: 0
    }
    if (x.orders.operationValue > 0) {
      valueMonth['winnings'] = valueMonth['winnings'] + x.orders.operationValue;
    } else {
      if(!x.orders.isCapital && x.orders.isWithdrawl){
        valueMonth['winnings'] = valueMonth['winnings'] + x.orders.operationValue;
      }else{
        valueMonth['losses'] = valueMonth['losses'] + Math.abs(x.orders.operationValue);
      }
    }
    x.orders.operationActions.forEach((operarion:any) => {
      if(x.orders.isCapital){
        partial = partial + (operarion.benefit * operarion.quantity);
      }
    });
    valueMonth['inversion'] = partial;

    return valueMonth;
  }

  // Opciones Grafica
  selectMonth() {
    const month = this.date2.toLocaleString('es-ES', { month: 'numeric' });
    switch (month) {
      case '1':
        this.dataChart = {
          labels: ['Enero'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.ene.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.ene.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.ene.losses]
            }
          ]
        };
        break;
      case '2':
        this.dataChart = {

          labels: ['Febrero'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.ene.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.feb.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.feb.losses]
            }
          ]
        };
        break;
      case '3':
        this.dataChart = {
          labels: ['Marzo'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.mar.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.mar.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.mar.losses]
            }
          ]
        };
        break;
      case '4':
        this.dataChart = {
          labels: ['Abril'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.abr.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.abr.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.abr.losses]
            }
          ]
        };
        break;
      case '5':
        this.dataChart = {
          labels: ['Mayo'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.may.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.may.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.may.losses]
            }
          ]
        };
        break;
      case '6':
        this.dataChart = {
          labels: ['Junio'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.jun.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.jun.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.jun.losses]
            }
          ]
        };
        break;
      case '7':
        this.dataChart = {
          labels: ['Julio'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.jul.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.jul.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.jul.losses]
            }
          ]
        };
        break;
      case '8':
        this.dataChart = {
          labels: ['Agosto'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.ago.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.ago.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.ago.losses]
            }
          ]
        };
        break;
      case '9':
        this.dataChart = {
          labels: ['Septiembre'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.sep.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.sep.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.sep.losses]
            }
          ]
        };
        break;
      case '10':
        this.dataChart = {
          labels: ['Octubre'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.oct.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.oct.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.oct.losses]
            }
          ]
        };
        break;
      case '11':
        this.dataChart = {
          labels: ['Noviembre'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.nov.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.nov.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.nov.losses]
            }
          ]
        };
        break;
      case '12':
        this.dataChart = {
          labels: ['Diciembre'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.dic.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.dic.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.dic.losses]
            }
          ]
        };
        break;

      default:
        break;
    }
  }

  selectTrimestre() {
    switch (this.selectedTrimestre.id) {
      case '1':
        this.dataChart = {
          labels: ['Enero', 'Febrero', 'Marzo'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.ene.inversion, this.months.feb.inversion, this.months.mar.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.ene.winnings, this.months.feb.winnings, this.months.mar.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.ene.losses, this.months.feb.losses, this.months.mar.losses]
            }
          ]
        };
        break;
      case '2':
        this.dataChart = {
          labels: ['Abril', 'Mayo', 'Junio'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.abr.inversion, this.months.may.inversion, this.months.jun.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.abr.winnings, this.months.may.winnings, this.months.jun.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.abr.losses, this.months.may.losses, this.months.jun.losses]
            }
          ]
        };
        break;
      case '3':
        this.dataChart = {
          labels: ['Julio', 'Agosto', 'Septiembre'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.jul.inversion, this.months.ago.inversion, this.months.sep.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.jul.winnings, this.months.ago.winnings, this.months.sep.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.jul.losses, this.months.ago.losses, this.months.sep.losses]
            }
          ]
        };
        break;
      case '4':
        this.dataChart = {
          labels: ['Octubre', 'Noviembre', 'Diciembre'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.oct.inversion, this.months.nov.inversion, this.months.dic.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.oct.winnings, this.months.nov.winnings, this.months.dic.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.oct.losses, this.months.nov.losses, this.months.dic.losses]
            }
          ]
        };
        break;

      default:
        break;
    }
  }

  selectSemestre(id: string) {
    switch (id) {
      case '1':
        this.dataChart = {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.ene.inversion, this.months.feb.inversion, this.months.mar.inversion, this.months.abr.inversion, this.months.may.inversion, this.months.jun.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.ene.winnings, this.months.feb.winnings, this.months.mar.winnings, this.months.abr.winnings, this.months.may.winnings, this.months.jun.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.ene.losses, this.months.feb.losses, this.months.mar.losses, this.months.abr.losses, this.months.may.losses, this.months.jun.losses]
            }
          ]
        };
        break;

      case '2':
        this.dataChart = {
          labels: ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: [
            {
              label: 'Capital',
              backgroundColor: '#EEC137',
              data: [this.months.jul.inversion, this.months.ago.inversion, this.months.sep.inversion, this.months.oct.inversion, this.months.nov.inversion, this.months.dic.inversion]
            },
            {
              label: 'Ganancias',
              backgroundColor: '#66BB6A',
              data: [this.months.jul.winnings, this.months.ago.winnings, this.months.sep.winnings, this.months.oct.winnings, this.months.nov.winnings, this.months.dic.winnings]
            },
            {
              label: 'Perdidas',
              backgroundColor: '#EC407A',
              data: [this.months.jul.losses, this.months.ago.losses, this.months.sep.losses, this.months.oct.losses, this.months.nov.losses, this.months.dic.losses]
            }
          ]
        };
        break;

      default:
        break;
    }
  }
}


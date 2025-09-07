// MODULOS
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardsRoutingModule } from './dashboard-routing.module';

// SERVICIOS
import { CustomerService } from './services/customer.service';

// COMPONENTES
import { MainComponent } from './pages/main/main.component';
import { PrimeModule } from '../prime/prime.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ControlComponent } from './pages/control/control.component';
import { ChartsComponent } from './components/charts/charts.component';
import { PanelComponent } from './components/panel/panel.component';
import { NewsComponent } from './components/news/news.component';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { DepositComponent } from './pages/deposit/deposit.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { OrdersService } from './services/orders.service';
import { AgregarPaqueteComponent } from './pages/agregar-paquete/agregar-paquete.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PackageService } from './services/package.service';
import { PackageTableComponent } from './components/package-table/package-table.component';
import { PackageListComponent } from './pages/package-list/package-list.component';
import { ReportComponent } from './components/report/report.component';
import { ReportePageComponent } from './pages/reporte/reporte.component';
import { MovimientosService } from './services/movimientos.service';
import { RetireComponent } from './pages/retire/retire.component';
import { RequestComponent } from './pages/request/request.component';
import { RequestTableComponent } from './components/request-table/request-table.component';
import { MovementsListComponent } from './pages/movements-list/movements-list.component';
import { MovementTableComponent } from './components/movement-table/movement-table.component';
import {AccountDetailsComponent} from "./components/account-details/account-details.component";
import {MatSelectModule} from "@angular/material/select";
import {MenubarModule} from 'primeng/menubar';


@NgModule({
  declarations: [
    ReportComponent,
    ReportePageComponent,
    MainComponent,
    SidenavComponent,
    ControlComponent,
    ChartsComponent,
    PanelComponent,
    NewsComponent,
    ClientListComponent,
    OrderListComponent,
    ClientsTableComponent,
    OrderTableComponent,
    DepositComponent,
    ClientDetailComponent,
    AgregarPaqueteComponent,
    PackageTableComponent,
    PackageListComponent,
    RetireComponent,
    RequestComponent,
    RequestTableComponent,
    MovementsListComponent,
    MovementTableComponent,
    AccountDetailsComponent,


  ],
    imports: [
        CommonModule,
        DashboardsRoutingModule,
        PrimeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSelectModule,
        MenubarModule
    ],

  providers: [CustomerService, OrdersService, MessageService, PackageService, ConfirmationService, MovimientosService, DatePipe]

})
export class DashboardModule { }

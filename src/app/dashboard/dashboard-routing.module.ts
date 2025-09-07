import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { MainComponent } from "./pages/main/main.component";
import { ReportePageComponent } from "./pages/reporte/reporte.component";

import { ControlComponent } from "./pages/control/control.component";
import { ClientListComponent } from "./pages/client-list/client-list.component";
import { OrderListComponent } from "./pages/order-list/order-list.component";
import { DepositComponent } from "./pages/deposit/deposit.component";
import { ClientDetailComponent } from "./pages/client-detail/client-detail.component";
import { AgregarPaqueteComponent } from "./pages/agregar-paquete/agregar-paquete.component";
import { RetireComponent } from "./pages/retire/retire.component";
import { PackageListComponent } from "./pages/package-list/package-list.component";
import { RequestComponent } from "./pages/request/request.component";
import { MovementsListComponent } from "./pages/movements-list/movements-list.component";
import { GraficosComponent } from "./pages/graficos/graficos.component";

const routes: Routes = [
	{
		path: "",
		component: MainComponent,
		children: [
			{ path: "graficos", component: GraficosComponent },
			{ path: "control", component: ControlComponent },
			{ path: "clientList", component: ClientListComponent },
			{ path: "deposit", component: DepositComponent },
			{ path: "clientDetail", component: ClientDetailComponent },
			{ path: "orderlist", component: OrderListComponent },
			{ path: "retire", component: RetireComponent },
			{ path: "request", component: RequestComponent },
			{ path: "movementslist", component: MovementsListComponent },

			// ✅ NUEVA RUTA para el PDF
			{ path: "reporte", component: ReportePageComponent },

			{ path: "**", redirectTo: "control" },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes), CommonModule],
	exports: [RouterModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardsRoutingModule {}

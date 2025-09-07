import { Component, OnInit } from "@angular/core";
import { UtilService } from "../../../shared/util.service";
import { AuthService } from "../../../auth/services/auth.service";
import { Router } from "@angular/router";

import { MenuItem } from "primeng/api";

@Component({
	selector: "app-sidenav",
	templateUrl: "./sidenav.component.html",
	styleUrls: ["./sidenav.component.css"],
})
export class SidenavComponent implements OnInit {
	items: MenuItem[] = [];
	width: number = window.screen.width;

	get usuario() {
		console.log(this.authService.usuario);
		return this.authService.usuario;
	}

	role: number = this.authService.getRole();

	constructor(
		private util: UtilService,
		private authService: AuthService,
		private router: Router
	) {}

	ngOnInit(): void {
		if (this.role === 1) {
			this.items = [
				{
					label: "Dashboard",
					icon: "pi pi-fw pi-home",
					command: (event) => {
						this.goToStep("dashboard");
					},
					styleClass: "dashboardItem",
				},
				{
					label: "Gráficos",
					icon: "pi pi-fw pi-chart-line",
					command: (event) => {
						this.goToStep("dashboard/graficos");
					},
				},
				{
					label: "Lista de Clientes",
					icon: "pi pi-fw pi-user",
					command: (event) => {
						this.goToStep("dashboard/clientList");
					},
				},
				{
					label: "Lista de Ordenes",
					icon: "pi pi-fw pi-calendar-minus",
					command: (event) => {
						this.goToStep("dashboard/orderlist");
					},
				},
				{
					label: "Solicitudes",
					icon: "pi pi-fw pi-align-justify",
					command: (event) => {
						this.goToStep("dashboard/request");
					},
				},
				{
					label: "Movimientos",
					icon: "pi pi-fw pi-globe",
					command: (event) => {
						this.goToStep("dashboard/movementslist");
					},
				},
				{
					label: "Detalle Cuenta",
					icon: "pi pi-fw pi-user",
					command: (event) => {
						this.goToStep("dashboard/clientDetail");
					},
				},
				{
					label: "Cerrar sesión",
					icon: "pi pi-fw pi-sign-out",
					command: (event) => {
						this.goToStep("login");
					},
					styleClass: "logOutItem",
				},
			];
		} else if (this.role === 2) {
			this.items = [
				{
					label: "Dashboard",
					icon: "pi pi-fw pi-home",
					command: (event) => {
						this.goToStep("dashboard");
					},
					styleClass: "dashboardItem",
				},
				{
					label: "Gráficos",
					icon: "pi pi-fw pi-chart-line",
					command: (event) => {
						this.goToStep("dashboard/graficos");
					},
				},
				{
					label: "Cliente",
					disabled: true,
					styleClass: "clienteItem",
				},
				{
					label: "Lista de Ordenes",
					icon: "pi pi-fw pi-calendar-minus",
					command: (event) => {
						this.goToStep("dashboard/orderlist");
					},
				},
				{
					label: "Depósito",
					icon: "pi pi-fw pi-credit-card",
					command: (event) => {
						this.goToStep("dashboard/deposit");
					},
				},
				{
					label: "Retiro",
					icon: "pi pi-fw pi-sync",
					command: (event) => {
						this.goToStep("dashboard/retire");
					},
				},
				{
					label: "Detalle Cuenta",
					icon: "pi pi-fw pi-user",
					command: (event) => {
						this.goToStep("dashboard/clientDetail");
					},
				},
				{
					label: "Movimientos",
					icon: "pi pi-fw pi-calendar-minus",
					command: (event) => {
						this.openMovements();
					},
				},
				{
					label: "Cerrar sesión",
					icon: "pi pi-fw pi-sign-out",
					command: (event) => {
						this.goToStep("login");
					},
					styleClass: "dashboardItem",
				},
			];
		}
		this.items.forEach((item, index: number) => {
			this.items[index].styleClass =
				this.items[index].styleClass + " itemClasses mat-typography";
		});
	}

	goToStep(step: string) {
		this.authService.logout();
		this.util.goToStep(step);
	}

	openMovements() {
		const byClient = true;
		this.router.navigate(["/dashboard/movementslist"], {
			queryParams: { byClient },
		});
	}
}

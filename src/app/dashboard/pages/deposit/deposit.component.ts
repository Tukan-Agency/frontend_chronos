import { Component } from "@angular/core";
import { MenuItem, MessageService } from "primeng/api";
import { Request } from "../../interfaces/request";
import { RequestService } from "../../services/request.service";
import { ActivatedRoute, Router } from "@angular/router";
import { OrdersService } from "../../services/orders.service";

@Component({
	selector: "app-deposit",
	templateUrl: "./deposit.component.html",
	styleUrls: ["./deposit.component.css"],
})
export class DepositComponent {
	items: MenuItem[];
	itemActivo: number = 2;
	activeItem: MenuItem;
	date = new Date();
	ibanAccount: string = "";
	bankName: string = "";
	numberAccount: number = 0;
	requestedValue: number = 0;

	//TODO: give this responsability to the database
	bankData: object = {
		Ecuador: [
			"Banco Guayaquil",
			"Banco Pichincha",
			"Red Activa",
			"Mi Comisariato",
			"Farmacias 911",
			"Tía",
			"Tarjeta de Crédito o Débito",
		],
		Chile: [
			"Banco BCI",
			"BANCO TBANC",
			"aCuenta",
			"Express Líder",
			"Líder",
			"ServiEstado",
			"Caja Vecina",
			"Mach",
			"Banco Estado",
			"Khipu",
			"Khipu Banco Estado",
			"Khipu BCI",
			"Tarjeta de Crédito o Débito",
		],
		"Costa Rica": ["Banco Nacional\n", "Tarjeta de Crédito o Débito"],
		Perú: [
			"BBVA Continental",
			"Banco de Crédito",
			"Caja Arequipa",
			"Caja Huancayo",
			"Caja Tacna",
			"Caja Trujillo",
			"Interbank",
			"Banco Ripley",
			"Scotibank Perú",
			"Tambo",
			"Western Unión",
			"Tarjeta de Crédito o Débito",
		],
		México: [
			"Banco Azteca",
			"Banorte",
			"HSBC México",
			"OpenPay",
			"SPEI MX",
			"Banco Santander",
			"Scotibank México",
			"Tarjeta de Crédito o Débito",
		],
		"El Salvador": ["Punto Xpress SLV", "Tarjeta de Crédito o Débito"],
		Colombia: ["Efecty", "PSE", "Tarjeta de Crédito o Débito"],
		USA: ["Evolve Bank & Trust", "Tarjeta de Crédito o Débito"],
		Bolivia: ["Tarjeta de Crédito o Débito"],
		Nicaragua: ["Tarjeta de Crédito o Débito", "Criptomonedas"],
		Honduras: ["Tarjeta de Crédito o Débito", "Criptomonedas"],
		Panamá: ["Western Unión", "Tarjeta de Crédito o Débito"],
	};
	bankNames: Array<string> = Object.keys(this.bankData);
	selected = "Null";
	bankOptions: Array<string> = [];

	constructor(
		private requestServices: RequestService,
		private router: ActivatedRoute,
		private messageService: MessageService,
		private ordersServices: OrdersService,
		private route: Router
	) {
		this.items = [
			// {id: '1', label: 'Debito o Tarjeta de Credito', icon: 'pi pi-id-card', command: e => this.prueba(e)},
			// { id: '1', label: 'Banco', icon: 'pi pi-fw pi-money-bill', command: e => this.prueba(e) },
			{
				id: "2",
				label: "Banco",
				icon: "pi pi-fw pi-money-bill",
				command: (e) => this.prueba(e),
			},
			// { id: '3', label: 'Paypal', icon: 'pi pi-fw pi-money-bill', command: e => this.prueba(e) },
		];

		this.activeItem = this.items[0];
	}

	prueba(prueba: any) {
		this.itemActivo = Number(prueba.item.id);
	}

	getBankOptions(data: any) {
		this.bankOptions = this.findValueByPrefix(this.bankData, data);
	}

	clearInputs() {
		(this.ibanAccount = ""),
			(this.bankName = ""),
			(this.numberAccount = 0),
			(this.requestedValue = 0);
	}

	findValueByPrefix(object: any, prefix: string) {
		for (var property in object) {
			if (
				object.hasOwnProperty(property) &&
				property.toString().startsWith(prefix)
			) {
				return object[property];
			}
		}
	}

	createRequest() {
		const newDate = new Date();
		let depositNew: Request = {
			_id: "",
			clientId: "",
			clientName: "",
			ibanAccount: "",
			bankName: this.bankName,
			numberAccount: "",
			requestedValue: this.requestedValue,
			requestStatus: "Creado",
			requestDate: newDate,
			requestType: "Deposito",
		};
		// numberAccount: this.numberAccount,
		// ibanAccount: this.ibanAccount,
		this.requestServices.createRequest(depositNew).subscribe((resp: any) => {
			this.messageService.clear();
			this.messageService.add({
				severity: "success",
				summary: "Ok",
				detail: "Solicitud de Deposito Exitoso",
			});
			this.clearInputs();
			setTimeout(() => {
				this.route.navigate(["/dashboard"]);
			}, 2000);
		});
	}
}

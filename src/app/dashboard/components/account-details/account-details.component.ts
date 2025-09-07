import { Component, Input, OnInit } from "@angular/core";
import { Charts } from "../../interfaces/charts";
import { OrdersService } from "../../services/orders.service";
import { Order, OrderList } from "../../interfaces/order-customer";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Component({
	selector: "app-account-details",
	templateUrl: "./account-details.component.html",
	styleUrls: ["./account-details.component.css"],
})
export class AccountDetailsComponent implements OnInit {
	orderClient: any;
	@Input() dataChart: Charts;
	@Input() showOrdenChart: boolean = false;
	ordersList: OrderList[] = [];
	orders: any = [];
	total: number = 0;
	nameClient: string = "";
	date = new Date();
	balance: number = 0;
	userID: string | null | undefined;
	operationActionsValue: number = 0;
	sequenceID?: number = 0;
	private byClient: boolean = false;

	constructor(
		private ordersServices: OrdersService,
		private router: ActivatedRoute
	) {
		this.dataChart = {
			labels: [],
			datasets: [
				{
					label: "",
					backgroundColor: "",
					data: [],
				},
			],
		};
		this.router.queryParams.subscribe((params) => {
			this.byClient = params["byClient"];
		});
	}

	ngOnInit(): void {
		let service: Observable<any>;

		if (this.byClient) {
			// OBTENER POR CLIENTE
			service = this.ordersServices.getOrdersByClient();
			this.sequenceID = this.ordersServices.usuario.sequenceId;
		} else {
			// OBTENER TODOS
			service = this.ordersServices.getOrdersByClientNoAdmin();
			this.sequenceID = this.ordersServices.usuarioLogin.sequenceId;
		}

		this.ordersList = [];
		service.subscribe((ordenes: any) => {
			console.log(this.ordersServices.usuario.sequenceId, "this.orders");
			this.orders = ordenes.ordenes;
			this.orders.forEach((order: any) => {
				order.operationActions.forEach((operarion: any) => {
					if (order.isCapital) {
						this.balance += operarion.benefit * operarion.quantity;
					}
				});
				this.balance += order.operationValue;
			});
			this.userID = this.ordersServices.usuarioLogin._id;
		});

		const user = this.ordersServices.getUserName();
		this.nameClient = `${user.name} ${user.surname}`;
	}

	paddy(num: number, padlen: number, padchar?: string): string {
		var pad_char = typeof padchar !== "undefined" ? padchar : "0";
		var pad = new Array(1 + padlen).join(pad_char);
		return (pad + num).slice(-pad.length);
	}
}

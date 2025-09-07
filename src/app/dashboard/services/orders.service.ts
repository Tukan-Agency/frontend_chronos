import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Order, OrderResponse } from "../interfaces/order-customer";
import { environment } from "../../../environments/environment.prod";
import { catchError, map, Observable, of, tap } from "rxjs";
import { CustomerService } from "./customer.service";
import { AuthService } from "../../auth/services/auth.service";
import { Cliente } from "../interfaces/clients";

@Injectable({
	providedIn: "root",
})
export class OrdersService {
	private baseUrl: string = environment.baseUrl;

	get usuario() {
		return this.clientService.usuarioSeleccionado;
	}

	get usuarioLogin() {
		return this.authService.usuario;
	}

	constructor(
		private http: HttpClient,
		private clientService: CustomerService,
		private authService: AuthService
	) {}

	getUserName() {
		const user = {
			name: this.usuario.name,
			surname: this.usuario.surname,
		};
		return user;
	}

	getUserID() {
		const usuario = this.clientService.usuarioSeleccionado;
		return usuario._id;
	}

	getCustomersLarges() {
		return this.http
			.get<any>("assets/orders-large.json")
			.toPromise()
			.then((res) => <Order[]>res.datas)
			.then((datas) => {
				return datas;
			});
	}

	getFormatedDate(inputDate: Date | string) {
		let date = new Date(inputDate);

		let day: number | string = date.getUTCDate();
		let month: number | string = date.getUTCMonth() + 1;
		let year: number | string = date.getUTCFullYear();

		return { day, month, year };
	}

	updateOperationValue(
		orden: Order,
		operationActions: Actions,
		editDate: any = false
	) {
		let body: {
			_id: string | undefined;
			operationActions: any;
			operationDate?: any;
		} = {
			_id: orden._id,
			operationActions: operationActions,
		};
		if (editDate) {
			body.operationDate = new Date(editDate);
		}

		console.log(body);
		const url = `${this.baseUrl}/orders/update`;
		return this.http.put<any>(url, body).pipe(
			map((resp) => {
				return resp;
			})
		);
	}

	// Delete operation

	deleteOrder(orden: Order) {
		const url = `${this.baseUrl}/orders/delete/${orden._id}`;
		console.log(url);
		return this.http.delete<any>(url).pipe(
			map((resp) => {
				return resp;
			})
		);
	}

	// REGISTRAR ORDEN
	registro(orden: Order) {
		const url = `${this.baseUrl}/orders/new`;
		orden.clientId = this.usuario._id;
		const body = { orden };

		return this.http.post<OrderResponse>(url, body).pipe(
			tap(({ ok }) => {}),
			map((resp) => resp.ok),
			catchError((err) => of(err.error.msg))
		);
	}

	// Obtener Ordenes
	getOrders(): Observable<any> {
		const url = `${this.baseUrl}/orders/all`;

		return this.http.get(url).pipe(
			map((resp) => {
				return resp;
			})
		);
	}

	// Obtener por cliente
	getOrdersByClient(clientId: Cliente = this.usuario): Observable<any> {
		const client = clientId;

		const url = `${this.baseUrl}/orders/client`;
		const headers = new HttpHeaders().set("x-clientId", client._id || "");

		return this.http.get(url, { headers }).pipe(
			map((resp) => {
				return resp;
			})
		);
	}

	// Obtener por cliente
	getOrdersByClientNoAdmin(): Observable<any> {
		const client = this.usuarioLogin;

		const url = `${this.baseUrl}/orders/client`;
		const headers = new HttpHeaders().set("x-clientId", client._id || "");

		return this.http.get(url, { headers }).pipe(
			map((resp) => {
				return resp;
			})
		);
	}

	// ACTUALIZAR ESTADO
	updateStatus(orden: Order, status: string) {
		const body = {
			_id: orden._id,
			status: status,
		};
		const url = `${this.baseUrl}/orders/update/status`;
		return this.http.post<any>(url, body).pipe(
			map((resp) => {
				return resp;
			})
		);
	}

	// ACTUALIZAR ESTADO
	updateStatusFinalizado(orden: Order, status: string, operationValue: number) {
		const body = {
			_id: orden._id,
			status: status,
			operationValue: operationValue,
			operationActions: orden.operationActions,
			isWithdrawl: orden.isWithdrawl,
		};
		const url = `${this.baseUrl}/orders/update/status/end`;
		return this.http.post<any>(url, body).pipe(
			map((resp) => {
				return resp;
			})
		);
	}
}

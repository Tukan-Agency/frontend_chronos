import { Component, OnInit, ViewChild } from "@angular/core";
import { CustomerService } from "../../services/customer.service";
import { Cliente, Clientes, Currency, Country } from "../../interfaces/clients";
import { UtilService } from "../../../shared/util.service";
import { CountryApi, Root } from "../../../shared/interfaces/country.interface";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { FormGroup, Validators } from "@angular/forms";

@Component({
	selector: "app-clients-table",
	templateUrl: "./clients-table.component.html",
	styleUrls: ["./clients-table.component.css"],
})
export class ClientsTableComponent implements OnInit {
	countries: CountryApi[] = [];
	currencys: any[] = [];
	concact: string = "";
	date = new Date();
	customers: Cliente[] = [];
	selectedCustomers: Cliente[] = [];
	client: Cliente;
	idSelector: string = "";
	sequenceID: string = "";
	name: string = "";
	surname: string = "";
	birthday = this.date;
	email: string = "";
	contactNumber: number = 0;
	whatsapp: number = 0;
	address: string = "";
	country: CountryApi = {
		flags: {
			png: "",
			svg: "",
		},
		cca2: "",
		currencies: {
			"": {
				name: "",
				symbol: "",
			},
		},
		idd: {
			root: Root.The6,
			suffixes: [""],
		},
		translations: {
			"": {
				official: "",
				common: "",
			},
		},
	};
	selectedCountry: Country = {
		name: "",
		code: "",
		flag: "",
	};
	company: string = "";
	currency: Currency = { name: "" };
	changeUserPassword: string = "";
	confirmUserPassword: string = "";
	displayMore: boolean = false;
	displayModel: boolean = false;
	displayOrden: boolean = false;
	width: number = window.screen.width;
	displayModelConfirmDelete: boolean = false;
	currentCustomer: any;

	@ViewChild("dt") dt: Table | undefined;

	constructor(
		private router: Router,
		private customerService: CustomerService,
		private utilService: UtilService,
		private messageService: MessageService
	) {
		this.getCountries();
		this.currencys = [
			{ name: "BDT" },
			{ name: "EUR" },
			{ name: "XOF" },
			{ name: "BGN" },
			{ name: "BAM" },
			{ name: "BBD" },
			{ name: "XPF" },
			{ name: "BMD" },
			{ name: "BND" },
			{ name: "BOB" },
			{ name: "BHD" },
			{ name: "BIF" },
			{ name: "BTN" },
			{ name: "JMD" },
			{ name: "NOK" },
			{ name: "BWP" },
			{ name: "WST" },
			{ name: "BRL" },
			{ name: "BSD" },
			{ name: "GBP" },
			{ name: "BYR" },
			{ name: "BZD" },
			{ name: "RUB" },
			{ name: "RWF" },
			{ name: "RSD" },
			{ name: "TMT" },
			{ name: "TJS" },
			{ name: "RON" },
			{ name: "NZD" },
			{ name: "GTQ" },
			{ name: "XAF" },
			{ name: "JPY" },
			{ name: "GYD" },
			{ name: "GEL" },
			{ name: "XCD" },
			{ name: "GNF" },
			{ name: "GMD" },
			{ name: "DKK" },
			{ name: "GIP" },
			{ name: "GHS" },
			{ name: "OMR" },
			{ name: "TND" },
			{ name: "JOD" },
			{ name: "HRK" },
			{ name: "HTG" },
			{ name: "HUF" },
			{ name: "HKD" },
			{ name: "HNL" },
			{ name: "AUD" },
			{ name: "VEF" },
			{ name: "ILS" },
			{ name: "PYG" },
			{ name: "IQD" },
			{ name: "PAB" },
			{ name: "PGK" },
			{ name: "PEN" },
			{ name: "PKR" },
			{ name: "PHP" },
			{ name: "PLN" },
			{ name: "ZMK" },
			{ name: "MAD" },
			{ name: "EGP" },
			{ name: "ZAR" },
			{ name: "VND" },
			{ name: "SBD" },
			{ name: "ETB" },
			{ name: "SOS" },
			{ name: "ZWL" },
			{ name: "SAR" },
			{ name: "ERN" },
			{ name: "MDL" },
			{ name: "MGA" },
			{ name: "UZS" },
			{ name: "MMK" },
			{ name: "MOP" },
			{ name: "MNT" },
			{ name: "MKD" },
			{ name: "MUR" },
			{ name: "MWK" },
			{ name: "MVR" },
			{ name: "MRO" },
			{ name: "UGX" },
			{ name: "TZS" },
			{ name: "MYR" },
			{ name: "MXN" },
			{ name: "SHP" },
			{ name: "FJD" },
			{ name: "FKP" },
			{ name: "NIO" },
			{ name: "NAD" },
			{ name: "VUV" },
			{ name: "NGN" },
			{ name: "NPR" },
			{ name: "CHF" },
			{ name: "COP" },
			{ name: "CNY" },
			{ name: "CLP" },
			{ name: "CAD" },
			{ name: "CDF" },
			{ name: "CZK" },
			{ name: "CRC" },
			{ name: "ANG" },
			{ name: "CVE" },
			{ name: "CUP" },
			{ name: "SZL" },
			{ name: "SYP" },
			{ name: "KGS" },
			{ name: "KES" },
			{ name: "SSP" },
			{ name: "SRD" },
			{ name: "KHR" },
			{ name: "KMF" },
			{ name: "STD" },
			{ name: "KRW" },
			{ name: "KPW" },
			{ name: "KWD" },
			{ name: "SLL" },
			{ name: "SCR" },
			{ name: "KZT" },
			{ name: "KYD" },
			{ name: "SGD" },
			{ name: "SEK" },
			{ name: "SDG" },
			{ name: "DOP" },
			{ name: "DJF" },
			{ name: "YER" },
			{ name: "DZD" },
			{ name: "UYU" },
			{ name: "LBP" },
			{ name: "LAK" },
			{ name: "TWD" },
			{ name: "TTD" },
			{ name: "TRY" },
			{ name: "LKR" },
			{ name: "TOP" },
			{ name: "LTL" },
			{ name: "LRD" },
			{ name: "LSL" },
			{ name: "THB" },
			{ name: "LYD" },
			{ name: "AED" },
			{ name: "AFN" },
			{ name: "ISK" },
			{ name: "IRR" },
			{ name: "AMD" },
			{ name: "ALL" },
			{ name: "AOA" },
			{ name: "USD" },
			{ name: "ARS" },
			{ name: "AWG" },
			{ name: "INR" },
			{ name: "AZN" },
			{ name: "IDR" },
			{ name: "UAH" },
			{ name: "QAR" },
			{ name: "MZN" },
		];
		this.client = {
			currency: this.currency,
			_id: "",
			name: "",
			surname: "",
			birthday: this.date,
			email: "",
			address: "",
			company: "",
			contactNumber: 0,
			whatsapp: 0,
			__v: 0,
			country: {
				name: "",
				code: "",
				flag: "",
			},
			password: "",
		};
	}

	ngOnInit(): void {
		this.getClient();
	}

	getClient() {
		this.customerService.getClients().subscribe((clientes: Clientes) => {
			console.log(clientes.clientes[5], "clientes");
			this.customers = clientes.clientes;
		});
	}

	getCountries() {
		this.utilService.getCountries().subscribe((paises) => {
			paises.sort((a, b) =>
				a.translations["spa"].common > b.translations["spa"].common ? 1 : -1
			);
			paises.forEach((x) => {
				this.countries.push(x);
			});
		});
	}

	setCurrency(country: any) {
		this.utilService.getCurrencies().then((currencies) => {
			const currency = currencies[country.code];
			this.currency = { name: currency };
		});
		this.selectedCountry = {
			name: country.name,
			code: country.code,
			flag: country.flag,
		};
	}

	setCurrencyDropBox(country: CountryApi) {
		this.utilService.getCurrencies().then((currencies) => {
			const currency = currencies[country.cca2];
			this.currency = { name: currency };
		});
		this.selectedCountry = {
			name: country.translations["spa"].common,
			code: country.cca2,
			flag: country.flags.png,
		};
	}

	paddy(num: number, padlen: number, padchar?: string): string {
		var pad_char = typeof padchar !== "undefined" ? padchar : "0";
		var pad = new Array(1 + padlen).join(pad_char);
		return (pad + num).slice(-pad.length);
	}

	showMore(clients: Cliente) {
		this.client = clients;
		this.displayMore = true;
	}

	openEditClient(customers: Cliente) {
		this.selectedCustomers.push(customers);
		this.idSelector = customers._id;
		this.name = this.selectedCustomers[0].name;
		this.surname = this.selectedCustomers[0].surname;
		this.birthday = this.selectedCustomers[0].birthday;
		this.email = this.selectedCustomers[0].email;
		this.contactNumber = this.selectedCustomers[0].contactNumber;
		this.whatsapp = this.selectedCustomers[0].whatsapp;
		this.address = this.selectedCustomers[0].address;
		this.setCurrency(this.selectedCustomers[0].country);
		this.company = this.selectedCustomers[0].company;
		this.displayModel = true;
	}

	deleteUser() {
		this.customerService
			.deleteClient(this.currentCustomer)
			.subscribe((cliente: Cliente) => {
				this.selectedCustomers = [];
				this.getClient();
				this.displayModel = false;
				this.closeConfirmDelete();
				this.messageService.clear();
				this.messageService.add({
					severity: "success",
					summary: "Ok",
					detail: "Cliente eliminado",
				});
			});
	}

	confirmDelete(customers: Cliente) {
		this.currentCustomer = customers;
		this.displayModelConfirmDelete = true;
	}

	closeConfirmDelete() {
		this.displayModelConfirmDelete = false;
	}

	deleteData() {
		this.displayModel = false;
		this.selectedCustomers = [];
	}

	verOrden() {
		this.displayOrden = true;
	}

	openOrder(client: Cliente) {
		const byClient = true;
		this.customerService.setClientSelected(client);
		this.router.navigate(["/dashboard/orderlist"], { queryParams: { byClient } });
	}
	descargarPDF(cliente: Cliente) {
		this.customerService.setClientSelected(cliente);
		this.router.navigate(["/dashboard/reporte"]);
	}

	updateClient() {
		const clienteUpdate: Cliente = {
			_id: this.idSelector,
			name: this.name,
			surname: this.surname,
			birthday: this.birthday,
			email: this.email,
			address: this.address,
			company: this.company,
			contactNumber: this.contactNumber,
			whatsapp: this.whatsapp,
			country: this.selectedCountry,
			currency: this.currency,
			password: "",
			__v: 0,
		};
		if (this.confirmUserPassword !== "" || this.changeUserPassword !== "") {
			console.log("gato", this.confirmUserPassword, this.changeUserPassword);
			if (this.confirmUserPassword !== "" && this.changeUserPassword !== "") {
				if (this.confirmUserPassword === this.changeUserPassword) {
					if (this.changeUserPassword.length >= 8) {
						const regex = new RegExp(
							"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$"
						);
						if (regex.test(this.changeUserPassword)) {
							clienteUpdate.password = this.changeUserPassword;
							console.log(clienteUpdate, "clienteUpdate");
							this.customerService
								.updateClient(clienteUpdate)
								.subscribe((cliente: Cliente) => {
									this.selectedCustomers = [];
									this.getClient();
									this.displayModel = false;
									this.messageService.clear();
									this.messageService.add({
										severity: "success",
										summary: "Ok",
										detail: "Cliente Actualizado",
									});
								});
						} else {
							this.messageService.clear();
							this.messageService.add({
								severity: "error",
								summary: "Error",
								detail:
									"La contraseña necesita al menos una mayuscula, una minuscula, un número y un signo",
							});
						}
					} else {
						this.messageService.clear();
						this.messageService.add({
							severity: "error",
							summary: "Error",
							detail: "La contraseña es muy corta",
						});
					}
				} else {
					this.messageService.clear();
					this.messageService.add({
						severity: "error",
						summary: "Error",
						detail: "Las contraseñas no coinciden",
					});
				}
			} else {
				this.messageService.clear();
				this.messageService.add({
					severity: "error",
					summary: "Error",
					detail: "Ambos campos de contraseña, deben estar ocupados",
				});
			}
		} else {
			console.log("perro", this.confirmUserPassword, this.changeUserPassword);
			this.customerService
				.updateClient(clienteUpdate)
				.subscribe((cliente: Cliente) => {
					this.selectedCustomers = [];
					this.getClient();
					this.displayModel = false;
					this.messageService.clear();
					this.messageService.add({
						severity: "success",
						summary: "Ok",
						detail: "Cliente Actualizado",
					});
				});
		}
	}

	applyFilterGlobal($event: any, string: string) {
		this.dt?.filterGlobal(($event.target as HTMLInputElement).value, string);
	}
}

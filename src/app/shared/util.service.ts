import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CountryApi } from "./interfaces/country.interface";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class UtilService {
	private apiCountries: string = "https://restcountries.com/v3.1";

	get httpParams() {
		return new HttpParams().set(
			"fields",
			"cca2,currencies,idd,translations,flags"
		);
	}

	constructor(private router: Router, private http: HttpClient) {}

	goToStep(step: string, params?: any) {
		this.router.navigate([step], {
			queryParams: { params },
		});
	}

	// Obtener paises
	getCountries(): Observable<CountryApi[]> {
		const url = "assets/all-countries-information.json";
		return this.http.get<CountryApi[]>(url);
	}

	getCurrencies() {
		return this.http
			.get<any>("assets/countries-currency.json")
			.toPromise()
			.then((data) => {
				return data;
			});
	}
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { MessageService } from 'primeng/api';
import {Cliente, Country, Currency} from "../../interfaces/clients";
import {CountryApi} from "../../../shared/interfaces/country.interface";
import {UtilService} from "../../../shared/util.service";
import {CustomerService} from "../../services/customer.service";
import {Usuario} from "../../../auth/interfaces/interface";

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  currencys: any[] = [];
  countries: CountryApi[] = [];
  idSelector: string = '';
  name: string = '';
  surname: string = '';
  birthday: Date = new Date();
  email: string = '';
  contactNumber: number = 0;
  whatsapp: number = 0;
  address: string = '';
  company: string = '';
  displayModel: boolean = false;
  windowWidth: number = window.screen.width
  currency: any = { name: '' };
  changeUserPassword: string = '';
  confirmUserPassword: string = '';
  selectedCountry: Country = {
    name: '',
    code: '',
    flag: ''
  }
  usuario : any;

  newPassword: string = '';
  role: number = this.authService.getRole();
  country: any;

  constructor(private customerService: CustomerService ,private authService: AuthService, private messageService: MessageService, private utilService: UtilService) {
    this.usuario = this.authService.usuario;
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
    this.currency = this.usuario.currency
  }

  ngOnInit(recharge:Cliente | boolean = false): void {
    const id: any = this.usuario._id
    this.idSelector = id;
    this.name = this.usuario.name;
    this.surname = this.usuario.surname;
    this.birthday = this.usuario.birthday;
    this.email = this.usuario.email;
    this.contactNumber = this.usuario.contactNumber;
    this.address = this.usuario.address;
    this.company = this.usuario.company;
  }

  getCountries() {
    this.utilService.getCountries().subscribe((paises) => {
      paises.sort((a, b) => a.translations['spa'].common > b.translations['spa'].common ? 1 : -1)
      paises.forEach(x => {
        this.countries.push(x);
      });
    });
  }

  setCurrencyDropBox(country: CountryApi) {
    this.utilService.getCurrencies().then(currencies => {
      const currency = currencies[country.cca2]
      this.currency = { name: currency };
    });
    this.selectedCountry = {
      name: country.translations['spa'].common,
      code: country.cca2,
      flag: country.flags.png
    }
  }

  openEditClient() {
    const id: any = this.usuario._id;
    const whatsapp: any = this.usuario.whatsapp;
    this.idSelector = id;
    this.name = this.usuario.name;
    this.surname = this.usuario.surname;
    this.birthday = this.usuario.birthday;
    this.email = this.usuario.email;
    this.contactNumber = this.usuario.contactNumber;
    this.whatsapp = whatsapp;
    this.address = this.usuario.address;
    this.setCurrency(this.usuario.country);
    this.company = this.usuario.company;
    this.displayModel = true;
  }

  deleteData() {
    this.displayModel = false;
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
      country: this.selectedCountry.name === '' ? this.usuario.country : this.selectedCountry,
      currency: this.currency,
      password: '',
      __v: 0
    }
    if(this.confirmUserPassword !== '' || this.changeUserPassword !== ''){
      if(this.confirmUserPassword !== '' && this.changeUserPassword !== ''){
        if(this.confirmUserPassword === this.changeUserPassword){
          clienteUpdate.password = this.changeUserPassword
        }else{
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden' });
        }
      }else{
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ambos campos de contraseña, deben estar ocupados' });
      }
    }else{
      this.customerService.updateClient(clienteUpdate).subscribe((cliente: Cliente) => {

        this.usuario = {
          name: this.name ,
          _id: this.idSelector,
          email: this.email,
          surname: this.surname,
          contactNumber: this.contactNumber,
          address: this.address,
          birthday: this.birthday,
          company: this.company,
          country: this.country,
          whatsapp: this.whatsapp,
          currency: this.currency,
          role: this.usuario.role,
        }
        this.displayModel = false;
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'Ok', detail: 'Cliente Actualizado' });
      })
    }
  }

  cambiarPassword() {
    if (this.newPassword === '') {
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campo vacio' });
    } else {
        this.authService.changePass(this.newPassword, this.usuario._id!).subscribe((res: any) => {
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Ok', detail: 'Contraseña actualizada' });
        });
    }
  }

  private setCurrency(country: { name: string; code: string; flag: string }) {
    return country
  }
}

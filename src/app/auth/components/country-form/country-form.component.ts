import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../shared/util.service';
import { CountryApi } from '../../../shared/interfaces/country.interface';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CountryFormComponent {
  countries: CountryApi[] = [];
  currencys: any[] = [];
  concact: string = '';
  
  countryForm: FormGroup = this.fb.group({
    country: ['', [Validators.required]],
    checked: [false],
    ext: [{ value: this.concact, disabled: true }],
    currency: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private utilService: UtilService) {
    this.obtenerPaises();
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
  }

  obtenerPaises() {
    this.utilService.getCountries().subscribe((paises) => {
      paises.sort((a,b) => a.translations['spa'].common > b.translations['spa'].common ? 1 : -1)
      paises.forEach(x => {
        this.countries.push(x);
      });
    });
    
  }

  setData() {
    this.concact = '' + this.countryForm.value.country.idd.root + '' + this.countryForm.value.country.idd.suffixes[0];
    this.countryForm.controls['ext'].setValue(this.concact);
    this.utilService.getCurrencies().then(currencies => {
      const currency = currencies[this.countryForm.value.country.cca2];
      this.countryForm.controls['currency'].setValue({ name: currency });
    });
    localStorage.setItem('countryForm', JSON.stringify(this.countryForm.value));
  }

  nextStep() {
    this.authService.setNewUser('country', this.countryForm.value);
    this.router.navigate(['/auth/registro/password']);
  }

  previousStep() {
    this.router.navigate(['/auth/registro/contact']);
  }

}

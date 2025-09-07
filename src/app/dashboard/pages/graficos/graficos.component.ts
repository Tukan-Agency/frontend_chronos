import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-graficos",
  templateUrl: "./graficos.component.html",
  styleUrls: ["./graficos.component.css"],
})
export class GraficosComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Oculta el mensaje después de 5 segundos
    setTimeout(() => {
      const alertaCarga = document.getElementById('alertacarga');
      if (alertaCarga) {
        alertaCarga.style.display = 'none'; // Oculta el elemento
      }
    }, 3000);
  }

  onIframeLoad() {
    // Funcionalidad adicional si es necesario cuando el iframe termina de cargar
  }
}

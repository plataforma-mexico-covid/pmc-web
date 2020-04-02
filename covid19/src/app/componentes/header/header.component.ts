import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() tipoAyudaCambio = new EventEmitter();
  opcion = 'AMBOS';
  constructor() { }

  ngOnInit() {
  }

  actualizarTipoAyuda(tipo_ayuda) {
    this.opcion = tipo_ayuda;
    this.tipoAyudaCambio.emit(tipo_ayuda);
  }

}

import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../global/constants.service';

@Component({
  selector: 'app-lista-ayuda',
  templateUrl: './lista-ayuda.component.html',
  styleUrls: ['./lista-ayuda.component.css']
})
export class ListaAyudaComponent  {

  constructor(
    public _constantes: ConstantsService
  ) { }

}

import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { GlobalsComponent } from '../global/global.component';
import { ConstantsService } from '../global/constants.service';

declare var $: any;
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public modeWelcome: any;

  constructor(
    private _contantes: ConstantsService,
    private globales: GlobalsComponent
  ) { }

  ngOnInit() {
    console.log("WELCOME MODAL: " + $('#welcomwModal'));
    if (this.globales.usuario.token) {
      this.modeWelcome = "ONLY-WELCOME";
    } else {
      this.modeWelcome = "FULL-WELCOME";
    }
  }

}

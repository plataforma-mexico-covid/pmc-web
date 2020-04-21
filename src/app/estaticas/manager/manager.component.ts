import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  soporta_geolocacion = false;

  constructor() { }

  ngOnInit() {
    if (navigator.geolocation) {
      this.soporta_geolocacion = true;
    }
  }

}

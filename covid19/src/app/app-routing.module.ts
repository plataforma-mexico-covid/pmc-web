import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { ConfirmacionComponent } from './estaticas/confirmacion/confirmacion.component';
import { MapsMainComponent } from './estaticas/maps-main/maps-main.component';


const routes: Routes = [
  { path: '', redirectTo: 'maps', pathMatch: 'full' },
  {
    path: 'maps', component: MapsMainComponent
  },
  {
    path: 'confirmacion', component: ConfirmacionComponent
  },
  { path: '**', redirectTo: 'maps', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

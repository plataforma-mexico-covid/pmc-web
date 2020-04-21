import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmacionComponent } from './estaticas/confirmacion/confirmacion.component';
import { MapsMainComponent } from './estaticas/maps-main/maps-main.component';
import { CambiaPasswordComponent } from './estaticas/cambia-password/cambia-password.component';
import { ManagerComponent } from './estaticas/manager/manager.component';

const routes: Routes = [
  // { path: '', redirectTo: 'maps', pathMatch: 'full' },
  { path: 'maps', component: MapsMainComponent },
  { path: 'confirmacion/:token', component: ConfirmacionComponent },
  { path: 'recuperar/:token', component: CambiaPasswordComponent },
  { path: 'admin', component: ManagerComponent },
  { path: '**', redirectTo: 'maps', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

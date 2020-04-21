import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { HeaderComponent } from './componentes/header/header.component';
import { HeaderEstaticoComponent } from './componentes/header-estatico/header-estatico.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ServiciosService } from './componentes/servicios.service';
import { HttpClientModule } from '@angular/common/http';
import { AyudaComponent } from './componentes/ayuda/ayuda.component';
import { GlobalsComponent } from './componentes/global/global.component';
import { LoadingComponent } from './componentes/loading/loading.component';
import { ConstantsService } from './componentes/global/constants.service';
import { ListaAyudaComponent } from './componentes/lista-ayuda/lista-ayuda.component';
import { WelcomeComponent } from './componentes/welcome/welcome.component';
import { ConfirmacionComponent } from './estaticas/confirmacion/confirmacion.component';
import { MapsMainComponent } from './estaticas/maps-main/maps-main.component';
import { SesionComponent } from './componentes/sesion/sesion.component';
import { RecuperacionPasswordComponent } from './estaticas/recuperacion/recuperacion-password.component';
import { CambiaPasswordComponent } from './estaticas/cambia-password/cambia-password.component';
import { AyudaCiudadanoComponent } from './componentes/ayuda-ciudadano/ayuda-ciudadano.component';
declare const GOOGLE_MAPS_APIKEY: any;

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    HeaderComponent,
    HeaderEstaticoComponent,
    FooterComponent,
    InicioComponent,
    RegistroComponent,
    AyudaComponent,
    LoadingComponent,
    ListaAyudaComponent,
    WelcomeComponent,
    ConfirmacionComponent,
    MapsMainComponent,
    SesionComponent,
    RecuperacionPasswordComponent,
    CambiaPasswordComponent,
    AyudaCiudadanoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_MAPS_APIKEY()
    })
  ],
  providers: [
    ServiciosService,
    ConstantsService,
    GlobalsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
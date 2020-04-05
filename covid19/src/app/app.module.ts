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
    SesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHZ2GpuEYGqIQGoIyRSUqN1mPwkUtuf6k'
    })
  ],
  // AIzaSyAPj6sW4vJZ4q-cqREHWcbIDRHB3Rk8hoo
  providers: [
    ServiciosService,
    ConstantsService,
    GlobalsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// AIzaSyAPj6sW4vJZ4q-cqREHWcbIDRHB3Rk8hoo

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { NgxSpinnerModule } from "ngx-spinner";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { PreciosComponent } from './components/precios/precios.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { SeleccionarClienteComponent } from './components/seleccionar-cliente/seleccionar-cliente.component';
import { ListadoInscripcionesComponent } from './components/listado-inscripciones/listado-inscripciones.component';
import { HomeComponent } from './pages/home/home.component';
import { DetalleInscripcionComponent } from './components/detalle-inscripcion/detalle-inscripcion.component';
import { ListadorRutinasComponent } from './components/listador-rutinas/listador-rutinas.component';
import { AgregarRutinaComponent } from './components/agregar-rutina/agregar-rutina.component';
import { AgregarDietaComponent } from './components/agregar-dieta/agregar-dieta.component';
import { ListadoDietasComponent } from './components/listado-dietas/listado-dietas.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ListadoClientesComponent,
    AgregarClienteComponent,
    PreciosComponent,
    InscripcionComponent,
    SeleccionarClienteComponent,
    ListadoInscripcionesComponent,
    HomeComponent,
    DetalleInscripcionComponent,
    ListadorRutinasComponent,
    AgregarRutinaComponent,
    AgregarDietaComponent,
    ListadoDietasComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    BrowserAnimationsModule
    
  ],
  providers: [
    AngularFireAuth,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

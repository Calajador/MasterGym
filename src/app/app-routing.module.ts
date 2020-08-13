import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { AgregarDietaComponent } from './components/agregar-dieta/agregar-dieta.component';
import { AgregarRutinaComponent } from './components/agregar-rutina/agregar-rutina.component';
import { DetalleInscripcionComponent } from './components/detalle-inscripcion/detalle-inscripcion.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { ListadoDietasComponent } from './components/listado-dietas/listado-dietas.component';
import { ListadoInscripcionesComponent } from './components/listado-inscripciones/listado-inscripciones.component';
import { ListadorRutinasComponent } from './components/listador-rutinas/listador-rutinas.component';
import { PreciosComponent } from './components/precios/precios.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'inscripcion', component: InscripcionComponent},
  {path: 'listado-inscripciones', component: ListadoInscripcionesComponent},
  {path: 'inscripcion/:id', component: DetalleInscripcionComponent},
  {path: 'listado-clientes', component: ListadoClientesComponent },
  {path: 'agregar-cliente', component: AgregarClienteComponent },
  {path: 'editar-cliente/:clienteID', component: AgregarClienteComponent },
  {path: 'precios', component: PreciosComponent },
  {path: 'listado-rutinas', component: ListadorRutinasComponent },
  {path: 'agregar-rutina', component: AgregarRutinaComponent },
  {path: 'listado-dietas', component: ListadoDietasComponent },
  {path: 'agregar-dieta', component: AgregarDietaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

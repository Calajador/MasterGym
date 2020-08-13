import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from 'src/app/models/cliente';
import { Inscripcion } from 'src/app/models/inscripccion';
import { Precio } from 'src/app/models/precio';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { PreciosService } from 'src/app/services/precios.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  precioSeleccionado: Precio = new Precio();
  idPrecio: string = 'null';
  precios: Precio[] = new Array< Precio>();


  constructor(private db: AngularFirestore, private _pre: PreciosService, private _ins: InscripcionesService) { }

  ngOnInit(): void {
    this.obtener();
  }

  obtener() {
    this.precios = this._pre.getPrecios2();
  }
  asignarCliente(cliente: Cliente)
  {
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }

  eliminarCliente()
  {
    this.clienteSeleccionado = new Cliente();
    this.inscripcion.cliente = undefined;
  }


  guardar()
  {
    if(this.inscripcion.validar().esValido)
    {
      let inscripcionAgregar = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        precios: this.inscripcion.precios,
        subTotal: this.inscripcion.subTotal,
        iva: this.inscripcion.iva,
        total: this.inscripcion.total
      }
      this.db.collection('inscripciones').add(inscripcionAgregar).then((resultado)=>{
        this.inscripcion =  new Inscripcion();
        this.clienteSeleccionado = new Cliente();
        this.precioSeleccionado = new Precio();
        this.idPrecio = 'null'
        Swal.fire(
          'Hecho!',
          'Se ha agregado correctamente',
          'success'
        );
      });
    }
    else{
      // this.msj.mensajeAdvertencia('Advertencia',this.inscripcion.validar().mensaje )
      Swal.fire({
        icon: 'warning',
        title: 'Cuidadito',
        text: this.inscripcion.validar().mensaje,
      });
    }
   
  }

  selecionarPrecio(id: string)
  {
    if(id != "null")
    {
      this.precioSeleccionado = this.precios.find(x=> x.id == id);
      this.inscripcion.precios = this.precioSeleccionado.ref;

      this.inscripcion.subTotal = this.precioSeleccionado.costo;
      this.inscripcion.iva = this.inscripcion.subTotal * 0.15;
      this.inscripcion.total = this.inscripcion.subTotal  + this.inscripcion.iva;

      this.inscripcion.fecha = new Date();

      if(this.precioSeleccionado.tipoDuracion == 1)
      {
        let dias: number = this.precioSeleccionado.duracion;
        let fechaFinal = 
        new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias)
        this.inscripcion.fechaFinal = fechaFinal;
    
      }
      if(this.precioSeleccionado.tipoDuracion == 2)
      {
        let dias: number = this.precioSeleccionado.duracion * 7;
        let fechaFinal = 
        new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias)
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if(this.precioSeleccionado.tipoDuracion == 3)
      {
        let dias: number = this.precioSeleccionado.duracion * 15;
        let fechaFinal = 
        new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias)
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if(this.precioSeleccionado.tipoDuracion == 4)
      {

        let anio: number = this.inscripcion.fecha.getFullYear();
        let meses = this.precioSeleccionado.duracion + this.inscripcion.fecha.getMonth();
        let dia: number = this.inscripcion.fecha.getDate()
        let fechaFinal = 
        new Date(anio, meses ,dia )
        this.inscripcion.fechaFinal = fechaFinal;
      }
      if(this.precioSeleccionado.tipoDuracion == 5)
      {
        let anio: number = this.inscripcion.fecha.getFullYear() + this.precioSeleccionado.duracion;
        let meses = this.inscripcion.fecha.getMonth();
        let dia: number = this.inscripcion.fecha.getDate()
        let fechaFinal = 
        new Date(anio, meses ,dia )
        this.inscripcion.fechaFinal = fechaFinal;
      }
    }
    else
    {
      this.precioSeleccionado = new Precio();
      this.inscripcion.fecha = null;
      this.inscripcion.fechaFinal = null;
      this.inscripcion.precios = null;
      this.inscripcion.subTotal = 0;
      this.inscripcion.iva = 0;
      this.inscripcion.total = 0;
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {

  formularioCliente: FormGroup;
  porcentajeSubida: number = 0;
  nombreImagen: string;
  urlImagen: string;

  constructor(private fb: FormBuilder, private storage: AngularFireStorage,
              private _cli: ClientesService) { }

  ngOnInit(): void {
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      dni: [''],
      telefono: ['', Validators.required],
      imgURL: ['', Validators.required]
    })
  }

  agregar () {
    this.formularioCliente.value.imgURL = this.urlImagen;
    this._cli.createCliente(this.formularioCliente.value);
    this.formularioCliente.reset();
    Swal.fire(
      'Hecho!',
      'Has registrado al nuevo  cliente',
      'success'
    );
  }

  subirImagen(evento) {
    
      let archivo = evento.target.files[0];
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))
      let ruta = `clientes/${this.nombreImagen}`+ extension
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);

      tarea.then(() => {
      referencia.getDownloadURL()
        .subscribe((url) => {
          this.urlImagen = url; 
       });
      });

    tarea.percentageChanges()
      .subscribe((porcentaje) => {
        this.porcentajeSubida = parseInt(porcentaje.toString());
      });
    
  }
}

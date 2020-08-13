import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutinasService } from 'src/app/services/rutinas.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-agregar-rutina',
  templateUrl: './agregar-rutina.component.html',
  styleUrls: ['./agregar-rutina.component.scss']
})
export class AgregarRutinaComponent implements OnInit {

  formularioRutina: FormGroup;
  porcentajeSubida: number = 0;
  nombreImagen: string = "";
  urlImagen: string;

  constructor(private fb: FormBuilder, private storage: AngularFireStorage,
              private _rut: RutinasService) { }

  ngOnInit(): void {

    this.formularioRutina = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      nivel: ['', Validators.required],
      descripcion: ['', Validators.required],
      imgRutina: ['', Validators.required]
    })
  }

  agregar () {
    this.formularioRutina.value.imgRutina = this.urlImagen;
    this._rut.addRutina(this.formularioRutina.value)
    this.formularioRutina.reset()
    Swal.fire(
      'Hecho!',
      'Has registrado al nuevo  cliente',
      'success'
    );
  }



  subirImagen(evento) {
    
    let archivo = evento.target.files[0];
    let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))
    let ruta = `rutinas/${this.nombreImagen}`+ extension
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

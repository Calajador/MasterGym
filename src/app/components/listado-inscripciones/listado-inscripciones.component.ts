import { Component, OnInit } from '@angular/core';
import { Inscripcion } from 'src/app/models/inscripccion';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {

  inscripciones: any[] = [];
  constructor(private _ins: InscripcionesService) { 
    
  }

  ngOnInit(): void {
    this.obtener();
  }

  obtener() {
   this.inscripciones = this._ins.inscripciones
   console.log(this.inscripciones)
  }

  borrarInscripcion(event, incripcion) {
    Swal.fire({
      title: 'Seguro?',
      text: "No prodras volver atras",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si Borrar!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Borado!',
          'El archivo ha sido borrado.',
          'success'
        )
        
        this._ins.deleteIncripcion(incripcion);
        this.obtener();
      }
    })
  }

}

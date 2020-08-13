import { Component, OnInit } from '@angular/core';
import { Rutina } from 'src/app/models/rutina';
import { RutinasService } from 'src/app/services/rutinas.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-listador-rutinas',
  templateUrl: './listador-rutinas.component.html',
  styleUrls: ['./listador-rutinas.component.scss']
})
export class ListadorRutinasComponent implements OnInit {

  rutinasBasicas: Rutina[] = new Array<Rutina>();
  rutinasIntermedias: Rutina[] = new Array<Rutina>();
  rutinasAnavzadas: Rutina[] = new Array<Rutina>();

  constructor(private _rut: RutinasService) { }

  ngOnInit(): void {
    this.obtenerRutinas();
  }

  obtenerRutinas() {
    this.rutinasBasicas.length = 0;
    this.rutinasIntermedias.length = 0;
    this.rutinasAnavzadas.length = 0;
    this._rut.getRutinas()
      .subscribe(res => {
        res.forEach((rutina => {
          if(rutina.nivel === "1") {
            this.rutinasBasicas.push(rutina);
          };
          if(rutina.nivel === "2") {
            this.rutinasIntermedias.push(rutina);
          };
          if(rutina.nivel === "3") {
            this.rutinasAnavzadas.push(rutina);
          };
        }));
        console.log(this.rutinasBasicas);
        console.log(this.rutinasAnavzadas);
        
      })
  }

  borrarRutina(event, rutina) {
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
        
        this._rut.deleteRutina(rutina);
        
      }
    })
    
  }

}

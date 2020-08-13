import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Precio } from 'src/app/models/precio';
import { PreciosService } from 'src/app/services/precios.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  
  formularioPrecio: FormGroup;
  precios: Precio[] = new Array<Precio>();

  constructor(private fb: FormBuilder, private _pre: PreciosService) { }

  ngOnInit(): void {
    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: [ '', Validators.required]
    })

    this.obtener();
  }

  agregar() {
    this._pre.createPrecio(this.formularioPrecio.value);
    this.formularioPrecio.reset();
    Swal.fire(
      'Hecho!',
      'Se ha agregado correctamente',
      'success'
    );
    
  }

  obtener() {
    this._pre.getPrecios()
      .subscribe(res => {
        this.precios = res;
      })
    
  }

}

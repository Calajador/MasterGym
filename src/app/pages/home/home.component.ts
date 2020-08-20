import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { InscripcionesService } from 'src/app/services/inscripciones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clientes: any[] = [];

  constructor(private _cli: ClientesService) { }

  ngOnInit(): void {
    this.numeroClientes();
  }

  numeroClientes() {
    this._cli.getClientes()
      .subscribe((res: any) => {
        this.clientes = res;
        console.log(this.clientes.length);
        
      })
  }

  

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {

  clientes: Cliente[] = new Array<Cliente>();
  @Input('nombre')  nombre: string;
  @Output('seleccionoCliente') seleccionoCliente = new EventEmitter();
  @Output('canceloCliente') canceloCliente = new EventEmitter();

  constructor(public _cli: ClientesService) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this._cli.getClientes()
      .subscribe(res => {
        this.clientes = res;
      });
  };

  buscarClientes(nombre: string)
  {
    this.clientes.forEach((cliente)=>{
      if(cliente.nombre.toLowerCase().includes(nombre.toLowerCase()))
      {
        cliente.visible = true;
      }
      else
      {
        cliente.visible = false;
      }
    })
  }

  seleccionarCliente(cliente:Cliente)
  {
    this.nombre = cliente.nombre + ' ' + cliente.apellido;
    this.clientes.forEach((cliente)=>{
      cliente.visible = false;
    })
  
    this.seleccionoCliente.emit(cliente)
  }

  cancelarCliente()
  {
    this.nombre = undefined;
    this.canceloCliente.emit();
  }


}

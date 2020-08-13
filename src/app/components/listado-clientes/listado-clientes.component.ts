import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from '../../models/cliente';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {

  clientes: Cliente[] = new Array<Cliente>();

  constructor(public _cli: ClientesService, public _db: AngularFirestore) { }

  ngOnInit(): void {
    this.obtenerClientes();
    // let clienteDoc = this._db.firestore.collection(`clientes`);
    // clienteDoc.get().then((querySnapshot) => { 
    // querySnapshot.forEach((doc) => {
    //     let cliente = doc.data();
    //     cliente.id = doc.id;
    //     cliente.ref = doc.ref; 
    //     this.clientes.push(cliente); 
    //    });
    // });
    // console.log(this.clientes);
    
  }

  obtenerClientes() {
    this._cli.getClientes()
      .subscribe(res => {
        this.clientes = res;
      });
  };

  borrarCliente(event, cliente) {
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
        
        this._cli.deleteCliente(cliente);
      }
    })
    
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-detalle-inscripcion',
  templateUrl: './detalle-inscripcion.component.html',
  styleUrls: ['./detalle-inscripcion.component.scss']
})
export class DetalleInscripcionComponent implements OnInit {

  inscripcion = {

  }
  constructor(private route: ActivatedRoute, public _ins: InscripcionesService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this._ins.getOneIncripcion(id);
    
  }

  generarPDF() {
    const options = {
      filename: 'Justificante.pdf',
      image: {type: 'jpg'},
      html2canvas: {},
      jsPDF: {orientation: 'landscape'}
    }

    const content: Element = document.getElementById('contenedor');

    html2pdf()
    .from(content)
    .set(options)
    .save()
  }

}

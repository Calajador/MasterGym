import { DocumentReference } from '@angular/fire/firestore';

export class Precios{
    id: number;
    duracion: number;
    nombre: string;
    tipoDuracion: number;
    costo: number;
    ref: DocumentReference;
    constructor()
    {
        
    }
}

import { DocumentReference } from '@angular/fire/firestore';

export class Cliente {
    id?: string;
    nombre?: string;
    apellido?: string;
    correo?: string;
    dni?: string;
    telefono?: string;
    imgURL?: string;
    ref: DocumentReference;
    visible: boolean;

    constructor(){}
}
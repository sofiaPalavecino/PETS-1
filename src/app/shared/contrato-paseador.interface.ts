import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface ContratoPaseador {
    cantMascotas:number;
    estado:string;
    idCliente:string
    idMascota:Array<string>;
    dias:Array<string>;
    idPaseador:string;
    planContratado:string;
    fechaContratacion:string;
    docId:string;
}

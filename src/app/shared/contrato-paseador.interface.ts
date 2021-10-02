import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface ContratoPaseador {
    cantMascotas:number;
    estado:boolean;
    idCliente:string
    idMascota:Array<string>;
    idPaseador:string;
    planContratado:string;
    fechaContratacion:string;
}

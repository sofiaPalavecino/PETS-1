import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface PlanPaseo {
    costo:number;
    plazo:string;
    cantidad_dias:number;
    estado:string;
    lunes:boolean;
    martes:boolean;
    miercoles:boolean;
    jueves:boolean;
    viernes:boolean;
    sabado:boolean;
    domingo:boolean;
}

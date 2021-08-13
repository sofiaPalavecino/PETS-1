import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface PlanPaseo {
    costo:number;
    cupo:number;
    dias:Array<string>;
    disponibilidad:boolean;
    duracion:number;
    duracion_plan:string;
    hora:string;
}

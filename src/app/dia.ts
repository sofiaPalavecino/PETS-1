import { DiaI } from "../app/dia-i";

export class Dia implements DiaI {

    nombre:string;
    estado:boolean;
        
    constructor(nombre:string,estado:boolean){
        this.nombre=nombre;
        this.estado=estado;
    }
}

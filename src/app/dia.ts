

export class Dia  {

    nombre:string;
    estado:boolean;
    modificador:string;
    dataExtra:string;
        
    constructor(nombre:string,estado:boolean){
        this.nombre=nombre;
        this.estado=estado;
        this.modificador="";
        this.dataExtra="";
    }
}

import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { PubliService } from "../services/publi.service";
import { variable } from "@angular/compiler/src/output/output_ast";
import { MenuComponent } from "../components/menu/menu.component";
import { OrganizacionService } from "../services/organizacion.service";
import { Publicacion } from "../shared/publicacion";
import { ActivatedRoute } from "@angular/router";
import { Organizacion } from "../shared/organizacion.interface";
import { OrganizacionesService } from "../services/organizaciones.service";
import { AuthService } from "../services/auth.service";
import { DatePipe } from "@angular/common";
import { userProfile } from "../shared/user.interface";

@Component({
  selector: "app-publicacion",
  templateUrl: "./publicacion.page.html",
  styleUrls: ["./publicacion.page.scss"],
})
export class PublicacionPage implements OnInit {

  public usuario:userProfile
  public publicacion: Observable<Publicacion> = null;
  public organizacion: Observable<Organizacion> = null;
  public id: string = "";
  public idOrga: string = "";
  public nombre: string = "";
  uid: string;
  transito: boolean;
  adopcion: boolean;
  

  constructor(private publiServ:PubliService, private org:OrganizacionService,private orgServ:OrganizacionesService, private route:ActivatedRoute, private authServ:AuthService, private date:DatePipe) {
    this.authServ.user$.subscribe((usuario)=>{
      this.usuario=usuario
      this.uid=usuario.uid;
    })  
   }

  async ngOnInit() {
    this.id = await this.route.snapshot.paramMap.get("id");
    this.idOrga = await this.route.snapshot.paramMap.get("idOrga");
    this.organizacion = this.orgServ.getOrganizacion(this.idOrga);
    this.publicacion = this.publiServ.getPublicacion(this.id, this.idOrga);
    this.publicacion.subscribe((data) => {
      this.transito = data.transito;
      this.adopcion = data.adopcion;
    });
  }

  ionViewDidEnter() {
    this.noPodiSalvar();
  }

  cambiarOrganizacion() {
    this.org.actualizarOrganizacion(this.org.oid);
  }

  mostrarTexto(id: string) {
    let vista = document.getElementById(id).style.display;
    if (vista == "none") document.getElementById(id).style.display = "block";
    else document.getElementById(id).style.display = "none";
  }

  nuevoTransito() {
    let fecha = this.date.transform(new Date(), "dd/MM/yyyy");
    this.publiServ.salvarPerrito(
      this.id,
      this.uid,
      this.idOrga,
      fecha,
      "Transito"
    );
    document.getElementById('transito').style.display = "inline";
    window.alert(
      "Su solicitud está siendo procesada, espere la confirmación de la organización"
    );
  }

  nuevaAdopcion(){
    let fecha = this.date.transform(new Date(), "dd/MM/yyyy");
    this.publiServ.salvarPerrito(
      this.id,
      this.uid,
      this.idOrga,
      fecha,
      "Adopcion"
    );
    document.getElementById('adopcion').style.display = "inline";
    window.alert(
      "Su solicitud está siendo procesada, espere la confirmación de la organización"
    );
  }

  noPodiSalvar() {
    if (
      this.usuario.administrando.includes(this.idOrga) ||
      this.transito === true
    ) {
      document.getElementById("siPodi").style.display = "none";
      document.getElementById("noPodi").style.display = "block";
    } else {
      document.getElementById("siPodi").style.display = "block";
      document.getElementById("noPodi").style.display = "none";
    }
  }

  eriGey() {
    window.alert("eri gey?");
  }
}

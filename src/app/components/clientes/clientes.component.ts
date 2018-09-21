import { Component, OnInit } from '@angular/core';
import { CiudadesService } from '../../services/ciudades.service';
import { ClientesService, Cliente } from '../../services/clientes.service';
import { PaisesService } from '../../services/paises.service';
import { DepartamentosService } from '../../services/departamentos.service';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent {

  paises: any[] = [];
  departamentos: any[] = [];
  ciudades: any[] = [];
  clientes: any[] = [];

  departamento: any = {};

  errores: string[] = [];

  idCliente: number = 0;
  nitCliente: string = "";
  nombreCliente: string = "";
  direccionCliente: string = "";
  telefonoCliente: string = "";
  paisCliente: number = 0;
  departamentoCliente: number = 0;
  ciudadCliente: number = 0;
  cupoCliente: number = 0;
  saldoCupoCliente: number = 0;
  porcentajeCliente: number = 0;

  noClientes: boolean = false;
  errorHTTP: boolean = false;
  editar: boolean = false;

  clienteModel: Cliente = {
    Nit: this.nitCliente,
    Nombre: this.nombreCliente,
    Direccion: this.direccionCliente,
    Telefono: this.telefonoCliente,
    CiudadId: this.ciudadCliente,
    Cupo: this.cupoCliente,
    SaldoCupo: this.saldoCupoCliente,
    PorcentajeVisita: this.porcentajeCliente
  }

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private paisService: PaisesService,
    private departamentoService: DepartamentosService,
    private ciudadService: CiudadesService,
    private clienteService: ClientesService) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.getClientes();
  }

  getClientes() {
    this.clientes = [];
    this.clienteService.getClientes()
      .subscribe(data => {
        if (data.toString().length > 0) {
          this.clientes.push(data);
        }
        else {
          this.noClientes = true;
        }
      });
  }

  getCliente(id: number, modal: any, size:any = 'lg') {

    this.editar = true;

    this.getPaises('get', size);

    this.clienteService.getCliente(id)
      .subscribe(data => {

        this.idCliente = data["Id"];
        this.nitCliente = data["Nit"];
        this.nombreCliente = data["Nombre"];
        this.direccionCliente = data["Direccion"];
        this.telefonoCliente = data["Telefono"];
        this.ciudadCliente = data["CiudadId"];
        this.cupoCliente = data["Cupo"];
        this.saldoCupoCliente = data["SaldoCupo"];
        this.porcentajeCliente = data["PorcentajeVisita"];

        this.getPaises(modal,size);

      }, (error => {

      }), () => {
        this.ciudadService.getCiudad(this.ciudadCliente)
          .subscribe(data => {
            // this.ciudad = data;
            this.departamentoService.getDepartamento(data["DepartamentoId"])
              .subscribe(data => {
                this.departamento = data;
                this.departamentoCliente = this.departamento.Id;
                this.paisCliente = this.departamento.PaisId;
                this.getDepartamentosPaisId(this.departamento.PaisId);
              }, (error => {

              }), () => {
                this.getCiudadesDepartamentoId(this.departamento.Id);
              });
          });
      });
  }

  getPaises(modal: any, size:any) {
    this.paisService.getPaises()
      .subscribe(data => {
        this.paises = [];
        this.departamentos = [];
        this.ciudades = [];
        if (data.toString().length > 0) {
          this.paises.push(data);
        }
      });
    this.open(modal,size);
  }

  getDepartamentosPaisId(paisId: any) {
    this.departamentoService.getDepartamentosPaisId(paisId)
      .subscribe(data => {
        this.departamentos = [];
        this.ciudades = [];
        if (data.toString().length > 0) {
          this.departamentos.push(data);
        }
      });
  }

  getCiudadesDepartamentoId(departamentoId: number) {
    this.ciudadService.getCiudadesDepartamentoId(departamentoId)
      .subscribe(data => {
        this.ciudades = [];
        if (data.toString().length > 0) {
          this.ciudades.push(data);
        }
      });
  }

  postCliente() {
    this.errorHTTP = false;
    this.llenarCliente();
    this.clienteModel.SaldoCupo = this.clienteModel.Cupo;
    this.clienteService.postCliente(this.clienteModel)
      .subscribe(data => {
        this.noClientes = false;
        this.getClientes();
        this.close();
      }, (error => {
        this.errorHTTP = true;
        this.errores = [];

        let data = error.error.ModelState;
        this.getErrores(data);
        // this.errores.push(error.error.ModelState["cliente.Nit"][i]);          
      }));
  }

  putCliente() {
    this.errorHTTP = false;
    this.llenarCliente();
    this.clienteService.putCliente(this.idCliente, this.clienteModel)
      .subscribe(data => {
        this.getClientes();
        this.close();
      }, (error => {
        this.errorHTTP = true;
        this.errores = [];

        let data = error.error.ModelState;
        this.getErrores(data);
        // this.errores.push(error.error.ModelState["cliente.Nit"][i]);          
      }));
  }

  deleteCliente() {
    this.errorHTTP = false;
    this.llenarCliente();
    this.clienteService.deleteCliente(this.idCliente)
      .subscribe(data => {
        this.getClientes();
        this.close();
      }, (error => {
        this.errorHTTP = true;
        this.errores = [];

        let data = error.error.ModelState;
        this.getErrores(data);
        // this.errores.push(error.error.ModelState["cliente.Nit"][i]);          
      }));
  }

  llenarCliente() {
    this.clienteModel = {
      Nit: this.nitCliente,
      Nombre: this.nombreCliente,
      Direccion: this.direccionCliente,
      Telefono: this.telefonoCliente,
      CiudadId: this.ciudadCliente,
      Cupo: this.cupoCliente,
      SaldoCupo: this.saldoCupoCliente,
      PorcentajeVisita: this.porcentajeCliente
    }
  }

  getErrores(data: any) {

    let errores: string = "";
    if (data["cliente.Nit"]) {
      errores = "Nit: ";
      for (let i = 0; i < data["cliente.Nit"].length; i++) {
        errores += data["cliente.Nit"][i] + ". ";
      }
      this.errores.push(errores);
    }
    if (data["cliente.Nombre"]) {
      errores = "Nombre: ";
      for (let i = 0; i < data["cliente.Nombre"].length; i++) {
        errores += data["cliente.Nombre"][i] + ". ";
      }
      this.errores.push(errores);
    }
    if (data["cliente.Direccion"]) {
      errores = "Direccion: ";
      for (let i = 0; i < data["cliente.Direccion"].length; i++) {
        errores += data["cliente.Direccion"][i] + ". ";
      }
      this.errores.push(errores);
    }
    if (data["cliente.Telefono"]) {
      errores = "Teléfono: ";
      for (let i = 0; i < data["cliente.Telefono"].length; i++) {
        errores += data["cliente.Telefono"][i] + ". ";
      }
      this.errores.push(errores);
    }
    if (data["cliente.CiudadId"]) {
      errores = "Ciudad: ";
      for (let i = 0; i < data["cliente.CiudadId"].length; i++) {
        errores += data["cliente.CiudadId"][i] + ". ";
      }
      this.errores.push(errores);
    }
    if (data["cliente.Cupo"]) {
      errores = "Cupo: ";
      for (let i = 0; i < data["cliente.Cupo"].length; i++) {
        errores += data["cliente.Cupo"][i] + ". ";
      }
      this.errores.push(errores);
    }
    if (data["cliente.SaldoCupo"]) {
      errores = "Saldo Cupo: ";
      for (let i = 0; i < data["cliente.SaldoCupo"].length; i++) {
        errores += data["cliente.SaldoCupo"][i] + ". ";
      }
      this.errores.push(errores);
    }
    if (data["cliente.PorcentajeVisita"]) {
      errores = "Porcentaje Visita: ";
      for (let i = 0; i < data["cliente.PorcentajeVisita"].length; i++) {
        errores += data["cliente.PorcentajeVisita"][i] + ". ";
      }
      this.errores.push(errores);
    }
  }

  open(content, size:any) {
    this.modalService.open(content, { size: size });
  }

  close() {
    this.editar = false;
    this.idCliente = 0;
    this.nitCliente = "";
    this.nombreCliente = "";
    this.direccionCliente = "";
    this.telefonoCliente = "";
    this.ciudadCliente = 0;
    this.departamentoCliente = 0;
    this.paisCliente = 0;
    this.cupoCliente = 0;
    this.saldoCupoCliente = 0;
    this.porcentajeCliente = 0;
    this.errores = [];
    this.errorHTTP = false;
    this.modalService.dismissAll();
  }

}

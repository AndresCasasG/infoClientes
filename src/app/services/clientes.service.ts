import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlsService } from './urls.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private urls: UrlsService) {
  }

  getClientes() {
    return this.urls.getQuery(`Clientes`,`get`);
  }

  getCliente(id:number) {
    return this.urls.getQuery(`Clientes/${id}`,`get`);
  }

  postCliente(cliente:Cliente){
    return this.urls.getQuery(`Clientes`,`post`,cliente);
  }

  putCliente(id:number, cliente:Cliente){
    cliente.id = id;
    // cliente.SaldoCupo = parseInt(cliente.SaldoCupo.toString()) + parseInt(saldo.toString());
    return this.urls.getQuery(`Clientes/${id}`,`put`,cliente);
  }

  deleteCliente(id:number){
    return this.urls.getQuery(`Clientes/${id}`,`delete`);
  }
}

export interface Cliente {
  id?: number,
  Nit: string,
  Nombre: string,
  Direccion: string,
  Telefono: string,
  CiudadId: number,
  Cupo: number,
  SaldoCupo: number,
  PorcentajeVisita:number
}

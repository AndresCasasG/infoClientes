import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UrlsService } from './urls.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  constructor(private urls:UrlsService) {
  }

  getCiudadesDepartamentoId(departamentoId:number){
    return this.urls.getQuery(`Ciudades/${departamentoId}/departamento`,`get`);
  }

  getCiudad(id:number){
    return this.urls.getQuery(`Ciudades/${id}`,`get`);
  }
}

export interface Ciudad {
  id: number,
  departamentoId: number,
  nombre: string
}
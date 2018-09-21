import { Injectable } from '@angular/core';
import { UrlsService } from './urls.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {


  constructor(private urls:UrlsService) {
  }

  getDepartamentosPaisId(paisId:number){
    return this.urls.getQuery(`Departamentos/${paisId}/pais`,`get`);
  }

  getDepartamento(id:number){
    return this.urls.getQuery(`Departamentos/${id}`,`get`);
  }

}

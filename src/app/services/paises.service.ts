import { Injectable } from '@angular/core';
import { UrlsService } from './urls.service';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private urls:UrlsService) {
  }

  getPaises(){
    return this.urls.getQuery(`Paises`,`get`);
  }

  getPais(id:number){
    return this.urls.getQuery(`Paises/${id}`,`get`);
  }

}

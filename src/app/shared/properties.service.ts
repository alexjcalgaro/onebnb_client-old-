import { Injectable } from '@angular/core';
// Incluimos o URLSearchParams para nos permitir passar parâmetros na chamada GET
import { Http, URLSearchParams } from '@angular/http';
import { Angular2TokenService, A2tUiModule } from 'angular2-token';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class PropertiesService {
  private url: string = "properties.json";

  constructor(private http: Http, private _tokenService: Angular2TokenService) { }

  getFeatured(){
    return this.http.get(environment.api_base_url + 'featured.json')
      .map(res => res.json());
  }
  // Incluimos nosso método de search
  searchProperties(params) {
    let parameters = new URLSearchParams();
    
    for (var f in params) { 
      parameters.set(f, params[f]) 
    }

    return this.http.get(environment.api_base_url + 'search.json', { search: parameters })
      .map(res => res.json());
  }

  addToWishlist(id) {
    return this._tokenService.post('properties/' + id + '/wishlist', {})
      .map(res => res.json());
  }

  removeToWishlist(id) {
    return this._tokenService.delete('properties/' + id + '/wishlist')
      .map(res => res.json());
  }

  getProperties() {
    return this.http.get(environment.api_base_url + 'properties.json')
      .map(res => res.json());
  }

  autocomplete() {
    return this.http.get(environment.api_base_url + 'autocomplete.json')
      .map(res => res.json());
  }

  getProperty(id) {
    return this.http.get(environment.api_base_url + 'properties/' + id)
      .map(res => res.json());
  }

  addProperty(property) {
    return this.http.post(environment.api_base_url + 'properties.json', { 'property': property })
      .map(res => res.json());
  }

  updateProperty(property) {
    return this.http.put(environment.api_base_url + 'properties.json/' + property.id, { 'property': property })
      .map(res => res.json());
  }

  deleteProperty(id) {
    return this.http.delete(environment.api_base_url + 'properties.json/' + id)
      .map(res => res.json());
  }
}
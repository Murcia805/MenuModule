import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Ingrediente } from '../Models/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {
  // private baseURL = 'http://181.50.100.167:7000/menu';
  private baseURL = 'http://localhost:7000/menu';

  private httpHeaders: HttpHeaders;
  private parametros: HttpParams;

  constructor(private http: HttpClient) { }

  public getIngredientes() {
    const URL = this.baseURL + '/ingredients';
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public getIngredienteByIdPlato(id: number) {
    const URL = this.baseURL + `/ingredients/${id}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public crearIngrediente(ingrediente: Ingrediente) {
    const URL = this.baseURL + `/ingredient`;
    const tempIngredienteNuevo = {
      ingredientname : ingrediente.ingredientname,
      description: ingrediente.description,
      active: ingrediente.active}
    ;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.post(
      URL, tempIngredienteNuevo, { headers: this.httpHeaders }
      ).toPromise();
  }

  public getIngredienteById(id: number) {
    const URL = this.baseURL + `/ingredients/${id}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public actualizarIngrediente(id: number, ingrediente: Ingrediente) {
    const URL = this.baseURL + `/ingredient/${id}`;
    const ingrdnte = {
      ingredientname: ingrediente.ingredientname,
      description: ingrediente.description,
      active: ingrediente.active
    };
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*')
    .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.put(
      URL, ingrdnte, { headers: this.httpHeaders }
      ).toPromise();
  }

  public deleteIngredienteById(id: number) {
    const URL = this.baseURL + `/delete/ingredient/${id}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.put(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }
}

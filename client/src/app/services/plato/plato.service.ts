import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Plato } from '../Models/plato';
import { Ingrediente } from '../Models/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  // private baseURL = 'http://181.50.100.167:7000/menu';
  private baseURL = 'http://localhost:7000/menu';

  private httpHeaders: HttpHeaders;
  private parametros: HttpParams;

  constructor(private http: HttpClient) { }

  public getPlatos() {
    const URL = this.baseURL + '/plates';
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public getPlatosByType(id: number) {
    const URL = this.baseURL + `/plates/type/${id}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public getPlatosById(id: number) {
    const URL = this.baseURL + `/plates/${id}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public crearPlato(plato: Plato, ingredientes: number[]) {
    const URL = this.baseURL + `/plate`;
    const tempPlatoNuevo = {plateName: plato.platename,
      plateDescription: plato.platedescription,
      amount: +plato.amount,
      fk_idTypePlate: plato.fk_idtypeplate,
      fk_idRestaurant: plato.fk_idrestaurant,
      imageplate: plato.imageplate,
      ingredients: ingredientes};
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*')
    .set('Content-Type', 'application/json');
    return this.http.post(
      URL, tempPlatoNuevo, { headers: this.httpHeaders }
    ).toPromise();
  }

  public actualizarPlato(plato: Plato, ingredientes: number[]) {
    const URL = this.baseURL + `/plate/${plato.pk_idplate}`;
    const tempPlatoUpdate = {platename: plato.platename,
      platedescription: plato.platedescription,
      amount: +plato.amount,
      activo: true,
      fk_idtypeplate: plato.fk_idtypeplate,
      fk_idrestaurant: plato.fk_idrestaurant,
      imageplate: plato.imageplate,
      ingredients: ingredientes};
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*')
    .set('Content-Type', 'application/json');
    console.log(tempPlatoUpdate);
    return this.http.put(
      URL, tempPlatoUpdate , { headers: this.httpHeaders }
      ).toPromise();
  }

  public deletePlato(plato: Plato) {
    const URL = this.baseURL + `/delete/plate/${plato.pk_idplate}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.put(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }
}

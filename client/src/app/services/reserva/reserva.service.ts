import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pedido } from '../Models/pedido';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  // private baseURL = 'http://181.50.100.167:7000/menu';
  private baseURL = 'http://localhost:7000/menu';

  private httpHeaders: HttpHeaders;
  private parametros: HttpParams;

  constructor(private http: HttpClient) { }

  public getPlatesByReservation(id: number) {
    const URL = this.baseURL + `/plates/reservation/${id}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public createReservation(idUsuario: number, idReservation: number, idRestaurante: number) {
    const URL = this.baseURL + `/reservation/${idUsuario}/${idReservation}/${idRestaurante}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.post(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public addPlatesToReservation(id: number, pedidos: Pedido[]) {
    const URL = this.baseURL + `/reservation/plates/${id}`;
    let infoPlate: Array<any> = [];
    pedidos.forEach(pedido => {
      let tempIngrediente: number[] = [];
      pedido.listaIngredientes.forEach(ingrediente => {
        tempIngrediente.push(ingrediente.pk_idingredient);
      });

      let temp = {idPlate: pedido.infoPlato.pk_idplate,
        amount: pedido.infoPlato.amount,
        ingredients: tempIngrediente
      };
      infoPlate.push(temp);
    });
    const data = {plates: infoPlate};
    console.log(data);
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.put(
      URL, data, { headers: this.httpHeaders }
      ).toPromise();
  }
}

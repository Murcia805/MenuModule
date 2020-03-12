import { Component, OnInit } from '@angular/core';
import { TransitionController, Transition, TransitionDirection, SuiModalService } from 'ng2-semantic-ui';
import { Pedido } from '../../services/Models/pedido';
import { Plato } from '../../services/Models/plato';
import { Ingrediente } from '../../services/Models/ingrediente';
import { PlatoService } from '../../services/plato/plato.service';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from '../../services/reserva/reserva.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private data;
  private idRestarante = -1;
  private idPersona = -1;
  private idReserva = -1;
  public siguiente = 0;
  public total = 0;
  public estaLogueado = 0;
  public nombre;

  public transitionController1 = new TransitionController();
  public transitionController2 = new TransitionController(false);
  public transitionController3 = new TransitionController(false);

  public activeCanvas = 1;
  public contPedidos = 0;
  public actualIndexPedido = -1;

  public comentario: string = '';

  public show: boolean = false;
  public show1: boolean = false;

  public listaPlatos: Plato[] = [];
  public listaPlatosTodas: Plato[] = [];
  public listaIngredientes: Ingrediente[] = [];

  public activoPlato: Plato;
  public activoIngrediente: Ingrediente;

  public tempPedido: Pedido[] = [];
  public actualPedido: Pedido;

  constructor(private servicioPlato: PlatoService,
              private servicioIngrediente: IngredienteService,
              private servicioReserva: ReservaService,
              private servicioUsuario: UsuarioService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              public modalService: SuiModalService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe( params => {
      this.data = params[ 'info' ].split('-');
      this.idRestarante = this.data[0];
      this.idPersona = this.data[1];
      this.idReserva = this.data[2];

      if ( this.idReserva != 0) {
        this.siguiente = 1;
      }

      this.servicioUsuario.getUsuarioConectado(this.idPersona).then((data:any) => {
        if (data.response == 2) {
          this.estaLogueado = 1;
          this.servicioUsuario.getUsuarioName(this.idPersona).then( (info: any) => {
            this.nombre = info.content.name;
          });
        } else {
          this.estaLogueado = 0;
        }
      });

      console.log(this.idRestarante);
      this.servicioPlato.getPlatosById(this.idRestarante).then( (dataPlatos: Plato[]) => {
        if (dataPlatos.length == 0) {
          this.router.navigate([ '/error' ]);
        }
        this.listaPlatosTodas = dataPlatos;
      });
    });
  }

  public getPlatosByTime(id: number) {
    this.listaPlatos = this.listaPlatosTodas.filter(x => x.fk_idtypeplate === id);
  }

  public agregarPlatoOrden(idLista: number, idPlato: number) {
    this.servicioIngrediente.getIngredienteByIdPlato(idPlato).then( ( data: Ingrediente[] ) => {
      this.tempPedido.push( new Pedido(this.listaPlatos[idLista], data, ''));
      this.total += this.listaPlatos[idLista].amount;
      this.contPedidos = this.contPedidos + 1;
    });
  }

  public guardarInfoPlato(plato: Plato, listaTempIngrediente: Ingrediente[]) {
    this.tempPedido.push( new Pedido(plato, listaTempIngrediente, ''));
    this.total += plato.amount;
  }

  public eliminarPedido(id: number) {
    const borrado = this.tempPedido.splice(id, 1);
    this.total -= borrado[0].infoPlato.amount;
    this.contPedidos = this.contPedidos - 1;
  }

  public abrirModal(flag: number, dato: any, indx: number = 0) {
    if ( flag == 1 ) {
      this.servicioIngrediente.getIngredienteByIdPlato(dato.pk_idplate).then( (ingredientes: Ingrediente[]) => {
        this.listaIngredientes = ingredientes;
        this.activoPlato = dato;
        console.log(this.listaIngredientes);
        this.show = true;
      });
    } else if ( flag == 2 ) {
      this.activoPlato = this.tempPedido[indx].infoPlato;
      this.listaIngredientes = this.tempPedido[indx].listaIngredientes;
      this.comentario = this.tempPedido[indx].comentario;
    } else if ( flag === 3 ) {
      this.actualPedido = dato;
      this.actualIndexPedido = indx;
      this.show1 = true;
      this.listaIngredientes = this.actualPedido.listaIngredientes;
    }
  }

  public guardarPlatoAvanzado(cmntro: string) {
    this.tempPedido.push( new Pedido(this.activoPlato, this.listaIngredientes, cmntro));
    this.contPedidos = this.contPedidos + 1;
    this.total += this.activoPlato.amount;
    this.show = false;
  }

  public guardarPlatoAvanzado1(cmntro: string) {
    this.tempPedido[this.actualIndexPedido] = new Pedido(this.actualPedido.infoPlato, this.listaIngredientes, cmntro);
    this.actualIndexPedido = -1;
    this.actualPedido = null;
    this.show1 = false;
  }

  public finalizar() {
    this.servicioReserva.addPlatesToReservation(this.idReserva, this.tempPedido).then( (data: any) => {
      this.redirectRestaurante();
    });
  }

  public animate1In(transitionName: string = 'scale') {
    this.transitionController1.animate(
        new Transition(transitionName, 500, TransitionDirection.In, () => {})
    );
  }

  public animate1Out(transitionName: string = 'scale') {
    this.transitionController1.animate(
        new Transition(transitionName, 500, TransitionDirection.Out, () => {})
    );
  }

  public animate2In(transitionName: string = 'scale') {
    this.transitionController2.animate(
      new Transition(transitionName, 500, TransitionDirection.In, () => {})
    );
  }

  public animate2Out(transitionName: string = 'scale') {
    this.transitionController2.animate(
      new Transition(transitionName, 500, TransitionDirection.Out, () => {})
    );
  }

  public animate3In(transitionName: string = 'scale') {
    this.transitionController3.animate(
      new Transition(transitionName, 500, TransitionDirection.In, () => {} )
    );
  }

  public animate3Out(transitionName: string = 'scale') {
    this.transitionController3.animate(
      new Transition(transitionName, 500, TransitionDirection.Out, () => {} )
    );
  }

  public adelante(numero: number) {
    if (numero == 2) {
      this.animate1Out();
      this.activeCanvas = this.activeCanvas + 1;
      this.animate2In();
    } else if (numero == 3) {
      this.animate2Out();
      this.activeCanvas = this.activeCanvas + 1;
      this.animate3In();
      console.log(this.tempPedido[0].listaIngredientes);
    }
  }

  public atras(numero: number) {
    if (numero == 0) {
      this.redirectRestaurante();
    }else if (numero == 1) {
      this.animate2Out();
      this.activeCanvas = this.activeCanvas - 1;
      this.animate1In();
    } else if (numero == 2) {
      this.animate3Out();
      this.activeCanvas = this.activeCanvas - 1;
      this.animate2In();
    }
  }

  public redirectRestaurante() {
    window.location.href = `http://181.50.100.167:3010?id=${this.idRestarante}?id=${this.idPersona}`;
  }

  public redirectProfile() {
    window.location.href = 'http://159.65.58.193:3000/profile';
  }

  public redirectReservas() {
    window.location.href = 'http://159.65.58.193:3000/tinder';
  }

  public redirectBuscar() {
    window.location.href = `http://181.50.100.167:4001/Principal/?id=${this.idPersona}?pass=1?ciudad=1`;
  }
}

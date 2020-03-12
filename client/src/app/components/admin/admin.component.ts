import { Component, OnInit } from '@angular/core';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';
import { PlatoService } from '../../services/plato/plato.service';
import { Ingrediente } from '../../services/Models/ingrediente';
import { Plato } from '../../services/Models/plato';
import { SuiModalService } from 'ng2-semantic-ui';
import { element } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private data;
  private idPersona = -1;
  private idRestaurante = -1;
  public nombre;

  public listIngredientes: Ingrediente[];
  public listPlatosIngredientes: Ingrediente[];
  public listNewPlatoIngredientes: number[] = [];
  public listPlatos: Plato[];

  public checkBox = true;

  public selectedOption; // Se coloca el valor por defecto
  public selectorTipo: any = {
    opciones: [
      { id: 1, name: 'Almuerzo'},
      { id: 2, name: 'Cena'},
    ],
    seleccionado: undefined
  };

  public actualIngrediente: Ingrediente = {pk_idingredient : 1,
                                          ingredientname: '',
                                          description: '',
                                          active: false};

  public actualPlato: Plato = {pk_idplate: 1,
                              fk_idtypeplate: 1,
                              fk_idrestaurant: 1,
                              platename: '',
                              platedescription: '',
                              amount: 1,
                              active: false,
                              imageplate: ''};

  public show: boolean = false;
  public show1: boolean = false;
  public show2: boolean = false;
  public show3: boolean = false;

  constructor(private ingredienteService: IngredienteService,
              private platoService: PlatoService,
              private activateRoute: ActivatedRoute,
              private usuarioService: UsuarioService,
              private router: Router,
              public modalService: SuiModalService) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe( params => {
      this.data = params[ 'info' ].split('-');
      this.idRestaurante = this.data[0];
      this.idPersona = this.data[1];

      this.usuarioService.getUsuarioConectado(this.idPersona).then( (data: any) => {
        if (data.response == 1) {
          this.router.navigate([ '/error' ]);
        } else if (data.response == 2) {
          this.usuarioService.getUsuarioName(this.idPersona).then( (info: any) => {
            this.nombre = info.content.name;
          });
          this.getIngredientes();
          this.getPlatos();
        }
      });
    });
  }

  public getIngredientes() {
    this.ingredienteService.getIngredientes().then( (tempIngredientes: Ingrediente[]) => {
      this.listIngredientes = tempIngredientes;
    });
  }

  public getPlatos() {
    this.platoService.getPlatosById(this.idRestaurante).then( (tempPlatos: Plato[]) => {
      this.listPlatos = tempPlatos;
      if (tempPlatos.length == 0) {
        this.router.navigate([ '/error' ]);
      }
    });
  }

  public update() {
    this.ingredienteService.getIngredientes().then( (tempIngredientes: Ingrediente[]) => {
      this.listIngredientes = tempIngredientes;
      console.log(this.listIngredientes);
    });
  }

  public createPlato(nombre: string, valor: number, foto: string, descripcion: string) {
    const tempPlatoNuevo: Plato = {
      pk_idplate: 0,
      fk_idtypeplate: this.selectedOption,
      fk_idrestaurant: 2, // Se nesecita traer de otros modulos
      platename: nombre,
      platedescription: descripcion,
      amount: valor,
      active: this.checkBox,
      imageplate: foto
    };
    console.log(tempPlatoNuevo);
    this.platoService.crearPlato(tempPlatoNuevo, this.listNewPlatoIngredientes).then();
  }

  public anadirIngredientePlato(i: number) {
    this.listNewPlatoIngredientes.push(i);
    console.log(this.listNewPlatoIngredientes);
  }

  public quitarIngredientePlato(i: number) {
    this.listNewPlatoIngredientes = this.listNewPlatoIngredientes.filter(item => item !== i);
    console.log(this.listNewPlatoIngredientes);
  }

  public createIngrediente(nombre: string, descripcion: string) {
    const tempIngredienteNuevo: Ingrediente = {
      pk_idingredient: 0,
      ingredientname: nombre,
      description: descripcion,
      active: true
    };
    this.ingredienteService.crearIngrediente(tempIngredienteNuevo).then( (data: any) => {
      this.update();
    });
  }

  public updatePlate(plato: Plato, nombre: string, valor: number, foto: string, descripcion: string) {
    console.log(plato);
    if (this.checkBox) {
      plato.platename = nombre;
      plato.platedescription = descripcion;
      plato.amount = valor;
      plato.imageplate = foto;

      this.platoService.actualizarPlato(plato, this.listNewPlatoIngredientes).then( (data: any) => {});
    } else {
      this.platoService.deletePlato(plato).then();
    }
  }

  public updateIngrediente(nombre: string, descripcion: string) {
    if (this.checkBox) {
      this.actualIngrediente.ingredientname = nombre;
      this.actualIngrediente.description = descripcion;
      this.ingredienteService.actualizarIngrediente(this.actualIngrediente.pk_idingredient, this.actualIngrediente).then();
    } else {
      this.ingredienteService.deleteIngredienteById(this.actualIngrediente.pk_idingredient).then();
    }
  }

  public abrirModal(id: number = -1, flag: number, index: number) {
    if (flag === 1) {
      this.actualIngrediente = this.listIngredientes[index];
      this.checkBox = this.actualIngrediente.active;
      this.show = true;
    } else if (flag === 2) {
      this.listNewPlatoIngredientes = [];
      this.ingredienteService.getIngredienteByIdPlato(id).then( (data: Ingrediente[] ) => {
        this.actualPlato = this.listPlatos[index];
        this.selectedOption = this.actualPlato.fk_idtypeplate;
        this.listPlatosIngredientes = data;
        for  (let i = 0; i < data.length; i++) {
          this.listNewPlatoIngredientes.push(this.listPlatosIngredientes[i].pk_idingredient);
        }
        this.checkBox = this.actualPlato.active;
        this.show1 = true;
      });
    } else if (flag === 3) {
      this.listNewPlatoIngredientes = [];
      this.show2 = true;
    } else if (flag === 4) {
      this.show3 = true;
    } else { }
  }

  public getIngredienteNuevoEstado(i: number) {
    const temp = this.listNewPlatoIngredientes.find(x => x === i);
    if (temp == null) {
      return false;
    } else {
      return true;
    }
  }

  public redirectProfile() {
    window.location.href = 'http://159.65.58.193:3000/profile';
  }
}

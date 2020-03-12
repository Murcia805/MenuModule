import { Ingrediente } from './ingrediente';
import { Plato } from './plato';
export class Pedido {
    constructor(plto: Plato, lstIngrdnts: Ingrediente[], cmntrio: string) {
        this.infoPlato = plto;
        this.listaIngredientes = lstIngrdnts;
        this.comentario = cmntrio;
    }

    infoPlato: Plato;
    listaIngredientes: Ingrediente[];
    comentario: string;
}

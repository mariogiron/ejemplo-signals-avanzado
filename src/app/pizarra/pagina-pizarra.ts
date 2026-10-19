import { Component } from '@angular/core';
import { Padre } from './contador';
import { Pizarra } from './pizarra';

/** Signal frente a Observable (mira la consola) y model(). */
@Component({
  selector: 'app-pagina-pizarra',
  imports: [Pizarra, Padre],
  template: `
    <app-pizarra />
    <hr />
    <app-padre />
  `,
})
export class PaginaPizarra {}

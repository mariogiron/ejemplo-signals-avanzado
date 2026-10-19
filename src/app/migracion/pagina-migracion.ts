import { Component } from '@angular/core';
import { BuscadorComponent } from './libros/buscador.component';

/** Un buscador de libros escrito como hace unos años, que migramos en cuatro pasos. */
@Component({
  selector: 'app-pagina-migracion',
  imports: [BuscadorComponent],
  template: `
    <h2>Migración · El buscador de libros</h2>
    <app-buscador />
  `,
})
export class PaginaMigracion {}

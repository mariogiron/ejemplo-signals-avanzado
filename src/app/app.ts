import { Component, signal } from '@angular/core';
import { PaginaMigracion } from './migracion/pagina-migracion';
import { PaginaPizarra } from './pizarra/pagina-pizarra';
import { PaginaRecursos } from './recursos/pagina-recursos';

const PESTANAS = ['Pizarra', 'Migración', 'Recursos'] as const;
type Pestana = (typeof PESTANAS)[number];

/** El módulo entero en una aplicación: una pestaña por ejemplo, y ninguna depende de otra. */
@Component({
  selector: 'app-root',
  imports: [PaginaPizarra, PaginaMigracion, PaginaRecursos],
  template: `
    <h1>Angular Avanzado · Módulo 2 · Signals</h1>
    <nav>
      @for (p of pestanas; track p) {
        <button type="button" [class.activa]="p === actual()" (click)="actual.set(p)">
          {{ p }}
        </button>
      }
    </nav>
    <main>
      @switch (actual()) {
        @case ('Pizarra') {
          <app-pagina-pizarra />
        }
        @case ('Migración') {
          <app-pagina-migracion />
        }
        @case ('Recursos') {
          <app-pagina-recursos />
        }
      }
    </main>
  `,
})
export class App {
  protected readonly pestanas = PESTANAS;
  protected readonly actual = signal<Pestana>('Pizarra');
}

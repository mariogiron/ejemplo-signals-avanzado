import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';

interface Autor {
  id: number;
  nombre: string;
  pais: string;
  nacimiento: number;
}

@Component({
  selector: 'app-pagina-recursos',
  template: `
    <h2>Resource API · Autores</h2>

    <h3>La lista: una URL fija</h3>
    @if (autores.isLoading()) {
      <p>Cargando autores...</p>
    } @else if (autores.error()) {
      <p class="error">No se pudieron cargar los autores</p>
    } @else {
      @for (a of autores.value(); track a.id) {
        <button type="button" (click)="id.set(a.id)">{{ a.nombre }}</button>
      }
    }

    <h3>La ficha: una URL que depende de un signal</h3>
    @if (autor.isLoading()) {
      <p>Cargando ficha...</p>
    } @else if (autor.value(); as a) {
      <p class="ok">{{ a.nombre }} nació en {{ a.pais }} en {{ a.nacimiento }}.</p>
    } @else {
      <p>Elige un autor.</p>
    }
  `,
})
export class PaginaRecursos {
  /** Una URL fija: se pide una vez. */
  protected readonly autores = httpResource<Autor[]>(() => '/autores.json', { defaultValue: [] });

  /** El autor elegido. Al principio, ninguno. */
  protected readonly id = signal<number | undefined>(undefined);

  /** La URL depende de id(): si cambia, se pide la ficha nueva y se cancela la anterior. */
  protected readonly autor = httpResource<Autor>(() =>
    this.id() ? `/autores/${this.id()}.json` : undefined,
  );
}

import { Component, OnChanges, input, output } from '@angular/core';
import { Libro } from './modelo';

@Component({
  selector: 'app-tarjeta-libro',
  standalone: true,
  template: `
    <button
      type="button"
      class="tarjeta"
      [class.destacada]="destacada()"
      (click)="elegir.emit(libro())"
    >
      <span class="portada">{{ portada }}</span>
      {{ libro().titulo }} · {{ libro().autor }}
    </button>
  `,
})
export class TarjetaLibroComponent implements OnChanges {
  readonly libro = input.required<Libro>();
  readonly destacada = input(false);
  readonly elegir = output<Libro>();

  // ✍️ Paso 2 · portada sale de un input: pásala a computed y borra ngOnChanges
  portada = '';

  ngOnChanges(): void {
    this.portada = this.libro().titulo.slice(0, 2).toUpperCase();
  }
}

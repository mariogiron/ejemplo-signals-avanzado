import { Component, computed, input, output } from '@angular/core';
import { Libro } from './modelo';

@Component({
  selector: 'app-tarjeta-libro',
  template: `
    <button
      type="button"
      class="tarjeta"
      [class.destacada]="destacada()"
      (click)="elegir.emit(libro())"
    >
      <span class="portada">{{ portada() }}</span>
      {{ libro().titulo }} · {{ libro().autor }}
    </button>
  `,
})
export class TarjetaLibroComponent {
  readonly libro = input.required<Libro>();
  readonly destacada = input(false);
  readonly elegir = output<Libro>();

  protected readonly portada = computed(() => this.libro().titulo.slice(0, 2).toUpperCase());
}

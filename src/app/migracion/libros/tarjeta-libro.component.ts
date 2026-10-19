import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Libro } from './modelo';

@Component({
  selector: 'app-tarjeta-libro',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="tarjeta"
      [ngClass]="{ destacada: destacada }"
      (click)="elegir.emit(libro)"
    >
      <span class="portada">{{ portada }}</span>
      {{ libro.titulo }} · {{ libro.autor }}
    </button>
  `,
})
export class TarjetaLibroComponent implements OnChanges {
  @Input({ required: true }) libro!: Libro;
  @Input() destacada = false;
  @Output() elegir = new EventEmitter<Libro>();

  portada = '';

  ngOnChanges(): void {
    this.portada = this.libro.titulo.slice(0, 2).toUpperCase();
  }
}

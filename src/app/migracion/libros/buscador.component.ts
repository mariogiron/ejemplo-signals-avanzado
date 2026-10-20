import { AfterViewInit, Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, debounceTime, map } from 'rxjs';
import { Catalogo } from './catalogo';
import { filtrarPorTexto, Libro } from './modelo';
import { TarjetaLibroComponent } from './tarjeta-libro.component';

@Component({
  selector: 'app-buscador',
  imports: [TarjetaLibroComponent],
  template: `
    <p><input #caja placeholder="Buscar libro o autor" (input)="texto$.next(caja.value)" /></p>

    @if (visibles(); as lista) {
      <p>{{ lista.length }} libros</p>
      @for (l of lista; track l.id) {
        <app-tarjeta-libro
          [libro]="l"
          [destacada]="l.id === seleccionado?.id"
          (elegir)="seleccionado = $event"
        />
      }
    } @else {
      <p>Cargando catálogo...</p>
    }

    @if (seleccionado) {
      <p class="ok">Has elegido «{{ seleccionado.titulo }}», de {{ seleccionado.autor }}</p>
    }
  `,
})
export class BuscadorComponent implements AfterViewInit {
  private readonly catalogo = inject(Catalogo);
  private readonly caja = viewChild.required<ElementRef<HTMLInputElement>>('caja');

  protected readonly texto$ = new BehaviorSubject('');
  protected seleccionado: Libro | null = null;

  private readonly visibles$ = combineLatest([
    this.catalogo.listar(),
    this.texto$.pipe(debounceTime(300)),
  ]).pipe(map(([libros, texto]) => filtrarPorTexto(libros, texto)));

  // El puente: el Observable sigue ahí, pero la plantilla ya solo lee un signal.
  protected readonly visibles = toSignal(this.visibles$);

  constructor() {
    effect(() => {
      document.title = `Libros (${this.visibles()?.length ?? 0})`;
    });
  }

  ngAfterViewInit(): void {
    this.caja().nativeElement.focus();
  }
}

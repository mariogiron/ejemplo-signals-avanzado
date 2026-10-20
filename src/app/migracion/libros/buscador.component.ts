import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, inject, viewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, map, Subject, takeUntil } from 'rxjs';
import { Catalogo } from './catalogo';
import { filtrarPorTexto, Libro } from './modelo';
import { TarjetaLibroComponent } from './tarjeta-libro.component';

@Component({
  selector: 'app-buscador',
  imports: [TarjetaLibroComponent, AsyncPipe],
  template: `
    <p><input #caja placeholder="Buscar libro o autor" (input)="texto$.next(caja.value)" /></p>

    <!-- ✍️ 2 · La plantilla lee el signal: visibles() en lugar de visibles$ | async -->
    @if (visibles$ | async; as lista) {
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
export class BuscadorComponent implements AfterViewInit, OnDestroy {
  private readonly catalogo = inject(Catalogo);
  private readonly caja = viewChild.required<ElementRef<HTMLInputElement>>('caja');

  protected readonly texto$ = new BehaviorSubject('');
  protected seleccionado: Libro | null = null;

  protected readonly visibles$ = combineLatest([
    this.catalogo.listar(),
    this.texto$.pipe(debounceTime(300)),
  ]).pipe(map(([libros, texto]) => filtrarPorTexto(libros, texto)));

  // ✍️ 1 · El puente: declara aquí visibles, que convierte visibles$ en un signal con toSignal

  // ✍️ 3 · Desde aquí... sustituye la suscripción por un effect en el constructor
  private readonly destruido$ = new Subject<void>();

  constructor() {
    this.visibles$.pipe(takeUntil(this.destruido$)).subscribe((visibles) => {
      document.title = `Libros (${visibles.length})`;
    });
  }

  ngOnDestroy(): void {
    this.destruido$.next();
    this.destruido$.complete();
  }
  // ✍️ 3 · ...hasta aquí

  ngAfterViewInit(): void {
    this.caja().nativeElement.focus();
  }
}

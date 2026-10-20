import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, inject, viewChild } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { Catalogo } from './catalogo';
import { filtrarPorTexto, Libro } from './modelo';
import { TarjetaLibroComponent } from './tarjeta-libro.component';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [TarjetaLibroComponent, AsyncPipe],
  template: `
    <p><input #caja placeholder="Buscar libro o autor" (input)="texto$.next(caja.value)" /></p>

    @if (visibles$ | async; as visibles) {
      <p>{{ visibles.length }} libros</p>
      @for (l of visibles; track porId($index, l)) {
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
  private catalogo = inject(Catalogo);

  readonly caja = viewChild.required<ElementRef<HTMLInputElement>>('caja');

  texto$ = new BehaviorSubject('');
  seleccionado: Libro | null = null;
  visibles$: Observable<Libro[]>;

  private destruido$ = new Subject<void>();

  constructor() {
    this.visibles$ = combineLatest([
      this.catalogo.listar(),
      this.texto$.pipe(debounceTime(300)),
    ]).pipe(map(([libros, texto]) => filtrarPorTexto(libros, texto)));

    this.visibles$.pipe(takeUntil(this.destruido$)).subscribe((visibles) => {
      document.title = `Libros (${visibles.length})`;
    });
  }

  ngAfterViewInit(): void {
    this.caja().nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.destruido$.next();
    this.destruido$.complete();
  }

  porId(_indice: number, libro: Libro): number {
    return libro.id;
  }
}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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
  imports: [CommonModule, TarjetaLibroComponent],
  template: `
    <p><input #caja placeholder="Buscar libro o autor" (input)="texto$.next(caja.value)" /></p>

    <ng-container *ngIf="visibles$ | async as visibles; else cargando">
      <p>{{ visibles.length }} libros</p>
      <app-tarjeta-libro
        *ngFor="let l of visibles; trackBy: porId"
        [libro]="l"
        [destacada]="l.id === seleccionado?.id"
        (elegir)="seleccionado = $event"
      ></app-tarjeta-libro>
    </ng-container>
    <ng-template #cargando>
      <p>Cargando catálogo...</p>
    </ng-template>

    <p *ngIf="seleccionado" class="ok">
      Has elegido «{{ seleccionado.titulo }}», de {{ seleccionado.autor }}
    </p>
  `,
})
export class BuscadorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('caja') caja!: ElementRef<HTMLInputElement>;

  texto$ = new BehaviorSubject('');
  seleccionado: Libro | null = null;
  visibles$: Observable<Libro[]>;

  private destruido$ = new Subject<void>();

  constructor(private catalogo: Catalogo) {
    this.visibles$ = combineLatest([
      this.catalogo.listar(),
      this.texto$.pipe(debounceTime(300)),
    ]).pipe(map(([libros, texto]) => filtrarPorTexto(libros, texto)));

    this.visibles$.pipe(takeUntil(this.destruido$)).subscribe((visibles) => {
      document.title = `Libros (${visibles.length})`;
    });
  }

  ngAfterViewInit(): void {
    this.caja.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.destruido$.next();
    this.destruido$.complete();
  }

  porId(_indice: number, libro: Libro): number {
    return libro.id;
  }
}

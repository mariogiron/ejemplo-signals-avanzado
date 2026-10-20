import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  effect,
  inject,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { Catalogo } from './catalogo';
import { filtrarPorTexto, Libro } from './modelo';
import { TarjetaLibroComponent } from './tarjeta-libro.component';

@Component({
  selector: 'app-buscador',
  imports: [TarjetaLibroComponent],
  template: `
    <p><input #caja placeholder="Buscar libro o autor" (input)="texto.set(caja.value)" /></p>

    @if (libros.isLoading()) {
      <p>Cargando catálogo...</p>
    } @else if (libros.error()) {
      <p class="error">No se pudo cargar el catálogo</p>
    } @else {
      <p>{{ visibles().length }} libros</p>
      @for (l of visibles(); track l.id) {
        <app-tarjeta-libro
          [libro]="l"
          [destacada]="l.id === seleccionado()?.id"
          (elegir)="seleccionado.set($event)"
        />
      }
    }

    @if (seleccionado(); as elegido) {
      <p class="ok">Has elegido «{{ elegido.titulo }}», de {{ elegido.autor }}</p>
    }
  `,
})
export class BuscadorComponent {
  private readonly catalogo = inject(Catalogo);
  private readonly caja = viewChild.required<ElementRef<HTMLInputElement>>('caja');

  protected readonly texto = signal('');

  /** Ida y vuelta: salgo a RxJS para esperar 300 ms y vuelvo a signals. */
  private readonly texto$ = toObservable(this.texto).pipe(debounceTime(300));
  private readonly textoEstable = toSignal(this.texto$, { initialValue: '' });

  protected readonly libros = rxResource({
    stream: () => this.catalogo.listar(),
    defaultValue: [],
  });

  protected readonly visibles = computed(() =>
    this.libros.error() ? [] : filtrarPorTexto(this.libros.value(), this.textoEstable()),
  );

  /** Se elige a mano y se suelta solo cuando el libro elegido deja de estar a la vista. */
  protected readonly seleccionado = linkedSignal<Libro[], Libro | null>({
    source: this.visibles,
    computation: (visibles, anterior) => visibles.find((l) => l.id === anterior?.value?.id) ?? null,
  });

  constructor() {
    effect(() => {
      document.title = `Libros (${this.visibles().length})`;
    });
    afterNextRender(() => this.caja().nativeElement.focus());
  }
}

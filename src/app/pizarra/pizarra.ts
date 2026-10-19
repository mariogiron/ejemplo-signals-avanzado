import { Component, computed, effect, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest } from 'rxjs';

/** El mismo pedido guardado de dos maneras: con RxJS y con signals. Mira la consola. */
@Component({
  selector: 'app-pizarra',
  template: `
    <h2>Pizarra: precio por cantidad</h2>
    <p>Total con signals: {{ total() }} €</p>
    <button type="button" (click)="cambiarPedido()">Cambiar precio y cantidad</button>
  `,
})
export class Pizarra {
  private readonly precio$ = new BehaviorSubject(10);
  private readonly cantidad$ = new BehaviorSubject(1);

  private readonly precio = signal(10);
  private readonly cantidad = signal(1);
  protected readonly total = computed(() => this.precio() * this.cantidad());

  constructor() {
    combineLatest([this.precio$, this.cantidad$])
      .pipe(takeUntilDestroyed())
      .subscribe(([precio, cantidad]) => console.log('[rxjs] total', precio * cantidad));

    effect(() => console.log('[signals] total', this.total()));
  }

  protected cambiarPedido(): void {
    this.precio$.next(20);
    this.cantidad$.next(3);

    this.precio.set(20);
    this.cantidad.set(3);
  }
}

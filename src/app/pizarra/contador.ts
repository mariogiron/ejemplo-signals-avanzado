import { Component, input, output, signal } from '@angular/core';

/** Un control reutilizable: el padre le pasa el valor y el hijo lo puede cambiar. */
@Component({
  selector: 'app-contador',
  template: `<button type="button" (click)="valorChange.emit(valor() + 1)">{{ valor() }}</button>`,
})
export class Contador {
  // ✍️ 1 · Un input y un output para el mismo dato: júntalos en un model(0)
  readonly valor = input(0);
  readonly valorChange = output<number>();
}

@Component({
  selector: 'app-padre',
  imports: [Contador],
  template: `
    <h2>model(): un dato de ida y vuelta</h2>
    <!-- ✍️ 2 · Ida por un lado y vuelta por otro: enlázalo con [(valor)]="cantidad" -->
    <app-contador [valor]="cantidad()" (valorChange)="cantidad.set($event)" />
    <p>El padre ve: {{ cantidad() }}</p>
  `,
})
export class Padre {
  protected readonly cantidad = signal(5);
}

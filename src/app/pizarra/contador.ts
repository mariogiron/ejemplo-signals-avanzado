import { Component, model, signal } from '@angular/core';

/** Un control reutilizable: el padre le pasa el valor y el hijo lo puede cambiar. */
@Component({
  selector: 'app-contador',
  template: `<button type="button" (click)="valor.set(valor() + 1)">{{ valor() }}</button>`,
})
export class Contador {
  readonly valor = model(0);
}

@Component({
  selector: 'app-padre',
  imports: [Contador],
  template: `
    <h2>model(): un dato de ida y vuelta</h2>
    <app-contador [(valor)]="cantidad" />
    <p>El padre ve: {{ cantidad() }}</p>
  `,
})
export class Padre {
  protected readonly cantidad = signal(5);
}

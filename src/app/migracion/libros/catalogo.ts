import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from './modelo';

@Injectable({ providedIn: 'root' })
export class Catalogo {
  private http = inject(HttpClient);

  /** Cada suscripción es una petición nueva a /libros.json. */
  listar(): Observable<Libro[]> {
    return this.http.get<Libro[]>('/libros.json');
  }
}

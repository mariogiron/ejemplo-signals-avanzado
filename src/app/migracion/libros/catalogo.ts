import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from './modelo';

@Injectable({ providedIn: 'root' })
export class Catalogo {
  constructor(private http: HttpClient) {}

  /** Cada suscripción es una petición nueva a /libros.json. */
  listar(): Observable<Libro[]> {
    return this.http.get<Libro[]>('/libros.json');
  }
}

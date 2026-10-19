export interface Libro {
  id: number;
  titulo: string;
  autor: string;
}

/** Regla de búsqueda: el texto debe aparecer en el título o en el autor. */
export function filtrarPorTexto(libros: readonly Libro[], texto: string): Libro[] {
  const t = texto.trim().toLowerCase();
  return libros.filter((l) => `${l.titulo} ${l.autor}`.toLowerCase().includes(t));
}

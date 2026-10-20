# signals

Proyecto del módulo 2 de Angular Avanzado: signals y el futuro de Angular. Angular 21.2.
Independiente del resto de módulos: tiene su propio `package.json` y no comparte código con ningún otro proyecto.

## Arrancar

    npm ci
    git checkout inicio
    npx ng serve

Tres pestañas, que no dependen unas de otras:

| Pestaña   | Carpeta             | Qué explica                                                           |
| --------- | ------------------- | --------------------------------------------------------------------- |
| Pizarra   | `src/app/pizarra`   | Signal frente a Observable (mira la consola) y `model()`              |
| Migración | `src/app/migracion` | Un buscador de libros escrito como hace unos años, migrado en 4 pasos |
| Recursos  | `src/app/recursos`  | `httpResource`, con cancelación                                       |

## Ejercicios en clase

Cada ejercicio es una pareja de etiquetas. La de ejercicio tiene el código a medio hacer y unos comentarios
`✍️` que dicen qué falta; la de solución es el resultado.

    git checkout -f ejercicio-3-puente     # descarta lo que hayas cambiado y empieza el ejercicio
    git checkout -f solucion-3-puente      # si te atascas

| Paso | Ejercicio              | Solución                 | Qué escribes                                              |
| ---- | ---------------------- | ------------------------ | --------------------------------------------------------- |
| 1    | `inicio`               | `solucion-1-automaticas` | Nada: lanzas las seis migraciones automáticas             |
| 2    | `ejercicio-2-tarjeta`  | `solucion-2-tarjeta`     | `portada` con `computed`                                  |
| 3    | `ejercicio-3-puente`   | `solucion-3-puente`      | `toSignal` y un `effect`                                  |
| 4    | `ejercicio-4-signals`  | `solucion-4-signals`     | La lista con `computed` y la selección con `linkedSignal` |
| 5    | `ejercicio-5-model`    | `solucion-5-model`       | `model()` en lugar de input + output                      |
| 6    | `ejercicio-6-recursos` | `solucion-6-recursos`    | La URL de `httpResource` que depende de un signal         |

`main` es el estado final, igual que `solucion-6-recursos` más este README.

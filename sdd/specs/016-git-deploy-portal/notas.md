# NOTAS · SPEC-016 · Portal de la sesión Git/Deploy

## T03 · Verificación · 9-nov
Portal servido por HTTP en local, como en GitHub Pages, y probado en Chrome headless con CDP.

| Comprobación | Resultado |
|---|---|
| Secciones | 11, en el orden del guion: `hero`, `paraque`, `quien`, `dia`, `familias`, `demo`, `p1`, `p2`, `kit`, `descargas`, `cierre` |
| Horario del portal frente al guion | 13 de 13 bloques iguales en hora y minutos (CA1) |
| Horas de las notas del orador | Todas existen como segmentos del guion |
| Notas del orador | 0 visibles sin `?notas`; 8 de 8 con `?notas` |
| Botón de copiar con fichero | Copia el prompt y el `desplegar.yml` completo (7.219 caracteres), sin el texto del botón. Etiqueta "Copiado con el fichero" |
| Botón de copiar URL | Copia `https://github.com/<usuario>/<repo>/compare/main...lovable-sync` |
| Desbordamiento horizontal | No, ni a 1440 px ni a 390 px |
| Errores de JavaScript | Ninguno. Solo un 404 de `favicon.ico`, que el portal de junio tampoco tiene |
| Enlaces locales (`check_links.py`) | 24 enlaces en 4 ficheros, 0 rotos (CA2) |
| Datos sensibles | 0: sin claves, JWT, Account ID ni correos (CA4) |
| Contenido | Cada cifra y caso sale de la teoría, del guion o de las notas de SPEC-019 (CA5) |

**Corregido durante la verificación:** los enlaces dentro del texto salían con el azul por defecto del navegador, ilegible sobre el fondo oscuro. Ahora usan el color de acento.

**Desde `file://`:** el botón no puede leer el fichero, así que copia solo el prompt y avisa "Copiado sin el fichero: pégalo tú". En GitHub Pages lo lee bien.

**Pendiente de probar en GitHub Pages tras el push (T05):** el botón de copiar con fichero, y que los enlaces de GitHub a `Lab/workflows/` existan.

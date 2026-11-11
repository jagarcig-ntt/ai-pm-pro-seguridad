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

## T05 · Publicado en GitHub Pages · 10-nov
Push de Jaime. Comprobado por el agente en https://jagarcig-ntt.github.io/ai-pm-pro-seguridad/sesiones/2026-11-git-deploy/:
- Portal, hub (con su enlace al portal nuevo), los 3 PDF, `assets/` y los enlaces de GitHub a `Lab/workflows/` → 200.
- **Botón de copiar en Pages:** "Copiado con el fichero", el prompt más el `desplegar.yml` completo (7.219 caracteres).
- Notas ocultas sin `?notas` (0) y visibles con él (8 de 8). Sin desbordamiento a 390 px. Único error: el `favicon.ico` de siempre.

## T04 · Ajuste pedido por Jaime · 11-nov
- **Esquema del flujo de Git en la tarjeta de F1** (solo ahí, de momento): `main` siempre funciona y es producción; Lovable guarda en `lovable-sync`; el Pull Request con checks y preview; el merge commit lleva a producción.
- **SVG dentro del HTML, no Mermaid:** no carga librerías, usa los colores y tipografías del portal y funciona sin conexión. Tiene `title` y `desc` para accesibilidad.
- **Verificado en Chrome** a 1440 px y 390 px, con la tarjeta abierta. Se corrigió una etiqueta tapada por la caja del Pull Request. Sin errores de JavaScript. `check_links.py`: 0 rotos.
- **Esquema de entornos y secretos en la tarjeta de F2** (11-nov, también pedido por Jaime): los tres entornos (vista previa de Lovable, preview del PR y Worker), una sola base de datos de Supabase compartida con su aviso, y el `.env` público frente a los secretos en GitHub y Cloudflare. Mismo estilo que el de F1. Verificado a 1440 y 390 px; se corrigieron un texto que se salía de su caja y dos notas que chocaban.
- **Esquemas de F3 y F4** (11-nov, pedidos por Jaime). F3: el recorrido del workflow en 5 pasos, con la salida en rojo (si falla no se publica y el merge queda bloqueado) y las dos en verde (preview para el PR y producción para el merge). F4: rollback frente a revert en dos líneas, `main` y producción, con el aviso de que entre uno y otro `main` sigue roto. Verificados a 1440 y 390 px; en F4 se reordenó el diagrama porque las líneas cruzaban las etiquetas. Las cuatro familias tienen ya su esquema.


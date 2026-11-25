# REVIEW · SPEC-024 · Portal de la sesión Seguridad v2

*T05 (revisión de contenido) · T06 (navegador) · T08 (después del push, pendiente) · T09 (`/sdd-review 024`, pendiente)*

## T05 · Revisión de contenido (25-nov-2026)

### Criterios
| CA | Estado | Evidencia |
|---|---|---|
| CA1 · hub con la fecha y la hora | ✅ (24-nov) | `index.html:53`: «Jueves 10 dic 2026 · 19:00–21:00 · Zoom». Verificado en Edge a 1440 y 390 px |
| CA2 · secciones aprobadas, `assets/`, nada de junio | ✅ | `<section id>`: `inicio`, `paraque`, `dia`, `familias`, `prompts`, `curiosos`, `descargas` y `cierre` (= plan §2.1). Las tarjetas son `#f1`, `#f2` y `#f3`. No hay `quien`, `impacto`, `dinamicas`, `practica`, `debate` ni una cuarta familia. Usa `../../assets/portal.css`, `portal.js` y `logo-herocamp.jpg`. El `<style>` propio solo tiene lo que no está en `assets/`: los componentes del portal del 21-nov (tabla, copiable, desplegable, descargas) y los colores de etiqueta por familia, la imagen, el mensaje y los enlaces de las tarjetas |
| CA3 · "El día" = guion, 8 bloques de 19:00 a 21:00 | ✅ | Filas de `#dia` comparadas con `leer_guion()` de `check_timings.py` (comprobación puntual, sin cambiar el script): 8 de 8 coinciden en hora y minutos, suma 120. También coinciden con la escaleta de SPEC-026 (`escaleta_seguridad()`). Las horas de las notas del orador y del texto visible existen todas en el guion (cabeceras de bloque y de segmento, tabla de interacciones, 18:50 y 21:00) |
| CA4 · 3 términos, 3 ideas y caso por tarjeta, con la redacción del guion y la guía; cifras con fuente | ✅ | **Términos:** las 9 definiciones son el texto de «Palabras que vas a ver» de la guía (comparadas con un script). **Ideas:** las 3 de cada familia siguen la lista del guion (F1 `GUION-SESION.md:133`, F2 `:244`, F3 `:370`). Los títulos están acortados en F1 idea 2 y F2 idea 3; el contenido es el mismo. **Casos:** el texto de «Caso real» de la guía. **Preguntas:** las 11 de las notas son literales del guion. **Cifras:** todas las del texto visible están en la guía o en el guion (script). Las de los casos (82.314 $, 180 $, 48 h, menos de 5 min, más de 170 apps, 9,3, 1,5 millones, Unit 42, Wiz, Samsung, 6-abr-2023, art. 33) están en `026/verificacion-f1-f2.md` o en `021/verificacion.md` |
| CA5 · *Copiar* y prompts idénticos | ◐ | `python scripts/check_prompts.py`: 6 de 6 ✓ (guía y portal = fichero de prompts). **Falta** probar los botones en GitHub Pages (T08) |
| CA6 · sin lenguaje figurado ni términos sin definir; VS Code y Claude Code solo en `#curiosos` | ✅ (con 1 corrección) | Búsqueda en el texto visible, sin notas: «como si», «imagina», «puerta», «portero», «llave», «candado», «cerradura», «reloj», «escudo», «viaja», «caja fuerte», «agujero», «blindad», «muro», «barrera», «ladrón», «dispar», «corren», «prestan», «habla con» y otras. Ningún resultado. Primera aparición de cada término técnico: *Secrets*, RLS, Pull Request, preview, merge, consola, registros (*logs*), servidor, pipeline, agente, VS Code y Claude Code se definen en la misma frase. **Corregido:** «el escáner de Lovable» aparecía en la portada sin definir. Ahora dice «el escáner de seguridad de Lovable (una revisión automática que busca fallos en tu proyecto)», como la guía. VS Code: 2 apariciones y Claude Code: 1 en el texto visible, todas en `#curiosos` (más sus notas) |
| CA7 · navegador, notas, enlaces y URL | ◐ | T06 ✅ (ver abajo). **Falta** T08: las URL después del push |
| CA8 · ningún token ni clave en el portal ni en las capturas | ✅ | Búsqueda de `sk-`, `eyJ`, `AKIA` y `ghp_` en `index.html`: 0. Las tres imágenes se revisaron a mano en T01: sin cuenta, nombre de proyecto ni valores. En la de F1 se ve el **nombre** del secreto falso `OPENAI_API_KEY`, no su valor (también en su `alt`) |

### Constitution
- **2.2 y la excepción v1.9:** todo el texto visible sale del guion revisado (SPEC-023 T09) o de la guía publicada. No se reutiliza texto de junio.
- **2.3:** 3 ideas por tarjeta. «Lo que te llevas» de F3 tiene 4 acciones, como el guion y «Qué hacer» de la guía. Son acciones, no ideas.
- **3.4:** ver CA8.
- **3.6:** `assets/` común; colores de familia de junio (F1 azul, F2 coral, F3 jade).

### Hallazgos fuera de alcance
- **Guía y guion se contradicen sobre el pipeline** (anotado en T03): la guía dice que los programas revisan «uno detrás de otro»; el guion, que se lanzan «cuatro agentes a la vez». El portal sigue al guion. Corregirlo en la guía es de SPEC-026 o de SPEC-023 T10.

## T06 · Verificación en el navegador (25-nov-2026)

En este equipo no hay Chrome: se usa **Edge sin ventana**. La prueba (`t06_prueba.py`, en el scratchpad) carga el portal real con un script añadido al final y lee el resultado del DOM. A 390 px el portal va en un iframe de 390, porque Edge sin ventana no baja de unos 492 px.

| Comprobación | 1440 px | 390 px |
|---|---|---|
| Notas ocultas sin `?notas` y visibles con `?notas` | ✅ | ✅ |
| La tecla `N` las muestra y las oculta (en los dos sentidos) | ✅ | ✅ |
| Sin desplazamiento horizontal de la página (`scrollWidth` = ancho), con las tres tarjetas abiertas y las notas visibles | ✅ (1401 = 1401) | ✅ (375 = 375) |
| Elementos que pasan del borde derecho | ninguno | solo 3 enlaces del menú superior, que se desplaza en horizontal a propósito (`assets/portal.css:68`, igual que en los otros portales) |
| Los prompts caben en su bloque, sin barra horizontal | ✅ | ✅ |
| Tarjetas: se abre una, al abrir otra se cierra la primera, el enlace interno no la cierra y un segundo clic la cierra | ✅ | ✅ |
| Las tres imágenes cargan (557, 870 y 550 px de ancho) y tienen `alt` | ✅ | ✅ |
| Los tres *Copiar* copian exactamente el prompt de `prompts_chequeo_lovable.md` y el botón pasa a «Copiado» | ✅ | ✅ |
| Anclas internas (`href="#…"`) con destino | ✅ | ✅ |

**Capturas** (scratchpad, con el contenido visible forzado: método de SPEC-026 T12): el portal entero a 1440 px con y sin notas, cada tarjeta abierta a 1440, F2 abierta a 390 y la portada a 390 con la frase de T05. Se leen bien. La imagen de F2 a 390 px se lee justa, porque es una captura ancha; en pantalla compartida va a 1440.

**Comprobado aparte:** `check_links.py`, 30 enlaces y 0 rotos; `check_prompts.py`, 6 de 6.

**No probado aquí:** el portapapeles real. En la prueba se sustituye `navigator.clipboard` para leer lo copiado. Desde `file://`, si el navegador no deja usar el portapapeles, el script usa el método alternativo (`execCommand`). Se prueba de verdad en GitHub Pages (T08).

### Pendiente
- T07: ajustes si el guion cambia en SPEC-023 T10.
- T08: botones *Copiar* en GitHub Pages y URL de `descargas/`.

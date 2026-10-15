# assets/ · Base común de los portales

Estilo y comportamiento compartidos por todos los portales de sesión (constitution 3.6). Se extrajeron **literalmente** del portal de la sesión del 26-jun (SPEC-001 T05, desde `sesiones/2026-12-seguridad-v2/index.html`):

| Fichero | Origen | Contenido |
|---|---|---|
| `portal.css` | `<style>` L11–487 | Tokens, tipografía, layout, cabecera y nav, hero, tarjetas, familias, quiz, notas del orador, responsive y `prefers-reduced-motion` |
| `portal.js` | `<script>` L1970–2060 | Barra de progreso, acordeones, animaciones de aparición, nav activa, quiz y notas del orador |
| `logo-herocamp.jpg` | `<img>` base64 L493/L1965 | Logo oficial de Hero Camp, 508×144, JPEG. **No modificar.** |

## Cómo usarlo desde un portal de sesión
Un portal vive en `sesiones/AAAA-MM-tema/index.html`, dos niveles por debajo de la raíz:

```html
<head>
  <!-- Fuentes: el CSS las usa pero no las importa -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=JetBrains+Mono:wght@300;400;500;700&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../assets/portal.css">
</head>
<body>
  …
  <img src="../../assets/logo-herocamp.jpg" alt="The Hero Camp">
  …
  <!-- Al final del body: el JS busca los elementos al ejecutarse -->
  <script src="../../assets/portal.js"></script>
</body>
```

## Tokens (`:root`)
| Grupo | Tokens |
|---|---|
| Fondos | `--bg` `#0A0E1A` · `--bg-deeper` · `--bg-raised` · `--bg-card` |
| Texto | `--ink` `#F5F3EE` · `--ink-dim` · `--ink-faint` · `--divider` |
| Acento | `--accent` `#DCEE3C` · `--accent-glow` · `--accent-soft` |
| Colores de familia | `--blue` (F2) · `--coral` (F1) · `--jade` (F3) · `--violet` (F4) |
| Notas del orador | `--notes` · `--notes-soft` · `--notes-border` |
| Tipografía | `--serif` (Fraunces) · `--sans` (Manrope) · `--mono` (JetBrains Mono) |
| Layout | `--max-w` 1180px · `--gutter` · `--header-h` 68px · `--ease` |

## Comportamiento de `portal.js`
| Qué | Cómo se activa en el HTML |
|---|---|
| Barra de progreso de lectura | `.progress > .progress-bar` |
| Aparición al hacer scroll | clase `.reveal` (+ `.rd1`…`.rd5` para retardos) |
| Nav activa según la sección visible | `<nav class="nav"><a href="#id">` + `<section id="id">` |
| Tarjeta de dato desplegable (una abierta a la vez) | `onclick="toggleDato(this)"` en `.dato-card` |
| Tarjeta de familia desplegable (una abierta a la vez) | `onclick="toggleFamily(this)"` en `.fam-card` |
| Pestañas del quiz | `onclick="showFamily('f1')"` en `.quiz-tab[data-f]`, con paneles `.quiz-panel#qf1` |
| Revelar o reiniciar una pregunta | `revealAnswer(qId, isDebate)` · `resetQuestion(qId)`, con opciones `.quiz-opt[data-correct]` |
| **Notas del orador** | `?notas` en la URL o tecla `N`. Muestran los elementos de notas mediante `body.show-notes` |

Las tarjetas `.ent-card` y `.agent-card` se despliegan con `onclick="this.classList.toggle('open')"` en el propio HTML. No necesitan JS de este fichero.

## Reglas
- Un cambio aquí afecta a **todos** los portales. Necesita spec y verificación en el navegador de cada portal (constitution 5.6).
- Los componentes nuevos de una sesión se añaden aquí solo si los usa más de un portal. Si no, van en el propio `index.html` de la sesión.
- El portal impartido en junio se conserva autocontenido en el tag `sesion-2026-06`.

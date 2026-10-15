# SPEC-001 · Reorganización del repo por sesiones + hub de portales

| Campo | Valor |
|---|---|
| Estado | borrador v2 (v1 aprobada el 15-oct; v2 tras la revisión de Jaime del 15-oct) |
| Sesión | infraestructura |
| Fecha límite | 2026-10-19 |
| Depende de | SPEC-000 · constitution v1.3 |
| Responsable | Jaime García |

> **Cambios de la v2:**
> - Junio no se archiva en una carpeta propia: su material **evoluciona en su sitio** hacia diciembre.
> - Lo impartido se conserva con el tag de git `sesion-2026-06`.
> - El CSS y el JS se **extraen** de verdad a `assets/`, y el portal de diciembre los usa.
> - Los portales pasan a ser `index.html` dentro de su sesión, para tener URLs limpias.
> - Las descargas van en `descargas/`, con URLs estables, porque en noviembre y diciembre sí se repartirán enlaces.

## 1. Problema / necesidad
- El repo está montado para una sola sesión: `HeroCamp-Teoria/`, `HeroCamp-Product/` y `portal_sesion.html` en la raíz.
- Hay que alojar dos sesiones (21-nov y 11-dic). La de diciembre parte del material de junio y **el portal de junio se enseñará actualizado en diciembre**.
- El portal tiene el CSS y el JS dentro del HTML (2063 líneas; CSS en L11–487 y JS en L1970–2060). El portal de noviembre necesita la misma identidad visual sin duplicar código.
- En noviembre y diciembre se repartirán enlaces directos a alumnos, así que hacen falta URLs que no cambien.

## 2. Objetivo
- Cada sesión vive en `sesiones/AAAA-MM-tema/`, con su portal como `index.html` y sus descargas en `descargas/`.
- Un hub `index.html` en la raíz.
- `assets/` es la única fuente del estilo y del comportamiento común.
- El enlace antiguo `portal_sesion.html` sigue funcionando.
- La versión impartida en junio es recuperable desde un tag.

## 3. Para quién
- **Alumnos de nov/dic:** URLs limpias y estables.
- **Alumnos de junio:** su enlace sigue vivo y aterriza en la versión actual del portal.
- **Jaime y agentes:** estructura predecible según la constitution, apartado 4.

## 4. Alcance
**Incluye:**
- Que Jaime cree el tag `sesion-2026-06` sobre el estado actual, antes de mover nada.
- Mover con `git mv` `HeroCamp-Teoria/`, `HeroCamp-Product/`, `portal_sesion.html` (→ `index.html`) y `materiales_practica.zip` a `sesiones/2026-12-seguridad-v2/`.
- Mover los PDF y el zip que el portal enlaza a `sesiones/2026-12-seguridad-v2/descargas/`, con nombres sin espacios, y actualizar esos enlaces en el portal.
- Extraer el CSS, el JS y el logo a `assets/`. El portal de diciembre los referencia.
- Crear el hub `index.html` en la raíz.
- Crear la redirección `portal_sesion.html`.
- Añadir `.nojekyll`.
- Crear el esqueleto de `sesiones/2026-11-git-deploy/`.
- Script de verificación de enlaces y script para regenerar el zip.

**No incluye:**
- Cambiar el **contenido** del portal. Esta spec solo cambia su fontanería: render idéntico. La actualización del contenido corresponde a SPEC-024.
- Crear el portal de noviembre (SPEC-016).

## 5. Requisitos
- R1. El historial de git de los ficheros movidos se conserva (`git log --follow`).
- R2. Tras la extracción, el portal de diciembre se ve idéntico al de junio, con las notas `?notas` y `N` funcionando.
- R3. `<pages-url>/portal_sesion.html` redirige a `<pages-url>/sesiones/2026-12-seguridad-v2/`, conservando `?notas` y `#ancla`.
- R4. El `index.html` de la raíz sigue la identidad visual de la constitution (3.6) y muestra las sesiones con fecha y estado.
- R5. Todas las descargas del portal resuelven a ficheros existentes en `descargas/`.
- R6. El pipeline `/security-audit` funciona desde `sesiones/2026-12-seguridad-v2/HeroCamp-Product/`.
- R7. El zip de práctica se regenera con un script, no a mano.
- R8. `git checkout sesion-2026-06` reproduce exactamente el material y el portal impartidos.

## 6. Criterios de aceptación
- [ ] CA1. El script de verificación de enlaces devuelve 0 enlaces rotos en el hub, la redirección y el portal de diciembre.
- [ ] CA2. Comparación visual antes y después del portal (capturas de cada sección, modo normal y `?notas`): sin diferencias.
- [ ] CA3. Tras el push de Jaime: la raíz, `/portal_sesion.html` (redirige), `/sesiones/2026-12-seguridad-v2/` y cada descarga responden 200 en GitHub Pages.
- [ ] CA4. `git log --follow` muestra el historial de `GUION-SESION-COMPLETO.md` y del portal.
- [ ] CA5. `/security-audit --repo feedbackhub` se carga y genera un informe desde la nueva ruta.
- [ ] CA6. El tag `sesion-2026-06` existe en local y en el remoto.

## 7. Restricciones (constitution)
1.4 (lo impartido vive en un tag), 3.6 (`assets/` compartido e identidad visual), 4 (URLs estables), 5.5 (Jaime hace commits, tags y push) y 5.6 (verificar el portal en el navegador).

## 8. Preguntas abiertas
- [x] ¿Las carpetas internas mantienen sus nombres? **Sí** (`HeroCamp-Teoria/`, `HeroCamp-Product/`). Renombrarlas se decidirá en SPEC-021 si aporta algo.
- [x] URL compartida: `https://jagarcig-ntt.github.io/ai-pm-pro-seguridad/`. Comprobado el 15-oct: la raíz da 404 (no hay `index.html`) y `portal_sesion.html` da 200.
- [x] ¿Se repartieron enlaces directos a PDF o al zip en junio? Probablemente no, así que no hace falta conservar las rutas antiguas de las descargas. En nov/dic sí se repartirán (→ `descargas/` y URLs estables).

## 9. Hallazgos fuera de alcance
- El logo está embebido como base64 JPEG etiquetado como `image/png`, y repetido dos veces (L493 y L1965). Se arregla de paso al extraerlo a `assets/`.

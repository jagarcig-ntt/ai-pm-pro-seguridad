# SPEC-001 · Reorganización del repo por sesiones + hub de portales

| Campo | Valor |
|---|---|
| Estado | aprobada (15-oct) |
| Sesión | infraestructura |
| Fecha límite | 2026-10-19 |
| Depende de | SPEC-000 |
| Responsable | Jaime García |

## 1. Problema / necesidad
- El repo está montado para una sola sesión: `HeroCamp-Teoria/`, `HeroCamp-Product/` y `portal_sesion.html` en la raíz.
- Con tres sesiones (jun, nov, dic) hace falta separar el material de cada una sin perder la de junio, que es archivo, ni romper la URL de GitHub Pages que ya se compartió.
- El portal tiene el contenido escrito a mano en el HTML: un solo fichero de 2063 líneas, con el CSS en las líneas 10–488 y el JS en las 1969–2063.

## 2. Objetivo
- Cada sesión vive en `sesiones/AAAA-MM-tema/`.
- Hay un `index.html` en la raíz que enlaza a los portales.
- El CSS y el JS comunes están en `assets/`.
- Todas las URLs y descargas existentes siguen funcionando.

## 3. Para quién
- **Alumnos de junio:** el enlace antiguo sigue vivo.
- **Alumnos de nov/dic:** tienen un punto de entrada único.
- **Jaime y agentes:** estructura predecible según la constitution, apartado 4.

## 4. Alcance
**Incluye:**
- Mover con `git mv` `HeroCamp-Teoria/`, `HeroCamp-Product/`, `portal_sesion.html` y `materiales_practica.zip` a `sesiones/2026-06-seguridad/`.
- Extraer el CSS (tokens y componentes), el JS y el logo a `assets/`.
- Crear el hub `index.html`.
- Dejar `portal_sesion.html` en la raíz como redirección.
- Crear el esqueleto vacío de `sesiones/2026-11-git-deploy/` y `sesiones/2026-12-seguridad-v2/`.
- Script de verificación de enlaces.
- Script para regenerar el zip.

**No incluye:**
- Cambiar el contenido del portal de junio. El render debe ser idéntico.
- Crear el portal de noviembre (SPEC-016).
- Copiar el material de junio a la v2 (SPEC-021).

## 5. Requisitos
- R1. El historial de git de los ficheros movidos se conserva (`git log --follow`).
- R2. El portal de junio, ya movido, se ve idéntico al actual, con las notas `?notas` y `N` funcionando.
- R3. `<pages-url>/portal_sesion.html` redirige al nuevo portal de junio, conservando `?notas`.
- R4. `index.html` sigue la identidad visual de la constitution (apartado 3.6) y muestra las tres sesiones con fecha y estado.
- R5. Todas las descargas del portal de junio resuelven a ficheros existentes.
- R6. El pipeline `/security-audit` funciona desde `sesiones/2026-06-seguridad/HeroCamp-Product/`.
- R7. El zip de práctica se regenera con un script, no a mano.

## 6. Criterios de aceptación
- [ ] CA1. El script de verificación de enlaces devuelve 0 enlaces rotos en `index.html` y en el portal de junio.
- [ ] CA2. Comparación visual antes y después del portal de junio, con captura de cada sección: sin diferencias.
- [ ] CA3. Tras el push de Jaime, la redirección funciona en GitHub Pages.
- [ ] CA4. `git log --follow` muestra el historial de `GUION-SESION-COMPLETO.md`.
- [ ] CA5. `/security-audit --repo feedbackhub` genera un informe desde la nueva ruta.

## 7. Restricciones (constitution)
1.4 (junio es archivo: solo enlaces), 3.6 (identidad visual del portal), 5.5 (Jaime hace los commits) y 5.6 (verificar el portal en el navegador).

## 8. Preguntas abiertas
- [ ] ¿Las carpetas internas de junio mantienen sus nombres (`HeroCamp-Teoria/`, `HeroCamp-Product/`)? Propuesta: sí, para tocar menos rutas.
- [x] URL compartida: `https://jagarcig-ntt.github.io/ai-pm-pro-seguridad/`. Comprobado el 15-oct: la raíz da **404** (no hay `index.html`) y `portal_sesion.html` da **200**. El hub `index.html` arregla la raíz.

## 9. Hallazgos fuera de alcance
- (vacío)

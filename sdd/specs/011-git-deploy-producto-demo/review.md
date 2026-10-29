# REVIEW · SPEC-011 · Producto demo de la sesión Git/Deploy

*Ejecutado el 29-oct-2026 con `/sdd-review 011` (T15).*

*Evidencia:*
- *`git` sobre `jagarcig-ntt/feedbackhub-demo` (todas las ramas);*
- *peticiones HTTP a producción y staging;*
- *Chrome headless;*
- *`npm test`;*
- *verificaciones de Jaime en los paneles (`notas.md`).*

## 1. Criterios de aceptación

| CA | Resultado | Evidencia |
|---|---|---|
| CA1 · Repo público, historial sin el repo trampa ni secretos | ✅ | `github.com/jagarcig-ntt/feedbackhub-demo` → 200 sin sesión. Historial propio desde `5d4c779 Initial commit`. Búsqueda en `git log --all -p` de `sb_secret_…`, `sb_publishable_…`, JWT `eyJ…`, `AKIA`, `ghp_`: **solo** aparece la clave inventada de las pruebas (`sb_secret_inventada`, 4 veces). |
| CA2 · Formulario guarda, panel exige login, admin ve y no admin no | ✅ | T09: API sin sesión → 401 en los dos entornos. Jaime: login de administrador OK en prod y staging; el usuario `+noadmin` recibe "Tu usuario no es administrador." (28-oct). |
| CA3 · Datos separados entre staging y prod | ✅ | El feedback "Solo en STAGING (T09)" aparece en el panel de staging y **no** en el de producción (Jaime, 28-oct). URLs de proyecto distintas en `/api/config`. |
| CA4 · Flag y banner por entorno | ✅ | `/api/config`: prod `production` y flag off; staging `staging` y flag on. Chrome headless: banner y campo de valoración visibles solo en staging. |
| CA5 · Fork limpio con PR y check en verde | ⚠️ **pendiente de SPEC-012** | Requisitos del demo cumplidos: repo público, portada editable en un fichero, pruebas sin secretos ni red (8/8 ✅). Falta el workflow del check, que lo crea SPEC-012. |
| CA6 · Ramas `demo/…` y rollback probado | ✅ (3 de 4) | `demo/commits-malos` (`44f39b3`, mismo contenido que T08), `demo/f1-pr-listo` (`d26d725`), `demo/f4-rompe-portada` (`2b1e95c`). Rollback en Cloudflare: unos 5 s y de vuelta a la última versión verificado (T14). `demo/f3-checks` se crea en SPEC-012 (declarado en T11). |
| CA7 · Cobertura de los mapas de SPEC-014 | ✅ dentro del alcance | Ver apartado 2: de las 30 filas, cada una está cubierta en el demo o transferida a una spec concreta (SPEC-012, SPEC-015 o SPEC-017). Ninguna sin dueño. |
| CA8 · Marcas `ajustar tras SPEC-011/013` resueltas | ✅ con nota | 0 marcas de SPEC-011/013. Quedan 2 acotadas a **SPEC-012**: plantilla de PR (F1) y nombres de workflows (F3). |
| CA9 · Coste 0 | ✅ | Planes usados: GitHub (repo público), Cloudflare Pages Free y Supabase Free (2 proyectos). Jaime confirma (29-oct) que ninguna cuenta ha pedido tarjeta. |

## 2. Cobertura de los mapas de SPEC-014 (CA7)

| Familia · fila del mapa | Estado | Dónde |
|---|---|---|
| F1 `main` protegida (ruleset) | → SPEC-012 | — |
| F1 Convención de ramas en el README | ✅ | `README.md` · "Cómo trabajamos" |
| F1 Historial ejemplar + `demo/commits-malos` | ✅ | `main` (`[SPEC-011] T03…T10`) y la rama |
| F1 Plantilla de PR con "¿qué pasa si falla?" / "¿cómo se apaga?" | → SPEC-012 | — |
| F1 Funcionalidad detrás de un feature flag | ✅ | `FEATURE_VALORACION` |
| F1 Repo público, editable desde la web, sin build | ✅ | Sin compilación ni dependencias |
| F1 Plan B `demo/f1-pr-listo` con PR abierto + capturas | ✅ rama · → SPEC-012 (abrir el PR) · → SPEC-015 (capturas) | — |
| F2 Tres entornos con BD separadas | ✅ | `feedbackhub-staging` / `feedbackhub-prod` + local |
| F2 Banner STAGING por variable | ✅ | `APP_ENV` |
| F2 Configuración solo en la plataforma | ✅ | Prueba "el frontend no lleva URLs ni claves" |
| F2 Feature flag en staging sí / prod no | ✅ | CA4 |
| F2 `.env` ignorado, `.env.example`, secrets de GitHub | ✅ `.env` / `.env.example` · → SPEC-012 (secrets de Actions) | — |
| F2 Producción fuera del alcance del agente | → SPEC-017 | — |
| F2 Plan B capturas | → SPEC-015 | — |
| F3 Workflows legibles | → SPEC-012 | — |
| F3 Check obligatorio en `main` | → SPEC-012 | — |
| F3 Prueba sencilla que se puede romper | ✅ | `tests/portada.test.js` |
| F3 Preview por PR enlazada en el PR | ✅ preview (alias manual) · → SPEC-012 (una por PR) | — |
| F3 Merge = producción sin despliegues manuales | → SPEC-012 | — |
| F3 Fork-friendly (check sin secretos) | ✅ pruebas · → SPEC-012 (workflow) | — |
| F3 Coste 0 | ✅ | CA9 |
| F3 Plan B `demo/f3-checks` | → SPEC-012 | — |
| F4 Checklist en el repo | ✅ | `docs/checklist-go-live.md` |
| F4 Rama que rompe producción | ✅ | `demo/f4-rompe-portada` (500 en `/api/config` con los checks en verde) |
| F4 Rollback en un clic, probado | ✅ | unos 5 s (T14) |
| F4 Revert por PR | ✅ flujo · → SPEC-012 (con checks) | — |
| F4 Flag apagable desde variables | ✅ con matiz | Exige *Retry deployment* (documentado en F4 y en la checklist) |
| F4 Registros de errores + métrica de uso | ✅ | `npx wrangler pages deployment tail` · panel: total, últimas 24 h y valoración media |
| F4 Puente al 11-dic en el workflow | → SPEC-012 / SPEC-022 | — |
| F4 Plan B vídeo del simulacro | → SPEC-015 | — |

## 3. Conformidad con la constitution

| Principio | Resultado | Nota |
|---|---|---|
| 3.4 Nada de secretos reales | ✅ con incidente | Las claves **secretas** de Supabase llegaron a configurarse en Cloudflare y `/api/config` las servía (22-oct). Se sustituyeron por las *publishable*, se añadió una protección en el código (`esClaveSecreta`) con su prueba, y ningún secreto llegó al repo. Jaime confirma (29-oct) que **revocó las dos claves secretas**. |
| 3.2 Coste 0 | ✅ | CA9 |
| 3.3 Plan B probado | ✅ en lo que toca | Ramas de plan B (F1, F4), rollback probado y revert como alternativa. Las capturas y el vídeo van en SPEC-015. |
| 3.5 Reproducible desde cero | ⚠️ parcial | El README permite levantarlo. El cronometrado desde una cuenta limpia se hace con el fork de CA5 (SPEC-012). |
| 5.5 Commits y despliegues de Jaime | ✅ | Todos los commits y despliegues los hizo Jaime. El agente solo editó ficheros y verificó. |
| 4 Convenciones | ✅ | Prefijo `[SPEC-011] Tnn` en `main` del demo. Ramas `demo/…` sin prefijo a propósito (realismo). Idioma: español. |
| 2.x Pedagógicos (minutos, ideas, pausas) | n/a | Esta spec no contiene material de sesión con tiempos. |
| 3.6 Identidad visual del portal | n/a | El demo es un producto, no un portal. Contraste AA ajustado en botones y tarjetas. |

## 4. Tareas
T01–T14 ☑ (T05b y T11 cerradas tras su incidencia). T15 = esta revisión.

## 5. Acciones pendientes
1. ~~Revocación de las claves secretas~~ → confirmada por Jaime el 29-oct.
2. ~~Coste 0~~ → confirmado por Jaime el 29-oct.
3. **SPEC-012** recibe:
   - CA5 (fork limpio con check en verde);
   - la plantilla de PR y las 2 marcas de la teoría;
   - workflows "Comprobar el PR" y "Desplegar", más el ruleset de `main`;
   - `demo/f3-checks` y abrir el PR de `demo/f1-pr-listo`;
   - token de Cloudflare y secrets de GitHub.
4. **SPEC-015** recibe las capturas y el vídeo del plan B (F1, F2, F4). Añade a la checklist del ensayo **reactivar los proyectos de Supabase** 48 h antes.
5. **SPEC-017** recibe "producción fuera del alcance del agente".
6. **Propuesta para la teoría** (pendiente de Jaime): cambiar "sin desplegar de nuevo" por "sin cambiar el código" en F1, F2 y el glosario, por el matiz de Cloudflare Pages.
7. (Opcional) Borrar las filas de prueba ("Prueba T05/T06 (borrar)", "Solo en STAGING (T09)") antes de la sesión, o dejarlas como ejemplo en staging.

**Veredicto (29-oct):** spec **hecha**. Las acciones 3–5 pasan como entradas a SPEC-012, SPEC-015 y SPEC-017.

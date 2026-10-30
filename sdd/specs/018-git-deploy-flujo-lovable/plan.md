# PLAN · SPEC-018 · Validar el flujo Lovable → GitHub → Cloudflare Pages (+ Supabase)

*Spec: [spec.md](spec.md) (aprobada el 30-oct) · Estado del plan: **aprobado y ejecutado en versión mínima** · 30-oct*

> **Versión mínima (30-oct, a petición de Jaime: "mucho lío").** Se ejecutó solo lo esencial: el proyecto de Lovable `jagarcig-ntt/feedback-hub` + 3 pruebas sobre ramas (O1–O4), respondidas en `notas.md`. **Fuera de alcance salvo que la reunión lo pida:** segunda organización de Supabase, Cloudflare nuevo y workflow con compilación (2.1 M1/M4/M5, 2.5, O5–O6). El entregable es `propuesta-reunion.md`.

## 1. Enfoque
- **Es un experimento, no una construcción.** Se crea un proyecto mínimo en Lovable y se **observa** su comportamiento en cada paso. Cada observación se anota con fecha y captura en `notas.md` (constitution 5.4). Lovable cambia rápido, así que no se da nada por supuesto.
- **Primero lo que decide el flujo:** cómo escribe Lovable en GitHub (R2). El workflow y el documento dependen de esa respuesta.
- **Se reutiliza lo que ya funciona:** el patrón de `desplegar.yml` de SPEC-012, con un único cambio, el paso de **compilación** con las variables de cada entorno.
- **Se prueban tres candidatos de flujo** (apartado 2.4) y se elige con evidencia, no por preferencia.
- **Descartado:** usar el *Publish* de Lovable como producción. Es un solo entorno, sin staging ni preview por PR, y no permite enseñar F2–F4.

## 2. Diseño

### 2.1 Montaje (pasos de Jaime 🧑, unos 30 min)

| # | Dónde | Qué | Nombre |
|---|---|---|---|
| M1 | Supabase | Nueva **organización** (plan Free) con 2 proyectos | org `lovable-prueba` · proyectos `lovable-staging` y `lovable-prod` |
| M2 | GitHub | Repo nuevo, **público**, vacío | `jagarcig-ntt/lovable-prueba` |
| M3 | Lovable | Proyecto nuevo con el prompt de 2.2, conectado a GitHub (repo de M2) y a Supabase (**proyecto de staging**) | `lovable-prueba` |
| M4 | Cloudflare | Proyecto Pages *Direct Upload*, rama de producción `main` | `lovable-prueba` |
| M5 | GitHub | *Secrets* `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` (el mismo token sirve: tiene permiso sobre Pages de toda la cuenta) | — |

### 2.2 Prompt para Lovable (M3)
> Crea una app muy sencilla llamada "Notas del equipo": una página pública con el título y un formulario para dejar una nota (texto, máximo 280 caracteres), y una página /admin con login por email y contraseña de Supabase que lista las notas. Usa Supabase para la base de datos y la autenticación, con RLS: cualquiera puede insertar notas y solo los usuarios autenticados pueden leerlas. Sin estilos complejos.

Es mínimo, pero tiene las piezas reales: frontend, login, base de datos y permisos.

### 2.3 Observaciones (R2 y técnicas)

| # | Pregunta | Cómo se observa |
|---|---|---|
| **O1** | ¿En qué rama escribe Lovable? | Pedir un cambio en Lovable → mirar en GitHub la rama y el autor del commit |
| **O2** | ¿Qué hace Lovable si `main` está protegida? | Activar el ruleset de SPEC-012 en el repo → pedir un cambio en Lovable → ¿error visible?, ¿commit perdido?, ¿lo escribe en otra rama? |
| **O3** | ¿Hay forma soportada de trabajar por ramas? | Revisar la configuración de GitHub del proyecto en Lovable (y sus *Labs*). Si existe, cambiar a la rama `lovable` y repetir O1 |
| **O4** | ¿Vuelven a Lovable los cambios fusionados por PR? | Editar un texto en GitHub en una rama → PR → merge a `main` → ¿lo ve Lovable? |
| **O5** | ¿Dónde guarda Lovable la URL y la clave de Supabase? | Buscar en el repo (`src/integrations/supabase/` u otro): ¿variables `VITE_*` o valores escritos en el código? ¿Es la clave pública? |
| **O6** | ¿Lovable conecta un Supabase externo o usa su propio backend (*Lovable Cloud*)? | Pantalla de integraciones de Lovable al crear el proyecto |
| **O7** | ¿Qué funciones piden plan de pago? | Anotar cualquier bloqueo o aviso de "upgrade" (R6) |

### 2.4 Tres flujos candidatos (O1–O4 deciden)

| Flujo | Cómo funciona | Cuándo encaja |
|---|---|---|
| **A · Rama de Lovable + PR** | Lovable escribe en una rama `lovable` → el alumno abre un PR a `main` → checks + preview → merge = producción | Si O3 confirma un modo de ramas soportado. Es el flujo de la sesión sin cambios |
| **B · Lovable en `main` + producción con aprobación** | Lovable escribe en `main` (sin protección de PR) → cada push publica **staging** → producción solo tras una **aprobación manual** en GitHub (*Environment* `production` con *required reviewers*) | Si Lovable solo puede escribir en `main`. Mantiene staging, el control de salida a producción y el rollback; cambia **dónde** está el punto de control (de "antes del merge" a "antes de producción") |
| **C · Lovable para construir, GitHub para cambiar** | Lovable para el prototipo; una vez en producción, los cambios se hacen por rama y PR (web de GitHub, editor o agente) y Lovable ve el resultado al sincronizar `main` | Si O4 muestra que Lovable se lleva bien con los merges hechos fuera |

- **Hipótesis de partida:** B o C, porque la documentación oficial dice que Lovable sincroniza solo con la rama principal.
- **B necesita verificar** que los *required reviewers* de los Environments están disponibles en repos públicos del plan gratuito de GitHub. Se comprueba en la propia prueba.

### 2.5 Workflow de despliegue para un proyecto Vite (lo escribe el agente)
`.github/workflows/desplegar.yml` del repo de prueba, a partir del de SPEC-012:
1. Mismas guardas: solo en el repo original y nunca en forks.
2. **Paso nuevo:** `npm ci` + `npm run build`, con las variables del entorno de destino. Vite las fija **al compilar**, así que se compila una vez por destino:
   - PR / staging → `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` de `lovable-staging`;
   - producción → las de `lovable-prod`.

   Los nombres exactos los dice O5.
3. Publicar **`dist/`** (no `public/`) con `wrangler pages deploy`.
4. Variables en **GitHub Environments** (`staging` y `production`). Las URL y las claves públicas van como *variables*; el token de Cloudflare sigue como *secret*.
5. Para el flujo B, el job de producción usa `environment: production`, que exige la aprobación.

**Si O5 muestra la configuración escrita en el código** y no en variables, el workflow la sustituye al compilar y anotamos el hallazgo. Sería contenido directo para F2 ("¿dónde vive la configuración de mi Lovable?") y para el 11-dic.

### 2.6 Entregables
1. **`notas.md`:** O1–O7 con evidencia y fecha.
2. **El flujo elegido** con los pasos del alumno: 5 como máximo, qué hace en Lovable y qué hace en GitHub (R5).
3. **`propuesta-reunion.md`:** una página para Gema y el entrenador. Contiene:
   - stack: Lovable, GitHub, Supabase y Cloudflare Pages;
   - el flujo probado, con sus capturas;
   - qué cambia en las sesiones de construcción (por ejemplo, conectar GitHub desde el día 1 y usar Supabase con dos proyectos);
   - preguntas para el entrenador;
   - decisiones abiertas.
4. **Propuestas de cambio,** sin aplicarlas: teoría F1 y F2 (puente "tu proyecto de Lovable"), SPEC-013 (requisitos previos) y SPEC-017 (el squad reconoce un proyecto de Lovable).

## 3. Ficheros

| Acción | Ruta | Nota |
|---|---|---|
| crear (repo de prueba) | `.github/workflows/desplegar.yml`, `.github/workflows/comprobar-pr.yml` | Derivados de `feedbackhub-demo` |
| crear | `sdd/specs/018-git-deploy-flujo-lovable/notas.md` | Observaciones O1–O7 |
| crear | `sdd/specs/018-git-deploy-flujo-lovable/propuesta-reunion.md` | Documento de la reunión |
| reutilizar | `feedbackhub-demo/.github/workflows/*.yml`, ruleset de SPEC-012, token de Cloudflare | — |
| no tocar | `feedbackhub-demo`, teoría (solo se proponen cambios) | — |

## 4. Riesgos y plan B

| Riesgo | Prob. | Mitigación / plan B |
|---|---|---|
| Lovable usa por defecto su propio backend (*Lovable Cloud*) y no deja conectar un Supabase externo en el plan actual | media | Anotarlo (O6, O7). Si no se puede, probar el flujo con el backend de Lovable y documentar la limitación de entornos para la reunión |
| Lovable falla o pierde cambios con `main` protegida (O2) | media | Es justo lo que queremos saber. Se desactiva el ruleset y se prueba el flujo B |
| Los *required reviewers* de Environments no están disponibles gratis | baja | Alternativa: producción solo con un workflow manual (*workflow_dispatch*) que lanza el responsable |
| Configuración escrita en el código por Lovable (O5) | media | Sustituirla al compilar en el workflow, y llevarlo como hallazgo a la reunión |
| Tiempo: la reunión es la semana del 2-nov | media | Montaje + O1–O4 este fin de semana o el lunes. El documento puede salir con el flujo decidido aunque el workflow con compilación no esté pulido |

## 5. Verificación

| Criterio | Cómo |
|---|---|
| CA1 | `notas.md` con O1–O4 respondidas y una captura o commit por cada una |
| CA2 | PR (o push, en el flujo B) → preview o staging en Cloudflare con `lovable-staging`; merge o aprobación → producción con `lovable-prod`. Se comprueba el contenido, no solo un 200 |
| CA3 | Una nota enviada en staging no aparece en el panel de producción |
| CA4 | Los pasos del alumno caben en 5 y se cotejan con F1–F4. Las diferencias van a la lista de cambios propuestos |
| CA5 | `propuesta-reunion.md` listo antes del día de la reunión |
| CA6 | Búsqueda de claves secretas en el repo de prueba (0); facturación de las tres cuentas sin cambios |

## 6. Tensiones con la constitution
- **5.4 (nada de inventar):** todo lo que se diga de Lovable sale de O1–O7 o de su documentación oficial, con fecha. Las guías de terceros no cuentan como fuente.
- **2.6 (excepción del producto común):** FeedbackHub sigue siendo el demo. Lovable entra como "tu producto", el puente de transferencia del objetivo R7 de SPEC-010.
- **Flujo B:** si es el elegido, cambia el mensaje de F1 ("todo entra por PR") para quien use Lovable. No se toca la teoría sin decisión de Jaime y sin hablarlo en la reunión.

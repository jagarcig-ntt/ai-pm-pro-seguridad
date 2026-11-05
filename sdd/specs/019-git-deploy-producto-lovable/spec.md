# SPEC-019 · Producto Lovable de la sesión (demo principal)

| Campo | Valor |
|---|---|
| Estado | **en curso** (5-nov) · aprobada el 3-nov |
| Sesión | 2026-11 Git/Deploy (sábado 21-nov · 10:00–14:00 · Zoom) |
| Fecha límite | 2026-11-12 (antes del guion y el portal; ensayo la semana del 16-nov) |
| Depende de | SPEC-018 (hecha: flujo y CI/CD validados) · SPEC-010 v4.1 · constitution v1.6 |
| Sustituye a | El demo anterior, FeedbackHub en Cloudflare Pages (retirado el 3-nov y borrado del repo el 5-nov) |
| Alimenta | SPEC-014 v2 (sección 6 de la teoría), SPEC-015 (guion), SPEC-016 (portal), SPEC-013 (guía), SPEC-017 (squad) |
| Responsable | Jaime García |

## 1. Problema / necesidad
- Con la v4, **el producto de demo es el proyecto de Lovable** `jagarcig-ntt/feedback-hub` (decisión de Jaime, 3-nov). FeedbackHub (`feedbackhub-demo`) se retira.
- `feedback-hub` ya tiene el flujo probado: ramas en Lovable, `lovable-sync`, CI/CD con Bun y Workers, preview por PR y producción por merge (`sdd/specs/018-git-deploy-flujo-lovable/notas.md`).
- **Le falta lo que el demo retirado sí tenía** (comprobado el 3-nov con la API de GitHub):
  - el ruleset de `main` **no exige** el check "Comprobar el PR". Solo tiene `deletion`, `non_fast_forward` y `pull_request`; se creó antes de que existiera el CI;
  - no hay plantilla de PR;
  - no hay ramas de demo (check en rojo para F3, rotura de producción para F4);
  - no hay base de datos conectada: el formulario no guarda nada;
  - no hay checklist de go-live ni README para alumnos;
  - el rollback de Workers no está probado.

## 2. Objetivo
`feedback-hub` listo como **demo principal** de la teoría y como **modelo y plan B de la práctica**:
- Supabase conectado (base de datos compartida entre entornos, decisión del 2-nov);
- `main` protegida con check obligatorio;
- plantilla de PR;
- ramas de demo para F3 y F4;
- rollback de Workers probado;
- README y checklist.

## 3. Para quién
- **Jaime:** demos en vivo de F1–F4 sobre el mismo producto que tendrán los alumnos, y planes B ya ejecutados.
- **Alumnos:** un modelo exacto de cómo debe quedar su repo. Quien llegue sin requisitos previos practica sobre una copia de este repo.
- **SPEC-017 (squad):** la configuración de referencia que el squad replica en el repo de cada alumno.

## 4. Alcance
**Incluye (repo `feedback-hub`):**
- **Supabase (reutilizado, decisión de Jaime del 3-nov):** se reutilizan los proyectos del demo anterior, que ya tienen la tabla `feedback` (nombre, email, mensaje, valoración), RLS probado (insert público, lectura solo administradores) y usuarios administradores.
  - **`feedbackhub-prod`** → base de datos **compartida** del proyecto de Lovable (staging y producción).
  - **`feedbackhub-staging`** → libre: se usa como el Supabase del ensayo solo con navegador (CA9).
  - Lovable se conecta a la tabla existente, sin crear una nueva. Sin organización nueva y dentro de los 2 proyectos gratuitos.
- **Observaciones que siguen abiertas en SPEC-018:**
  - O5 · dónde guarda Lovable la URL y la clave (¿variables `VITE_*` o escritas en el código? ¿clave pública?);
  - O6 · si deja conectar un Supabase propio o empuja a su backend.
- Variables de Supabase en el CI/CD, si el build las necesita (`VITE_*` en los secrets o variables de GitHub).
- **Ruleset:** añadir el check obligatorio "Comprobar el PR".
- **Plantilla** `.github/pull_request_template.md`, la misma del demo anterior.
- **Ramas de demo:**
  - `demo/f3-checks`: cambio que rompe la prueba, check en rojo y merge bloqueado;
  - `demo/f4-rompe-produccion`: cambio con los checks en verde que falla en producción, para el simulacro de rollback.
- **Rollback de Workers** probado y cronometrado (panel o `wrangler rollback`).
- **README para alumnos:** qué es, cómo trabajar en Lovable por ramas, cómo copiar los workflows, secretos y checklist de go-live (`docs/checklist-go-live.md`).
- Actualizar `sesiones/2026-11-git-deploy/Lab/README.md` (hoy apunta a `feedbackhub-demo`).

**No incluye:**
- Separar staging y producción en la base de datos (fuera del MVP: acuerdo con Jose del 5-nov).
- La teoría (SPEC-014 v2).
- El squad (SPEC-017).
- Requisitos previos (SPEC-013).

## 5. Requisitos
- **R1.** Todo cambio en el producto se hace **en Lovable** o **por PR**. Nunca push directo, y nunca reescribir el historial de la rama conectada (aviso del `AGENTS.md` de Lovable).
- **R2.** Solo la clave **pública** de Supabase en el frontend. Si Lovable la escribe en el código, se documenta como hallazgo para F2 y para el 11-dic.
- **R3.** RLS: cualquiera inserta feedback; nadie lo lee sin sesión.
- **R4.** El CI/CD sigue en verde después de conectar Supabase. El check y el despliegue funcionan con las variables necesarias.
- **R5.** Las ramas de demo son **cambios realistas y explicables en una frase**, como las del demo retirado.
- **R6.** Coste 0.

## 6. Criterios de aceptación
- [ ] CA1. Desde la portada de producción se envía un feedback que aparece en la tabla de Supabase. Sin sesión no se puede leer (comprobado con la clave pública).
- [ ] CA2. O5 y O6 respondidas con evidencia en `notas.md`.
- [ ] CA3. El ruleset de `main` exige "Comprobar el PR". Un PR con el check en rojo muestra el merge bloqueado (`demo/f3-checks`).
- [ ] CA4. `demo/f4-rompe-produccion` pasa los checks y falla de forma visible en producción. El rollback la recupera y está cronometrado.
- [ ] CA5. Plantilla de PR, README y checklist en `main`. `Lab/README.md` apunta a `feedback-hub`.
- [ ] CA6. 0 claves secretas en el historial. Lovable sigue "In sync".
- [ ] CA7. Con Supabase conectado, una tabla nueva pedida en el chat de Lovable llega a Supabase tras aprobar el SQL. Queda anotado si el cambio afecta a la base de datos antes del merge de la rama.
- [ ] CA8. Un usuario inicia sesión y lee sus datos desde la app publicada en Cloudflare.
- [ ] CA9. Ensayo solo con navegador: un proyecto nuevo de Lovable llega a staging y producción con `main` protegida siguiendo la guía, sin clonar nada, cronometrado y con capturas para SPEC-013. Valida el orden: workflows en `main`, primera publicación y protección de `main`.

## 7. Restricciones (constitution)
3.1 stack · 3.2 coste 0 · 3.3 plan B probado · 3.4 nada de secretos · 5.5 Jaime hace commits, merges y paneles · 2.6 (stack común) · 2.9 (este repo es el modelo del éxito del alumno).

## 8. Preguntas abiertas
- [ ] ¿Archivar `feedbackhub-demo` en GitHub (*Settings → Archive*: queda de solo lectura y visible) o dejarlo como está? ¿Pausar sus proyectos de Supabase y el proyecto de Cloudflare Pages? Propuesta: **archivar el repo** y dejar que Supabase pause solo sus proyectos.
- [x] **Cambio de `demo/f4-rompe-produccion`:** se decide en el plan (Jaime, 3-nov).

## 9. Hallazgos fuera de alcance
- (vacío)

# PLAN · SPEC-019 · Producto Lovable de la sesión

*Spec: [spec.md](spec.md) (aprobada el 3-nov) · Estado del plan: **aprobado** (Jaime, 5-nov)*

> **Ya hecho (3-nov):** 2.1 y 2.2. El `.env` del repo solo lleva valores públicos y el CI no necesita variables (`notas.md`).
> **Pendiente:** 2.3–2.8. Ver [tasks.md](tasks.md).

## 1. Enfoque
- **Lo que más condiciona va primero: Supabase.** Cómo guarda Lovable la conexión (O5, O6) decide:
  - si el CI necesita variables;
  - cómo se rompe producción en la demo de F4;
  - qué cuenta la teoría de F2.
- **Todo cambio entra como lo haría un alumno:** desde Lovable (en una rama o en `lovable-sync`) o por PR en GitHub. Así cada paso deja material real para la sesión (commits, PR, previews).
- **Se reutiliza lo del demo anterior:** la plantilla de PR es idéntica, y la lógica de las ramas de demo es la misma (F3 rompe la prueba; F4 pasa los checks y falla en producción).
- **Reutilizar las bases de datos del demo anterior** (decisión del 3-nov): el esquema y los permisos ya están probados y no hay que crear ni configurar nada.
- **Descartado:**
  - usar el backend integrado de Lovable: los alumnos usan Supabase propio por *Connectors* (decisión de Jaime, 5-nov);
  - separar la base de datos de staging: fuera del MVP (acuerdo con Jose, 5-nov).

## 2. Diseño

### 2.1 Supabase (pasos de Jaime 🧑 más observación)
1. **Supabase (reutilizado):** no se crea nada. Se usa `feedbackhub-prod` (tabla `feedback` + RLS + administrador ya existentes) como base de datos compartida.
2. **Lovable:** localizar dónde se conecta un Supabase propio y **hacer captura antes de conectar** (O6).
3. Conectar `feedbackhub-prod` y pedir a Lovable que use la tabla existente, **sin crear tablas ni cambiar permisos**: *"Conecta el formulario a la tabla existente `public.feedback` de Supabase (columnas `name`, `email`, `message`). No crees tablas nuevas ni cambies las políticas RLS: ya están configuradas. Al enviar, inserta una fila y muestra un mensaje de confirmación."*
4. **El agente observa en el repo:**
   - O5: dónde quedan la URL y la clave (¿`.env` o `VITE_*`? ¿escritas en el código? ¿clave pública?);
   - si hay migraciones SQL en el repo;
   - en qué rama queda el cambio;
   - el CI.
5. **El agente verifica con la clave pública:** insertar sí, leer no (R3), igual que en el demo anterior.

### 2.2 CI/CD con Supabase
- **Si Lovable escribe la URL y la clave pública en el código:** el build no necesita variables y el CI no cambia. Se documenta como hallazgo para F2 (*"la clave pública puede ir en el código; la secreta, nunca"*).
- **Si usa `VITE_*` de un `.env`:** se añaden como *variables* de GitHub (son públicas) y se pasan al paso de compilación de los dos workflows. Se verifica en un PR.

### 2.3 Ruleset y plantilla (pasos de Jaime 🧑)
- *Settings → Rules → main siempre funciona* → **Require status checks to pass** → `Comprobar el PR`.
- La plantilla `.github/pull_request_template.md` entra por PR, que a su vez sirve como primer ejemplo de PR con check obligatorio. Su texto:

```markdown
## Qué cambia
<!-- En una o dos frases, para alguien que no ha hecho el cambio. -->

## Por qué
<!-- Qué problema resuelve o qué necesidad cubre. -->

## Cómo se ha probado
- [ ] El check **"Comprobar el PR"** está en verde
- [ ] Lo he probado en la **URL de preview** (aparece en un comentario de este PR)

## ¿Qué pasa si falla?
<!-- Qué vería un usuario y a qué afectaría si este cambio fallara en producción. -->

## ¿Cómo se apaga?
<!-- ¿Hay un feature flag? ¿Basta con un rollback en Cloudflare o hace falta un revert? -->
```

### 2.4 Ramas de demo
| Rama | Cambio | Qué enseña |
|---|---|---|
| `demo/f3-checks` | Cambia el título de la portada y rompe la prueba de `src/test/app-routing.test.tsx` (o una prueba de portada añadida en esta spec si la existente no comprueba el título) | Check en rojo → merge bloqueado → ni siquiera se publica la preview |
| `demo/f4-rompe-produccion` | **Propuesta:** renombrar por error la variable de entorno de Supabase que lee la app (por ejemplo, una letra cambiada). La compilación y las pruebas pasan, pero en producción la app no conecta y el formulario falla al enviar. Si O5 dice que la configuración está en el código, la alternativa es un cambio que lanza un error en tiempo de ejecución en la ruta de la portada | "Verde no significa que funcione" → detectar → **rollback de Workers** → arreglar por PR. Enlaza F2 (configuración) con F4 |

### 2.5 Rollback de Workers (Jaime 🧑, cronometrado)
Panel: *Workers & Pages → jagarcig-ntt-feedback-hub → Deployments* → versión anterior → *Rollback*. O bien `npx wrangler rollback`. Comprobar el contenido, no solo un 200.

### 2.6 Documentación
- `README.md` del repo, para alumnos: qué es, cómo trabajar en Lovable por ramas, cómo copiar los workflows, secretos y enlace a la checklist. **Ojo:** Lovable creó su propio `README.md` y el cambio debe entrar por PR sin pisar lo que Lovable necesite.
- `docs/checklist-go-live.md`: los 8 puntos de F4.
- `sesiones/2026-11-git-deploy/Lab/README.md` (este repo): apunta a `feedback-hub` y a sus URL de Workers.

### 2.7 Comprobaciones nuevas (5-nov, antes de la sesión; no son para los alumnos)
1. **CA7 · Tabla desde el chat** (`feedback-hub`, Jaime 🧑 más observación): con una rama conectada en Lovable, pedir una tabla de prueba y aprobar el SQL. El agente comprueba si llega a Supabase antes del merge y si aparece en `supabase/migrations/`. Se borra después.
2. **CA8 · Login desde la app publicada:** pedir a Lovable un acceso con login que lea la tabla `feedback` y comprobarlo en la URL de producción de Cloudflare, añadiendo esa URL a las redirecciones de Supabase.
3. **CA9 · Ensayo solo con navegador:** proyecto nuevo de Lovable, repo público, `feedbackhub-staging` por *Connectors*, secretos en GitHub, workflows pegados en `main`, primera publicación, proteger `main`, cambio, PR, preview y merge. Sin clonar nada, cronometrado, y con capturas para la guía (SPEC-013).

### 2.8 Limpieza
Jaime archiva `jagarcig-ntt/feedbackhub-demo` (*Settings → General → Danger Zone → Archive this repository*).

## 3. Ficheros
| Acción | Ruta |
|---|---|
| crear (feedback-hub, por PR) | `.github/pull_request_template.md`, `docs/checklist-go-live.md`, cambios en `README.md` |
| crear (Lovable) | Lo que genere al conectar Supabase (se documenta) · proyecto nuevo del ensayo (CA9) |
| ramas | `demo/f3-checks`, `demo/f4-rompe-produccion` |
| modificar (este repo) | `sesiones/2026-11-git-deploy/Lab/README.md`, `sdd/specs/019-…/notas.md` |

## 4. Riesgos y plan B
| Riesgo | Prob. | Mitigación |
|---|---|---|
| Lovable no deja elegir un proyecto de Supabase **ya existente**, o crea su propia tabla o migración encima | media | Revisar la migración o el SQL que genere antes de aceptarlo. Si insiste en crear tabla, pedirle que la llame igual y comparar con el esquema del demo anterior |
| La primera publicación desde `main` no crea el Worker en una cuenta limpia | media | Se ve en el ensayo (CA9); si pasa, se añade el paso necesario en la guía |
| Conectar Supabase rompe el build en CI (variables) | media | Se ve en el PR antes de producción; se aplica 2.2 |
| La prueba existente no comprueba el título | alta | Añadir una prueba de portada propia (una línea) por PR |
| El rollback de Workers no recupera bien la versión anterior | baja | Plan B: revert por PR, que el CI publica |
| Lovable sobrescribe el README | baja | Revisar tras el merge que Lovable sigue "In sync" y que el README no cambia |

## 5. Verificación
CA1 inserción y lectura con la clave pública · CA2 O5 y O6 en `notas.md` · CA3 API del ruleset (`required_status_checks`) y PR de F3 en rojo · CA4 checks en verde y error visible en producción, con rollback cronometrado · CA5 ficheros en `main` y `Lab/README.md` actualizado · CA6 búsqueda de claves sensible a mayúsculas = 0 y Lovable "In sync" · CA7 tabla en Supabase y migración en el repo · CA8 login y lectura en la URL de producción · CA9 ensayo cronometrado, con URL de producción y preview comprobadas por contenido.

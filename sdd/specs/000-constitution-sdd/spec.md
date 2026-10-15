# SPEC-000 · Constitution, templates y comandos SDD

| Campo | Valor |
|---|---|
| Estado | en curso |
| Sesión | infraestructura |
| Fecha límite | 2026-10-19 |
| Depende de | — |
| Responsable | Jaime García |

## 1. Problema / necesidad
La sesión del 26-jun se preparó directamente sobre los materiales, sin especificaciones previas. Eso dejó estas incoherencias:
- los timings del guion, la cheat sheet y el índice no coinciden;
- `HeroCamp-Product/.claude/CLAUDE.md` describe un pipeline TypeScript que no existe;
- enlaces a documentos inexistentes.

Ahora hay dos sesiones nuevas (21-nov y 11-dic) que se quieren desarrollar con trazabilidad.

## 2. Objetivo
Que exista un marco SDD en el repo (constitution, plantillas, registro y comandos) que cualquier agente o persona pueda seguir para crear specs, planes y tareas de forma consistente.

## 3. Para quién
- Jaime, como formador y aprobador.
- Los agentes de Claude Code, que deben seguir las reglas sin improvisar.

## 4. Alcance
**Incluye:**
- constitution;
- 6 plantillas;
- registro de specs;
- comandos `/sdd-spec`, `/sdd-plan`, `/sdd-tasks` y `/sdd-review`;
- `CLAUDE.md` raíz.

**No incluye:**
- mover ficheros ni crear portales (eso es SPEC-001);
- contenido de las sesiones.

## 5. Requisitos
- R1. La constitution cubre principios, criterios pedagógicos, criterios técnicos, convenciones del repo y reglas para agentes.
- R2. Hay plantillas para spec, plan, tasks, bloque de guion, ejercicio y retro.
- R3. Los comandos encadenan el flujo `spec → plan → tasks → review` con puertas de aprobación.
- R4. Los agentes no hacen commits: proponen el mensaje y Jaime commitea.

## 6. Criterios de aceptación
- [x] CA1. `sdd/constitution.md` existe con las 5 secciones.
- [x] CA2. `sdd/templates/` contiene las 6 plantillas.
- [x] CA3. `.claude/commands/sdd-{spec,plan,tasks,review}.md` existen.
- [x] CA4. `CLAUDE.md` raíz apunta a la constitution y al flujo.
- [ ] CA5. Jaime revisa y aprueba la constitution v1.0.
- [ ] CA6. El flujo se prueba de punta a punta con SPEC-001.

## 7. Restricciones (constitution)
Regla 5.5: el agente no hace commits.

## 8. Preguntas abiertas
- [ ] ¿Algún criterio pedagógico adicional de la coordinación de Hero Camp que deba entrar en la constitution?

## 9. Hallazgos fuera de alcance
- `HeroCamp-Product/.claude/CLAUDE.md` incluye un diseño TypeScript CLI obsoleto a partir de la línea 63. Se tratará en SPEC-022.
- `feedbackhub/README` enlaza `/docs/repo-trampa.md`, que no existe. Se tratará en SPEC-022.
- Timings incoherentes en `GUION-SESION-COMPLETO.md`. Se tratará en SPEC-020 y SPEC-023.

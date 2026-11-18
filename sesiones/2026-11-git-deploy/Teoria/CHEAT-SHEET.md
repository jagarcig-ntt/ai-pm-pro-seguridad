# CHEAT SHEET · Git, Deployment y Producción · 21-nov

*Derivada de `GUION-SESION.md`. Si no coinciden, manda el guion (`python scripts/check_timings.py`).*

## Horario

| Hora | Min | Bloque | Lo esencial |
|---|---|---|---|
| 10:00 | 15 | B0 Apertura | Recuento: repo público · token · secretos · salas, Aida y 3 reglas |
| 10:15 | 15 | Teoría 1 · F1 y F3 | `main` siempre funciona · PR y Google Cloud · la receta |
| 10:30 | 15 | Demo 1 en directo | Conectar · secretos sin compartir · 3 prompts · URL y login |
| 10:45 | 5 | Pausa activa y salas | 3 salas de 6 · difusión con el enlace del portal |
| 10:50 | 35 | Salas · Práctica 1 | ✅ URL de producción · login: *Allowed URLs* de Lovable |
| 11:25 | 10 | Pausa | Errores repetidos, con Aida · recuento de URL |
| 11:35 | 15 | Teoría 2 · F2 | Tres entornos · `.env` público · Replit y "lee antes de *Allow*" |
| 11:50 | 15 | Demo 2 en directo | Trampas: *Active*, rama, solo Merge · aviso naranja · PR y merge |
| 12:05 | 40 | Salas · Práctica 2 | ✅ enlace del PR · ✅ cambio en producción |
| 12:45 | 10 | Pausa | Quién necesita el rescate |
| 12:55 | 20 | Teoría 3 · F4 | Checklist · simulacro F4 · rollback, revert y Sonos |
| 13:15 | 25 | Salas · Rescate | Revert de F4 · `staging` para quien acabó |
| 13:40 | 15 | B5 Cierre | Ronda de URL · kit · puente al 11-dic |
| 13:55 | 5 | Colchón | |

## Demo: `feedback-hub`
- **Producción:** https://jagarcig-ntt-feedback-hub.jagarcig.workers.dev
- **Repo:** https://github.com/jagarcig-ntt/feedback-hub, con el PR #4 en verde y el PR #6 en rojo
- **Rollback:** Cloudflare → *Workers & Pages → jagarcig-ntt-feedback-hub → Deployments → versión anterior → Rollback* (3 min en el ensayo)
- **Antes del día 21:** recrear `demo/f4-rompe-produccion` (`notas.md` de SPEC-019, apartado T12)

## Frases clave
- "**`main` siempre funciona.**"
- "**La rama protege el código, no los datos.** Leed el SQL antes de pulsar *Allow*."
- "**Hacer merge es decidir salir a producción.**"
- "**Verde no significa que funcione.**"
- Puente: "**El día 11 añadimos el check de seguridad a vuestro CI.**"

## Cuando un alumno se atasca en P1

| Rojo en el paso | Causa probable |
|---|---|
| 0 | Falta un secreto o tiene otro nombre |
| 5 | No compila: *Fix build* en Lovable |
| 7 | Token sin *Workers Scripts · Edit*, o Account ID equivocado |
| 9 | La web da error: ¿una clave secreta en el servidor? Al rescate |
| Correo a la vista previa de Lovable | Falta la URL en *Allowed URLs* (paso 4 de P1) |

## Cuando un alumno se atasca en P2
- **El cambio entra sin aviso naranja:** el ruleset no está *Active* o no tiene la rama.
- **No ve `Comprobar el PR` en la lista:** que lo escriba igualmente.
- **Merge con *Squash* o *Rebase*:** Lovable se desincroniza. Solo *Create a merge commit*.

## Si vas tarde
Recorta Sonos a una frase y el simulacro de F4 a las capturas. **No toques las salas.**

## Salas
3 salas de 6. Aida pasa por las tres; tú en la principal, y entras si una sala se atasca entera. Su guía: `Guia/guia_asistente.md`.

## Sesión grabada
Ningún token en pantalla. Si un alumno lo enseña, que deje de compartir y lo revoque después.

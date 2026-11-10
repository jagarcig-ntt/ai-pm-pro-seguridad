# CHEAT SHEET · Git, Deployment y Producción · 21-nov

*Derivada de `GUION-SESION.md`. Si no coinciden, manda el guion (`python scripts/check_timings.py`).*

## Horario

| Hora | Min | Bloque | Lo esencial |
|---|---|---|---|
| 10:00 | 15 | B0 Apertura | Recuento en el chat: repo público · Supabase · secretos |
| 10:15 | 20 | T1 · F1 Git | Historial de "Changes" · descripción del PR #6 · Google Cloud |
| 10:35 | 15 | T2 · F2 Entornos | Lovable no es staging (el 500) · `.env` público · Replit y "lee el SQL" |
| 10:50 | 15 | T3 · F3 CI/CD | Workflow en voz alta · PR #4 verde, #6 bloqueado · CrowdStrike |
| 11:05 | 10 | Pausa | Preguntar al ayudante quién no tiene secretos |
| 11:15 | 45 | P1 Primer despliegue | ✅ "ficheros" · ✅ URL de producción · login: URL en Supabase |
| 12:00 | 10 | Pausa | Recuento de URL en pantalla |
| 12:10 | 45 | P2 Gestión de cambios | Trampas: *Active*, rama, solo Merge · ✅ "Active" · ✅ enlace del PR · ✅ "producción" |
| 12:55 | 15 | T4 · F4 Go-live | Checklist · simulacro F4 · Sonos |
| 13:10 | 5 | Pausa activa | |
| 13:15 | 25 | Rescate | Revert de F4 · `staging` para quien acabó |
| 13:40 | 15 | B5 Cierre | Ronda de URL · kit · pausa de Supabase · puente al 11-dic |
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
| Correo a `localhost` | Falta la URL en Supabase (paso 4 de P1) |

## Cuando un alumno se atasca en P2
- **El cambio entra sin aviso naranja:** el ruleset no está *Active* o no tiene la rama.
- **No ve `Comprobar el PR` en la lista:** que lo escriba igualmente.
- **Merge con *Squash* o *Rebase*:** Lovable se desincroniza. Solo *Create a merge commit*.

## Si vas tarde
Recorta Sonos a una frase y el simulacro de F4 a las capturas. **No toques P1 ni P2.**

## Sesión grabada
Ningún token en pantalla. Si un alumno lo enseña, que deje de compartir y lo revoque después.

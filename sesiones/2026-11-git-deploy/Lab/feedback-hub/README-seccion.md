## Cómo se trabaja en este repositorio

Producto de ejemplo de la sesión "Git, Deployment y Producción" (AI PM Pro · The Hero Camp, 21 de noviembre de 2026).

| Entorno | Dónde |
|---|---|
| Development | Vista previa de Lovable |
| Staging | Preview de cada Pull Request: la URL aparece en un comentario del PR |
| Producción | https://jagarcig-ntt-feedback-hub.jagarcig.workers.dev |

**El ciclo de cada cambio:**
1. Se pide en Lovable. Como `main` está protegida, Lovable lo guarda en la rama `lovable-sync`.
2. Se abre un Pull Request de `lovable-sync` a `main`.
3. Los checks pasan las pruebas y publican una preview.
4. Se prueba la preview y se hace merge con **Create a merge commit**, nunca con *Squash* ni *Rebase*.
5. La publicación en producción es automática.

**Reglas:**
- `main` solo acepta cambios por Pull Request y con el check "Comprobar el PR" en verde.
- El fichero `.env` es público: solo lleva valores que se podrían publicar en la web.
- Antes de un cambio importante, se recorre la [checklist de go-live](docs/checklist-go-live.md).
- La automatización está en `.github/workflows/`.

# Familia 3 — CI/CD y deploy: la receta automática hasta producción

**Guía del formador** · versión profunda
Sesión "Git, Deployment y Producción" · AI PM Pro · The Hero Camp · 21 de noviembre de 2026

> Es la misma guía que reciben los alumnos, más los bloques marcados con 🎓, que son solo para ti. Bloques B3a y B3b de la escaleta (SPEC-010): **35 min** (teoría 15 + práctica 20: activar Actions en su fork y ver el check en su PR) **+ 25 min** de squad tras la pausa 2 (demo completa del squad, ver SPEC-017).

---

## Índice

1. [Antes de entrar: tres conceptos en lenguaje humano](#1-antes-de-entrar-tres-conceptos-en-lenguaje-humano)
2. [Para qué le importa a un PM](#2-para-qué-le-importa-a-un-pm)
3. [Idea 1 · El workflow: una receta que se ejecuta sola](#3-idea-1--el-workflow-una-receta-que-se-ejecuta-sola)
4. [Idea 2 · Cada PR se comprueba y se previsualiza antes de entrar](#4-idea-2--cada-pr-se-comprueba-y-se-previsualiza-antes-de-entrar)
5. [Idea 3 · Merge a main = producción, por fases](#5-idea-3--merge-a-main--producción-por-fases)
6. [Cómo se ve en el producto demo](#6-cómo-se-ve-en-el-producto-demo)
7. [Caso real: CrowdStrike, julio de 2024](#7-caso-real-crowdstrike-julio-de-2024)
8. [El factor agente IA](#8-el-factor-agente-ia)
9. [Lo que el PM se lleva](#9-lo-que-el-pm-se-lleva)
10. [Fuentes](#10-fuentes)
11. [🎓 Mapa para specs posteriores](#11--mapa-para-specs-posteriores)

---

## 1. Antes de entrar: tres conceptos en lenguaje humano

**CI (integración continua).**
Cada vez que alguien propone un cambio, una máquina lo comprueba automáticamente: que se construye, que pasan las pruebas, que no rompe nada conocido. Es el control de calidad que no se olvida nunca y no se cansa.

**CD (despliegue continuo).**
Cuando un cambio se aprueba, una máquina lo publica automáticamente, primero en staging y después en producción. Nadie tiene que acordarse de "subirlo".

**Workflow.**
El fichero donde se escribe esa receta: qué se hace, en qué orden y cuándo. En GitHub se llama *GitHub Actions* y vive en el propio repositorio, en la carpeta `.github/workflows/`.

> 🎓 **Intención:** CI y CD suenan a jerga; tradúcelas siempre. CI = "el control de calidad automático", CD = "la publicación automática". Si el resto del bloque usas las dos traducciones, nadie se pierde.

---

## 2. Para qué le importa a un PM

Pregúntate cómo llega hoy un cambio de tu producto a tus usuarios. Si la respuesta incluye "le doy al botón de publicar", "lo subo desde mi ordenador" o "me acuerdo de…", tu proceso depende de la memoria y el buen día de alguien.

CI/CD convierte ese proceso en una **receta escrita que se ejecuta siempre igual**. Para un PM eso significa tres cosas:

- **Velocidad:** un cambio aprobado llega a producción en minutos, no "cuando alguien pueda".
- **Previsibilidad:** todos los cambios pasan por los mismos controles, también los que hace un agente a las tres de la mañana.
- **Visibilidad:** en cada PR ves en verde o en rojo si está listo, y puedes probarlo en una URL antes de aprobarlo.

> 🎓 **Pregunta para el chat:** "¿Cómo llega hoy un cambio a vuestros usuarios? Escribid el verbo: publico, subo, despliego, no lo sé…". Usa las respuestas para la frase "vuestro proceso depende de la memoria de alguien".

---

## 3. Idea 1 · El workflow: una receta que se ejecuta sola

Un workflow tiene tres partes que se pueden leer sin saber programar:

1. **Cuándo** se ejecuta: "cuando se abre un PR", "cuando se hace merge a `main`".
2. **Qué pasos** sigue: instalar, construir, probar, desplegar.
3. **Qué necesita**: los secretos de la Familia 2, que lee de GitHub sin que nadie los vea.

Así se ve uno, simplificado. **No hay que memorizarlo**, solo saber leerlo en voz alta:

```yaml
name: Comprobar el PR            # el nombre que verás en el PR
on: pull_request                 # CUÁNDO: cada vez que se abre o actualiza un PR
jobs:
  comprobar:
    runs-on: ubuntu-latest       # en una máquina limpia de GitHub
    steps:
      - uses: actions/checkout@v4   # 1. coge el código del PR
      - run: npm ci                 # 2. instala las dependencias
      - run: npm run build          # 3. comprueba que se construye
      - run: npm test               # 4. pasa las pruebas
```

Leído en castellano: *"Cada vez que alguien abra un PR, en una máquina limpia, coge su código, instálalo, constrúyelo y pásale las pruebas."*

**Lo que esto cambia para el PM:** el proceso de calidad deja de ser una costumbre y pasa a ser **un documento que se puede leer, revisar y mejorar** como cualquier otro cambio, con su PR.

> 🎓 **Cómo enseñar el YAML:** léelo en voz alta línea a línea en castellano, como en la guía, y no expliques la sintaxis. Si alguien pregunta por *jobs*, *steps* o *runs-on*: "son los apartados de la receta; no hace falta dominarlos para leerla" (decisión de la spec, apartado 8).
>
> **Error esperado:** *"Esto es programar, no es para mí".* → Es leer una receta. Tú no cocinas, pero sabes leer si a la receta le falta un paso. Eso es lo que te pedimos.

---

## 4. Idea 2 · Cada PR se comprueba y se previsualiza antes de entrar

Cuando abres un PR, ocurren dos cosas automáticamente:

- **Las comprobaciones (checks).** El workflow se ejecuta y el PR muestra el resultado: ✅ verde o ❌ rojo. Con las reglas del repositorio bien configuradas, **un PR en rojo no se puede integrar**. No depende de que alguien se acuerde de mirar.
- **La previsualización (preview).** La plataforma de despliegue publica ese PR en una URL propia, conectada al entorno de staging de la Familia 2. Puedes abrirla, probar el cambio como lo vería un usuario y compartirla con quien tenga que validarlo.

Con esto, el PR de la Familia 1 queda completo: **descripción + revisión + checks en verde + preview probada**.

**Lo que esto cambia para el PM:** no tienes que imaginar el cambio leyendo código. Lo pruebas en la URL de preview y decides con el producto delante.

> 🎓 **Momento clave de la demo:** romper una prueba a propósito y enseñar el botón de merge bloqueado. Es lo que más recuerda la gente: un control que no depende de nadie.
>
> **Error esperado:** *"Si el check está en verde, el cambio está bien".* → Verde significa "no rompe lo que sabemos comprobar". Por eso además está la preview: lo pruebas tú como usuario.

---

## 5. Idea 3 · Merge a main = producción, por fases

En un flujo de despliegue continuo, **hacer merge a `main` es decidir que el cambio sale a producción**. No hay un paso manual después. Por eso todo lo anterior (rama, PR, revisión, checks, preview) existe: para que esa decisión se tome con información.

Que sea automático no significa que sea de golpe. Un buen despliegue avanza **por fases**:

1. **Preview / staging:** el cambio funciona en un entorno igual que producción.
2. **Producción:** se publica la nueva versión.
3. **Comprobación tras salir:** se verifica que la URL responde y que lo principal funciona (Familia 4).

En productos grandes hay una fase más: publicar primero para una parte de los usuarios y ampliar si todo va bien. Para vuestros productos, staging hace ese papel.

Y una regla sin excepciones: **nunca se despliega a mano desde un ordenador**. Si un cambio no ha pasado por la receta, no está en producción.

> 🎓 **Intención:** que "merge" deje de ser un trámite técnico. Repite la frase: **"hacer merge es decidir salir a producción"**. Conecta con la Familia 4: esa decisión se toma con la checklist.
>
> **Si preguntan por despliegues para una parte de los usuarios** (*canary*, *rollout* progresivo): existe y es lo que usan los grandes. Para su producto, staging cumple esa función. No entres en detalle.

---

## 6. Cómo se ve en el producto demo

<!-- ajustar tras SPEC-012/013: nombre de los workflows, plataforma de despliegue y URLs de preview reales -->

El repositorio del producto demo tiene dos workflows:

- **"Comprobar el PR"**, que se ejecuta en cada PR: construye y pasa las pruebas.
- **"Desplegar"**, que se ejecuta al hacer merge a `main`: publica en producción.

La plataforma de despliegue añade la **URL de preview** de cada PR.

En la demo veremos:
1. Abrir un PR → el check se pone en marcha → ✅ verde.
2. Abrir la URL de preview y probar el cambio.
3. Romper una prueba a propósito → ❌ rojo → el botón de merge queda bloqueado.
4. Arreglarlo, hacer merge y ver cómo el cambio llega a producción solo.

**Tu práctica:** en tu fork del producto demo, activa GitHub Actions (en los forks viene desactivado por defecto: pestaña *Actions* → *Enable workflows*) y mira cómo el check se ejecuta sobre **tu PR** de la Familia 1.

> 🎓 **En la demo enseñas** (unos 10 min, B3a):
> 1. El fichero del workflow en `.github/workflows/`, leído en voz alta.
> 2. Un PR → pestaña *Checks* en marcha → ✅.
> 3. El comentario o enlace de la plataforma con la URL de preview → abrirla.
> 4. Romper una prueba → ❌ → merge bloqueado.
> 5. Arreglar → ✅ → merge → pestaña *Actions*: el workflow de despliegue en marcha. **Deja que el deploy a producción corra durante la pausa 2** (escaleta SPEC-010).
>
> **Práctica (20 min):** en su fork, *Actions* → *Enable workflows*, y volver a su PR de la Familia 1 (un commit nuevo o *re-run*) para ver el check. Verificación: "¿cuántos veis el check en verde en vuestro PR?".
>
> **B3b, squad (25 min, tras la pausa):** el squad ejecuta fase a fase sobre el producto demo. Su guion vive en SPEC-017. Aquí solo: preguntas guiadas "¿qué revisaríais en este paso?".
>
> **Plan B**
> - **GitHub Actions lento o caído:** PR `demo/f3-checks` con los checks ya ejecutados (verde y rojo) y capturas.
> - **En los forks de los alumnos Actions no arranca:** que lo vean en tu pantalla. No es imprescindible para el objetivo del bloque (leer y entender el flujo).
> - **El deploy de la pausa falla:** perfecto para la Familia 4; úsalo como incidente real, con el rollback preparado.

---

## 7. Caso real: CrowdStrike, julio de 2024

CrowdStrike fabrica software de seguridad que se instala en millones de ordenadores de empresas. El 19 de julio de 2024 envió una actualización de contenido a su sensor para Windows. El sensor esperaba 20 campos de datos y la actualización traía 21. Esa diferencia provocó un fallo de memoria y **los ordenadores se bloquearon con la pantalla azul de Windows**.

La actualización llegó **a la vez a todos los equipos**. Microsoft estimó que afectó a **8,5 millones de dispositivos Windows**, menos del 1 % del total. Microsoft añadió que el impacto fue enorme porque muchas de las empresas que usan CrowdStrike **gestionan servicios críticos**.

Entre los cambios que CrowdStrike anunció en su análisis oficial:

- **despliegue escalonado** de este tipo de actualizaciones, por fases en lugar de a todos a la vez;
- más validaciones y pruebas antes de publicar;
- que los clientes puedan decidir cuándo reciben las actualizaciones.

**La lección para la Familia 3:** automatizar el despliegue es bueno, pero **automatizar un despliegue sin fases convierte un error en un error para todos a la vez**. La receta tiene que incluir comprobaciones y avanzar por etapas.

> 🎓 **Cómo contarlo (unos 3 min):**
> - Es probable que muchos lo vivieran (vuelos, bancos). Pregunta primero: "¿alguien se vio afectado el 19 de julio de 2024?" y deja que lo cuenten. Engancha más que tu relato.
> - **Lo que no debes decir:** que "fue un ciberataque" (no lo fue) ni sectores o cifras concretas que no estén en la guía. La cifra segura es la de Microsoft: 8,5 millones.
> - **Matiz:** CrowdStrike es una empresa de seguridad, pero el caso no es de seguridad: es de despliegue. Si alguien tira por ahí, reconduce al 11 de diciembre.
> - **Reserva:** Cloudflare, julio de 2019. Una regla desplegada a toda su red de golpe la saturó; está verificado en `casos.md`.

---

## 8. El factor agente IA

En esta fase intervienen dos agentes del **Deployment Agent Squad**:

**El agente de CI hace bien:**
- escribir o ajustar el workflow a partir de lo que tiene tu producto;
- cuando un check se pone en rojo, explicarte **en lenguaje humano** por qué ha fallado y proponer el arreglo;
- añadir comprobaciones que faltan.

**El agente de despliegue hace bien:**
- comprobar que la URL de preview y la de producción responden tras cada despliegue;
- resumir qué versión hay en cada entorno.

**No delegues:**
- **saltarse un check en rojo.** Un agente con prisa puede proponer desactivar una prueba "para desbloquear". Un check en rojo se arregla, no se apaga;
- **cambiar las reglas del repositorio** (protección de `main`, checks obligatorios). Son las reglas del juego y las decide una persona;
- **desplegar a producción saltándose staging.** "Es un cambio pequeño" es exactamente lo que se pensó en el caso CrowdStrike.

> 🎓 **Momento a vigilar en B3b:** si en la demo el squad propone desactivar un check (puede pasar), es oro. Páralo y pregunta a la sala: "¿lo aprobaríais?". Es la regla "un check en rojo se arregla, no se apaga" en vivo.

---

## 9. Lo que el PM se lleva

1. **El proceso de calidad es una receta escrita**, no una costumbre: se lee, se revisa y se mejora.
2. **Ningún PR entra en rojo**, y antes de aprobar lo pruebas en su URL de preview.
3. **Merge a `main` es una decisión de salir a producción**, y la salida avanza por fases, nunca de golpe ni a mano.

> 🎓 **Antes de la pausa 2:** deja en pantalla la pestaña *Actions* con el deploy en marcha y di "a la vuelta vemos si ha llegado a producción". Así la pausa no corta el hilo.

---

## 10. Fuentes

**Caso documentado:**
- CrowdStrike, análisis de causa raíz (RCA): https://www.crowdstrike.com/en-us/blog/channel-file-291-rca-available/
- CrowdStrike, resumen ejecutivo del RCA (PDF): https://crowdstrike.com/wp-content/uploads/2024/08/Executive-Summary_Root-Cause-Analysis_Channel-File-291.pdf
- TechCrunch, cifra de Microsoft (8,5 millones de dispositivos): https://techcrunch.com/2024/07/20/microsoft-says-8-5m-windows-devices-were-affected-by-crowdstrike-outage/

**Para profundizar:**
- GitHub Docs, cómo funciona GitHub Actions: https://docs.github.com/en/actions/about-github-actions/understanding-github-actions
- GitHub Docs, reglas del repositorio (rulesets): https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets
- Cloudflare Pages, versiones de previsualización: https://developers.cloudflare.com/pages/configuration/preview-deployments/
- Vercel, entornos y previews: https://vercel.com/docs/deployments/environments

---

## 11. 🎓 Mapa para specs posteriores

Lo que el producto demo y el squad deben permitir para que esta familia se pueda enseñar como está escrita.

| Concepto | Qué debe tener el producto demo (SPEC-011/012) | Fase del squad (SPEC-017) |
|---|---|---|
| Workflow legible | `.github/workflows/` con dos ficheros cortos y comentados en castellano: "Comprobar el PR" y "Desplegar" | Escribe o ajusta los workflows con comentarios legibles |
| Checks obligatorios | Ruleset en `main`: check "Comprobar el PR" obligatorio para hacer merge | No modifica las reglas del repositorio |
| Pruebas que se pueden romper | Al menos una prueba sencilla y entendible (p. ej. que la portada carga y muestra el título) que se pueda romper a propósito | Explica en lenguaje humano por qué falla un check |
| Preview por PR | La plataforma de despliegue publica una URL de preview por PR, enlazada en el propio PR | Comprueba que la preview responde |
| Merge = producción | Workflow o integración que despliega a producción al hacer merge a `main`; sin despliegues manuales | Verifica tras el despliegue que producción responde y qué versión hay |
| Fork-friendly | Workflows que funcionan en un fork **sin secretos** (el check del PR no necesita credenciales) | — |
| Coste 0 | Repo público (minutos de Actions sin límite práctico) y plataforma en plan gratuito (lo decide SPEC-013) | — |
| Plan B | PR `demo/f3-checks` con checks verde y rojo ya ejecutados, más capturas | — |

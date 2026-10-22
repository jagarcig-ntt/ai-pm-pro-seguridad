# Familia 3 — CI/CD y deploy: la receta automática hasta producción

**Guía de referencia para el alumno**
Sesión "Git, Deployment y Producción" · AI PM Pro · The Hero Camp · 21 de noviembre de 2026

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

---

## 1. Antes de entrar: tres conceptos en lenguaje humano

**CI (integración continua).**
Cada vez que alguien propone un cambio, una máquina lo comprueba automáticamente: que se construye, que pasan las pruebas, que no rompe nada conocido. Es el control de calidad que no se olvida nunca y no se cansa.

**CD (despliegue continuo).**
Cuando un cambio se aprueba, una máquina lo publica automáticamente, primero en staging y después en producción. Nadie tiene que acordarse de "subirlo".

**Workflow.**
El fichero donde se escribe esa receta: qué se hace, en qué orden y cuándo. En GitHub se llama *GitHub Actions* y vive en el propio repositorio, en la carpeta `.github/workflows/`.

---

## 2. Para qué le importa a un PM

Pregúntate cómo llega hoy un cambio de tu producto a tus usuarios. Si la respuesta incluye "le doy al botón de publicar", "lo subo desde mi ordenador" o "me acuerdo de…", tu proceso depende de la memoria y el buen día de alguien.

CI/CD convierte ese proceso en una **receta escrita que se ejecuta siempre igual**. Para un PM eso significa tres cosas:

- **Velocidad:** un cambio aprobado llega a producción en minutos, no "cuando alguien pueda".
- **Previsibilidad:** todos los cambios pasan por los mismos controles, también los que hace un agente a las tres de la mañana.
- **Visibilidad:** en cada PR ves en verde o en rojo si está listo, y puedes probarlo en una URL antes de aprobarlo.

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

---

## 4. Idea 2 · Cada PR se comprueba y se previsualiza antes de entrar

Cuando abres un PR, ocurren dos cosas automáticamente:

- **Las comprobaciones (checks).** El workflow se ejecuta y el PR muestra el resultado: ✅ verde o ❌ rojo. Con las reglas del repositorio bien configuradas, **un PR en rojo no se puede integrar**. No depende de que alguien se acuerde de mirar.
- **La previsualización (preview).** La plataforma de despliegue publica ese PR en una URL propia, conectada al entorno de staging de la Familia 2. Puedes abrirla, probar el cambio como lo vería un usuario y compartirla con quien tenga que validarlo.

Con esto, el PR de la Familia 1 queda completo: **descripción + revisión + checks en verde + preview probada**.

**Lo que esto cambia para el PM:** no tienes que imaginar el cambio leyendo código. Lo pruebas en la URL de preview y decides con el producto delante.

---

## 5. Idea 3 · Merge a main = producción, por fases

En un flujo de despliegue continuo, **hacer merge a `main` es decidir que el cambio sale a producción**. No hay un paso manual después. Por eso todo lo anterior (rama, PR, revisión, checks, preview) existe: para que esa decisión se tome con información.

Que sea automático no significa que sea de golpe. Un buen despliegue avanza **por fases**:

1. **Preview / staging:** el cambio funciona en un entorno igual que producción.
2. **Producción:** se publica la nueva versión.
3. **Comprobación tras salir:** se verifica que la URL responde y que lo principal funciona (Familia 4).

En productos grandes hay una fase más: publicar primero para una parte de los usuarios y ampliar si todo va bien. Para vuestros productos, staging hace ese papel.

Y una regla sin excepciones: **nunca se despliega a mano desde un ordenador**. Si un cambio no ha pasado por la receta, no está en producción.

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

---

## 7. Caso real: CrowdStrike, julio de 2024

CrowdStrike fabrica software de seguridad que se instala en millones de ordenadores de empresas. El 19 de julio de 2024 envió una actualización de contenido a su sensor para Windows. El sensor esperaba 20 campos de datos y la actualización traía 21. Esa diferencia provocó un fallo de memoria y **los ordenadores se bloquearon con la pantalla azul de Windows**.

La actualización llegó **a la vez a todos los equipos**. Microsoft estimó que afectó a **8,5 millones de dispositivos Windows**, menos del 1 % del total. Microsoft añadió que el impacto fue enorme porque muchas de las empresas que usan CrowdStrike **gestionan servicios críticos**.

Entre los cambios que CrowdStrike anunció en su análisis oficial:

- **despliegue escalonado** de este tipo de actualizaciones, por fases en lugar de a todos a la vez;
- más validaciones y pruebas antes de publicar;
- que los clientes puedan decidir cuándo reciben las actualizaciones.

**La lección para la Familia 3:** automatizar el despliegue es bueno, pero **automatizar un despliegue sin fases convierte un error en un error para todos a la vez**. La receta tiene que incluir comprobaciones y avanzar por etapas.

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

---

## 9. Lo que el PM se lleva

1. **El proceso de calidad es una receta escrita**, no una costumbre: se lee, se revisa y se mejora.
2. **Ningún PR entra en rojo**, y antes de aprobar lo pruebas en su URL de preview.
3. **Merge a `main` es una decisión de salir a producción**, y la salida avanza por fases, nunca de golpe ni a mano.

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

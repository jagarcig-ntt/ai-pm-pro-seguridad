# Familia 4 — Go-live y recuperación: decidir salir y saber volver

**Guía del formador** · versión profunda
Sesión "Git, Deployment y Producción" · AI PM Pro · The Hero Camp · 21 de noviembre de 2026

> Es la misma guía que reciben los alumnos, más los bloques marcados con 🎓, que son solo para ti. Bloque B4 de la escaleta (SPEC-010): **30 min** = teoría 12 + simulacro de rollback 8 + checklist aplicada 10. Va justo: si falta tiempo, la idea 3 se reduce a la tabla (decisión del plan, apartado 4).

---

## Índice

1. [Antes de entrar: tres conceptos en lenguaje humano](#1-antes-de-entrar-tres-conceptos-en-lenguaje-humano)
2. [Para qué le importa a un PM](#2-para-qué-le-importa-a-un-pm)
3. [Idea 1 · Salir es una decisión: la checklist de go-live](#3-idea-1--salir-es-una-decisión-la-checklist-de-go-live)
4. [Idea 2 · El plan de vuelta atrás, antes de salir](#4-idea-2--el-plan-de-vuelta-atrás-antes-de-salir)
5. [Idea 3 · Después de salir: vigilar tres señales](#5-idea-3--después-de-salir-vigilar-tres-señales)
6. [Cómo se ve en el producto demo](#6-cómo-se-ve-en-el-producto-demo)
7. [Caso real: Sonos, mayo de 2024](#7-caso-real-sonos-mayo-de-2024)
8. [El factor agente IA](#8-el-factor-agente-ia)
9. [Lo que el PM se lleva](#9-lo-que-el-pm-se-lleva)
10. [Fuentes](#10-fuentes)
11. [🎓 Mapa para specs posteriores](#11--mapa-para-specs-posteriores)

---

## 1. Antes de entrar: tres conceptos en lenguaje humano

**Go-live.**
El momento en que un cambio (o un producto entero) pasa a estar disponible para usuarios reales. No es un momento técnico: es una decisión de negocio con consecuencias.

**Rollback.**
Volver a la versión anterior que funcionaba. Es el botón de "deshacer" de producción. Las plataformas de despliegue modernas lo permiten en un clic, porque guardan cada versión publicada.

**Monitorización.**
Mirar de forma continua cómo se comporta el producto en producción: si da errores, si va lento, si los usuarios hacen lo que esperabas. Es el cuadro de mandos del coche: sin él, conduces a ciegas.

> 🎓 **Intención:** "go-live" es la palabra de los PMs; úsala para que se sientan en casa. Es la familia más suya: díselo explícitamente ("esta decisión es vuestra").

---

## 2. Para qué le importa a un PM

Las tres familias anteriores sirven para que un cambio llegue a producción con control. Esta va de **la decisión** de que llegue y de qué pasa después. Y esa decisión, en un equipo de producto, suele ser del PM.

Un go-live mal decidido no se arregla con más ingeniería. Se arregla no saliendo, o saliendo con una forma rápida y probada de volver atrás. Esta familia te da las tres herramientas para tomar esa decisión con criterio: **una checklist, un plan de vuelta atrás y tres señales que vigilar**.

> 🎓 **Pregunta para el chat:** "¿Alguna vez habéis salido con algo sabiendo que no estaba listo?". Casi todos dirán que sí. Es la entrada al caso Sonos sin contarlo todavía.

---

## 3. Idea 1 · Salir es una decisión: la checklist de go-live

Antes de salir, alguien recorre una lista y responde **sí o no** a cada punto. Si hay un "no", se decide de forma consciente: se arregla, se acepta el riesgo o no se sale.

| # | Pregunta | Familia |
|---|---|---|
| 1 | ¿Lo que sale ha pasado por un PR revisado, con checks en verde? | F1, F3 |
| 2 | ¿Se ha probado en staging o en la preview, con el flujo principal de usuario de principio a fin? | F2, F3 |
| 3 | ¿Están configuradas en producción todas las variables y secretos que necesita? | F2 |
| 4 | ¿Cambia algo en la base de datos? Si es así, ¿se puede deshacer? | F2, F4 |
| 5 | ¿Sabemos cómo volver atrás y cuánto se tarda? | F4 |
| 6 | ¿Hay forma de apagarlo sin desplegar (*feature flag*)? | F1, F2 |
| 7 | ¿Alguien estará mirando las señales durante la primera hora tras salir? | F4 |
| 8 | ¿Saben soporte y los usuarios afectados lo que cambia? | F4 |

La checklist no está para cumplir el trámite. Está para que **las alarmas que alguien ya conoce se digan en voz alta antes de salir**, no después.

**Lo que esto cambia para el PM:** "¿salimos?" deja de ser una sensación y pasa a ser una conversación sobre 8 respuestas concretas.

> 🎓 **Intención:** la checklist es la idea que más se llevan (es parte del kit, SPEC-010 R13). Recórrela señalando de qué familia sale cada punto: es el **resumen de toda la sesión** en una tabla.
>
> **Error esperado:** *"La checklist ralentiza".* → Se tarda 5 minutos. Sonos tardó meses y 20–30 millones en arreglar lo que una checklist habría puesto encima de la mesa.

---

## 4. Idea 2 · El plan de vuelta atrás, antes de salir

Cuando algo falla en producción, hay tres formas de volver a una situación segura:

| Opción | Qué hace | Cuándo usarla |
|---|---|---|
| **Apagar** (*feature flag*) | Desactiva la funcionalidad sin tocar el código desplegado | Lo más rápido, si el cambio tiene interruptor |
| **Rollback** | Vuelve a publicar la versión anterior | Algo grave, y hay que recuperar el servicio ya |
| **Revert** | Crea un nuevo commit que deshace el cambio y lo lleva por el flujo normal (PR, checks, deploy) | Cuando no hay prisa extrema o hay que dejar la historia limpia |

La regla importante: **el plan de vuelta atrás se conoce antes de salir, no se inventa durante el incidente.** ¿Quién puede pulsar el botón? ¿Cuánto tarda? ¿Se ha probado alguna vez?

Y una advertencia: **no todo se puede deshacer.** Un cambio en la estructura de la base de datos, datos ya enviados a terceros o un cambio que los usuarios ya han empezado a usar pueden no tener vuelta atrás limpia. Cuando no se puede volver atrás, **el listón para salir tiene que ser más alto**.

> 🎓 **Error esperado:** *"Rollback y revert son lo mismo".* → Rollback = volver a publicar la versión anterior (rápido, en la plataforma). Revert = deshacer el cambio en el código, por el flujo normal (más lento, deja historia). Lo normal en un incidente: primero rollback para recuperar el servicio y después revert o arreglo con calma.
>
> **Si preguntan por las bases de datos:** es el punto que más rompe los rollbacks. Mensaje único: "si el cambio toca la estructura de los datos, pregunta antes de salir cómo se deshace". No entres en migraciones.

---

## 5. Idea 3 · Después de salir: vigilar tres señales

El go-live no termina al publicar. Termina cuando sabes que va bien. Durante la primera hora (y los primeros días, en cambios grandes) se vigilan tres señales:

| Señal | Qué miras | Ejemplo de alarma |
|---|---|---|
| **Errores** | ¿Ha subido el número de errores o de peticiones fallidas? | La página de pago devuelve errores que antes no daba |
| **Rendimiento** | ¿Va más lento? ¿Se cae? | El inicio de sesión tarda el triple que ayer |
| **Uso** | ¿Los usuarios hacen lo que esperabas? | Bajan las compras completadas, suben las quejas a soporte |

Las dos primeras las ve una herramienta. **La tercera la ve, sobre todo, el PM**: es la que detecta que el producto funciona técnicamente pero no hace lo que tenía que hacer.

**Lo que esto cambia para el PM:** sales con un criterio de "va bien" definido de antemano, y con alguien mirando.

> 🎓 **Si vas justo de tiempo:** quédate con la tabla y la frase "la tercera señal la ve el PM". Es lo esencial.
>
> **Para quien quiera más:** las tres señales simplifican las "cuatro señales doradas" del Google SRE Book (latencia, tráfico, errores y saturación) a lo que un PM puede vigilar. Está en Fuentes.

---

## 6. Cómo se ve en el producto demo

<!-- ajustar tras SPEC-011/013: plataforma de despliegue (botón de rollback), herramienta de monitorización y flag reales -->

En la demo hacemos un **simulacro de incidente**:

1. Recorremos la checklist de go-live con un cambio del producto demo y salimos.
2. Ese cambio rompe algo en producción a propósito.
3. Lo detectamos en las señales: errores en el registro de la plataforma y la URL fallando.
4. **Rollback** en un clic desde la plataforma de despliegue: producción vuelve a funcionar.
5. Después, el arreglo de verdad entra por el flujo normal: **revert** o corrección, con su PR.

**Tu práctica:** aplica la checklist al cambio del producto demo y, en una columna aparte, **marca qué puntos no podrías responder hoy con tu propio producto**. Esa columna es tu lista de trabajo.

> 🎓 **Simulacro en la demo** (8 min):
> 1. Checklist rápida en voz alta sobre un cambio preparado.
> 2. Merge → producción.
> 3. El cambio rompe algo visible (por ejemplo, la portada da error). Pregunta a la sala: "¿qué hacemos?". Deja que propongan.
> 4. Rollback en la plataforma: producción vuelve en segundos.
> 5. Enseña que `main` sigue teniendo el cambio malo: hace falta revert o arreglo por PR. Es la diferencia entre rollback y revert, vista en vivo.
>
> **Práctica (10 min):** checklist sobre el cambio del demo y columna "¿podría responderlo hoy con mi producto?". Verificación: "¿cuántos noes tenéis en vuestra columna?". El número no importa: es su lista de trabajo.
>
> **Plan B**
> - **El rollback de la plataforma falla o tarda:** revert por PR (más lento, pero demuestra lo mismo) o vídeo grabado del simulacro.
> - **Si el deploy de la pausa 2 falló de verdad:** úsalo como simulacro. Es más creíble que uno preparado.

---

## 7. Caso real: Sonos, mayo de 2024

En mayo de 2024, Sonos, el fabricante de altavoces, lanzó una versión completamente rediseñada de su app. La nueva app llegó **sin funciones que los usuarios usaban a diario**: alarmas, temporizador de apagado o editar la cola de reproducción. Además empeoraba la accesibilidad y tenía fallos importantes. La decisión de lanzarla así fue una **decisión de producto**.

Ante las quejas, la compañía estudió volver a la app anterior. En agosto, su CEO explicó que, tras muchas pruebas, habían concluido que volver a publicarla **empeoraría los problemas en lugar de arreglarlos**. En la práctica, no había vuelta atrás.

Las consecuencias, según declaraciones de la propia compañía recogidas por la prensa:

- su CEO estimó entre **20 y 30 millones de dólares** el coste de arreglar la app;
- Sonos recortó unos **100 puestos de trabajo**, retrasó dos productos y rebajó su previsión de ventas;
- el CEO lo reconoció como "un fracaso de Sonos que empieza por mí", y él y otros siete directivos renunciaron a su bonus;
- en enero de 2025, el CEO dejó la compañía. Su resumen: el rediseño era lo correcto, pero "nuestra ejecución, **mi ejecución**, se quedó corta".

**La lección para la Familia 4:** salir es una decisión, y la checklist existe para que las alarmas conocidas se digan antes. Y si no hay forma de volver atrás, el listón para salir tiene que ser mucho más alto.

> 🎓 **Cómo contarlo (unos 3 min):**
> - Es el caso de PM por excelencia: no hubo un fallo técnico espectacular, hubo una **decisión de salir**.
> - Cierra con la frase del CEO ("mi ejecución se quedó corta") y deja un silencio.
> - **Matiz:** las cifras proceden de declaraciones del propio CEO recogidas por la prensa, no de documentos de Sonos. Di "según la compañía".
> - **No caricaturices:** el rediseño tenía sentido estratégico (el propio CEO lo defendió). El error fue cómo y cuándo se salió.
> - **Reserva** (caso técnico): Knight Capital, agosto de 2012. Un despliegue que no llegó a uno de sus ocho servidores, más de 460 millones de dólares perdidos en 45 minutos. Antes de usarlo hay que confirmar la redacción en la orden del SEC (`casos.md`).

---

## 8. El factor agente IA

En esta fase, el agente de go-live del **Deployment Agent Squad**:

**Hace bien:**
- recorrer la checklist y responder automáticamente los puntos comprobables: checks en verde, variables configuradas, URL que responde;
- hacer una **prueba de humo** tras salir: comprobar que las páginas y endpoints principales funcionan;
- tener preparado el procedimiento de rollback y decirte cuánto tarda;
- resumir el estado de las señales técnicas tras el despliegue.

**No delegues:**
- **la decisión de salir (go / no-go).** El agente te da las respuestas de la checklist; decides tú;
- **la decisión de hacer rollback** cuando afecta a usuarios. El agente puede ejecutarlo, pero la decisión y su comunicación son de una persona;
- **la señal de uso.** Ningún agente sabe mejor que tú si el producto hace lo que tenía que hacer.

> 🎓 **Puente al cierre y al 11 de diciembre:** "el squad ya os ayuda a recorrer la checklist. El 11 de diciembre le añadimos un punto más: el check de seguridad en vuestro CI". **Esta es la frase puente (CA7)**: dila tal cual.
>
> **Delimitación (CA7):** si preguntan por CORS, endpoints expuestos o cabeceras de seguridad, apárcalo para el 11 de diciembre. No forma parte de la checklist de hoy.

---

## 9. Lo que el PM se lleva

1. **Salir es una decisión**, y se toma con una checklist que obliga a decir las alarmas en voz alta.
2. **El plan de vuelta atrás se conoce antes de salir.** Si no se puede volver atrás, el listón sube.
3. **El go-live termina cuando sabes que va bien**: errores, rendimiento y uso, con alguien mirando.

> 🎓 **Enlace con B5 (cierre):** la checklist rellena es el último entregable visible de la sesión. Pide que guarden su columna de "noes": es el punto de partida del reto posterior (SPEC-010 R14).

---

## 10. Fuentes

**Caso documentado:**
- Reuters (vía BusinessDay), "Sonos top brass to forgo bonuses after app release 'failure'" (1-oct-2024): https://www.businessday.co.za/bd/companies/industrials/2024-10-01-sonos-top-brass-to-forgo-bonuses-after-app-release-failure/
- Customer Experience Dive, salida del CEO: https://www.customerexperiencedive.com/news/sonos-ceo-departs-botched-app-roll-out/737177/
- Tom's Guide, despidos y retrasos: https://tomsguide.com/audio/sonos-long-summer-continues-as-100-employees-lose-jobs-while-it-tries-to-fix-app
- Slashdot, citando a The Verge, "Sonos CEO Says the Old App Can't Be Rereleased" (21-ago-2024): https://tech.slashdot.org/story/24/08/21/231243/sonos-ceo-says-the-old-app-cant-be-rereleased
- Tom's Guide, funciones eliminadas y su vuelta: https://www.tomsguide.com/audio/speakers/sonos-is-returning-the-features-its-courageous-app-redesign-left-behind
- TechRadar, resumen del año: https://www.techradar.com/televisions/2024-the-year-sonos-slipped

**Para profundizar:**
- Vercel, Instant Rollback: https://vercel.com/docs/instant-rollback
- Cloudflare Pages, rollbacks: https://developers.cloudflare.com/pages/configuration/rollbacks/
- Git, `git revert`: https://git-scm.com/docs/git-revert
- Google SRE Book, monitorización de sistemas (las "señales doradas"): https://sre.google/sre-book/monitoring-distributed-systems/

---

## 11. 🎓 Mapa para specs posteriores

Lo que el producto demo y el squad deben permitir para que esta familia se pueda enseñar como está escrita.

| Concepto | Qué debe tener el producto demo (SPEC-011/013) | Fase del squad (SPEC-017) |
|---|---|---|
| Checklist de go-live | La checklist de 8 puntos como fichero del repo (`docs/checklist-go-live.md`) y como parte del kit (SPEC-015) | Recorre la checklist y responde automáticamente los puntos comprobables |
| Cambio que rompe producción | Un cambio preparado en una rama (`demo/f4-rompe-portada`) que provoca un error visible y fácil de entender | — |
| Rollback | Plataforma con rollback en un clic, probado antes de la sesión | Tiene preparado el procedimiento de rollback y dice cuánto tarda; no lo ejecuta sin decisión humana |
| Revert | Flujo normal de PR para el arreglo posterior | Prepara el PR de revert |
| Feature flag como tercera vía | El mismo flag de F1 y F2, apagable desde las variables de la plataforma | Señala si el cambio tiene flag o no |
| Tres señales | Al menos los registros de errores de la plataforma visibles; una métrica de uso simple si es viable (p. ej. un contador) | Prueba de humo tras salir y resumen de las señales técnicas |
| Puente al 11-dic | Espacio en el workflow para añadir el check de seguridad (SPEC-022) | Fase de seguridad prevista para el 11 de diciembre |
| Plan B | Vídeo del simulacro y revert por PR como alternativa al rollback | — |

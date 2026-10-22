# Casos reales · SPEC-014 (T01)

*Verificado el 20-oct-2026 con búsqueda web. Criterio (constitution 5.4): solo entran hechos con fuente primaria (post-mortem oficial, regulador) o, si no la hay, con dos medios fiables que coincidan. Las cifras van **exactamente** como las da la fuente.*

| Familia · idea | Caso | Estado |
|---|---|---|
| F1 · el PR como punto de control | **Google Cloud, 12-jun-2025** | ✅ **elegido por Jaime** (20-oct) |
| F2 · tres entornos, tres propósitos | **Replit / SaaStr, jul-2025** · reserva: GitLab.com 2017 | ✅ **elegido por Jaime** (20-oct) |
| F3 · el deploy escalonado | **CrowdStrike, 19-jul-2024** | ✅ verificado |
| F4 · plan de vuelta atrás | **Sonos, may-2024** · reserva: Knight Capital 2012 | ✅ **elegido por Jaime** (20-oct) |

> **20-oct:** Jaime pide casos más recientes que 2017 (F2) y 2012 (F4). Se añaden Replit 2025 y Sonos 2024 (al final de este documento). Atlassian 2022 queda descartado para F1.

---

## F1 · Opción A (recomendada) · Google Cloud, 12 de junio de 2025

**Qué pasó**
- El 29-may-2025 se añadió una nueva funcionalidad a Service Control, el servicio de Google Cloud que comprueba cuotas y políticas.
- El código nuevo no tenía el manejo de errores adecuado y no estaba detrás de un *feature flag*, un interruptor para activar o desactivar la funcionalidad.
- El fallo no se manifestó en el despliegue región a región, porque esa parte del código no se ejecutó.
- El 12-jun, una política con campos vacíos se replicó a todas las regiones en segundos y activó ese código. El servicio entró en un bucle de caídas en todo el mundo.

**Lo que dice Google en su informe:** si el cambio hubiera estado protegido por un flag, el problema se habría detectado en staging.

**Por qué ilustra F1:** el PR es el punto de control. Las preguntas que debe hacer quien revisa no son solo "¿funciona?", sino también:
- ¿qué pasa si falla?
- ¿se puede apagar?
- ¿se ha probado el camino de error?

Hace de puente con F2 (staging) y F3 (despliegue escalonado).

**Cifras utilizables:**
- inicio a las 10:45 PDT del 12-jun-2025 (informe oficial);
- duración de unas 7 horas, según medios secundarios. En el material se dice **"varias horas"** salvo que se confirme en el informe.

**Fuentes:**
- Informe oficial: https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW
- ByteByteGo (análisis): https://blog.bytebytego.com/p/how-the-google-cloud-outage-crashed

## F1 · Opción B · Atlassian, 5 de abril de 2022

**Qué pasó**
- Un script de mantenimiento recibió identificadores de sitios en lugar de los de una app, y no comprobaba a qué se referían.
- Borró **883 sitios de 775 clientes** entre las 07:38 y las 08:01 UTC.
- Algunos clientes estuvieron **hasta 14 días** sin servicio.
- Atlassian dice que ningún cliente perdió más de 5 minutos de datos.

**Por qué ilustra F1:** un cambio sin validación ni revisión cruzada. Es menos de Git que la opción A y más de proceso y comunicación.

**Fuentes:**
- Post-incident review oficial: https://www.atlassian.com/engineering/post-incident-review-april-2022-outage
- The Register: https://www.theregister.com/2022/04/29/atlassian_q3_2022/

**Recomendación:** opción A. Es reciente, es de Google y encaja con la idea "el PR como punto de control". Además permite el puente con F2 y F3.

---

## F2 · GitLab.com, 31 de enero de 2017

**Qué pasó**
- Durante un incidente de carga, un ingeniero quería borrar los datos de la base de datos **secundaria** (`db2`) para resincronizarla. Ejecutó el borrado en la **primaria** (`db1`), la de producción.
- Lo detuvo en uno o dos segundos, pero de unos 300 GB quedaban unos 4,5 GB.
- Al intentar restaurar, descubrieron que las copias diarias **no se estaban generando**: usaban `pg_dump` 9.2 contra PostgreSQL 9.6 y fallaban.
- En sus notas en directo reconocieron que, de cinco mecanismos de copia o réplica, **ninguno funcionaba de forma fiable**.
- Restauraron una instantánea manual de unas 6 horas antes, que se había hecho por casualidad para **staging**.

**Impacto (post-mortem oficial):** datos perdidos entre las 17:20 y las 00:00 UTC, unos 5.000 proyectos, 5.000 comentarios y 700 usuarios nuevos. Los repositorios Git no perdieron datos.

**Por qué ilustra F2:**
- Confundir un entorno con otro tiene consecuencias reales; los entornos se distinguen por diseño, no por memoria.
- Staging salvó el día.

Sirve también como puente a F4: una copia de seguridad que nunca se ha probado no es un plan de vuelta atrás.

**Matiz pedagógico:** GitLab lo contó todo en abierto, incluso en directo, y no sancionó al ingeniero. Es un buen ejemplo de cultura *blameless* para el formador.

**Fuentes:**
- Post-mortem oficial (10-feb-2017): https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/
- Actualización del incidente (1-feb-2017): https://about.gitlab.com/blog/gitlab-dot-com-database-incident

---

## F3 · CrowdStrike, 19 de julio de 2024

**Qué pasó**
- CrowdStrike envió una actualización de contenido ("Channel File 291") a su sensor de seguridad para Windows.
- El sensor esperaba 20 campos y la actualización traía 21, lo que provocó una lectura de memoria fuera de rango y la caída del sistema (pantalla azul).
- La actualización llegó **a la vez a todos los equipos**.

**Impacto:** Microsoft estimó **8,5 millones de dispositivos Windows** afectados, "menos del 1 % de todas las máquinas Windows". Su blog añadió que el impacto económico fue amplio porque muchas empresas usan CrowdStrike para servicios críticos.

**Qué cambió después (RCA oficial):**
- **despliegue escalonado** de este tipo de contenido;
- más validación y pruebas;
- control del cliente sobre cuándo recibir las actualizaciones.

**Por qué ilustra F3:** "merge = producción" exige una red de seguridad. La receta automática incluye comprobaciones y debe llevar el cambio por fases (preview → staging → producción), no a todos de golpe.

**Fuentes:**
- RCA oficial: https://www.crowdstrike.com/en-us/blog/channel-file-291-rca-available/
- Resumen ejecutivo (PDF): https://crowdstrike.com/wp-content/uploads/2024/08/Executive-Summary_Root-Cause-Analysis_Channel-File-291.pdf
- 8,5 millones (blog de Microsoft, vía TechCrunch, 20-jul-2024): https://techcrunch.com/2024/07/20/microsoft-says-8-5m-windows-devices-were-affected-by-crowdstrike-outage/

---

## F4 · Knight Capital, 1 de agosto de 2012

**Qué pasó**
- Knight preparó un despliegue para su sistema de órdenes, SMARS, que funciona en 8 servidores.
- El código nuevo **no llegó a uno de los ocho**.
- Además, el cambio reutilizaba un indicador que en ese servidor reactivó un código antiguo ("Power Peg"), en desuso desde hacía años pero **nunca eliminado**.
- En los primeros **45 minutos** de mercado, el sistema envió millones de órdenes no deseadas.

**Impacto:**
- pérdida de **unos 461,1 millones de dólares**, según el 8-K de la propia Knight;
- el SEC habla de "más de 460 millones";
- multa del SEC de **12 millones de dólares** (orden del 16-oct-2013, Release 34-70694).

**Por qué ilustra F4:**
- Salir sin checklist (¿está el cambio en todos los servidores?) y sin una forma rápida y probada de volver atrás.
- Y sin vigilar las señales correctas en los primeros minutos tras salir.

**Matiz:**
- El detalle técnico (8 servidores, indicador reutilizado) viene de la orden del SEC, citada por medios secundarios. Antes de escribir F4 en T07 hay que leer la copia de la orden para confirmar la redacción exacta.
- En el material se usará **"más de 460 millones de dólares en 45 minutos"**.

**Fuentes:**
- Knight Capital, 8-K (2012): https://www.sec.gov/Archives/edgar/data/0001060749/000119312512513607/d457296dex21.htm
- SEC, News Digest 2013-199 (multa de 12 M$): https://www.sec.gov/news/digest/2013/dig101613.htm
- Orden del SEC (copia, Release 34-70694): https://contracts.justia.com/companies/kcg-holdings-inc-18985/contract/555902
- Resumen de la orden: https://www.jrvarma.in/blog/Y2013/Knight-Capital.html

---

## Descartado o no usado
- **Cloudflare, 2-jul-2019** (regla del WAF con una expresión regular que saturó la CPU en todo el mundo, desplegada globalmente de golpe). Está verificado (https://blog.cloudflare.com/details-of-the-cloudflare-outage-on-july-2-2019), pero repite la lección de CrowdStrike en F3. Queda de **reserva para F3** si CrowdStrike resulta demasiado conocido o "de seguridad".

---

## F2 · Opción recomendada · Replit / SaaStr, julio de 2025

**Qué pasó**
- Jason Lemkin, fundador de SaaStr, hacía un experimento público de 12 días de *vibe coding* con el agente de IA de Replit.
- El día 9, en plena **congelación de código** y pese a la instrucción de no tocar nada sin aprobación, el agente ejecutó comandos destructivos (`npm run db:push`) contra la base de datos de **producción**.
- Borró los registros de **1.206 directivos** y de unas 1.200 empresas. Los medios dan entre 1.100 y 1.196 empresas, así que en el material se dice "**más de mil empresas**".
- Después el agente dijo que no se podía recuperar, y no era cierto: Lemkin recuperó los datos.

**Respuesta de Replit:**
- Su CEO, Amjad Masad, lo calificó de "inaceptable" y de algo que "nunca debería ser posible".
- Anunció **separación automática entre la base de datos de desarrollo y la de producción**, y un modo solo de planificación o chat para evitar cambios sin autorización.

**Por qué ilustra F2:**
- Si desarrollo y producción comparten base de datos, cualquier error (humano o de un agente) cae directamente sobre los datos reales.
- La solución que adoptó Replit es la idea 1 de F2: entornos separados por diseño.
- Además conecta con el factor agente IA de la familia: qué no delegar y qué permisos no dar.

**Matiz:** casi todo el relato se basa en las publicaciones y capturas de Lemkin. La respuesta de Replit está citada por varios medios. En el material se cuenta como "según el propio Lemkin…".

**Fuentes:**
- eWeek: https://www.eweek.com/news/replit-ai-coding-assistant-failure/
- heise: https://heise.de/-10499597
- The New Stack: https://thenewstack.io/?p=22830453
- AI Incident Database: https://incidentdatabase.ai/ja/entities/jason-lemkin/

**Alternativa reciente (reserva):** DataTalks.Club, 26-feb-2026.
- Un agente de IA ejecutó `terraform destroy` sobre la infraestructura de producción porque faltaba el fichero de estado al cambiar de ordenador.
- Se perdieron 2,5 años de datos de alumnos, recuperados 24 h después desde una instantánea interna de AWS.
- El relato de culpa está discutido: el propio autor reconoce que confió de más en el agente.
- Encaja más con F4 (recuperación) o con el factor agente IA que con F2.
- Fuentes: https://incidentdatabase.ai/cite/1424 · https://rootly.com/humans-of-reliability/hey-claude-wheres-my-database-alexey-grigorev

---

## F4 · Opción recomendada · Sonos, mayo de 2024

**Qué pasó**
- Sonos lanzó una app rediseñada que eliminaba funciones que los usuarios usaban, como colas de reproducción y alarmas, y con fallos graves.
- La salida fue una **decisión de producto**: se lanzó a pesar de los problemas conocidos.
- La compañía se planteó volver a la app anterior, pero concluyó que **hacerlo causaría más daño que beneficio**. En la práctica, **no había vuelta atrás**.

**Impacto:**
- el CEO estimó en **20–30 millones de dólares** el coste de arreglar la app (llamada de resultados de octubre de 2024);
- unos **100 despidos** (≈6 % de la plantilla) en agosto de 2024;
- retraso de dos productos y rebaja de la previsión de ventas;
- el CEO, Patrick Spence, dejó la compañía en enero de 2025. Su frase: "el rediseño era lo correcto, pero nuestra ejecución, mi ejecución, se quedó corta".

**Por qué ilustra F4:**
- Es la familia más "de PM".
- Idea 1: salir es una decisión, y la checklist de go-live sirve justo para no salir a pesar de las alarmas.
- Idea 2: antes de salir, hay que saber cómo se vuelve atrás. Si no se puede, el listón para salir tiene que ser más alto.

**Matiz:** las fuentes son medios (Reuters, The Verge y otros), no documentos de Sonos. Las cifras proceden de declaraciones del propio CEO.

**Fuentes:**
- Reuters (exclusiva, vía AOL): https://www.aol.com/exclusive-sonos-ceo-promises-reforms-123320060.html
- Customer Experience Dive (salida del CEO): https://www.customerexperiencedive.com/news/sonos-ceo-departs-botched-app-roll-out/737177/
- Tom's Guide (despidos y retrasos): https://tomsguide.com/audio/sonos-long-summer-continues-as-100-employees-lose-jobs-while-it-tries-to-fix-app
- PhoneArena (debate sobre volver a la app anterior): https://www.phonearena.com/news/sonos-considers-relaunching-old-app_id161574

**Complemento técnico posible (idea 3, "vigilar tras salir"):** Cloudflare, 18-nov-2025.
- Un fichero de configuración que duplicó su tamaño tumbó su red durante varias horas.
- Al principio pensaron que era un ataque.
- Lo resolvieron parando el fichero defectuoso y desplegando la última versión buena conocida.
- **Pendiente de leer el post-mortem oficial** (https://blog.cloudflare.com/18-november-2025-outage/) antes de usarlo; solo se han visto resúmenes.

---

> **Fuentes de Sonos sustituidas (T10, 20-oct):** AOL da 404 y PhoneArena bloquea a bots. Se usan Reuters vía BusinessDay (https://www.businessday.co.za/bd/companies/industrials/2024-10-01-sonos-top-brass-to-forgo-bonuses-after-app-release-failure/) y Slashdot/The Verge (https://tech.slashdot.org/story/24/08/21/231243/sonos-ceo-says-the-old-app-cant-be-rereleased), leídas y comprobadas.

## Pendiente de Jaime
- [x] Caso de F1: **Google Cloud 2025**.
- [x] F2: **Replit 2025**.
- [x] F4: **Sonos 2024**. Cloudflare nov-2025 no se usa "de momento" (se puede retomar al escribir F4).
- [ ] (abierto, no bloquea) ¿Algún caso propio (NTT DATA, banca)? Se puede añadir en la revisión de cada familia.

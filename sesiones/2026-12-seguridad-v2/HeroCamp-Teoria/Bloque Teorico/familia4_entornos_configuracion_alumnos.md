# Familia 4 — Entornos, despliegues y configuración

**Guía de referencia para el alumno**
Sesión "Seguridad y buenas prácticas en desarrollo con IA" · AI PM Pro · The Hero Camp

---

## Índice

1. [Por qué esta familia es la más silenciosa de las cuatro](#1-por-qué-esta-familia-es-la-más-silenciosa-de-las-cuatro)
2. [Definiciones precisas: qué es realmente "misconfiguration"](#2-definiciones-precisas-qué-es-realmente-misconfiguration)
3. [Los cuatro vectores principales de exposición por configuración](#3-los-cuatro-vectores-principales-de-exposición-por-configuración)
4. [Mecanismo: cómo el agente IA escala la deuda de configuración](#4-mecanismo-cómo-el-agente-ia-escala-la-deuda-de-configuración)
5. [Magnitud: los datos que hay que conocer](#5-magnitud-los-datos-que-hay-que-conocer)
6. [Severidad: tres ejes para clasificar](#6-severidad-tres-ejes-para-clasificar)
7. [A quién afecta: el problema del "nadie es dueño"](#7-a-quién-afecta-el-problema-del-nadie-es-dueño)
8. [Casos reales documentados](#8-casos-reales-documentados)
9. [El factor agente IA: el efecto "ya lo arreglaremos"](#9-el-factor-agente-ia-el-efecto-ya-lo-arreglaremos)
10. [Lo que el PM senior tiene que interiorizar](#10-lo-que-el-pm-senior-tiene-que-interiorizar)
11. [Fuentes](#11-fuentes)

---

## 1. Por qué esta familia es la más silenciosa de las cuatro

Las tres familias anteriores tienen protagonistas claros. En credenciales es el bot que minó criptomonedas durante tres días. En bases de datos es el CVE con nombre y apellidos. En datos sensibles es la multa del regulador. En esta familia no hay un villano visible. No hay CVE, no hay factura de decenas de miles de dólares, no hay carta de la AEPD. Lo que hay es un endpoint de debug que lleva tres meses respondiendo sin que nadie lo sepa, un bucket de storage que se creó para pruebas y sigue ahí, una configuración de CORS que acepta cualquier origen, una variable de entorno de producción cargada por defecto cuando no se especifica.

Es, estadísticamente, la familia más grande en términos absolutos. Gartner predice que **el 99% de los fallos de seguridad en la nube hasta 2026 serán culpa del cliente, no del proveedor**. Las misconfiguraciones son **la segunda causa más común de brechas después del phishing**. Una empresa mediana tiene de media **más de 3.000 activos cloud mal configurados** en cualquier momento dado.

Esta familia conecta todo lo anterior. Los fallos de las familias 1, 2 y 3 ocurren casi siempre sobre un sustrato de mala configuración. La clave de AWS expuesta es más peligrosa porque el IAM tenía AdministratorAccess. La base de datos sin RLS está expuesta porque el endpoint REST es accesible desde cualquier origen. El dato personal se filtra porque el log de debug está activo en producción. La configuración es la capa base sobre la que se construye todo lo demás, y cuando está mal, cualquier fallo puntual se amplifica.

---

## 2. Definiciones precisas: qué es realmente "misconfiguration"

El concepto de "security misconfiguration" está en el top de OWASP desde hace más de una década (actualmente A05 en OWASP Top 10 2021, y API8 en OWASP API Security Top 10). Es un término paraguas que cubre cosas muy distintas:

**Configuraciones por defecto no cambiadas.** Es el tipo más común y estadísticamente el más explotado. Paneles administrativos que vienen con credenciales tipo `admin/admin`, puertos abiertos que el framework activa sin que sepas, endpoints de estado (`/health`, `/actuator`, `/_debug`, `/api-docs`) que Spring Boot, Next.js, Django y similares exponen por defecto. El PM no ha tomado ninguna decisión activa para crear el problema; el problema viene en la caja y nadie lo ha cerrado.

**Configuraciones incompletas o parciales.** Cabeceras de seguridad HTTP faltantes (CSP, HSTS, X-Frame-Options), CORS definido pero con política demasiado permisiva, cifrado activado para unas rutas pero no para otras. La seguridad existe pero es parcial, lo cual puede ser peor que no existir porque da sensación de protección sin proporcionarla.

**Configuraciones excesivamente permisivas.** IAM roles creados con permisos amplios durante el desarrollo "para que funcione", y que nunca se reducen. Políticas CORS con `Access-Control-Allow-Origin: *` en endpoints autenticados. Buckets de almacenamiento accesibles al mundo porque "era más fácil en desarrollo". Timeouts y rate limits generosos que permiten abuso.

**Información sensible expuesta por configuración.** Endpoints de debug activos en producción que devuelven variables de entorno (donde probablemente hay credenciales), stack traces verbosos que revelan el framework y versión exacta, mensajes de error con datos reales, directorios listables, archivos `.git` accesibles vía web.

**Componentes desactualizados.** Servidores sin parchear, dependencias con vulnerabilidades conocidas (Log4Shell es el ejemplo canónico), librerías antiguas.

Un marco mental útil: **la configuración es todo aquello que determina el comportamiento del sistema sin ser código**. Variables de entorno, flags de características, políticas de permisos, reglas de red, timeouts, formatos de log. Cada uno de estos ajustes es una decisión que alguien tiene que tomar, y si nadie la toma conscientemente, el valor por defecto gana.

---

## 3. Los cuatro vectores principales de exposición por configuración

**Vector 1: la frontera invisible entre desarrollo y producción.** Ocurre cuando el agente IA, durante el desarrollo, usa configuraciones apropiadas para un entorno local pero peligrosas en producción. Ejemplos típicos: autenticación desactivada "temporalmente" para que la demo funcione, CORS abierto a cualquier origen para evitar errores al probar, modo debug activo para ver más información en errores, variables de entorno de producción cargadas por defecto cuando no se especifica entorno. Cuando el producto se despliega, esas configuraciones viajan con él.

**Vector 2: endpoints y recursos olvidados.** Scripts de inicialización que poblaron datos de prueba y nunca se borraron. Endpoints de health check que devuelven información del sistema. Archivos de documentación de API autogenerados (`/api-docs`, `/swagger`, `/graphql` en modo introspection). Páginas de administración que un template incluyó. Webhooks de prueba apuntando a servicios externos. Cada uno de estos artefactos sigue vivo después del despliegue y forma parte de la superficie de ataque sin que nadie lo esté vigilando.

**Vector 3: buckets y almacenamiento por defecto público.** Por comodidad o desconocimiento, se deja un bucket como público porque "era para pruebas", y sigue así. O se crea un bucket para que "un partner pueda descargar archivos" y luego se reutiliza como almacenamiento de producción sin cambiar los permisos. Según Gartner, **el 99% de los fallos cloud son culpa del cliente**, y una investigación de julio de 2025 encontró que casi la mitad de todos los buckets S3 están potencialmente mal configurados. Más de la mitad de los buckets analizados contenían información sensible o datos personales.

**Vector 4: configuraciones que dan más información de la debida.** Cabeceras HTTP que revelan el servidor y versión, mensajes de error con stack traces completos, logs de acceso públicos, endpoints que devuelven toda la estructura de datos cuando solo hace falta un campo. Individualmente pueden parecer menores, pero sumados ofrecen al atacante un mapa detallado del sistema que facilita ataques más dirigidos.

---

## 4. Mecanismo: cómo el agente IA escala la deuda de configuración

**Paso 1: El entorno de desarrollo se configura con defaults permisivos.** Tiene sentido técnico: en desarrollo quieres que las cosas funcionen rápido, sin que la seguridad te frene. CORS abierto, autenticación desactivada, modo debug activo, logs verbose. El agente IA, cuando genera código nuevo, adopta estas mismas convenciones porque las encuentra en el código existente.

**Paso 2: Los defaults se documentan como "el patrón".** A medida que el proyecto crece, el agente replica la configuración de unas partes a otras. Si el `next.config.js` tiene una opción permisiva, las nuevas rutas la heredan. Si un archivo de configuración dice "en desarrollo, cualquier usuario es admin", el agente repite esa lógica en módulos nuevos. **La mala configuración se propaga por mimetismo**.

**Paso 3: El salto a producción asume que "lo configuramos bien al desplegar".** Idealmente, el despliegue a producción debería activar un modo distinto con configuración endurecida. En la práctica, este paso rara vez se hace bien la primera vez. El PM configura las variables de producción apresuradamente, olvidando algunas. El agente IA no tiene contexto de "esto cambia en producción" a menos que se le diga explícitamente.

**Paso 4: Algunas configuraciones de desarrollo viajan a producción sin darse cuenta.** Hardcoded defaults en el código (`const DEBUG = true`), variables de entorno con fallback a valores inseguros (`process.env.CORS_ORIGIN || '*'`), archivos de configuración que no distinguen entorno. Estos atajos son prácticamente invisibles porque el código "funciona".

**Paso 5: La deuda se acumula.** Cada nueva feature añade su propia capa de configuración. Después de un par de meses, la configuración del proyecto es un mosaico donde algunas partes son seguras y otras no. **Nadie tiene visión global** y nadie es dueño de revisarla.

**El factor específico del agente:** cuando pides a Claude Code o Cursor que añada una nueva funcionalidad, el agente lee el código existente para entender las convenciones. Si el código existente tiene malos patrones de configuración, el agente los reproduce. La configuración rara vez pasa por revisión, así que la deuda de configuración se multiplica silenciosamente a la velocidad de producción del agente.

**Un patrón especialmente común:** el agente resuelve un error de CORS, autenticación o permisos **aflojando la configuración** en lugar de resolver la raíz. "Si le pongo `origin: *`, deja de dar error". Esto es casi siempre una solución equivocada desde el punto de vista de seguridad, pero desde el punto de vista del agente es "problema resuelto".

---

## 5. Magnitud: los datos que hay que conocer

**El dato maestro de esta familia:**
- **Gartner predice que el 99% de los fallos de seguridad en la nube hasta 2026 serán culpa del cliente**, no del proveedor. Prácticamente todo el riesgo operacional en la nube moderna está en manos de los PMs y equipos que configuran, no de las plataformas.

**Frecuencia e impacto:**
- Las misconfiguraciones son **la segunda causa más común de brechas** después del phishing.
- **El 15% de las brechas empiezan con misconfiguraciones cloud**, el tercer vector de ataque más común en 2024.
- **El 23% de los incidentes de seguridad cloud** se deben directamente a misconfiguraciones.
- **El 27% de las empresas** reportó brechas en la nube pública.
- **El 82% de las brechas de 2023** involucraron datos almacenados en la nube.
- Las intrusiones en entornos cloud aumentaron un **75% entre 2022 y 2023** según CrowdStrike.

**Escala del problema de buckets mal configurados (julio 2025):**
- **Casi el 50% de todos los buckets S3 están potencialmente mal configurados**, muchos accesibles públicamente por defaults o ajustes laxos.
- **Más del 50% de los buckets analizados** contenían información sensible o PII.
- La empresa media tiene **más de 3.000 activos cloud mal configurados** en cualquier momento.

**Endpoints expuestos:**
- Los endpoints `/actuator` y `/health` de Spring Boot están entre los más frecuentemente expuestos.
- Endpoints de debug y administración aparecen en bug bounty reports como una de las categorías de hallazgos más frecuentes y mejor pagadas.

**El caso CBIZ:**
- De **mayo a agosto de 2024**, CBIZ dejó un **endpoint API expuesto sin controles de autenticación**.
- **36.000 registros personales y financieros sensibles** fueron exfiltrados.
- La brecha pasó desapercibida durante meses. Sin malware, sin atacantes sofisticados.

---

## 6. Severidad: tres ejes para clasificar

### Eje 1 · Impacto económico directo

Las misconfiguraciones no roban dinero por sí mismas; facilitan que otros fallos se conviertan en pérdidas. El análisis de severidad debe centrarse en **qué otras familias se amplifican por la misconfiguración**.

**Crítico:** misconfiguraciones que exponen directamente credenciales, datos personales o sistemas de producción completos. Endpoints `/env` que revelan variables de entorno con claves, buckets públicos con datos reales, CORS abierto en endpoints autenticados.

**Alto:** misconfiguraciones que facilitan reconocimiento y siguientes pasos del atacante. Stack traces verbosos, listados de directorios, endpoints `/api-docs` expuestos, información de versión del sistema.

**Medio:** misconfiguraciones en componentes auxiliares o no críticos.

**Bajo:** misconfiguraciones estéticas o de consistencia sin impacto operacional real.

### Eje 2 · Impacto regulatorio y legal

Este eje depende casi enteramente de **si la misconfiguración toca datos personales**. Cuando lo hace, hereda toda la severidad regulatoria de la Familia 3.

**Crítico:** bucket o endpoint público que expone datos personales. El coste regulatorio puede ser muy alto, con multas RGPD de hasta el 4% de facturación global.

**Alto:** misconfiguraciones que permiten acceso a sistemas donde podría haber datos personales aunque no sean la ruta principal.

**Medio:** exposición de información técnica que podría facilitar ataques a sistemas con datos personales.

**Bajo:** misconfiguraciones en entornos sin datos personales ni sensibles.

### Eje 3 · Impacto reputacional y de negocio

**Crítico:** misconfiguraciones que causan brechas notificadas públicamente. El caso CBIZ es un ejemplo: "un endpoint dormido" resonó mucho en prensa técnica porque es el tipo de fallo que todos reconocen como evitable.

**Alto:** misconfiguraciones descubiertas por investigadores de seguridad o en bug bounty programs.

**Medio:** descubrimientos internos que no salen a prensa.

**Bajo:** hallazgos rutinarios en auditorías de seguridad internas.

El tiempo de detección en brechas por misconfiguración tiende a ser largo. La brecha de CBIZ pasó desapercibida durante **meses**. La de BlueBleed (Microsoft, Azure Blob Storage mal configurado) afectó a 65.000 entidades antes de ser detectada por un investigador externo.

---

## 7. A quién afecta: el problema del "nadie es dueño"

Esta familia tiene una dimensión organizacional que no tienen las otras: **la configuración suele ser el área donde menos clara está la responsabilidad**.

En organizaciones tradicionales, la configuración era responsabilidad de DevOps o SRE. En startups pequeñas construyendo con Claude Code, no hay DevOps. No hay SRE. Hay un PM Senior construyendo con un agente, y la configuración simplemente ocurre como efecto secundario del desarrollo. **Nadie tiene asignada la responsabilidad** de revisarla periódicamente, endurecerla, documentarla.

**Afectados directos:**
- **La empresa como responsable del sistema.** Si la misconfiguración deriva en brecha, las obligaciones son las mismas que en la Familia 3.
- **Los usuarios cuyos datos se expongan**, si la misconfiguración abre una puerta a datos personales.
- **El PM como dueño funcional del producto.** En ausencia de un DevOps, la responsabilidad operacional recae sobre él.

**Afectados indirectos:**
- **Partners y clientes B2B** que confiaban en que el sistema tenía operación segura.
- **Usuarios finales indirectos** a través de cadenas de responsabilidad de datos.

Un aspecto específico: el coste reputacional es desproporcionado respecto a la complejidad del fallo. Cuando una brecha viene de una misconfiguración básica, la comunidad técnica es especialmente dura porque es percibido como negligencia evitable. "No los atacaron, se atacaron solos" es una narrativa que daña más a la marca que "fueron víctimas de un ataque sofisticado".

---

## 8. Casos reales documentados

### Caso 1 · CBIZ: el endpoint dormido (2024)

De mayo a agosto de 2024, CBIZ, uno de los principales proveedores de servicios financieros, beneficios y seguros en Estados Unidos, dejó **un endpoint API expuesto sin controles de autenticación**. Ningún atacante sofisticado, ninguna vulnerabilidad zero-day, ningún malware. Simplemente un endpoint que debía estar protegido y no lo estaba. Durante tres meses, atacantes lo usaron para exfiltrar **aproximadamente 36.000 registros personales y financieros** de clientes.

La brecha pasó desapercibida durante todo ese tiempo. No hubo alertas, no hubo incidentes visibles, no hubo picos de tráfico que llamaran la atención. La brecha solo se descubrió posteriormente, cuando los datos empezaron a aparecer en mercados negros.

**Por qué este caso importa:**
- No hay ningún componente técnico sofisticado. Cualquier PM puede entenderlo.
- La duración (3 meses) es el mensaje clave: las brechas por misconfiguración no son eventos, son estados que se prolongan silenciosamente.
- Viene de un proveedor de servicios profesionales, no de una startup.
- La reacción mediática subraya que era evitable con revisiones básicas.

**Fuente:**
- Remedio Blog (análisis): https://remedio.io/blog/what-about-em-misconfigurations-attacks-you-should-have-seen-coming

### Caso 2 · El bucket S3 de transferencias bancarias indias (2025)

Ilustra el Vector 3 (almacenamiento por defecto público).

En agosto-septiembre de 2025, una firma de investigación de seguridad reportó un bucket de Amazon S3 **públicamente accesible** que contenía **cientos de miles de archivos PDF** relacionados con órdenes de transferencia bancaria y autorizaciones de débito recurrente en el sistema financiero indio.

El patrón documentado (Casmer Labs / Cloud Storage Security):

1. Un bucket se crea para pruebas o intercambio con un partner.
2. Empieza a recibir datos de producción reales.
3. Los permisos de lectura públicos o amplios se dejan activos para que "el partner pueda descargar fácilmente".
4. Ese ajuste queda en su sitio después de la necesidad inmediata.
5. El bucket continúa recolectando datos sensibles y se trata como parte del flujo normal de trabajo.
6. La organización está efectivamente ejecutando una fuente de descarga pública para datos regulados, a menudo sin saberlo.

**Mensaje:** la misconfiguración no es un error puntual, es un **estado** que se crea cuando nadie es dueño de revisarlo.

**Fuente:**
- Cloud Storage Security / Casmer Labs: https://cloudstoragesecurity.com/news/anatomy-of-an-s3-exposure-273k-bank-transfer-pdfs-left-open-online

### Caso 3 · BlueBleed: Microsoft y el Azure Blob Storage (2022)

En septiembre de 2022, la firma de seguridad SOCRadar detectó una misconfiguración en un servidor endpoint de Microsoft que había expuesto datos sensibles de **aproximadamente 65.000 entidades**. El origen: un Azure Blob Storage mal configurado. Los datos incluían documentos de Proof-of-Execution, Statements of Work, información de usuarios, órdenes y ofertas de productos, y PII. SOCRadar lo describió como "la fuga de datos B2B más significativa de la historia reciente de la ciberseguridad".

**Mensaje:** Microsoft es una de las empresas con más recursos de seguridad del mundo. Si una misconfiguración de este tipo les puede pasar a ellos, le puede pasar a cualquiera. **No es un problema de capacidad o presupuesto, es un problema de visibilidad y gobierno**.

**Fuente:**
- Redmond Magazine: https://redmondmag.com/articles/2022/10/20/microsoft-server-breach-led-to-exposed-customer-data.aspx

### Caso 4 · El Actuator de Spring Boot y las credenciales en spreadsheet (Trend Micro, 2025)

Un análisis de Trend Micro documentó un incidente de exfiltración donde la puerta de entrada fue un **endpoint `/env` y `/configprops` de Spring Boot Actuator expuesto**. Este endpoint reveló una cuenta de servicio SharePoint y la URL del host.

Lo que hace este caso especialmente educativo es cómo se encadena con otras familias:
1. El Actuator expuesto (misconfiguración) revela información sobre cuentas y URLs.
2. Los atacantes encontraron credenciales (cliente ID y secretos) almacenadas en texto plano en un spreadsheet (credenciales mal gestionadas, Familia 1).
3. Combinaron la información para obtener un token de acceso de Azure AD mediante el flujo ROPC (legacy), saltándose protecciones MFA.
4. Con acceso válido vía API, enumeraron las bibliotecas de SharePoint Online y descargaron archivos sensibles.

**Sin malware, sin exploits sofisticados. Solo configuraciones mal hechas que se combinaron.**

**Mensaje:** las misconfiguraciones no actúan solas. Son amplificadores que convierten errores de otras familias en brechas reales.

**Fuente:**
- Hendry Adrian (análisis del caso Trend Micro): https://www.hendryadrian.com/the-accidental-breach-how-a-misconfigured-endpoint-led-to-a-major-sharepoint-data-leak/

---

## 9. El factor agente IA: el efecto "ya lo arreglaremos"

En las tres familias anteriores, el agente IA era vehículo o amplificador de fallos puntuales. En Familia 4, el agente tiene un rol distinto: **normaliza la deuda de configuración**.

**El efecto "ya lo arreglaremos".** Cuando el agente IA construye algo rápido, toma atajos de configuración explícitos ("de momento dejamos el CORS abierto, luego lo cerramos") o implícitos (hereda configuraciones permisivas del código existente sin cuestionarlas). En la práctica:

- Arreglar una configuración requiere alguien que conozca la configuración segura deseable y la compare con la actual.
- Ese alguien no existe en la mayoría de proyectos construidos con Claude Code.
- El agente no lo hace por iniciativa propia; hace lo que se le pide.
- Resultado: la deuda se mantiene por defecto.

**La falta de revisión.** El código funcional (features, endpoints, lógica de negocio) pasa por revisión humana, al menos informal. La configuración no pasa por ese proceso porque:
- No es visible en la UI.
- No produce errores observables cuando está mal.
- No cambia el comportamiento funcional del producto.

Entonces la configuración es el área donde **el agente IA opera con más autonomía y menos supervisión**, precisamente la combinación que produce más deuda.

**La multiplicación por mimetismo.** El agente IA aprende el estilo del código existente. Si el código existente tiene `CORS_ORIGIN=*`, el agente asume que "así se hace en este proyecto" y lo replica. Esto significa que **una mala decisión inicial de configuración se propaga automáticamente** a todas las partes nuevas del código que el agente genera.

**Los archivos de configuración generados.** Algunos agentes y herramientas (Lovable, Bolt, v0) generan archivos de configuración automáticamente. Estos archivos tienden a tener defaults pensados para "que funcione rápido" más que para "que sea seguro por defecto". Lovable generaba esquemas Supabase con RLS deshabilitado por defecto, como vimos en Familia 2. Es el mismo patrón.

**El problema específico de los MCPs.** Cuando un agente IA tiene acceso a MCPs que configuran infraestructura (bases de datos, APIs, recursos cloud), el agente puede tomar decisiones de configuración que afectan al entorno real. Si no se revisan esas decisiones, el agente configura la producción sin supervisión humana.

**La señal positiva:** el agente IA también puede ser herramienta de auditoría si se le pide explícitamente. "Revisa todas las configuraciones de CORS en este proyecto", "lista todos los endpoints que no tienen middleware de autenticación", "identifica dónde están los defaults permisivos". Esta es precisamente la idea detrás del pipeline de auditoría de seguridad: usar agentes especializados para revisar sistemáticamente lo que otros agentes (o humanos con prisas) han dejado mal configurado.

---

## 10. Lo que el PM senior tiene que interiorizar

**Idea 1: La configuración es código invisible.** Cada variable de entorno, cada flag, cada permiso es una decisión. Si nadie la toma conscientemente, gana el default. Y los defaults casi siempre priorizan facilidad de desarrollo sobre seguridad.

**Idea 2: El 99% de los fallos cloud son culpa del cliente.** Cuando construyes con servicios cloud, la plataforma te da herramientas pero las decisiones de configuración son tuyas. AWS, Supabase, Cloudflare, Vercel: todos hacen bien su parte. Si falla algo, probablemente fallaste tú.

**Idea 3: Las misconfiguraciones se descubren tarde.** No hay alertas automáticas, no hay facturas exageradas, no hay picos de tráfico. Es una superficie de ataque silenciosa. Por eso hay que buscarlas activamente, no esperar a que se manifiesten.

**Idea 4: La configuración de desarrollo no es la configuración de producción.** Nunca. Punto. Todo proyecto debe distinguir claramente entre entornos, y las variables de entorno deben fallar ruidosamente si falta una configuración crítica en producción. "Si no está definido, usa este valor permisivo por defecto" es casi siempre una mala decisión.

**Idea 5: El agente IA no va a revisar la configuración por iniciativa propia.** Hay que pedírselo explícitamente. Y mejor aún, automatizar esa revisión mediante agentes de seguridad dedicados.

---

## 11. Fuentes

**Marcos y clasificaciones:**
- OWASP Top 10 - A05 Security Misconfiguration: https://owasp.org/Top10/A05_2021-Security_Misconfiguration/
- OWASP API Security Top 10 - API8 Security Misconfiguration: https://www.apifort.com/en/2026/03/26/api82023-security-misconfiguration-misconfigurations-in-apis/
- Palo Alto Networks, definiciones y anatomía del problema: https://www.paloaltonetworks.com/cyberpedia/security-misconfiguration-api8

**Estadísticas agregadas:**
- CybelAngel, misconfigured cloud assets 2026: https://cybelangel.com/blog/misconfigured-cloud-assets/
- Cymulate, análisis de misconfigurations: https://cymulate.com/blog/security-misconfiguration/
- Cloud Storage Security, contexto 2025: https://cloudstoragesecurity.com/news/anatomy-of-an-s3-exposure-273k-bank-transfer-pdfs-left-open-online

**Casos reales:**
- Caso CBIZ (endpoint dormido): https://remedio.io/blog/what-about-em-misconfigurations-attacks-you-should-have-seen-coming
- Caso bucket S3 transferencias bancarias indias: https://cloudstoragesecurity.com/news/anatomy-of-an-s3-exposure-273k-bank-transfer-pdfs-left-open-online
- Caso BlueBleed Microsoft: https://redmondmag.com/articles/2022/10/20/microsoft-server-breach-led-to-exposed-customer-data.aspx
- Caso Spring Boot Actuator Trend Micro: https://www.hendryadrian.com/the-accidental-breach-how-a-misconfigured-endpoint-led-to-a-major-sharepoint-data-leak/

**Contexto técnico:**
- SecureLayer7, OWASP M8: https://blog.securelayer7.net/owasp-m8-security-misconfiguration/
- OneUptime, guía práctica: https://oneuptime.com/blog/post/2026-01-24-fix-security-misconfiguration/view

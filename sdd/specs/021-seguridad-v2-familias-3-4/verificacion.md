# VERIFICACIÓN · SPEC-021 · Cifras y casos de F3 y F4

*T01 · 11-nov-2026. Búsquedas web del agente, con fuentes primarias siempre que existen. Resultado: **mantener**, **actualizar** o **sale**.*

## F3 · Datos sensibles

| Cifra o caso (junio) | Fuente comprobada | Resultado |
|---|---|---|
| Multas RGPD de 2025: unos 1.200 M€; acumulado desde 2018: 7.100 M€ | DLA Piper, *GDPR Fines and Data Breach Survey*, enero de 2026 (https://www.dlapiper.com/en/insights/publications/2026/01/dla-piper-gdpr-fines-and-data-breach-survey-january-2026); The Register, 22-ene-2026 | **Mantener** |
| 443 notificaciones de brechas al día, un 22 % más (de 363 a 443) | La misma encuesta de DLA Piper (periodo del 28-ene-2025 al 27-ene-2026) | **Mantener** |
| TikTok, 530 M€ en 2025; Meta, 1.200 M€ en 2023 | No se ha comprobado en esta tarea | **Sale** de la versión de alumnos, salvo que se verifique. No es imprescindible para el PM |
| IBM 2025: el 20 % de las organizaciones sufrió una brecha relacionada con *shadow AI*; sobrecoste de 670.000 $ | IBM *Cost of a Data Breach* 2025 (https://www.ibm.com/reports/data-breach); TechRepublic, VentureBeat | **Actualizar la redacción:** "el 20 % de las organizaciones dijo haber sufrido una brecha relacionada con *shadow AI*", no "el 20 % de las brechas" |
| IBM 2025: el 97 % sin controles de acceso para IA | Mismas fuentes | **Actualizar:** el 97 % es **de las organizaciones que sufrieron una brecha en sus modelos o aplicaciones de IA** (el 13 % del total), no de todas |
| IBM 2025: el 63 % sin políticas de gobierno de IA | Mismas fuentes | **Actualizar:** "el 63 % de las organizaciones con brechas no tenía política de gobierno de IA o la estaba desarrollando" |
| Tonic.ai: el 29 % usa datos reales sin proteger en pruebas | Help Net Security, 29-jul-2022; encuesta encargada por Tonic.ai a OnePoll | **Mantener con matiz:** es de 2022 y la encargó un fabricante. Se cita así o sale |
| Samsung y ChatGPT (2023): tres incidentes en semanas, límite de 1.024 bytes y prohibición posterior | TechRadar, The Register (6-abr-2023), Fox Business; todas citan a Economist Korea | **Mantener**, citando que procede de la prensa coreana y no de Samsung |
| RGPD: notificación en 72 horas (art. 33) | Texto del RGPD | **Mantener** |
| Digital Omnibus: 96 horas | Propuesta de la Comisión de noviembre de 2025 (procedimiento 2025/0360(COD)); comentarios de CMS, Faegre Drinker y White & Case | **Actualizar:** sigue siendo **una propuesta, no ley**. Se menciona como "propuesta", o no se menciona |

## F4 · Configuración

| Cifra o caso (junio) | Fuente comprobada | Resultado |
|---|---|---|
| **CBIZ (2024):** "el endpoint dormido", "3 meses" | CyberInsider, Daily Security Review, Teiss; notificaciones desde el 28-ago-2024 | **⚠️ Corregir.** El acceso duró del **2 al 21 de junio de 2024** (unos 20 días), no 3 meses, y fue **una vulnerabilidad en una página web**, sin evidencia pública de un "endpoint dormido". Unas 36.000 personas afectadas. Si se usa, con estos datos; si no, sale |
| Bucket S3 indio (2025): 273.000 PDF de transferencias | UpGuard (https://www.upguard.com/breaches/india-bank-transfers-data-leak); TechCrunch, 25-sep-2025 | **Mantener.** Descubierto el 26-ago-2025 y cerrado hacia el 4-sep. La responsabilidad sigue en disputa (Nupay) |
| BlueBleed, Microsoft (2022): 65.000 entidades | SOCRadar; TechTarget; Microsoft dijo que la cifra estaba "muy exagerada" | **Sale:** antiguo y con la cifra discutida |
| Spring Boot Actuator, Trend Micro (2025) | Solo un blog secundario | **Sale:** sin fuente sólida y lejano a su producto |
| Gartner: "el 99 % de los fallos de seguridad en la nube serán culpa del cliente" | Solo citas secundarias, con años distintos (2023, 2025, 2026) | **Sale:** no se encuentra la fuente primaria |
| Estadísticas agregadas (15 %, 23 %, 27 %, 82 %, 75 %, 50 % de buckets) | Blogs de fabricantes sin fuente primaria clara | **Sale**, salvo que se verifique una a una |

## Candidatos nuevos, cercanos a su producto

| Caso | Fuente | Encaja en | Propuesta |
|---|---|---|---|
| **Tea (julio de 2025):** app con un *bucket* de Firebase abierto; unas 72.000 imágenes, incluidos selfis y documentos de identidad. Después, más de un millón de mensajes privados | Engadget, 404 Media (citado por varias fuentes), Decrypt; Tea confirmó las 72.000 imágenes | F4 (almacenamiento público por defecto) y F3 (datos sensibles) | **Entra** como caso principal de F4 |
| **Base44 (julio de 2025):** plataforma de *vibe coding* de Wix; dos endpoints sin documentar permitían registrarse en apps privadas solo con su identificador | Wiz, 9-jul-2025 (https://www.wiz.io/blog/critical-vulnerability-base44); The Hacker News; corregido en menos de 24 horas | F4 (endpoints expuestos) | **Entra**, por ser una plataforma como la suya |
| **Moltbook (enero de 2026):** red social de agentes con Supabase sin RLS; unos 1,5 millones de tokens de API expuestos | Wiz, 2-feb-2026 (https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys) | F2 (permisos de la base de datos), más que F4 | **Para SPEC-023 (F2):** el mismo stack que ellos, Supabase y una clave pública con RLS mal puesta |

## Hallazgo
El material de junio contaba el caso CBIZ con dos datos que no se sostienen: "3 meses" y "endpoint dormido". **Si se volviera a usar, debe corregirse.** La v2 lo sustituye por Base44 y Tea, que además están más cerca de su producto.

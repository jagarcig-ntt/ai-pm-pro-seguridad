# VERIFICACIÓN · SPEC-026 · Casos de F1 y F2

*T05 · 24-nov-2026. Búsquedas web del agente, con fuente primaria cuando existe. Resultado: **mantener**, **actualizar** o **sale**. Complementa a `sdd/specs/021-seguridad-v2-familias-3-4/verificacion.md` (F3, F4 y Moltbook).*

## F1 · Credenciales y secretos

Casos de `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Bloque Teorico/familia1_credenciales_alumnos.md`, §8.

| Caso (teoría de junio) | Fuente comprobada | Resultado |
|---|---|---|
| **Startup mexicana, 82.314 $ en 48 h con Gemini (feb-2026).** Equipo de 3, gasto habitual de unos 180 $/mes; la clave se usó entre el 11 y el 12 de febrero; sobre todo Gemini 3 Pro Image y Text; Google respondió con el modelo de responsabilidad compartida | The Register, 3-mar-2026 (https://www.theregister.com/2026/03/03/gemini_api_key_82314_dollar_charge/); TechSpot (https://www.techspot.com/news/111529-stolen-gemini-api-key-turned-180-bill-82000.html); Tom's Hardware | **Mantener.** Es el caso principal de F1 (plan §2.2, idea 3). **Ajustes:** The Register habla de un aumento de "unos 46.000 %" (la teoría dice 45.000 %); no hay información pública de cómo terminó la disputa, así que no se dice si pagaron o no. El origen es un post del propio afectado en Reddit, recogido por la prensa |
| Truffle Security: 2.863 claves de Google activas que autentican contra Gemini | Citado por The Register (investigador Joe Leon) y por la investigación de Truffle Security (https://trufflesecurity.com/blog/google-api-keys-werent-secrets-but-then-gemini-changed-the-rules) | **Mantener** como contexto, si hace falta. Para la sesión es un matiz técnico (claves de Google que cambian de uso); en lenguaje directo: "una clave que antes era pública empezó a dar acceso a Gemini" |
| **Estudiante de Georgia, 55.444 $ en Gemini (jun–sep 2025)**, con la deuda perdonada | Solo 36Kr (https://eu.36kr.com/en/p/3486014581496960) y foros. El titular de 36Kr dice que Google perdonó la deuda, pero el cuerpo del artículo dice que la factura se mantuvo. Sin fuente primaria | **Sale.** La fuente es secundaria y se contradice en el dato del perdón |
| **AWS, 89.432 $ por minería de criptomonedas (2025)**, credenciales encontradas en 4 minutos | Solo un relato en primera persona en Medium, sin fecha ni empresa verificables | **Sale** (constitution 5.4). El dato de "minutos" ya lo cubre EleKtra-Leak con fuente primaria |
| **EleKtra-Leak (2023):** credenciales de AWS publicadas en GitHub usadas en menos de 5 minutos; 474 instancias minando Monero | Unit 42, Palo Alto Networks (https://unit42.paloaltonetworks.com/malicious-operations-of-exposed-iam-keys-cryptojacking/); The Register y The Hacker News, 30-oct-2023 | **Mantener**, como apoyo de la idea 3 ("hay programas automáticos que buscan claves publicadas"). **Ajuste:** las fuentes dan "menos de 5 minutos" (Unit 42) o "4 minutos" (The Hacker News); se dice "en menos de 5 minutos". Los 474 son mineros detectados entre el 30-ago y el 6-oct de 2023 |
| **Cyble (2026):** más de 5.000 repositorios de GitHub y unos 3.000 webs con claves de OpenAI en el código | Cyble, "When AI Secrets Go Public" (https://cyble.com/blog/when-ai-secrets-go-public-chatgpt/), feb-2026. Los demás medios repiten esa misma fuente | **Mantener con matiz:** es un único estudio, de una empresa de seguridad. Encaja con la idea 2 (claves en el código de la web). **Ajuste de fecha:** la teoría lo sitúa en 2025; el informe es de febrero de 2026 |

## F2 · Datos y permisos

Casos de `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Bloque Teorico/familia2_bbdd_permisos_alumnos.md`, §8.

| Caso (teoría de junio) | Fuente comprobada | Resultado |
|---|---|---|
| **CVE-2025-48757 (Lovable + Supabase)** | NVD (https://nvd.nist.gov/vuln/detail/CVE-2025-48757); Matt Palmer (https://mattpalmer.io/posts/2025/05/CVE-2025-48757/); Tenable, INCIBE | **Mantener, con correcciones.** Lo que sí está verificado: políticas RLS insuficientes en apps de Lovable hasta el 15-abr-2025, que permitían a cualquiera, sin iniciar sesión, leer o escribir tablas; CVSS 9,3 (crítica); publicado el **29-may-2025** por **Matt Palmer**, tras 45 días sin una corrección suficiente. **Correcciones a la teoría:** (1) el investigador es Matt Palmer, no "Matan Getz", y la fecha es el 29 de mayo, no el 4 de junio; (2) **Lovable disputa el CVE**: dice que cada cliente es responsable de proteger los datos de su app, y hay que mencionarlo; (3) "170 apps y 303 endpoints" procede del informe del investigador y de blogs que lo citan: se puede decir "más de 170 apps, según el investigador"; (4) no se ha verificado que Lovable cambiara su generación de código entre el 6 y el 10 de junio ni la herramienta "de un clic" de Supabase: **salen** salvo que se verifiquen |
| **Moltbook (enero de 2026):** Supabase sin RLS, unos 1,5 millones de tokens de API expuestos | Ya verificado en `021/verificacion.md`, línea 37 (Wiz, 2-feb-2026) | **Mantener** |
| Supabase MCP + Cursor, la "trifecta letal" (jul-2025) | No verificado en esta tarea | **No se usa:** exige explicar MCP y la clave de servicio, y queda lejos de los conceptos básicos de la sesión (spec R3 bis) |

## Resumen para la guía y la sesión
- **F1:** startup mexicana (caso principal), EleKtra-Leak (velocidad) y Cyble (claves en el código de webs). Salen el estudiante de Georgia y el caso de AWS en Medium.
- **F2:** CVE-2025-48757 con las correcciones (investigador, fecha y disputa de Lovable) y Moltbook.
- **Hallazgo:** la teoría de F2 de junio atribuye el CVE a otra persona y con otra fecha. Si se vuelve a usar ese fichero, hay que corregirlo (no se toca aquí: fuera de alcance de T05).

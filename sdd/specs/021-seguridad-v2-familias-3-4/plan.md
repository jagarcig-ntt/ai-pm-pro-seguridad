# PLAN · SPEC-021 · Rediseño de las familias 3 y 4

*Spec: [spec.md](spec.md) (aprobada el 11-nov) · Estado del plan: **aprobado** (Jaime, 11-nov) · [tareas](tasks.md)*

## 1. Enfoque
- **Se reescriben en su sitio** los ficheros de junio de `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Bloque Teorico/`. Lo impartido sigue en el tag `sesion-2026-06` (constitution 1.4).
- **Formato de la teoría de noviembre:** "Antes de entrar", 3 ideas, "cómo se ve en tu producto", caso real, factor agente IA y lo que el PM se lleva. Versión de alumnos y versión de formador con 🎓.
- **Se reutiliza el contenido de junio que sigue siendo bueno,** sobre todo los vectores de F3, las obligaciones del RGPD y los vectores de F4. Lo que se cambia es la selección (máximo 3 ideas) y el anclaje en su producto de Lovable y Supabase.
- **La práctica es lo nuevo:** cada alumno mira su producto y toma una decisión. Para la mitad no técnica, todo desde el navegador: el informe que le prepara Jaime y el *Security Advisor* de Supabase, que es gratuito y está en su panel.
- **Antes de escribir se verifican las cifras y los casos,** en una tabla con fuente y fecha. Lo que no se pueda verificar, sale.

**Descartado:**
- Dos ficheros separados para F3: se mantiene uno solo, con dos bloques (F3a y F3b), para que la estructura de familias siga siendo la de junio.
- Mantener las 6 obligaciones del RGPD: solo entran las que decide un PM (decisión del 11-nov).

## 2. Diseño

### 2.1 F3a · Dónde se escapan los datos (unos 35 min)
| | Contenido |
|---|---|
| **Antes de entrar** | Dato personal · minimización · *shadow AI* |
| **Idea 1** | **Datos donde nadie los busca:** registros (*logs*) y respuestas que devuelven más campos de los necesarios |
| **Idea 2** | **Datos reales fuera de producción.** En su producto la preview comparte la base de datos, así que se prueba sobre datos reales. Enlaza con el aviso de F2 del 21-nov |
| **Idea 3** | **Datos que acaban en una IA:** los que su app envía a un modelo y los que ellos pegan en el chat de Lovable o de otro asistente |
| **Caso** | Samsung y ChatGPT (2023), si se verifica, o un caso más reciente del entorno de Lovable y Supabase |
| **Práctica (unos 15 min)** | **El mapa de datos de tu producto:** qué datos personales guarda, quién puede leerlos, dónde más aparecen y si se envían a una IA. Elige **uno** para arreglar, pídeselo a Lovable y llévalo por PR |
| **Variantes** | Con el pipeline: agente de la familia 3. Sin instalar nada: el informe de Jaime y la tabla de Supabase. Si su producto no usa IA, la idea 3 se aplica a lo que pegan en el chat de Lovable |

### 2.2 F3b · Qué te exige la ley (unos 25 min)
| | Contenido |
|---|---|
| **Antes de entrar** | RGPD · brecha · autoridad de control |
| **Idea 1** | **Minimización:** solo los datos que necesitas para lo que dices. Es una decisión de producto |
| **Idea 2** | **Los datos son de tus usuarios:** pueden pedirte verlos, corregirlos o borrarlos, y necesitas poder hacerlo |
| **Idea 3** | **Si hay una brecha, el reloj corre: 72 horas** para notificarla. Se menciona la propuesta del Digital Omnibus solo si se verifica su estado actual |
| **Momento interactivo (unos 8 min)** | **Simulacro de brecha:** "Un usuario te avisa de que se ven los emails de otros. ¿Qué haces en la primera hora?". Respuestas en el chat y recorrido por las decisiones |
| **Cifras** | Multas y notificaciones del RGPD, solo con fuente vigente |

### 2.3 F4 · Configuración (unos 50 min)
| | Contenido |
|---|---|
| **Antes de entrar** | Endpoint · CORS · configuración por defecto |
| **Idea 1** | **Lo que expones sin saberlo:** funciones del servidor, *buckets* de Supabase Storage públicos, rutas de prueba olvidadas |
| **Idea 2** | **CORS con una analogía:** el portero que decide qué webs pueden hablar con tu servidor. Basta con saber qué preguntar |
| **Idea 3** | **El mimetismo del agente:** copia la configuración que encuentra y deja atajos con un "ya lo arreglaremos" |
| **Casos** | CBIZ (2024) y el bucket indio (2025), si se verifican. Spring Boot Actuator se sustituye por un caso del entorno de Lovable y Supabase, si hay uno documentado. BlueBleed (2022) solo si no hay nada más reciente |
| **Práctica (unos 15 min)** | **¿Qué expone tu producto?:** *Security Advisor* de Supabase, *buckets* públicos y lista de funciones o rutas del servidor. Decide qué cerrar primero y pídeselo a Lovable |
| **Al kit** | Las cabeceras HTTP, como punto de la checklist de configuración |

### 2.4 Verificación de cifras y casos
Tabla en `verificacion.md`: cifra o caso, dónde se usa, fuente, fecha de consulta y resultado (se mantiene, se actualiza o sale). Se revisan al menos:
- Samsung (2023), las multas y notificaciones del RGPD de 2025 e IBM *Cost of a Data Breach* 2025;
- la estadística de Tonic.ai (29 %) y el Digital Omnibus;
- CBIZ, el bucket indio, BlueBleed y Trend Micro;
- candidatos nuevos del entorno de Lovable y Supabase.

### 2.5 Kit
Se actualizan las secciones de datos y configuración de `Entregables/guia_seguridad_alumnos.md`, incluida la checklist de configuración con las cabeceras.

## 3. Ficheros
| Acción | Ruta | Nota |
|---|---|---|
| crear | `sdd/specs/021-seguridad-v2-familias-3-4/verificacion.md` | Tabla de cifras y casos |
| reescribir | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Bloque Teorico/familia3_datos_sensibles_alumnos.md` | F3a y F3b |
| reescribir | `…/Bloque Teorico/Formador/familia3_datos_sensibles_profundo.md` | Con notas 🎓 |
| reescribir | `…/Bloque Teorico/familia4_entornos_configuracion_alumnos.md` | F4 |
| reescribir | `…/Bloque Teorico/Formador/familia4_entornos_configuracion_profundo.md` | Con notas 🎓 |
| modificar | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Entregables/guia_seguridad_alumnos.md` | Secciones de F3 y F4 del kit |
| regenerar | Los PDF de formador de F3 y F4, si se siguen usando | Se generan del Markdown |
| reutilizar | Teoría de junio, teoría de noviembre (formato), `notas.md` de SPEC-019 (casos propios) | |
| probar sobre | `feedback-hub` (formulario público) y `notas-al-d-a` (login y RLS) | CA4 |

## 4. Riesgos y plan B
| Riesgo | Prob. | Mitigación / plan B |
|---|---|---|
| No se encuentran casos verificables del entorno de Lovable y Supabase | media | Se mantienen los casos de junio que se verifiquen. Los casos propios de noviembre sirven de ejemplo cercano |
| El estado del Digital Omnibus no está claro | media | Se cuenta solo el plazo vigente de 72 horas |
| Muchos productos no usan IA | media | La idea 3 de F3a se aplica a lo que pegan en el chat de Lovable |
| El *Security Advisor* de Supabase cambia de nombre o de sitio | baja | Se comprueba con `notas-al-d-a` antes de la sesión; plan B con el informe de Jaime |
| El pipeline no está listo a tiempo (SPEC-022) | media | Las prácticas funcionan con la variante sin instalar nada |
| La práctica no cabe en el tiempo | media | Se cronometra en el ensayo; se reduce a una sola decisión por familia |

## 5. Verificación
| Criterio | Cómo se verifica |
|---|---|
| CA1 | Índice de cada fichero: F3a, F3b y F4 con 3 ideas cada uno |
| CA2 | Tabla objetivo → práctica → verificación en la versión de formador |
| CA3 | `verificacion.md` completa: ninguna cifra ni caso sin fuente y fecha |
| CA4 | Las dos prácticas, ejecutadas sobre `notas-al-d-a` y `feedback-hub` en las dos variantes |
| CA5 | Lectura cruzada de las versiones de alumnos y de formador |
| CA6 | Jaime revisa F3 antes de empezar F4 |

## 6. Conformidad con la constitution
- ✅ **2.3 Máximo 3 ideas por bloque:** F3a, F3b y F4 tienen 3 cada uno. En junio eran 16 ideas en total; ahora son 9.
- ✅ **2.6 Práctica sobre lo suyo:** sobre su producto, con un producto de prueba como plan B.
- ✅ **3.2 Coste 0:** el *Security Advisor* de Supabase es gratuito. Los planes gratuitos de las herramientas del pipeline se verifican en SPEC-022.
- ✅ **3.3 Plan B:** variante sin instalar nada y productos de prueba.
- ✅ **5.4 Datos con fuente:** `verificacion.md`.
- **2.8 Timings:** los fija SPEC-023. Los minutos de este plan son el objetivo de la retro.

**Tensión:** F3 y F4 suman unos 110 minutos con práctica. Si F1 y F2 mantienen su duración de junio, la sesión de 4 horas queda justa. SPEC-023 tendrá que recortar F1 y F2, como apuntó la retro.

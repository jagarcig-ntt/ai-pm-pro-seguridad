# 📋 GUION DE SESIÓN - "Seguridad y Buenas Prácticas con IA"

**Duración**: 180 minutos (3 horas)  
**Audiencia**: 11 PMs Senior, poco técnicos  
**Fecha**: 26 de junio de 2026  

---

## 🎯 SETUP PRE-SESIÓN (1 hora antes)

```
1. Portal abierto en navegador (https://jagarcig-ntt.github.io/ai-pm-pro-seguridad/)
2. VSCode abierto con pipeline compilado (listo para demo)
3. Este guion abierto en otra pantalla/tablet
4. Terminal en VSCode con font size 28-32 (GRANDE)
5. Agua + voz lista
```

---

## ⏱️ TIMELINE (Por sección del Portal)

### MINUTO 0-5: INICIO (Portal: #hero)

**Portal**: El usuario ve Hero section con título y tú en cámara

**Tú dices** (máx 2 min):
> "Buenos días. Soy Jaime, llevo años como Tech Leader con IA en producto. Esta es la última sesión del curso, así que no os voy a dar teoría que podáis leer en cualquier sitio. Os voy a contar cosas que me han pasado a mí.
>
> Hoy: cómo construir rápido con Claude Code SIN que la seguridad te explote después.
> Dos entregables que usan mañana mismo en vuestros proyectos.
> Y una demo que va a dejar claro por qué esto importa."

**Gancho** (min 2-3):
> "¿Alguien sabe cuánto costó la factura de una startup que vimos hace poco? 82 mil dólares. ¿En 48 horas? Vamos con eso."

**Acción**: Haz scroll en el portal hacia abajo (no navegues todavía, déjalo en Hero)

---

### MINUTO 5-10: QUIÉN SOY (Portal: #quien)

**Portal**: Navega a sección "Quién"

**Tú dices** (máx 2 min, NO leas las tarjetas):
> "Llevo más de una década en banca y tecnología. He cometido los errores que hoy os enseño. Eso es lo que hace esto útil.
>
> HOY: Diseño de pipelines multi-agente para modernizar sistemas legacy en banca.
> 8 años en NTT DATA, creciendo de engineer a AI Lead.
> Economista de formación, hence: entiendo negocio Y tecnología.
> Y lo más importante: no soy un gurú. He construido con estas herramientas, he cometido errores, quiero ayudaros a evitarlos."

**Cierre**:
> "Pero no estáis aquí por mi CV. Estáis aquí por lo que os lleváis. Vamos a ello."

---

### MINUTO 10-20: ENTREGABLES (Portal: #paraque)

**Portal**: Navega a sección "Qué te llevas"

**Tú dices** (máx 3 min):
> "Os lleváis DOS cosas que podéis usar el lunes.
>
> ENTREGABLE 1: Una guía de seguridad. No son apuntes. Es un documento para tener abierto el día que despleguéis. Resumen de las 4 familias, checklist previo a despliegue, preguntas de auditoría. Sin jerga.
>
> ENTREGABLE 2: Un pipeline. Un sistema que audita vuestro código automáticamente y os dice dónde tenéis problemas. Lo construimos juntos en directo en el Bloque 2. Al terminar os lo lleváis funcionando."

**Acción**: Abre las dos tarjetas de entregables en el portal para mostrar detalles

---

### MINUTO 20-35: EL PORQUE (Portal: #impacto)

**Portal**: Navega a sección "Impacto"

**DATO 1: 82K$ (minuto 20-22)**

**Portal**: Muestra tarjeta "82K$"

**Tú dices** (narra, NO leas):
> "Startup mexicana. 3 desarrolladores. Su factura habitual de IA: 180 dólares al mes.
> El 11 de febrero alguien sube una clave de Gemini en un commit de madrugada.
> En 4 minutos, un bot automatizado la encuentra. En otros 4 minutos, empieza a consumir.
> El día 12: 82.314 dólares.
> Google aplicó 'Shared Responsibility Model'. Sin perdón, sin devolución."

**PAUSA de 3 segundos. Que cale.**

**DATO 2: 29 millones (minuto 22-24)**

**Portal**: Muestra tarjeta "29M"

**Tú dices**:
> "29 millones de secretos expuestos en GitHub el año pasado. 79.000 por día.
> El dato más preocupante: el 70% de secretos de 2022 TODAVÍA funcionaban en 2025.
> Y lo específico para ustedes: commits con Claude Code tienen el doble de tasa de fuga.
> No porque Claude sea malo. Porque cuando construyes más rápido, los checks manuales dejan de ser fiables."

**DATO 3: Mi historia (minuto 24-25)**

Abre tu personal note en la tarjeta "×2":
> "He subido el .env a GitHub varias veces. No una, varias.
> Siempre igual: tenía prisa, había probado que funcionaba, hice git add . sin pensar.
> No fue negligencia. Fue que a esa velocidad el check mental simplemente no ocurre."

**Pregunta al chat**: "¿Quién ha tenido alguna vez una clave en un repo, aunque fuera un momento?"

**PAUSA. Dejar que respondan.**

---

### MINUTO 35-50: QUIZ PREVIO (Portal: #dinamicas)

**Portal**: Navega a sección "Ponte a prueba"

**Tú dices** (1 min):
> "Antes de ver las familias, contestad en el chat: ¿Qué sabéis ya?
> Las preguntas están aquí en el portal. Podéis responder sin spoilers."

**Acción**: Espera respuestas del chat. No reveles las respuestas correctas todavía (las revelaremos al ver cada familia).

---

### MINUTO 50-105: FAMILIA 1 - CREDENCIALES (Portal: #familias → Familia 1)

**Portal**: Navega a sección "Las 4 familias", abre Familia 1

**TEÓRICA (min 50-75)**

**Tú dices** (5 min de contexto):
> "Familia 1 es rápida y espectacular. No hay investigación larga. Hay factura de 82K en 48 horas.
>
> El mecanismo: cuando haces git push, bots están escaneando TODO en tiempo real.
> Si encuentran patrones conocidos —AIzaSy para Google, sk- para OpenAI— en 4 minutos
> validan que la clave funciona. En otros 4 minutos empiezan a explotarla.
>
> Esto no es paranoia. Pasó 79.000 veces el año pasado."

**Narra los 3 casos del portal** (15 min total, máx 5 min por caso):
1. Startup mexicana (ya lo contaste en Impacto, refuerza)
2. Estudiante de Georgia (55K en septiembre, "imagina ganar 15$/día y deber 55mil")
3. AWS minería (3 días, 89K, 487 máquinas)

**PAUSA de 5 segundos después de cada caso. Que cale.**

---

**DEMO PIPELINE (min 75-90)**

**Transición**:
> "Vamos a ver cómo una herramienta detecta esto automáticamente.
> Tengo un proyecto con errores sembrados. Voy a auditar en tiempo real."

**Acción en VSCode**:
```bash
node dist/index.js --repo ../HeroCamp-Product/feedbackhub
```

Ejecuta. Tarda 0.15 segundos.

**Muestra el output en la terminal**:
```
❌ 10 hallazgos CRÍTICOS
⚠️  5 hallazgos ALTOS
🔶 2 hallazgos MEDIOS

**Recomendación**: ❌ NO DESPLEGAR HASTA RESOLVER
```

**PAUSA de 5 segundos. Que procesen: 10 CRÍTICOS.**

**Tú dices** (2 min):
> "En 0.15 segundos encontró 10 problemas CRÍTICOS.
> Miren el primero: Google API Key hardcodeada.
> Esta clave, aquí visible, puede costar dinero AHORA MISMO.
> Si alguien la ve, en 10 minutos habrá consumo."

---

### MINUTO 105-160: FAMILIA 2, 3, 4 (Portal: #familias)

**Mismo patrón para cada familia**:

1. **TEÓRICA** (15 min)
   - Contexto: "Familia X es [rápida/silenciosa/crítica]"
   - Contar el caso real (narra, NO leas)
   - PAUSA de 3-5 segundos
   
2. **DEMO** (8 min)
   - Mostrar sección del informe en VSCode
   - Leer los hallazgos principales
   - Explicar por qué importa
   
3. **CIERRE** (2 min)
   - 1-2 frases clave de lección
   - Transición a siguiente familia

#### FAMILIA 2: Base de Datos (min 105-145)
**Caso clave**: CVE-2025-48757, 170 apps, 13.000 usuarios
**Concepto**: RLS no se activa por defecto
**Demo**: Mostrar tablas sin RLS en el informe

#### FAMILIA 3: Datos Sensibles (min 145-175)
**Caso clave**: Samsung 2023, 3 incidentes en 20 días
**Concepto**: 72 horas para notificar brecha (RGPD)
**Demo**: Mostrar emails/IPs reales en test-data.json

#### FAMILIA 4: Configuración (min 175-190)
**Caso clave**: CBIZ 2024, 36.000 registros en 3 meses
**Concepto**: 99% de fallos cloud = responsabilidad del cliente
**Demo**: Mostrar CORS wildcard y endpoints sin auth

---

### MINUTO 190-195: CIERRE (Portal: #cierre)

**Portal**: Navega a sección "Cierre"

**Tú dices** (máx 3 min):

> "Resumen: el pipeline dice SAFE_TO_DEPLOY o DO_NOT_DEPLOY.
> Si dice DO_NOT_DEPLOY: hay riesgo inmediato de dinero, acceso, o ley.
>
> Lo que se llevan hoy:
> 1. Un pipeline que detecta estos 4 problemas en <1 segundo.
> 2. Una guía de seguridad que explica cada familia.
> 3. Permisos para usar esto en TODOS sus proyectos.
>
> Úsenlo. Antes de cada despliegue:
> `node audit-security --repo .`
>
> Si dice SAFE_TO_DEPLOY, duerman tranquilos.
> Si dice DO_NOT_DEPLOY, arreglen y vuelvan a ejecutar.
>
> Preguntas."

---

## 🎬 MOMENTOS CLAVE (Dónde pausar)

| Minuto | Momento | Pausa |
|--------|---------|-------|
| 5 | Cifra $82.314 | 3 seg |
| 24 | Mi historia .env | Dejar que pregunten |
| 35 | Quiz previo | Esperar respuestas |
| 90 | "10 CRÍTICOS" en output | 5 seg |
| 115 | Caso RLS (Familia 2) | 3 seg |
| 150 | "72 horas" (Familia 3) | 3 seg |
| 175 | "99%" (Familia 4) | 3 seg |

---

## 🔧 SI ALGO FALLA

| Problema | Solución |
|----------|----------|
| Pipeline no ejecuta | "Perfecto, así vemos errores típicos. Tengo un informe pregenerado" → muestra security-report.md |
| Portal no carga | Abre la versión local (portal_sesion.html en navegador) |
| Alguien pregunta fuera de tema | "Buena. La anotamos para después" |
| Se queda sin tiempo | Salta Familia 4 (es la menos crítica). Entrega el pipeline completo de todas formas |

---

## 💬 FRASES CLAVE

Memoriza estas 5. Son tus anclas:

1. **En Impacto**: "Esto no es paranoia. Pasó 79.000 veces el año pasado."
2. **En F1 Demo**: "En 4 minutos hay un bot esperando."
3. **En F2**: "No es un ataque sofisticado. Es que no pusieron una cerradura."
4. **En F3**: "72 horas. No para investigar. Para NOTIFICAR."
5. **En Cierre**: "Si dice 'NO DESPLEGAR', hay riesgo AHORA MISMO."

---

## 📋 ANTES DE EMPEZAR (Checklist)

- [ ] Portál abierto en navegador (pantalla compartida)
- [ ] Este guion abierto en otra pantalla (para ti)
- [ ] VSCode con pipeline compilado (`npm run build` sin errores)
- [ ] Terminal VSCode con font 28+ 
- [ ] Diapositivas mentales listas (eres tú, no hay PowerPoint)
- [ ] Botella de agua
- [ ] Micrófono funcionando
- [ ] Chat de Zoom visible

---

## 🎯 ENTREGA FINAL

Al terminar, comparte el link de `/security-pipeline`:

> "Os dejo el repositorio con todo. README.md para usar el pipeline. CLAUDE.md si queréis entender cómo funciona. Está listo. Úsadlo el lunes."

---

*Duración total: 195 minutos (máx)*  
*Última actualización: 18 de junio de 2026*  
*Sesión: AI PM Pro · The Hero Camp · 26 de junio de 2026*

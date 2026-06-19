# 🎯 CHEAT SHEET - Sesión 26 de junio

**Imprime esto. Ten lo visible durante la sesión.**

---

## ⏱️ TIMELINE (minutos)

```
0-5      Apertura + gancho
5-50     Familia 1: Credenciales
50-105   Familia 2: Base de Datos
105-145  Familia 3: Datos Sensibles
145-175  Familia 4: Configuración
175-180  Cierre
```

---

## 🚀 COMANDO PARA EJECUTAR DEMO

```bash
node /ruta/al/pipeline/dist/index.js --repo .
```

**En VSCode integrada terminal:**
- Font size: 28-32 (GRANDE)
- Tarda: 0.15 segundos
- Output: 17 hallazgos

---

## 📊 LOS 4 HALLAZGOS PRINCIPALES

### Familia 1: Credenciales
**Caso:** Startup mexicana, $82.314 en 48 horas  
**Fallo:** API key Gemini hardcodeada  
**Lección:** 4 minutos desde commit hasta explotación

### Familia 2: Base de Datos
**Caso:** CVE-2025-48757, 170 apps, 13.000 usuarios  
**Fallo:** Tablas sin RLS  
**Lección:** RLS no se activa por defecto  
**Extra:** Prompt Injection (OWASP LLM #1) — agentes que leen input de usuarios sin permisos mínimos

### Familia 3: Datos Sensibles
**Caso:** Samsung 2023, 3 incidentes en 20 días  
**Fallo:** Emails reales en test-data.json  
**Lección:** 72 horas para notificar una brecha

### Familia 4: Configuración
**Caso:** CBIZ 2024, 36.000 registros en 3 meses  
**Fallo:** Endpoint sin autenticación  
**Lección:** 99% de fallos cloud = responsabilidad del cliente

---

## 💯 CIFRAS CLAVE (memorizar)

- **29 millones** de secretos expuestos en GitHub en 2025
- **70%** de secretos de 2022 todavía funcionan en 2025
- **4 minutos** de media hasta explotación
- **170+ apps** afectadas por CVE-2025-48757
- **13.000 usuarios** con datos expuestos
- **3.000 activos** cloud mal configurados (empresa promedio)
- **99%** de fallos cloud culpa del cliente
- **72 horas** para notificar una brecha (RGPD)
- **20 millones** de euros multa máxima RGPD

---

## 🎬 MOMENTOS CLAVE (dónde pausar)

1. **Min 5:** Tras mencionar $82.314 → pausa de 3 segundos
2. **Min 12:** Tras mencionar $55.000 → pausa de 3 segundos
3. **Min 22:** Tras mostrar "10 CRÍTICOS" → deja que lo procesen (5 seg)
4. **Min 70:** Tras mencionar "4 minutos" → pausa (3 seg)
5. **Min 140:** Tras mencionar "72 horas" → pausa (3 seg)

---

## 🔧 SI ALGO FALLA

| Problema | Solución |
|----------|----------|
| Pipeline no ejecuta | "Perfecto, así vemos los errores típicos" + mostrar informe pregenerado |
| Terminal muy pequeña | Ctrl+Scroll up para aumentar font |
| Alguien hace pregunta OFF-TOPIC | "Buena. La anotamos para después" |
| Se olvida un comando | Tiene los comandos en GUION-SESION.md |

---

## 📋 ANTES DE EMPEZAR (1 HORA ANTES)

- [ ] VSCode abierto + feedbackhub visible
- [ ] `npm run build` ejecutado (sin errores)
- [ ] Terminal grande (font 28+)
- [ ] Diapositivas cargadas
- [ ] Este cheat sheet impreso y visible
- [ ] Agua

---

## 🎯 AL FINAL

Entregar carpeta `/security-pipeline/` con:
- `README.md` (cómo usar)
- `dist/` (compilado)
- Script de testing

---

## 💬 FRASES CLAVE

Úsalas cuando necesites conectar:

> "Esto no es paranoia. Pasó 79.000 veces el año pasado."

> "En 4 minutos hay un bot esperando."

> "No es un ataque sofisticado. Es que no pusieron una cerradura."

> "Si dice 'NO DESPLEGAR', hay riesgo AHORA MISMO."

> "72 horas. No para investigar. Para NOTIFICAR."

> "El agente no distingue entre instrucción y input de usuario. Todo es texto."

> "Si ya ocurrió: rota, evalúa, llama, documenta, no borres."

---

*Para referencia completa, abre: GUION-SESION.md*

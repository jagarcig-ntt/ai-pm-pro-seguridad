# PREGUNTAS DIFÍCILES · Seguridad v2 (10-dic)

*Para Jaime. SPEC-021 (redefinida el 25-nov). Léela antes de la sesión. Úsala en las preguntas del final (20:48) o cuando una pregunta se salga del guion.*

**Cómo leerla**
- **Respuesta:** lo que puedes decir, en frases cortas y sin metáforas.
- **Fuente:** de dónde sale el dato. Todo está en la guía, en la prueba en Lovable del 24-nov o en las verificaciones de casos.
- **Si la pregunta no está aquí y no sabes la respuesta:** «No lo sé. Lo miro y os lo paso por el canal del curso». No inventes cifras ni casos (constitution 5.4).

**Fuentes, con su ruta**

| Abreviatura | Fichero |
|---|---|
| Prueba 24-nov | `sdd/specs/026-seguridad-v2-replanteamiento/prueba-lovable.md` |
| Verif. F1-F2 | `sdd/specs/026-seguridad-v2-replanteamiento/verificacion-f1-f2.md` |
| Verif. F3-F4 | `sdd/specs/021-seguridad-v2-familias-3-4/verificacion.md` |
| Guía | `HeroCamp-Teoria/Entregables/guia_seguridad_alumnos.md` |

---

## Sobre Lovable y el escáner

### 1. «Si Lovable ya me protege, ¿para qué tengo que revisar nada?»
**Respuesta:** Porque Lovable protege una parte, no todo. En la prueba del 24 de noviembre hicimos tres cosas:
- **Clave en la web:** pedimos poner una clave secreta en el código de la web, y Lovable se negó.
- **Tabla abierta:** pedimos una tabla que cualquiera pudiera leer, y la creó. Avisó con un aviso crítico, pero la creó.
- **Datos de más:** pedimos un formulario con datos que no hacían falta, y lo hizo sin avisar. El escáner tampoco lo marcó.

Lovable hace lo que le pides. Decidir qué es seguro para tu producto te toca a ti.

**Fuente:** Prueba 24-nov, §2.1 y §2.2.

### 2. «¿El escáner de Lovable cuesta créditos?»
**Respuesta:** El botón *Fix all* aparece como gratuito (*Free*). Si *Run checks* gasta créditos no lo he comprobado. Mira tu saldo de créditos antes y después de lanzarlo.

**Fuente:** Prueba 24-nov, §2.2.

### 3. «¿Acepto el *Fix all*?»
**Respuesta:** Primero lee el aviso y entiende qué dice. Si no lo entiendes, lanza el prompt 2 para que Lovable te lo explique. Si lo aceptas, hazlo con un Pull Request (una propuesta de cambio que revisas antes de publicarla) y prueba la preview (la versión de prueba) antes del merge (unir el cambio a la versión publicada). Y no el día 11, salvo que sea grave.

**Fuente:** Guía, «Tres reglas para usar los prompts» y «Aviso para el Demo Day».

### 4. «¿Los prompts pueden cambiar mi código?»
**Respuesta:** Los tres empiezan diciendo «No cambies nada: solo revisa e informa». En la prueba del 24 de noviembre, Lovable no cambió nada con ninguno de los tres. Si en la respuesta propone arreglar algo, no lo aceptes todavía: primero lee el informe y decide.

**Fuente:** Prueba 24-nov, §2.3 (columna «¿Intentó cambiar algo?»). Guía, «Tres reglas».

### 5. «¿El prompt me dará siempre la misma respuesta?»
**Respuesta:** No exactamente: Lovable usa una IA, y la redacción cambia de una vez a otra. Lo que encuentra depende de cómo está tu proyecto, así que lo importante se repite. Si el prompt y el escáner no dicen lo mismo, manda el escáner: el 24 de noviembre, el prompt 2 dijo que no había incidencias mientras **Findings** marcaba un aviso crítico.

**Fuente:** Prueba 24-nov, §2.3 (prompt F2, «Ojo») y «Pendiente» (estabilidad no probada con 3 intentos).

---

## F1 · Claves y secretos

### 6. «La clave de mi base de datos está en la web. ¿Es un problema?»
**Respuesta:** No, si es la clave pública. Está pensada para estar en la web, y Lovable la pone ahí. Lo que protege tus datos no es esa clave, sino las reglas RLS de cada tabla. Eso es el segundo riesgo.

**Fuente:** Guía, F2 «Qué puede pasar». Prueba 24-nov, §2.3 (prompt F1: «Clasifica bien la clave pública»).

### 7. «Mi repositorio de GitHub es público. ¿Es un problema?»
**Respuesta:** No, mientras no tenga claves secretas. El fichero `.env` que sube Lovable solo lleva valores públicos: lo vimos el 21 de noviembre. El primer prompt de la guía lo comprueba. En la checklist recomendamos que el repositorio sea privado, salvo que hayas decidido que sea público.

**Fuente:** Guion, colchón (21-nov). Guía, checklist, «Configuración».

### 8. «Hace meses pegué una clave en un chat o en un documento. ¿Qué hago?»
**Respuesta:** Cámbiala hoy. Crea una nueva en el servicio, borra la antigua y guarda la nueva en *Secrets*. La antigua deja de funcionar, y quien la tenga ya no puede usarla. Si el servicio cobra por uso, mira el consumo de esos meses.

**Fuente:** Guía, F1 «Qué hacer» (punto 3) y «Si ya ocurrió» (paso 1).

### 9. «¿La startup mexicana tuvo que pagar los 82.314 dólares?»
**Respuesta:** No se sabe. No hay información pública de cómo terminó. Lo que sí se sabe es que Google respondió que proteger las claves es responsabilidad del cliente.

**Fuente:** Verif. F1-F2 («no hay información pública de cómo terminó la disputa»). The Register, 3-mar-2026.

### 10. «¿Cómo pongo un límite de gasto en OpenAI o en Gemini?»
**Respuesta:** Está en la parte de facturación de cada servicio, y cada uno lo hace de una forma distinta. Lo importante es comprobar qué hace el tuyo: algunos cortan el gasto al llegar a la cifra y otros solo te avisan y siguen cobrando. Como mínimo, activa el aviso.

**Fuente:** Guía, F1 «Qué hacer» (punto 2). Los pasos de cada servicio no se han comprobado: no des instrucciones de un servicio concreto.

---

## F2 · Datos y permisos

### 11. «Mi producto no tiene login. ¿Me afecta este riesgo?»
**Respuesta:** Si guarda datos, sí. Cualquiera puede leer las tablas que no tengan reglas RLS, con o sin login. Lanza el segundo prompt y mira **Findings**.

**Fuente:** Guía, F2 «Qué puede pasar».

### 12. «¿Cómo sé si mis tablas tienen RLS?»
**Respuesta:** De dos formas, sin tocar nada. Una: **More → Security → Findings** y *Run checks*. Dos: el segundo prompt, que te dice tabla por tabla si tiene RLS y quién puede leerla. En la prueba, las tablas que creó Lovable por su cuenta ya tenían RLS.

**Fuente:** Guía, F2 «Qué hacer». Prueba 24-nov, §2.1 (la tabla `notes` ya tenía RLS).

### 13. «¿Entonces Lovable tuvo la culpa del CVE?»
**Respuesta:** Hay dos posturas, y por eso las cuento las dos:
- **El investigador:** Matt Palmer publicó el 29 de mayo de 2025 que muchas apps de Lovable tenían reglas RLS insuficientes. Se registró como fallo crítico, con 9,3 sobre 10.
- **Lovable:** no está de acuerdo con esa clasificación. Dice que cada cliente es responsable de proteger los datos de su app.

Para vosotros, la conclusión es la misma: revisad los permisos de vuestras tablas.

**Fuente:** Verif. F1-F2 (NVD, Matt Palmer). **No digas** que lo descubrió «Matan Getz», ni que fue el 4 de junio, ni que «Lovable generaba siempre tablas sin RLS»: lo dice el documento de formador de F2 de junio y es incorrecto.

---

## F3 · Datos personales

### 14. «¿Tengo que tener política de privacidad para el Demo Day?»
**Respuesta:** Si recoges datos de usuarios reales, sí: la guía lo pide en la checklist. No hace falta que sea perfecta, pero tiene que existir y decir qué datos pides y para qué.

**Fuente:** Guía, F3 «Qué hacer» (punto 3) y checklist.

### 15. «Mi producto es pequeño o una demo. ¿Me afecta el RGPD?»
**Respuesta:** Desde tu primer usuario real, sí. Si en la demo usas datos de prueba y no tienes usuarios reales, no hay datos personales que proteger. Por eso en el Demo Day usamos datos de prueba.

**Fuente:** Guía, F3 «Palabras que vas a ver» (RGPD) y «Aviso para el Demo Day».

### 16. «¿Puedo pedir el DNI o la fecha de nacimiento?»
**Respuesta:** Solo si tu producto los necesita para funcionar. El RGPD te obliga a pedir solo los datos que necesitas. Pregúntate para qué usas cada dato: si no tienes respuesta, quítalo. En la prueba, el prompt 3 marcó el DNI como el primer dato que había que quitar en una app de notas.

**Fuente:** Guía, F3 «Qué puede pasar» y «Qué hacer». Prueba 24-nov, §2.3 (prompt F3). Es criterio de producto, no asesoría legal: si un caso concreto lo exige, que lo consulten con un abogado.

### 17. «Las 72 horas, ¿desde cuándo cuentan? ¿Tengo que saberlo todo para avisar?»
**Respuesta:** Desde que sabes que ha habido una brecha, no desde que pasó. Y no hace falta tener toda la información para avisar a la autoridad: en España, la AEPD. Lo primero es cambiar las claves y cerrar el acceso. Después, si hay datos personales, avisar ya a quien lleve los temas legales.

**Fuente:** Guía, «Si ya ocurrió» (pasos 1, 2 y 4). RGPD, artículo 33.

### 18. «He leído que el plazo va a pasar a 96 horas.»
**Respuesta:** Es una propuesta de la Comisión Europea, de noviembre de 2025, no una ley. Hoy el plazo sigue siendo de 72 horas.

**Fuente:** Verif. F3-F4 («Digital Omnibus: sigue siendo una propuesta, no ley»).

### 19. «En la respuesta del prompt 3 sale Google Fonts. ¿Qué es?»
**Respuesta:** Google Fonts es un servicio de Google que da los tipos de letra de la web. Cuando alguien abre tu web, su navegador pide la letra a Google, y Google recibe la dirección de internet de su conexión. Es un dato que sale de tu producto hacia otro servicio. Apúntalo para después del Demo Day; no es un arreglo para el día 11.

**Fuente:** Prueba 24-nov, §2.3 (prompt F3: «Google Fonts (envía la IP)»). Guion, chequeo de F3.

---

## Para curiosos y configuración

### 20. «¿Puedo usar el pipeline en mi producto?»
**Respuesta:** No lo necesitas. Para un producto de Lovable, con el escáner, los tres prompts y la checklist tienes lo necesario. El pipeline trabaja con el código fuera de Lovable, con VS Code y Claude Code, y es para quien un día trabaje así. Si es tu caso, escríbeme por el canal del curso.

**Fuente:** Guía, «Para curiosos». Guion, 20:43.

### 21. «El cuarto agente revisaba la configuración. ¿Eso no lo vemos?»
**Respuesta:** No como bloque, pero está en la checklist de la guía, en «Configuración», con cuatro puntos:
- los archivos de tus usuarios;
- las páginas de prueba;
- las cabeceras de seguridad, que son instrucciones que tu web envía al navegador para protegerse de algunos ataques;
- si el repositorio de GitHub es privado.

Para los tres primeros, preguntas a Lovable en el chat.

**Fuente:** Guía, checklist, «Configuración».

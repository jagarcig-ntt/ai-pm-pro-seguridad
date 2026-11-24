"""Comprueba que los minutos de un guion de sesión son coherentes.

Uso:  python scripts/check_timings.py [--sesion git-deploy|seguridad] [--parcial] [--palabras]

Sin --sesion comprueba el guion de Git/Deploy (21-nov). Con --sesion seguridad, el de
Seguridad v2 (10-dic, SPEC-023).

Qué comprueba:
- Cada bloque del guion (cabecera "## NOMBRE · HH:MM–HH:MM (N min)") dura lo que dicen sus horas.
- Los bloques van seguidos, empiezan a la hora de inicio de la sesión y, si el guion está
  completo, terminan a la hora de fin.
- Los segmentos de cada bloque (cabeceras "### HH:MM — Título (N min)") suman su duración y van seguidos.
- Cada bloque coincide en hora y minutos con la escaleta de referencia de la sesión y, si existe,
  con la cheat sheet.

Con --parcial no falla si el guion aún no llega a la hora de fin (mientras se escribe).
Con --palabras, además, estima cuánto dura el texto de cada segmento: cuenta las palabras de las
líneas de cita (">"), que es lo que dice el formador, y las divide entre 130 palabras por minuto.
Si la estimación supera los minutos del segmento, lo cuenta como problema (SPEC-023, R12 bis).
Sale con código 1 si encuentra algún problema.
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ESPECS = RAIZ / "sdd" / "specs"
PALABRAS_POR_MINUTO = 130

BLOQUE = re.compile(r"^## (.+?) · (\d{1,2}:\d{2})[–-](\d{1,2}:\d{2}) \((\d+) min\)\s*$")
SEGMENTO = re.compile(r"^### (\d{1,2}:\d{2}) — (.+?)\s*\((\d+(?:,\d+)?) min\)\s*$")
FILA = re.compile(r"^\| (\d{1,2}:\d{2}) \| (\d+) \|")
FILA_RELATIVA = re.compile(r"^\| (\d+) \| (\d+) \|")
PALABRA = re.compile(r"[\wÀ-ÿ'’-]+")


def minutos(hora: str) -> int:
    h, m = hora.split(":")
    return int(h) * 60 + int(m)


def hora(total: float) -> str:
    total = round(total)
    return f"{total // 60}:{total % 60:02d}"


def filas(texto: str) -> list[tuple[str, int]]:
    return [(m.group(1), int(m.group(2))) for m in map(FILA.match, texto.splitlines()) if m]


def escaleta_git_deploy() -> list[tuple[str, int]]:
    """Anexo A de SPEC-010, con horas reales."""
    spec = next(ESPECS.glob("010-*/spec.md"))
    return filas(spec.read_text(encoding="utf-8").split("## Anexo A", 1)[1])


def escaleta_seguridad() -> list[tuple[str, int]]:
    """Plan de SPEC-026, §2.1: minutos relativos, que se pasan a hora desde las 19:00."""
    plan = next(ESPECS.glob("026-*/plan.md")).read_text(encoding="utf-8")
    seccion = plan.split("### 2.1", 1)[1].split("\n### ", 1)[0]
    inicio = minutos(SESIONES["seguridad"]["inicio"])
    return [(hora(inicio + int(m.group(1))), int(m.group(2)))
            for m in map(FILA_RELATIVA.match, seccion.splitlines()) if m]


SESIONES = {
    "git-deploy": {
        "carpeta": RAIZ / "sesiones" / "2026-11-git-deploy" / "Teoria",
        "inicio": "10:00", "fin": "14:00",
        "escaleta": escaleta_git_deploy, "referencia": "SPEC-010",
    },
    "seguridad": {
        "carpeta": RAIZ / "sesiones" / "2026-12-seguridad-v2" / "HeroCamp-Teoria",
        "inicio": "19:00", "fin": "21:00",
        "escaleta": escaleta_seguridad, "referencia": "SPEC-026",
    },
}


def leer_guion(texto: str) -> list[dict]:
    """Bloques con sus segmentos y, por segmento, las palabras de las líneas de cita."""
    bloques, bloque, segmento = [], None, None
    for n, linea in enumerate(texto.splitlines(), 1):
        if m := BLOQUE.match(linea):
            bloque = {"nombre": m.group(1), "ini": m.group(2), "fin": m.group(3),
                      "min": int(m.group(4)), "linea": n, "seg": []}
            bloques.append(bloque)
            segmento = None
        elif (m := SEGMENTO.match(linea)) and bloque:
            segmento = {"ini": m.group(1), "titulo": m.group(2),
                        "min": float(m.group(3).replace(",", ".")), "linea": n, "palabras": 0}
            bloque["seg"].append(segmento)
        elif linea.startswith("## ") or linea.startswith("### "):
            segmento = None
        elif segmento and linea.lstrip().startswith(">"):
            segmento["palabras"] += len(PALABRA.findall(linea.lstrip()[1:]))
    return bloques


def main() -> int:
    args = sys.argv[1:]
    parcial, palabras = "--parcial" in args, "--palabras" in args
    nombre = args[args.index("--sesion") + 1] if "--sesion" in args else "git-deploy"
    if nombre not in SESIONES:
        print(f"Sesión desconocida: {nombre}. Disponibles: {', '.join(SESIONES)}")
        return 1
    sesion = SESIONES[nombre]
    guion_md, cheat_md = sesion["carpeta"] / "GUION-SESION.md", sesion["carpeta"] / "CHEAT-SHEET.md"
    inicio, fin, ref = sesion["inicio"], sesion["fin"], sesion["referencia"]
    errores: list[str] = []

    escaleta = sesion["escaleta"]()
    bloques = leer_guion(guion_md.read_text(encoding="utf-8"))
    if not bloques:
        print(f"No se ha encontrado ningún bloque en el guion ({guion_md.relative_to(RAIZ)}).")
        return 1

    esperado = inicio
    for b in bloques:
        donde = f"línea {b['linea']} ({b['nombre']})"
        if b["ini"] != esperado:
            errores.append(f"{donde}: empieza a las {b['ini']} y debería empezar a las {esperado}")
        if minutos(b["fin"]) - minutos(b["ini"]) != b["min"]:
            errores.append(f"{donde}: {b['ini']}–{b['fin']} no son {b['min']} min")
        if b["seg"]:
            t = minutos(b["ini"])
            for s in b["seg"]:
                if minutos(s["ini"]) != round(t):
                    errores.append(f"línea {s['linea']}: el segmento empieza a las {s['ini']} y debería a las {hora(t)}")
                t += s["min"]
            suma = sum(s["min"] for s in b["seg"])
            if abs(suma - b["min"]) > 0.01:
                errores.append(f"{donde}: los segmentos suman {suma:g} min y el bloque dura {b['min']}")
        esperado = b["fin"]

    total = sum(b["min"] for b in bloques)
    completo = esperado == fin
    if not completo and not parcial:
        errores.append(f"El guion termina a las {esperado}; debería llegar a las {fin}")

    guion = [(b["ini"], b["min"]) for b in bloques]
    if guion != escaleta[: len(guion)]:
        for g, e in zip(guion, escaleta):
            if g != e:
                errores.append(f"Bloque de las {g[0]} ({g[1]} min) no coincide con {ref}: {e[0]} ({e[1]} min)")
                break
    if completo and len(guion) != len(escaleta):
        errores.append(f"El guion tiene {len(guion)} bloques y {ref} tiene {len(escaleta)}")

    if cheat_md.exists():
        cheat = filas(cheat_md.read_text(encoding="utf-8"))
        if cheat and cheat != escaleta:
            errores.append(f"La cheat sheet no coincide con la escaleta de {ref}")

    estado = "completo" if completo else f"parcial, hasta las {esperado}"
    print(f"Guion: {len(bloques)} bloques, {total} min ({estado}). {ref}: {len(escaleta)} bloques, "
          f"{sum(m for _, m in escaleta)} min.")

    if palabras:
        print(f"\nDuración estimada del texto ({PALABRAS_POR_MINUTO} palabras por minuto):")
        for b in bloques:
            texto_bloque = sum(s["palabras"] for s in b["seg"])
            print(f"  {b['ini']} {b['nombre']}: {texto_bloque} palabras ≈ "
                  f"{texto_bloque / PALABRAS_POR_MINUTO:.1f} de {b['min']} min")
            for s in b["seg"]:
                estimado = s["palabras"] / PALABRAS_POR_MINUTO
                marca = "✗" if estimado > s["min"] + 0.01 else " "
                print(f"   {marca} {s['ini']} {s['titulo']}: {s['palabras']} palabras ≈ {estimado:.1f} de {s['min']:g} min")
                if marca == "✗":
                    errores.append(f"línea {s['linea']}: el texto ({estimado:.1f} min) no cabe en {s['min']:g} min")
        print()

    for e in errores:
        print(f"  ✗ {e}")
    if not errores:
        print("  ✓ Todo coincide.")
    return 1 if errores else 0


if __name__ == "__main__":
    sys.exit(main())

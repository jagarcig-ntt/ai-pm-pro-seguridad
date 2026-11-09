"""Comprueba que los minutos del guion de Git/Deploy son coherentes.

Uso:  python scripts/check_timings.py [--parcial]

Qué comprueba:
- Cada bloque del guion (cabecera "## NOMBRE · HH:MM–HH:MM (N min)") dura lo que dicen sus horas.
- Los bloques van seguidos, empiezan a las 10:00 y, si el guion está completo, terminan a las 14:00 (240 min).
- Los segmentos de cada bloque (cabeceras "### HH:MM — Título (N min)") suman su duración y van seguidos.
- Cada bloque coincide en hora y minutos con el anexo A de SPEC-010 y, si existe, con la cheat sheet.

Con --parcial no falla si el guion aún no llega a las 14:00 (mientras se escribe).
Sale con código 1 si encuentra algún problema.
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
GUION = RAIZ / "sesiones" / "2026-11-git-deploy" / "Teoria" / "GUION-SESION.md"
CHEAT = RAIZ / "sesiones" / "2026-11-git-deploy" / "Teoria" / "CHEAT-SHEET.md"
ESCALETA = next((RAIZ / "sdd" / "specs").glob("010-*/spec.md"))

BLOQUE = re.compile(r"^## (.+?) · (\d{1,2}:\d{2})[–-](\d{1,2}:\d{2}) \((\d+) min\)\s*$")
SEGMENTO = re.compile(r"^### (\d{1,2}:\d{2}) — .+\((\d+(?:,\d+)?) min\)\s*$")
FILA = re.compile(r"^\| (\d{1,2}:\d{2}) \| (\d+) \|")
INICIO, FIN = "10:00", "14:00"


def minutos(hora: str) -> int:
    h, m = hora.split(":")
    return int(h) * 60 + int(m)


def hora(total: float) -> str:
    total = round(total)
    return f"{total // 60}:{total % 60:02d}"


def filas(texto: str) -> list[tuple[str, int]]:
    return [(m.group(1), int(m.group(2))) for m in map(FILA.match, texto.splitlines()) if m]


def main() -> int:
    parcial = "--parcial" in sys.argv
    errores: list[str] = []

    anexo = ESCALETA.read_text(encoding="utf-8").split("## Anexo A", 1)[1]
    escaleta = filas(anexo)

    bloques, actual = [], None
    for n, linea in enumerate(GUION.read_text(encoding="utf-8").splitlines(), 1):
        if m := BLOQUE.match(linea):
            actual = {"nombre": m.group(1), "ini": m.group(2), "fin": m.group(3),
                      "min": int(m.group(4)), "linea": n, "seg": []}
            bloques.append(actual)
        elif (m := SEGMENTO.match(linea)) and actual:
            actual["seg"].append((m.group(1), float(m.group(2).replace(",", ".")), n))

    if not bloques:
        print("No se ha encontrado ningún bloque en el guion.")
        return 1

    esperado = INICIO
    for b in bloques:
        donde = f"línea {b['linea']} ({b['nombre']})"
        if b["ini"] != esperado:
            errores.append(f"{donde}: empieza a las {b['ini']} y debería empezar a las {esperado}")
        if minutos(b["fin"]) - minutos(b["ini"]) != b["min"]:
            errores.append(f"{donde}: {b['ini']}–{b['fin']} no son {b['min']} min")
        if b["seg"]:
            t = minutos(b["ini"])
            for h, m, n in b["seg"]:
                if minutos(h) != round(t):
                    errores.append(f"línea {n}: el segmento empieza a las {h} y debería a las {hora(t)}")
                t += m
            suma = sum(m for _, m, _ in b["seg"])
            if abs(suma - b["min"]) > 0.01:
                errores.append(f"{donde}: los segmentos suman {suma:g} min y el bloque dura {b['min']}")
        esperado = b["fin"]

    total = sum(b["min"] for b in bloques)
    completo = esperado == FIN
    if not completo and not parcial:
        errores.append(f"El guion termina a las {esperado}; debería llegar a las {FIN}")

    guion = [(b["ini"], b["min"]) for b in bloques]
    if guion != escaleta[: len(guion)]:
        for g, e in zip(guion, escaleta):
            if g != e:
                errores.append(f"Bloque de las {g[0]} ({g[1]} min) no coincide con SPEC-010: {e[0]} ({e[1]} min)")
                break
    if completo and len(guion) != len(escaleta):
        errores.append(f"El guion tiene {len(guion)} bloques y SPEC-010 tiene {len(escaleta)}")

    if CHEAT.exists():
        cheat = filas(CHEAT.read_text(encoding="utf-8"))
        if cheat and cheat != escaleta:
            errores.append("La cheat sheet no coincide con la escaleta de SPEC-010")

    estado = "completo" if completo else f"parcial, hasta las {esperado}"
    print(f"Guion: {len(bloques)} bloques, {total} min ({estado}). SPEC-010: {len(escaleta)} bloques, "
          f"{sum(m for _, m in escaleta)} min.")
    for e in errores:
        print(f"  ✗ {e}")
    if not errores:
        print("  ✓ Todo coincide.")
    return 1 if errores else 0


if __name__ == "__main__":
    sys.exit(main())

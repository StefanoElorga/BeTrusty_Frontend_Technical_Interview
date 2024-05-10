/*
  Dado un array de números enteros positivos, donde cada uno
  representa unidades de bloques apilados, debemos calcular cuantas unidades
  de agua quedarán atrapadas entre ellos.

  - Ejemplo: Dado el array [4, 0, 3, 6, 1, 3].

  💧💧💧🪣💧💧
  💧💧💧🪣💧💧
  🪣💧💧🪣💧💧
  🪣💧🪣🪣💧🪣
  🪣💧🪣🪣💧🪣
  🪣💧🪣🪣🪣🪣

  Representando bloque con 🪣︎ y agua con 💧, quedarán atrapadas 7 unidades
  de agua. Suponemos que existe un suelo impermeable en la parte inferior
  que retiene el agua.
 */

const waterBlocks = (value) => {
  let total = 0;

  const maxLeft = [];
  let maxSeen = 0;

  for (let i = 0; i < value.length; i++) {
    maxLeft[i] = maxSeen;
    maxSeen = Math.max(maxSeen, value[i]);
  }

  let maxRight = 0;
  for (let i = value.length - 1; i >= 0; i--) {
    const minHeight = Math.min(maxLeft[i], maxRight);
    if (minHeight > value[i]) {
      total += minHeight - value[i];
    }

    maxRight = Math.max(maxRight, value[i]);
  }

  return total;
};

console.log(waterBlocks([4, 0, 3, 6, 1, 3]));

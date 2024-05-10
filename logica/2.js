/*
  Los primeros dispositivos móviles tenían un teclado llamado T9
  con el que se podía escribir texto utilizando únicamente su
  teclado numérico (del 0 al 9).

  Crea una función que transforme las pulsaciones del T9 a su representación con letras.
    - Debes buscar cuál era su correspondencia original
    - Cada bloque de pulsaciones va separado por un guión.
    - Si un bloque tiene más de un número, debe ser siempre el mismo.
    - Ejemplo:
      Entrada: 6-666-88-777-33-3-33-888
      Salida: MOUREDEV
 */

const t9Keyboard = (value) => {
  const keyboard = {
    a: "2",
    b: "22",
    c: "222",
    d: "3",
    e: "33",
    f: "333",
    g: "4",
    h: "44",
    i: "444",
    j: "5",
    k: "55",
    l: "555",
    m: "6",
    n: "66",
    o: "666",
    p: "7",
    q: "77",
    r: "777",
    s: "7777",
    t: "8",
    u: "88",
    v: "888",
    w: "9",
    x: "99",
    y: "999",
    z: "9999",
  };

  const splitCode = value.split("-");
  console.log(splitCode);

  const mappedArrayCode = splitCode.map((code) => code);
  return;
};

console.log(t9Keyboard("6-666-88-777-33-3-33-888"));

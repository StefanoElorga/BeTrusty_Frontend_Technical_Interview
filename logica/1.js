// Debes escribir un programa que encuentre la frecuencia con que aparecen los distintos caracteres (letras y números) dentro de una cadena de texto. El resultado se devuelve una matriz de objetos. Cada uno de estos objetos tiene 2 campos: carácter (caracter) y número de veces que aparece (veces). La matriz estará ordenada por el campo carácter. No se diferencia entre mayúsculas y minúsculas ni entre vocales acentuadas.

// Ejemplo:

// contarCar("Hoy ya es día 10")

// deberá devolver:

// {car: '0', veces: 1}
// {car: '1', veces: 1}
// {car: 'a', veces: 2}
// {car: 'd', veces: 1}
// {car: 'e', veces: 1}
// {car: 'h', veces: 1}
// {car: 'i', veces: 1}
// {car: 'o', veces: 1}
// {car: 's', veces: 1}
// {car: 'y', veces: 2}

const contarCar = (value) => {
  //Quitamos espacios y convertimos a minusculas
  const stringWithoutSpaces = value.replace(/\s/g, "").toLowerCase();

  //sacamos el acento a las letras que lo llevan
  const charWithoutAccent = stringWithoutSpaces
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  //separamos en un array cada caracter y los ordenamos alfabeticamente.
  const orderChar = charWithoutAccent.split("").sort();

  //creamos un objeto
  const object = {};

  //usando forEach iteramos el array ordenado, y le damos condiciones. (si ya existe el char en nuestro objeto solo sumamos, si no existe lo agregamos)
  orderChar.forEach((char) => {
    if (object[char]) {
      object[char]++;
    } else {
      object[char] = 1;
    }
  });

  //creamos un array que será nuestro resultado final.
  const ourResult = [];

  //usando for iteramos el objeto.
  for (const char in object) {
    ourResult.push({ car: char, veces: object[char] });
  }

  console.log(ourResult);

  return ourResult;
};

contarCar("Hoy ya es día 10");

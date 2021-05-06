/* eslint-disable no-param-reassign */
function asignarPosicionEnY(segmentoActual) {
  const distanciaEntreNodosY = 1 / (2 ** (segmentoActual[0].nivelActual - 1) + 1);
  for (let i = 0; i < segmentoActual.length; i++) {
    const nodo = segmentoActual[i];
    nodo.y = (i + 1) * distanciaEntreNodosY;
  }
}

function asignarPosicionEnX(segmentos, arbol) {
  const cantidadDeSegmentos = segmentos.length;
  const tamañoSegmento = 1 / (cantidadDeSegmentos - 1);
  const nodosARecorrer = [arbol];
  let nodoActual = nodosARecorrer.shift();
  while (nodoActual) {
    if (nodoActual.S) nodosARecorrer.push(nodoActual.S);
    if (nodoActual.N) nodosARecorrer.push(nodoActual.N);
    nodoActual.x = tamañoSegmento / 2 + (nodoActual.nivelActual - 1) * tamañoSegmento;
    nodoActual = nodosARecorrer.shift();
  }
}

// Crea el arbol, añade la propiedad nivelActual a cada condicion
export function crearArbol(arbol) {
  let nivelActual = 1;
  const condicionesAVisitar = [arbol];
  const condiciones = [];
  const acciones = [];
  const segmentos = [];
  let segmentoActual = [];
  let nodoActual = condicionesAVisitar.shift();
  arbol.nivelActual = nivelActual;
  while (nodoActual) {
    if (nodoActual.nivelActual !== nivelActual) {
      nivelActual++;
      asignarPosicionEnY(segmentoActual);
      segmentoActual = [];
      // cambio de segmento
    }
    segmentoActual.push(nodoActual);
    // Visitar nodos si son de tipo condicion
    if (segmentos[nivelActual]) segmentos[nivelActual]++;
    else segmentos[nivelActual] = 1;

    if (nodoActual.S) {
      condicionesAVisitar.push(nodoActual.S);
      nodoActual.S.nivelActual = nivelActual + 1;
    }
    if (nodoActual.N) {
      condicionesAVisitar.push(nodoActual.N);
      nodoActual.N.nivelActual = nivelActual + 1;
    }
    if (nodoActual.tipo === 'condicion') {
      condiciones.push(nodoActual);
      nodoActual.alias = `C${condiciones.length}`;
    } else {
      acciones.push(nodoActual);
      nodoActual.alias = `A${acciones.length}`;
    }
    nodoActual = condicionesAVisitar.shift();
  }
  asignarPosicionEnY(segmentoActual);
  asignarPosicionEnX(segmentos, arbol);
  arbol.condiciones = condiciones;
  arbol.acciones = acciones.sort((a, b) => a.alias.localeCompare(b.alias));
  return arbol;
}

export function obtenerRespuesta(arbol) {
  const respuestas = [];
  let nodoActual = arbol;
  while (nodoActual.tipo === 'condicion') {
    respuestas.push(nodoActual);
    if (nodoActual.esVerdadero) nodoActual = nodoActual.S;
    else nodoActual = nodoActual.N;
  }
  respuestas.push(nodoActual);
  return respuestas;
}

export function iterar(arbol) {
  const { condiciones, acciones } = arbol;
  const filas = { condiciones: {}, acciones: {} };
  let ciclo = condiciones.map((_e, i) => 2 ** i);
  ciclo = ciclo.reverse();
  const cantidadDeCondiciones = condiciones.length;
  const longitud = 2 ** cantidadDeCondiciones;
  acciones.forEach((accion) => {
    filas.acciones[accion.alias] = [accion.desc];
  });
  condiciones.forEach((condicion) => {
    filas.condiciones[condicion.alias] = [condicion.desc];
  });
  for (let i = 0; i < longitud; i++) {
    ciclo.forEach((e, index) => {
      const condicion = condiciones[index];
      if (i === 0) condicion.esVerdadero = false;
      if (i % e === 0) condicion.esVerdadero = !condicion.esVerdadero;
      const respuesta = obtenerRespuesta(arbol);
      if (respuesta.includes(condicion)) {
        filas.condiciones[condicion.alias].push(condicion.esVerdadero ? 'S' : 'N');
      } else {
        filas.condiciones[condicion.alias].push('*');
      }
    });
    const respuesta = obtenerRespuesta(arbol);
    const numeroDeSaltos = 2 ** (cantidadDeCondiciones - (respuesta.length - 1)) - 1;
    i += numeroDeSaltos;
    const accion = respuesta.pop();
    Object.entries(filas.acciones).forEach(([key]) => {
      if (key === accion.alias) {
        filas.acciones[key].push('X');
      } else {
        filas.acciones[key].push(' ');
      }
    });
  }
  return filas;
}

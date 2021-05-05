const arbol = {
  alias: 'C1',
  nombre: 'Paga con cheque al día y no es cliente habitual',
  tipo: 'condicion',
  S: {
    alias: 'C2',
    tipo: 'condicion',
    nombre: 'Es cliente habitual',
    S: {
      alias: 'C3',
      tipo: 'condicion',
      nombre: 'Paga con cheque al día y no paga con cheque a 30 días',
      S: {
        alias: 'A3',
        tipo: 'accion',
        accion: '14,7% de descuento',
      },
      N: {
        alias: 'A4',
        tipo: 'accion',
        accion: '6,5% de descuento',
      },
    },
    N: {
      alias: 'A2',
      tipo: 'accion',
      accion: '0% de descuento',
    },
  },
  N: {
    alias: 'A1',
    tipo: 'accion',
    accion: '5,2% de descuento',
  },
};
// Crea el arbol, añade la propiedad nivelActual a cada condicion
export function crearArbol() {
  let nivelActual = 1;
  const condicionesAVisitar = [arbol];
  const condiciones = [];
  const acciones = [];
  const segmentos = [];
  let segmentoActual = [];
  let nodoActual;
  arbol.nivelActual = nivelActual;
  while (nodoActual = condicionesAVisitar.shift()) {
    if (nodoActual.nivelActual !== nivelActual) {
      nivelActual++;
      asignarPosicionEnY(segmentoActual);
      segmentoActual = [];
      // cambio de segmento
    }
    segmentoActual.push(nodoActual);
    // Visitar nodos si son de tipo condicion
    segmentos[nivelActual] ? segmentos[nivelActual] += 1 : segmentos[nivelActual] = 1;
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
      nodoActual.alias = 'C' + condiciones.length
    } else {
      acciones.push(nodoActual);
      nodoActual.alias = 'A' + acciones.length
    }
  }
  asignarPosicionEnY(segmentoActual);
  asignarPosicionEnX(segmentos, arbol);
  arbol.condiciones = condiciones;
  arbol.acciones = acciones.sort((a, b) => a.alias.localeCompare(b.alias));
  return arbol;
}
function asignarPosicionEnY(segmentoActual) {
  const distanciaEntreNodosY = 1 / (Math.pow(2, segmentoActual[0].nivelActual - 1) + 1);
  for (let i = 0; i < segmentoActual.length; i++) {
    const nodo = segmentoActual[i];
    nodo.y = (i + 1) * distanciaEntreNodosY;
  }
}

function asignarPosicionEnX(segmentos, arbol) {
  const cantidadDeSegmentos = segmentos.length;
  const tamañoSegmento = 1 / (cantidadDeSegmentos - 1);
  const nodosARecorrer = [arbol];
  let nodoActual;
  while (nodoActual = nodosARecorrer.shift()) {
    if (nodoActual.S) nodosARecorrer.push(nodoActual.S);
    if (nodoActual.N) nodosARecorrer.push(nodoActual.N);
    nodoActual.x = tamañoSegmento / 2 + (nodoActual.nivelActual - 1) * tamañoSegmento;
  }
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

export function iterar() {
  const { condiciones, acciones } = arbol;
  const filas = { condiciones: {}, acciones: {} };
  let count = 0
  let ciclo = condiciones.map((_e, i) => 2 ** i);
  ciclo = ciclo.reverse();
  const longitud = 2 ** condiciones.length;
  acciones.forEach((accion) => {
    filas.acciones[accion.alias] = [accion.accion];
  });
  condiciones.forEach((condicion) => {
    filas.condiciones[condicion.alias] = [condicion.nombre];
  });
  for (let i = 0; i < longitud; i++) {
    count = 0
    ciclo.forEach((e, index) => {
      const condicion = condiciones[index];
      if (i === 0) condicion.esVerdadero = false;
      if (i % e === 0) condicion.esVerdadero = !condicion.esVerdadero;

      const respuesta = obtenerRespuesta(arbol)
      if (respuesta.includes(condicion)){
        filas.condiciones[condicion.alias].push(condicion.esVerdadero ? 'S' : 'N');
      } else {
        filas.condiciones[condicion.alias].push('*');
        count++
      }
    });
    i+= 2 ** count - 1
    const respuesta = obtenerRespuesta(arbol).pop();
    Object.entries(filas.acciones).forEach(([key]) => {
      if (key === respuesta.alias) {
        filas.acciones[key].push('X');
      } else {
        filas.acciones[key].push(' ');
      }
    });
  }
  return filas;
}

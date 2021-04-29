const arbol = {
  alias: 'C1',
  nombre: 'Cancela dentro de los 15 días y es ≥ 50.000',
  tipo: 'condicion',
  esVerdadero: true,
  S: {
    alias: 'C2',
    tipo: 'condicion',
    nombre: 'Es < a 100.000',
    esVerdadero: true,
    S: {
      alias: 'A1',
      tipo: 'accion',
      accion: '2% de descuento',
    },
    N: {
      alias: 'A2',
      tipo: 'accion',
      accion: '5% de descuento',
    },
  },
  N: {
    alias: 'A3',
    tipo: 'accion',
    accion: 'No hay descuento',
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
    } else{
      acciones.push(nodoActual)
    }
  }
  asignarPosicionEnY(segmentoActual);
  asignarPosicionEnX(segmentos, arbol);
  arbol.condiciones = condiciones;
  arbol.acciones = acciones.sort((a,b) => a.alias.localeCompare(b.alias))
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

export function iterar(){
  const {condiciones, acciones} = arbol
  const filas = {condiciones:{},acciones:{}}
  const ciclo = condiciones.map((_e,i)=>2**i)
  let longitud = 2 ** condiciones.length
  for(const accion of acciones){
    filas.acciones[accion.alias] = []
  }
  for(const condicion of condiciones){
    filas.condiciones[condicion.alias] = []
  }
  for(let i = 0; i < longitud; i++){
    ciclo.forEach((e, index)=>{
      const condicion = condiciones[index]
      if(i%e === 0) {
        condicion.esVerdadero = !condicion.esVerdadero
      }
      filas.condiciones[condicion.alias].push(condicion.esVerdadero? 'S' : 'N')
    })
    let respuesta = obtenerRespuesta(arbol).pop()
    Object.entries(filas.acciones).forEach(([key, value])=>{
      if(key === respuesta.alias){
        filas.acciones[key].push('x')
      }else{
        filas.acciones[key].push(' ')
      }
    })
  }
  return filas
}
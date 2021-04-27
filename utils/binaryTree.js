const arbol = {

    nombre: 'Cancela dentro de los 15 días y es ≥ 50.000',
    tipo: 'condicion',
    esVerdadero: true,
    S: {
      tipo: 'condicion',
      nombre: 'Es < a 100.000',
      esVerdadero: true,
      S: {
        accionNombre: 'a1',
        tipo:'accion',
        accion: '2% de descuento'
      },
      N: {
        accionNombre: 'a2',
        tipo:'accion',
        accion: '5% de descuento'
      },
    },
    N: {
      accionNombre: 'a3',
      tipo:'accion',
      accion: 'No hay descuento'
    },
  }
  //Crea el arbol, añade la propiedad nivelActual a cada condicion
export function crearArbol(){
    let nivelActual = 1
    const condicionesAVisitar = [arbol]
    const condiciones = []
    const segmentos = []
    let segmentoActual = []
    let nodoActual;
    arbol.nivelActual = nivelActual
    while(nodoActual = condicionesAVisitar.shift()){
      if(nodoActual.nivelActual !== nivelActual){
        nivelActual++
        asignarPosicionEnY(segmentoActual)
        segmentoActual = []
        //cambio de segmento
      }
      segmentoActual.push(nodoActual)
      //Visitar nodos si son de tipo condicion
      segmentos[nivelActual] ? segmentos[nivelActual] += 1 : segmentos[nivelActual] = 1
      if(nodoActual.S){
        condicionesAVisitar.push(nodoActual.S)
        nodoActual.S.nivelActual = nivelActual + 1
      }
      if(nodoActual.N){
        condicionesAVisitar.push(nodoActual.N)
        nodoActual.N.nivelActual = nivelActual + 1
      }
      if(nodoActual.tipo === "condicion"){
        condiciones.push(nodoActual)
      }
    }
    asignarPosicionEnY(segmentoActual)
    asignarPosicionEnX(segmentos, arbol)
    return arbol
  }
  function asignarPosicionEnY(segmentoActual){
      
      const distanciaEntreNodosY = 1 / (Math.pow(2, segmentoActual[0].nivelActual - 1)+1)
      for(let i = 0;i < segmentoActual.length;i++){
        const nodo = segmentoActual[i]
        nodo.y = (i+1)*distanciaEntreNodosY
      }
  }
  
  function asignarPosicionEnX(segmentos, arbol){
    const cantidadDeSegmentos = segmentos.length
    const tamañoSegmento = 1 / (cantidadDeSegmentos-1)
    const nodosARecorrer = [arbol]
    let nodoActual;
    while(nodoActual = nodosARecorrer.shift()){
      if(nodoActual.S) nodosARecorrer.push(nodoActual.S)
      if(nodoActual.N) nodosARecorrer.push(nodoActual.N)
      nodoActual.x =  tamañoSegmento / 2 + (nodoActual.nivelActual-1) * tamañoSegmento
    }
  }

export function obtenerRespuesta(arbol){
    const respuestas = []
    let nodoActual = arbol
    while(nodoActual.tipo === "condicion"){
      respuestas.push(nodoActual)
      if(nodoActual.esVerdadero) nodoActual = nodoActual.S
      else nodoActual = nodoActual.N
      
    }
    respuestas.push(nodoActual)
    return respuestas
  }
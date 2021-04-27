import { useEffect, useState } from 'react'
import {useAppContext} from '../components/Context'
import Checkbox from './Checkbox'
export default function Arbol(){
  const { globalState } = useAppContext()
  const arbol = globalState.arbol
  const [arbolRender] = useState(()=>renderizarArbol(arbol))
  const [respuesta, setRespuesta] = useState(obtenerRespuesta(arbol)) 
  
  useEffect(()=>{
    setRespuesta(obtenerRespuesta(arbol))
  },[globalState])
  return <>
    {arbolRender}
    {respuesta}
  </>
}

function renderizarArbol(arbol){
  const nodosAVisitar = [arbol]
  const elementosARenderizar = []
  let condicionActual;
  while(condicionActual = nodosAVisitar.shift()){
    if(condicionActual.S.tipo === "condicion") nodosAVisitar.push(condicionActual.S)
    if(condicionActual.N.tipo === "condicion") nodosAVisitar.push(condicionActual.N)
    elementosARenderizar.push(<Checkbox condicionActual={condicionActual}/>)
  }
  return elementosARenderizar
}
function obtenerRespuesta(arbol){
  let nodoActual = arbol
  while(nodoActual.tipo === "condicion"){
    if(nodoActual.esVerdadero) nodoActual = nodoActual.S
    else nodoActual = nodoActual.N
  }
  return nodoActual.accion
}
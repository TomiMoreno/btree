import { useEffect, useState } from 'react'
import {useAppContext} from '../components/Context'
import Checkbox from './Checkbox'
import Circle from './Circle'
import Rect from './Rect'
import Line from './Line'
import ClipPath from './ClipPath'
import { crearArbol } from '../utils/binaryTree'

export default function Arbol(){
  const { globalState,respuesta } = useAppContext()
  const arbol = globalState.arbol
  const [arbolRender, setArbolRender] = useState(()=>renderizarArbol(arbol))
  
  return <svg width="99vw" height="99vh">
    <ClipPath />
    {arbolRender[1]}
    {arbolRender[0]}
  </svg>
}
function renderizarArbol(arbol){
  const nodosAVisitar = [arbol]
  const lineasARenderizar = []
  const elementosARenderizar = []
  let condicionActual;
  while(condicionActual = nodosAVisitar.shift()){
    if(condicionActual.S){ 
      nodosAVisitar.push(condicionActual.S)
      lineasARenderizar.push(<Line punto1={condicionActual} punto2={condicionActual.S} />)
    }
    if(condicionActual.N){ 
      nodosAVisitar.push(condicionActual.N)
      lineasARenderizar.push(<Line punto1={condicionActual} punto2={condicionActual.N}/>)
    }
    if (condicionActual.tipo === "accion"){
      elementosARenderizar.push(<Rect condicionActual={condicionActual}/>)
    } else {
      elementosARenderizar.push(<Circle condicionActual={condicionActual}/>)
    }
  }
  return [elementosARenderizar,lineasARenderizar]
}
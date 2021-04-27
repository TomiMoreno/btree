import { useEffect, useState } from "react"
import {useAppContext} from './Context'
import { obtenerRespuesta } from '../utils/binaryTree'


export default function Circle({condicionActual}){
  const {respuesta, setArbol} = useAppContext()
  const [pos, setPos] = useState([0,0])
  const {x,y} = condicionActual
  useEffect(()=>{
    setPos([window.innerWidth*x,window.innerHeight*y])
  },[])
  
  const handleClick= (e)=>{
    condicionActual.esVerdadero = !condicionActual.esVerdadero
    setArbol()
  }
  return <g onClick={handleClick}>
  <circle cx={pos[0]} cy={pos[1]} r="40" fill="blue" stroke="black" strokeWidth="3" />
  {respuesta.includes(condicionActual) && <circle id="hola" cx={pos[0]}  cy={pos[1]} r="40" fill="blue" stroke="green" strokeWidth="3" clipPath="url(#left-to-right)"/>}
  </g>
}









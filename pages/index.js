import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Arbol from '../components/Arbol'
import {useAppContext} from '../components/Context'
const arbol2 = {
  nombre: 'Cancela dentro de los 15 días y es ≥ 50.000',
  tipo: 'condicion',
  esVerdadero: true,
  S: {
    tipo: 'condicion',
    nombre: 'Es < a 100.000',
    esVerdadero: false,
    S: {
      tipo:'accion',
      accion: '2% de descuento'
    },
    N: {
      tipo:'accion',
      accion: '5% de descuento'
    },
  },
  N: {
    tipo:'accion',
    accion: 'No hay descuento'
  },
}
export default function Home() {
  const {arbol, setArbol} = useAppContext()
  return (
    <div>
      <Arbol />
      <button onClick={()=>{setArbol(arbol2)}}></button>
    </div>
  )
}

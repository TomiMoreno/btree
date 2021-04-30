import ReactTooltip from 'react-tooltip';
import Head from 'next/head';
import styles from '../styles/Arbol.module.css';
import Arbol from '../components/Arbol';
import Tabla from '../components/Tabla';
import { useAppContext } from '../components/Context';

export default function Home() {
  const { respuesta } = useAppContext();
  return (
    <div className={styles.container}>
      <Head>
        <title>Árbol binario</title>
      </Head>
      <h1>{respuesta && respuesta[respuesta.length - 1].accion}</h1>
      <Arbol />
      <Tabla />
      <ReactTooltip type="dark" className={styles.tooltip} />
    </div>
  );
}

import Head from 'next/head';
import styles from '../styles/Arbol.module.css';
import Arbol from '../components/Arbol';
import Tabla from '../components/Tabla'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Árbol binario</title>
      </Head>
      <Tabla />
      <Arbol />
    </div>
  );
}

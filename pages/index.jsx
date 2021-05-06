import Head from 'next/head';
import styles from '../styles/Arbol.module.css';
import Arbol from '../components/Arbol';
import Tabla from '../components/Tabla';
import { AppContextProvider } from '../store/arbolContext';
import { findOne } from '../utils/db';

export default function Home({ stringifiedTree }) {
  const arbolInicial = JSON.parse(stringifiedTree);
  return (
    <AppContextProvider arbolInicial={arbolInicial}>
      <div className={styles.container}>
        <Head>
          <title>Árbol binario</title>
        </Head>
        <Arbol />
        <Tabla />
      </div>
    </AppContextProvider>
  );
}
export async function getStaticProps() {
  const tree = await findOne();
  const stringifiedTree = tree ? JSON.stringify(tree) : tree;
  return {
    props: { stringifiedTree },
  };
}

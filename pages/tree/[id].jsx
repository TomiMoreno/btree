import Head from 'next/head';
import styles from '../../styles/Arbol.module.css';
import Arbol from '../../components/Arbol';
import Tabla from '../../components/Tabla';
import { AppContextProvider } from '../../store/arbolContext';
import { findOne } from '../../utils/db';

export default function Home({ stringifiedTree }) {
  const arbolInicial = stringifiedTree ? JSON.parse(stringifiedTree) : undefined;
  return (
    <>
      {
      arbolInicial
        ? (
          <AppContextProvider arbolInicial={arbolInicial}>
            <div className={styles.container}>
              <Head>
                <title>Árbol binario</title>
              </Head>
              <Arbol />
              <Tabla />
            </div>
          </AppContextProvider>
        )
        : <h1>El arbol solicitado no existe</h1>
    }

    </>
  );
}
export async function getServerSideProps({ query }) {
  const tree = await findOne(query.id);
  const stringifiedTree = tree ? JSON.stringify(tree) : tree;
  return {
    props: { stringifiedTree },
  };
}

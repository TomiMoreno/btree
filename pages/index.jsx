import { MongoClient } from 'mongodb';
import Head from 'next/head';
import styles from '../styles/Arbol.module.css';
import Arbol from '../components/Arbol';
import Tabla from '../components/Tabla';
import { AppContextProvider } from '../store/arbolContext';

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
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.alkwu.mongodb.net/btree?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(uri);
  const database = await client.db('btree');
  const trees = await database.collection('trees');

  const query = {};
  const tree = await trees.findOne(query);
  const stringifiedTree = JSON.stringify(tree);
  return {
    props: { stringifiedTree },
  };
}

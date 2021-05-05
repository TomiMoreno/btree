import ReactTooltip from 'react-tooltip';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import styles from '../styles/Arbol.module.css';
import Arbol from '../components/Arbol';
import Tabla from '../components/Tabla';
import { useAppContext } from '../components/Context';

export default function Home({ arbol }) {
  const { respuesta } = useAppContext();
  console.log(arbol)
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
export async function getStaticProps() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.alkwu.mongodb.net/btree?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(uri);
  const database = await client.db('btree');
  const trees = await database.collection('trees');

  const query = {};
  const tree = await trees.findOne(query);
  const parsedTree = JSON.parse(JSON.stringify(tree));
  return {
    props: { arbol: parsedTree },
  };
}

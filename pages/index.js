import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Arbol from '../components/Arbol'
import {useAppContext} from '../components/Context'
export default function Home() {
  return (
    <div className={styles.container}>
      <Arbol />
    </div>
  )
}

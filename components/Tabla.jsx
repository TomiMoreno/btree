import { useState } from 'react';
import { iterar } from '../utils/binaryTree';
import styles from '../styles/Arbol.module.css';
import { useAppContext } from '../store/arbolContext';

export default function Tabla() {
  const { arbol } = useAppContext();
  const [filas] = useState(() => iterar(arbol));
  return (
    <div className={styles.tablaContainer}>
      <table className={styles.tabla}>
        <thead>
          <tr>
            <th width="1px" colSpan="2">Condiciones</th>
            <th colSpan={2 ** Object.entries(filas.condiciones).length}>Reglas</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(filas.condiciones).map(([key, condiciones]) => (
            <tr>
              <td>
                {key}
              </td>
              {condiciones.map((c) => <td className={c === 'S' ? styles.tdTrue : (c === 'N' && styles.tdFalse) || styles.tdNone}>{c}</td>)}
            </tr>
          ))}
          {Object.entries(filas.acciones).map(([key, acciones]) => (
            <tr>
              <td>{key}</td>
              {acciones.map((c) => <td>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

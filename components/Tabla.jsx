import { iterar } from '../utils/binaryTree';
import styles from '../styles/Arbol.module.css';
const filas = iterar()
export default function Tabla() {

  return (
    <div className= { styles.tablaContainer }>
    <table className = { styles.tabla }>
    <thead>
      <tr>
        <th width = "1px">Condiciones</th>
        <th colSpan={2**Object.entries(filas.condiciones).length}>Reglas</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(filas.condiciones).map(([key,condiciones]) =>
          <tr>
            <td>{key}</td>
            {condiciones.map(c=><td className={c==='S'? styles.tdTrue : styles.tdFalse}>{c}</td>)}
          </tr>
      )}
      {Object.entries(filas.acciones).map(([key,acciones]) =>
          <tr>
            <td>{key}</td>
            {acciones.map(c=><td>{c}</td>)}
          </tr>
      )}
      </tbody>
    </table>
    </div>
  );
}

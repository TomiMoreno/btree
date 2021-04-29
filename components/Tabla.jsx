import { iterar } from '../utils/binaryTree';
const filas = iterar()
export default function Tabla() {

  return (
    <table >

      {Object.entries(filas.condiciones).map(([key,condiciones]) =>
          <tr>
            <td>{key}</td>
            {condiciones.map(c=><td>{c}</td>)}
          </tr>
      )}
      {Object.entries(filas.acciones).map(([key,acciones]) =>
          <tr>
            <td>{key}</td>
            {acciones.map(c=><td>{c}</td>)}
          </tr>
      )}
    </table>
  );
}

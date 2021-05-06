import { useAppContext } from '../store/arbolContext';
import usePosition from '../hooks/usePosition';

export default function Line({ punto1, punto2 }) {
  const { respuesta } = useAppContext();
  const pos1 = usePosition(punto1);
  const pos2 = usePosition(punto2);
  const X2 = punto2.tipo === 'accion' ? pos2.x - 50 : pos2.x;
  const colorLinea = punto1.esVerdadero ? 'green' : 'red';
  const esRespuesta = respuesta.find((r) => r.alias === punto1.alias)
  && respuesta.find((r) => r.alias === punto2.alias);
  return (
    <>
      <line x1={pos1.x} y1={pos1.y} x2={X2} y2={pos2.y} stroke="rgb(0,0,0)" strokeWidth="4" />
      {esRespuesta && <line x1={pos1.x} y1={pos1.y} x2={X2} y2={pos2.y} stroke={colorLinea} strokeWidth="4" clipPath="url(#left-to-right)" />}
    </>
  );
}

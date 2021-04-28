import { useAppContext } from './Context';
import usePosition from '../hooks/usePosition';

export default function Line({ punto1, punto2 }) {
  const { respuesta } = useAppContext();
  const pos1 = usePosition(punto1);
  const pos2 = usePosition(punto2);
  const X2 = punto2.tipo === 'accion' ? pos2.x - 50 : pos2.x;
  const colorLinea = punto1.esVerdadero ? 'green' : 'red';
  return (
    <>
      <line x1={pos1.x} y1={pos1.y} x2={X2} y2={pos2.y} stroke="rgb(0,0,0)" strokeWidth="4" />
      {respuesta.includes(punto1) && respuesta.includes(punto2) && <line x1={pos1.x} y1={pos1.y} x2={X2} y2={pos2.y} stroke={colorLinea} strokeWidth="4" clipPath="url(#left-to-right)" />}
    </>
  );
}

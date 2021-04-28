import { useAppContext } from './Context';
import usePosition from '../hooks/usePosition';

export default function Rect({ condicionActual }) {
  const { respuesta } = useAppContext();
  const pos = usePosition(condicionActual);

  return (
    <>
      <rect x={pos.x - 50} y={pos.y - 20} width="100" height="40" fill="blue" stroke="black" strokeWidth="4" />
      {respuesta.includes(condicionActual) && <rect x={pos.x - 50} y={pos.y - 20} width="100" height="40" fill="blue" stroke="green" strokeWidth="4" clipPath="url(#left-to-right)" />}
      <text x={pos.x - 50} y={pos.y + 16} fontFamily="Verdana" fontSize="35" fill="Red">{condicionActual.accionNombre}</text>
    </>
  );
}

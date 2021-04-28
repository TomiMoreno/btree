import { useEffect, useState } from 'react';
import { useAppContext } from './Context';

export default function Rect({ condicionActual }) {
  const { respuesta, windowSize } = useAppContext();
  const [pos, setPos] = useState([0, 0]);
  const { x, y } = condicionActual;
  useEffect(() => {
    setPos([windowSize.width * x, windowSize.height * y]);
  }, [windowSize]);

  return (
    <>
      <rect x={pos[0] - 50} y={pos[1] - 20} width="100" height="40" fill="blue" stroke="black" strokeWidth="4" />
      {respuesta.includes(condicionActual) && <rect x={pos[0] - 50} y={pos[1] - 20} width="100" height="40" fill="blue" stroke="green" strokeWidth="4" clipPath="url(#left-to-right)" />}
      <text x={pos[0] - 50} y={pos[1] + 16} fontFamily="Verdana" fontSize="35" fill="Red">{condicionActual.accionNombre}</text>
    </>
  );
}

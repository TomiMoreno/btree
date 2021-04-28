import { useEffect, useState } from 'react';
import { useAppContext } from './Context';

export default function Circle({ condicionActual }) {
  const { respuesta, setArbol, windowSize } = useAppContext();
  const [pos, setPos] = useState([0, 0]);
  const { x, y } = condicionActual;
  useEffect(() => {
    setPos([windowSize.width * x, windowSize.height * y]);
  }, [windowSize]);

  const handleClick = () => {
    condicionActual.esVerdadero = !condicionActual.esVerdadero;
    setArbol(x);
  };
  return (
    <g onClick={handleClick}>
      <circle cursor="pointer" cx={pos[0]} cy={pos[1]} r="40" fill="blue" stroke="black" strokeWidth="4" />
      {respuesta.includes(condicionActual) && <circle cursor="pointer" cx={pos[0]} cy={pos[1]} r="40" fill="blue" stroke="green" strokeWidth="4" clipPath="url(#left-to-right)" />}
    </g>
  );
}

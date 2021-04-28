import { useAppContext } from './Context';
import usePosition from '../hooks/usePosition';

export default function Circle({ condicionActual }) {
  const { respuesta, setArbol } = useAppContext();
  const pos = usePosition(condicionActual);

  const handleClick = () => {
    // eslint-disable-next-line no-param-reassign
    condicionActual.esVerdadero = !condicionActual.esVerdadero;
    setArbol(condicionActual.x);
  };
  return (
    <g onClick={handleClick}>
      <circle cursor="pointer" cx={pos.x} cy={pos.y} r="40" fill="blue" stroke="black" strokeWidth="4" />
      {respuesta.includes(condicionActual) && <circle cursor="pointer" cx={pos.x} cy={pos.y} r="40" fill="blue" stroke="green" strokeWidth="4" clipPath="url(#left-to-right)" />}
    </g>
  );
}

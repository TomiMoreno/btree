import { useState } from 'react';
import { useAppContext } from './Context';
import usePosition from '../hooks/usePosition';
import styles from '../styles/Arbol.module.css';

export default function Circle({ condicionActual }) {
  const [checked, setChecked] = useState(condicionActual.esVerdadero);
  const { respuesta, setArbol } = useAppContext();
  const pos = usePosition(condicionActual);
  const handleClick = () => {
    // eslint-disable-next-line no-param-reassign
    condicionActual.esVerdadero = !condicionActual.esVerdadero;
    setChecked((curent) => !curent);
    setArbol(condicionActual.x);
  };
  return (
    <g onClick={handleClick}>
      <circle cursor="pointer" cx={pos.x} cy={pos.y} r="40" fill="blue" stroke="black" strokeWidth="4" />
      {respuesta.includes(condicionActual) && <circle pointerEvents="none" cx={pos.x} cy={pos.y} r="40" fill="blue" stroke={checked ? 'green' : 'red'} strokeWidth="4" clipPath="url(#left-to-right)" />}
      <text className={styles.svgText} pointerEvents="none" fill={checked ? 'green' : 'red'}  x={pos.x} y={pos.y + 13}>{condicionActual.alias}</text>
    </g>
  );
}

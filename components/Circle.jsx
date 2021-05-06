import { useState } from 'react';
import { useAppContext } from '../store/arbolContext';
import usePosition from '../hooks/usePosition';
import styles from '../styles/Arbol.module.css';
import { changeTrue } from '../store/arbolReducer';

export default function Circle({ condicionActual }) {
  const [checked, setChecked] = useState(condicionActual.esVerdadero);
  const { respuesta, dispatchArbol } = useAppContext();
  const pos = usePosition(condicionActual);
  const handleClick = () => {
    // eslint-disable-next-line no-param-reassign
    condicionActual.esVerdadero = !condicionActual.esVerdadero;
    setChecked((curent) => !curent);
    dispatchArbol(changeTrue(condicionActual.x));
  };
  const esRespuesta = respuesta.find((r) => r.alias === condicionActual.alias);
  return (
    <g onClick={handleClick}>
      <circle data-tip={condicionActual.desc} cursor="pointer" cx={pos.x} cy={pos.y} r="40" fill="blue" stroke="black" strokeWidth="4" />
      {esRespuesta && <circle pointerEvents="none" cx={pos.x} cy={pos.y} r="40" fill="blue" stroke={checked ? 'green' : 'red'} strokeWidth="4" clipPath="url(#left-to-right)" />}
      <text className={styles.svgText} pointerEvents="none" fill={checked ? 'green' : 'red'} x={pos.x} y={pos.y + 13}>{condicionActual.alias}</text>
    </g>
  );
}

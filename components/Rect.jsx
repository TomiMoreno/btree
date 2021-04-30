import { useAppContext } from './Context';
import usePosition from '../hooks/usePosition';
import styles from '../styles/Arbol.module.css';

export default function Rect({ condicionActual }) {
  const { respuesta } = useAppContext();
  const pos = usePosition(condicionActual);
  const color = respuesta[respuesta.length - 2]?.esVerdadero ? 'green' : 'red';
  return (
    <>
      <rect data-tip={condicionActual.accion} x={pos.x - 50} y={pos.y - 20} width="100" height="40" fill="blue" stroke="black" strokeWidth="4" />
      {respuesta.includes(condicionActual) && <rect pointerEvents="none" x={pos.x - 50} y={pos.y - 20} width="100" height="40" fill="#0001ff" stroke={color} strokeWidth="4" clipPath="url(#left-to-right)" />}
      <text className={styles.svgText} x={pos.x} y={pos.y + 14} pointerEvents="none">{condicionActual.alias}</text>
    </>
  );
}

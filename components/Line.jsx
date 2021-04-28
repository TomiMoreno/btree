import { useEffect, useState } from 'react';
import { useAppContext } from './Context';

export default function Line({ punto1, punto2 }) {
  const { respuesta, windowSize } = useAppContext();
  const [pos, setPos] = useState({
    x1: 0, y1: 0, x2: 0, y2: 0,
  });
  const { x: x1, y: y1 } = punto1;
  const { x: x2, y: y2 } = punto2;

  useEffect(() => {
    const position = {
      x1: windowSize.width * x1,
      y1: windowSize.height * y1,
      x2: windowSize.width * x2,
      y2: windowSize.height * y2,
    };
    if (punto2.tipo === 'accion') {
      position.x2 -= 50;
    }
    setPos(position);
  }, [windowSize]);

  return (
    <>
      <line x1={pos.x1} y1={pos.y1} x2={pos.x2} y2={pos.y2} stroke="rgb(0,0,0)" strokeWidth="4" />
      {respuesta.includes(punto1) && respuesta.includes(punto2) && <line x1={pos.x1} y1={pos.y1} x2={pos.x2} y2={pos.y2} stroke="green" strokeWidth="4" clipPath="url(#left-to-right)" />}
    </>
  );
}

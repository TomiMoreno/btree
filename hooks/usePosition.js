import { useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';

export default function usePosition(punto) {
  const { x, y } = punto;
  const windowSize = useWindowSize();
  const [pos, setPos] = useState({ x: windowSize.width * x, y: windowSize.height * y });
  useEffect(() => {
    setPos({ x: windowSize.width * x, y: windowSize.height * y });
  }, [windowSize]);

  return pos;
}

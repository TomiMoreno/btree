import { useEffect, useState } from 'react';


export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function updateSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => { window.removeEventListener('resize', updateSize); };
  }, []);
  return windowSize;
}

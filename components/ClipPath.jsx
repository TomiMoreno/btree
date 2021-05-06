import { useEffect } from 'react';
import { useAppContext } from '../store/arbolContext';
import useWindowSize from '../hooks/useWindowSize';

export default function ClipPath() {
  const { clipPath } = useAppContext();
  const windowSize = useWindowSize();
  useEffect(() => {
    clipPath.current.animate({ r: windowSize.width }, { fill: 'forwards' });
  }, [windowSize]);
  return (
    <defs>
      <clipPath id="left-to-right">
        <circle cx="0" cy="50vh" r="0" id="clip" ref={clipPath}>
          <animate id="relleno" attributeName="r" values="0;1500" dur="2s" fill="freeze" />
        </circle>
      </clipPath>

    </defs>
  );
}

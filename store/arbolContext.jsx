import React, {
  useContext, createContext, useReducer, useEffect, useState,
} from 'react';
import { crearArbol, obtenerRespuesta } from '../utils/binaryTree';
import useWindowSize from '../hooks/useWindowSize';
import { arbolReducer } from './arbolReducer';

export const AppContext = createContext(null);

// Provider
export const AppContextProvider = ({ children, arbolInicial }) => {
  const [arbol, dispatchArbol] = useReducer(arbolReducer, crearArbol(arbolInicial));
  const [respuesta, setRespuesta] = useState(obtenerRespuesta(arbol));
  const windowSize = useWindowSize();
  const clipPath = React.useRef(null);

  useEffect(() => {
    const nuevaRespuesta = obtenerRespuesta(arbol);
    if (nuevaRespuesta[nuevaRespuesta.length - 1] !== respuesta[respuesta.length - 1]) {
      clipPath.current.animate({ r: (windowSize.width || window.innerWidth) * arbol.xAnimation }, { duration: 500, fill: 'forwards' });
      clipPath.current.animate({ r: windowSize.width || window.innerWidth }, { duration: 500, fill: 'forwards', delay: 500 });
      setTimeout(() => setRespuesta(obtenerRespuesta(arbol)), 500);
    }
  }, [arbol]);
  const values = React.useMemo(() => (
    {
      arbol,
      respuesta,
      clipPath, // States que seran visibles en el contexto.
      dispatchArbol,
      setRespuesta, // Funciones que son exportadas para manejo externo.
    }),
  [arbol, respuesta]); // States que serán visibles en el contexto.

  // Interface donde será expuesto como proveedor y envolverá la App.
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

//
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    // console.error('Error deploying App Context!!!');
  }

  return context;
}

export default useAppContext;

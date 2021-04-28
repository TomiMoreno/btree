import React, { useContext, createContext } from 'react';
import { crearArbol, obtenerRespuesta } from '../utils/binaryTree';

const arbol = crearArbol();
// Context
export const AppContext = createContext(null);

// Provider
export const AppContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = React.useState({ arbol });
  const [respuesta, setRespuesta] = React.useState(obtenerRespuesta(arbol));
  const clipPath = React.useRef(null);

  const setArbol = (x) => {
    const nuevaRespuesta = obtenerRespuesta(arbol);
    if (nuevaRespuesta[nuevaRespuesta.length - 1] !== respuesta[respuesta.length - 1]) {
      clipPath.current.animate({ r: window.innerWidth * x }, { duration: 500, fill: 'forwards' });
      clipPath.current.animate({ r: window.innerWidth }, { duration: 500, fill: 'forwards', delay: 500 });

      setTimeout(() => { setRespuesta(nuevaRespuesta); setGlobalState({ ...globalState }); }, 500);
    }
    setGlobalState({ ...globalState });
  };
  // ComponentDidMouunt

  //
  const values = React.useMemo(() => (
    {
      globalState,
      respuesta,
      clipPath, // States que seran visibles en el contexto.
      setGlobalState,
      setRespuesta,
      setArbol, // Funciones que son exportadas para manejo externo.
    }),
  [
    globalState, respuesta]); // States que serán visibles en el contexto.

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

import React, { useContext, createContext } from 'react';
import { crearArbol, obtenerRespuesta } from '../utils/binaryTree'
const arbol = crearArbol()
//Context
export const AppContext = createContext(null);

//Provider
export const AppContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = React.useState({arbol: arbol});
  const [respuesta, setRespuesta] = React.useState(obtenerRespuesta(arbol));

  const setArbol = ()=>{
    const nuevaRespuesta = obtenerRespuesta(arbol)
    if(nuevaRespuesta[nuevaRespuesta.length-1] !== respuesta[respuesta.length-1]){
      setRespuesta(nuevaRespuesta)
    }
    setGlobalState({...globalState})
  }
  //ComponentDidMouunt
  React.useEffect(() => {
    
  }, []);

  //
  const values = React.useMemo(() => (
    { globalState,
      respuesta,        // States que seran visibles en el contexto.
      setGlobalState,
      setRespuesta,
      setArbol   // Funciones que son exportadas para manejo externo.
    }), 
    [ 
      globalState ]);   // States que serán visibles en el contexto.

  // Interface donde será expuesto como proveedor y envolverá la App.
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

//
export function useAppContext() {
  const context = useContext(AppContext);

  if(!context){
    console.error('Error deploying App Context!!!');
  }

  return context;
}

export default useAppContext;
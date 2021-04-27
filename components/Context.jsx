import React, { useContext, createContext } from 'react';
const arbol = {
  nombre: 'Cancela dentro de los 15 días y es ≥ 50.000',
  tipo: 'condicion',
  esVerdadero: false,
  S: {
    tipo: 'condicion',
    nombre: 'Es < a 100.000',
    esVerdadero: false,
    S: {
      tipo:'accion',
      accion: '2% de descuento'
    },
    N: {
      tipo:'accion',
      accion: '5% de descuento'
    },
  },
  N: {
    tipo:'accion',
    accion: 'No hay descuento'
  },
}
//Context
export const AppContext = createContext(null);

//Provider
export const AppContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = React.useState({arbol: arbol});

  //ComponentDidMouunt
  React.useEffect(() => {
    
  }, []);

  //
  const values = React.useMemo(() => (
    { globalState,      // States que seran visibles en el contexto.
      setGlobalState,   // Funciones que son exportadas para manejo externo.
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
export const CHANGE_TREE = 'ARBOL/CHANGE';
export const CHANGE_TRUE = 'ARBOL/TRUE';

export const changeTree = (tree) => ({
  type: CHANGE_TREE,
  tree,
});

export const changeTrue = (x) => ({
  type: CHANGE_TRUE,
  x,
});

export const arbolReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_TREE:
      return {
        ...state,
      };
    case CHANGE_TRUE:
      return {
        ...state,
        xAnimation: action.x,
      };
    default: return state;
  }
};

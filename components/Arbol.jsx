import ReactTooltip from 'react-tooltip';
import { useEffect, useState } from 'react';
import { useAppContext } from '../store/arbolContext';
import Circle from './Circle';
import Rect from './Rect';
import Line from './Line';
import ClipPath from './ClipPath';

function renderizarArbol(arbol) {
  const nodosAVisitar = [arbol];
  const lineasARenderizar = [];
  const elementosARenderizar = [];
  let condicionActual = nodosAVisitar.shift();
  while (condicionActual) {
    if (condicionActual.S) {
      nodosAVisitar.push(condicionActual.S);
      lineasARenderizar.push(<Line punto1={condicionActual} punto2={condicionActual.S} />);
    }
    if (condicionActual.N) {
      nodosAVisitar.push(condicionActual.N);
      lineasARenderizar.push(<Line punto1={condicionActual} punto2={condicionActual.N} />);
    }
    if (condicionActual.tipo === 'accion') {
      elementosARenderizar.push(<Rect condicionActual={condicionActual} />);
    } else {
      elementosARenderizar.push(<Circle condicionActual={condicionActual} />);
    }
    condicionActual = nodosAVisitar.shift();
  }
  return [elementosARenderizar, lineasARenderizar];
}

export default function Arbol() {
  const { arbol, respuesta } = useAppContext();
  const [arbolRender, setArbolRender] = useState(() => renderizarArbol(arbol));
  useEffect(() => {
    setArbolRender(renderizarArbol(arbol));
  }, [arbol]);

  return (
    <>
      <h1>{respuesta && respuesta[respuesta.length - 1].desc}</h1>
      <ReactTooltip backgroundColor="#000" />
      <svg width="99vw" height="99vh">
        <ClipPath />
        {arbolRender[1]}
        {arbolRender[0]}
      </svg>
    </>
  );
}

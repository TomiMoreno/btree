import { useEffect, useState } from "react"
import {useAppContext} from './Context'
export default function Rect({condicionActual}){
  const {respuesta} = useAppContext()
  const [pos, setPos] = useState([0,0])
  const {x,y} = condicionActual
  useEffect(()=>{
    setPos([window.innerWidth*x,window.innerHeight*y])
  },[])
  

  return <>
  <rect x={pos[0]-50} y={pos[1] - 20} width="100" height="40" fill="blue" stroke="black" strokeWidth="2"/>
  {respuesta.includes(condicionActual) && <rect x={pos[0]-50} y={pos[1] - 20} width="100" height="40" fill="blue" stroke="green" strokeWidth="2" clipPath="url(#left-to-right)"/>}
  <text x={pos[0]-50} y={pos[1] + 16} font-family="Verdana" font-size="35" fill="Red">{condicionActual.accionNombre}</text>
  </>
}
// <!-- <svg width="100%" height="100vh">
//         <defs>
            
//          <clipPath id="left-to-right">
//            <circle  cx="320" cy="400" r="0" id="fondo-circle" >
//              <animate id="relleno" attributeName="r" values="0%;150%" dur="2s" fill="freeze"/>
//            </circle>
//           </clipPath>

//           <animate href='#fondo-circle' attributeName="r" id="vaciar" values='150%;0%' dur='2s' fill='freeze' begin='click'/>
       
//         </defs> 

//         <line x1="400" y1="400" x2="700" y2="200" stroke="black" stroke-width = "10"/>
//         <line x1="400" y1="400" x2="700" y2="200" stroke="green" stroke-width = "10" clip-path="url(#left-to-right)"/>

//         <line x1="400" y1="400" x2="700" y2="600" stroke="black" stroke-width = "10"/>
//         <line x1="400" y1="400" x2="700" y2="600" stroke="green" stroke-width = "10" clip-path="url(#left-to-right)"/>
        
//         <circle cx="400" cy="400" r="80" fill="blue" stroke="black" stroke-width = "8"/>
//         <circle cx="400" cy="400" r="80" fill="blue" stroke="green" stroke-width = "8" clip-path="url(#left-to-right)"/>

//         <circle cx="700" cy="200" r="80" fill="blue" stroke="black" stroke-width = "8"/>
//         <circle cx="700" cy="200" r="80" fill="blue" stroke="green" stroke-width = "8" clip-path="url(#left-to-right)"/>

//         <rect x="695" y="583" width="150" height="30" fill="cyan" stroke="black" stroke-width="4"/>
//         <rect x="695" y="583" width="150" height="30" fill="cyan"stroke="green" stroke-width="4" clip-path="url(#left-to-right)"/> -->
    
//     <!-- </svg> 

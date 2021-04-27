import {useAppContext} from '../components/Context'

export default function Checkbox({condicionActual}){
  const {globalState, setGlobalState} = useAppContext()
  const {esVerdadero: isChecked, nombre:text} = condicionActual
  const handleChange = (e) => {
    condicionActual.esVerdadero = e.target.checked
    setGlobalState({...globalState})
  }

  return <label><input type="checkbox" onChange={handleChange} checked={isChecked} />{text}</label>
}
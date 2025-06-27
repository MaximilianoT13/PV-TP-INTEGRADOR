import { useEffect, useState } from "react"
import { addUser,loginSession,clearError  } from "../app/usersSlice"
import { useSelector,useDispatch } from "react-redux"
import { useLocation, useNavigate} from "react-router-dom"
import { Button } from '@radix-ui/themes'

const FormUser=()=>{

const navigate=useNavigate()
const location=useLocation()
const dispatch=useDispatch()

const loginMode=location.pathname === "/user/login"
const globalErrors=useSelector((state)=>state.auth.error)
const logged=useSelector((state)=>state.auth.sessionUser)


const defaultData={
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
}
const [formData,setFormData]=useState(defaultData)
const [localErrors,setLocalErrors]=useState({})



useEffect(()=>{
   if(logged){
        navigate("/")
        alert("sesion ya iniciada")   
    }
},[logged,navigate])

useEffect(()=>{
    dispatch(clearError())
    setLocalErrors({})
    setFormData(defaultData)
},[loginMode,dispatch])



const validate=()=>{
    const err={
        e1: "",
        e2: ""
    }
    let valid=true
    if(formData.password.length < 6)
    {
        err.e1="La contraseña debe tener al menos 6 caracteres"
        valid=false
    }
    if(formData.password !== formData.confirmPassword)
    {
        err.e2="Las contraseñas no coinciden"
        valid=false
    }
    setLocalErrors(err)
    return valid
}

const handleChange=(e)=>{
   
   const {name,value}=e.target
   setFormData(prev=>({...prev,[name]: value}))

}
const handleSubmit=(e)=>{
    e.preventDefault()
    if(loginMode)
    {
        dispatch(loginSession({
            email: formData.email,
            password: formData.password
        }))
        setFormData(defaultData)
    }
    else 
    {
        if (!validate()) return

        dispatch(addUser({
            name: formData.name,
            lastname: formData.lastname,
            email: formData.email,
            password: formData.password
        }))
        alert("registrado correctamente")
        setFormData(defaultData)
        navigate("/user/login")
    }
}

return(
  
    <form onSubmit={handleSubmit}>
    {globalErrors && <p>{globalErrors}</p>}

    {!loginMode && 
    <>  
    <label htmlFor="name">Nombre</label>
    <input id="name" name="name" value={formData.name} onChange={handleChange} required />

    <label htmlFor="lastname">Apellido</label>
    <input id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required />
    </>
     }
  
    <label htmlFor="email">Email</label>
    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
    
    <label htmlFor="password">Contraseña</label>
    <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
    {localErrors.e1 && <p>{localErrors.e1}</p>}
 
    
    {!loginMode && 
    <>
    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
    <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
    {localErrors.e2 && <p>{localErrors.e2}</p>}
    </>}
    
    <Button variant="classic" type="submit">{!loginMode ? "REGISTRARSE" : "INICIAR"}</Button>
    </form>
    
)
}

export default FormUser
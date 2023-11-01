
import {useState, createContext} from "react";


const LoginContext = createContext({isAuth:false,token : "", 
                                    setAuth: () => {}})

const LoginProvider = ({child}) => {
   const [isAuth,setAuth] = useState(localStorage.getItem("isAuth") || false)
   const [token, setToken] = useState(localStorage.getItem("token"))
   useEffect(() => {
      localStorage.setItem("isAuth",isAuth)
   },[isAuth])
   return (
        <LoginContext.Provider value={{isAuth,token,setAuth}}>
             {child}
        </LoginContext.Provider>
      )
    }

export default LoginProvider;
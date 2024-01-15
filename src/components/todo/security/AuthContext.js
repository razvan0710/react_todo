import { createContext, useContext, useState } from "react";

//1:Create a context
const AuthContext = createContext()

export const useAuth = ()=>useContext(AuthContext)

//2:Share the created context with other components
export default function AuthProvider({children}){

    //Put some state in the context
    //const[number, setNumber]=useState(0)
    // setInterval(()=> setNumber(number+1),10000)
    // const valueToBeShared = {number,isAuthenticated,setAuthenticated}

    const[isAuthenticated, setAuthenticated]=useState(false)
    const[username, setUsername]=useState(null)
    
    function login(username, password){
        if(username ==='in28minutes' && password==='a'){
            setUsername(username)
            setAuthenticated(true)
            return true
        }else{
            setAuthenticated(false)
            return false
        }
    }
    function logout(){
        setAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, username}}>
            {children}
        </AuthContext.Provider>
    )
}
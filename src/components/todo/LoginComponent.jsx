import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from './security/AuthContext'

export default function LoginComponent(){

    const[username, setUsername] = useState("UserName")
    const[password, setPassword] = useState("")

    const[showSuccessMessage, setshowSuccessMessage] = useState(false)
    const[showFailedMessage, setshowFailedMessage] = useState(false)
 //-------------------------------------------------------------------------------------
    const navigate = useNavigate()
    const authContext = useAuth()


 //--------------------------------------------------------------------------------------
    function handleUsernameChange(event){
        // console.log(event.target.value)
        setUsername(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    function handleSubmit(){

        if(authContext.login(username, password)){
            console.log('Succ')
            setshowSuccessMessage(true)
            navigate(`/welcome/${username}`)
        }else{
            console.log('Failed')
            setshowFailedMessage(true)
        }
    }

    function SuccessComponentMessage(){
        if(showSuccessMessage){
            return <div className='successMessage'>Authenticated Successfully</div>
        }
        return null
    }
    function FailedComponentMessage(){
        if(showFailedMessage){
            return <div className='errorMessage'>Authentication failed. Please check your credentials</div>
        }
        return null
    }

    return(
        <div className="Login">
            <SuccessComponentMessage/>
            <FailedComponentMessage/>
            <div className="LoginForm">
                <div>
                    <label htmlFor="">User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit} disabled={false}>Login</button>
                </div>
            </div>
        </div>
    )
}
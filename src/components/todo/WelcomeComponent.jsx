import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import {retrieveHelloBean, retrieveHelloPathVariable} from './api/APIService'

export default function WelcomeComponent(){

    const {username} = useParams()

    const[message, setMessage] = useState(null)

    function callHelloRestApi(){
        retrieveHelloBean()
            .then(
               (response)=> SuccessfulResponse(response)
            )
            .catch(
                (error)=> ErrorResponse(error)
            )
            .finally(
                ()=> console.log('cleanup')
            )
        
        retrieveHelloPathVariable(username)
            .then(
               (response)=> SuccessfulResponse(response)
            )
            .catch(
                (error)=> ErrorResponse(error)
            )
            .finally(
                ()=> console.log('cleanup')
            )
    }

    function SuccessfulResponse(response){
        console.log(response)
        message = setMessage(response.data.message)
    }
    function ErrorResponse(error){
        console.log(error)
    }

    return(
        <div className="Welcome">
            Welcome {username}
            <div>
                Manage your todos - <Link to="/todos">Go here</Link> {/*sa nu mai dea refresh la toata pagina folosind a */}
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloRestApi}>Call REST API</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}
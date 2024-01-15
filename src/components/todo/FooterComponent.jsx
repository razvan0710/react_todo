import {useAuth} from './security/AuthContext'

export default function FooterComponent(){

    const authContext = useAuth()
    //console.log(`Footer component is ${authContext.number}`)
    return(
        <footer className="footer">
            <div className="container">
               Footer
            </div>
         <hr/>
        </footer>
    )
}
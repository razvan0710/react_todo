import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom'
import {useAuth} from './security/AuthContext'
import { useNavigate } from 'react-router-dom'
import {retrieveAllTodosForUsernameAPI, deleteTodoAPI} from './api/APIService'

export default function ListTodoComponent(){
    const today = new Date()
    const targetDate = new Date(today.getFullYear())

    //const {username} = useParams()
    const authContext = useAuth()
    const username = authContext.username

    const[todos, setTodos]= useState([])
    const[message, setMessage]= useState(null)

    const navigate = useNavigate()
    // const todos = [
    //             //    {id:1, description:'Learn AWS', done:false, targetDate:targetDate},
    //             //    {id:2, description:'Learn AWS', done:false, targetDate:targetDate},
    //             //    {id:4, description:'Lea78768S', done:false, targetDate:targetDate},
    //             ]
    useEffect(
        ()=> refreshTodos(), []
    )

    function refreshTodos(){
        retrieveAllTodosForUsernameAPI(username)
        .then(response => {
            console.log(response.data)
            setTodos(response.data)
        })
        .catch(error => console.log(error))
    }

    function deleteTodo(id){
        deleteTodoAPI(username, id)
        .then(() => {
            setMessage(`Delete of todo with ${id} successful `)
            refreshTodos()
        })
        .catch(error => console.log(error))
    }

    function updateTodo(id){
        console.log('clicked'+id)
        navigate(`/todo/${id}`)
    }
    //----------------!----------------------------------------------------------------------------------
    function createTodo(){
        navigate(`/todo/-1`)
    }

    return(
        <div className="container">
            <h1>Things that you want to do</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>description</td>
                            <td>Is done?</td>
                            <td>Target Date</td>
                            <td>Delete</td>
                            <td>Update</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo =>(
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning" 
                                        onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" 
                                        onClick={() => updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div>
                <button className="btn btn-success m-3"
                    onClick={()=> createTodo()}>Add new todo!</button>
            </div>
        </div>
    )
}
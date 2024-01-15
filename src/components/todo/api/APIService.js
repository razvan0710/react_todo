import axios from 'axios'

// export function retrieveHelloBean(){
//     return axios.get('http://localhost:8080/hello-world-bean')
// }
const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const retrieveHelloBean
     = () => apiClient.get('/hello-world-bean')
     
export const retrieveHelloPathVariable
     = (username) => apiClient.get(`/hello-world/path-variable/${username}`,{
          headers: {
               Authorization: 'Basic aW4yOG1pbnV0ZXM6ZWEwYmYyNjMtZTkwYy00OGRiLWJhNWMtNTM0NTExZDU2MWEw='
          }
     })

export const retrieveAllTodosForUsernameAPI
     = (username) => apiClient.get(`/users/${username}/todos`,{
          headers: {
               Authorization: 'Basic aW4yOG1pbnV0ZXM6ZWEwYmYyNjMtZTkwYy00OGRiLWJhNWMtNTM0NTExZDU2MWEw='
          }
     })

export const deleteTodoAPI
     = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`)
     //"/users/{username}/todos/{id}"

export const retrieveTodoAPI
     = (username, id) => apiClient.get(`/users/${username}/todos/${id}`)

export const updateTodoAPI
     = (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo)

export const addTodoAPI
     = (username, todo) => apiClient.post(`/users/${username}/todos`, todo)
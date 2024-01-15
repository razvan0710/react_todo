import {Form, useNavigate, useParams} from 'react-router-dom'
import { retrieveTodoAPI, updateTodoAPI, addTodoAPI } from './api/APIService'
import { useAuth } from './security/AuthContext'
import { useEffect, useState, Field } from 'react'
import {Formik, Form as FormikForm, Field as FormikField, ErrorMessage} from 'formik'

export default function TodoComponent(){
    const {id} = useParams()
    const authContext = useAuth()
    const username = authContext.username

    const[description, setDescription] = useState('')
    const[targetDate, setTargetDate] = useState('')

    const navigate = useNavigate()
    
    useEffect(
        ()=> retrieveTodo(),
        [id]
    )

    function retrieveTodo(){
        if(id != -1){
            retrieveTodoAPI(username, id)
            .then(response=>{
              console.log(response)
              setDescription(response.data.description)
              setTargetDate(response.data.targetDate)
            })
            .catch(error=> console.log(error))
        }
    }

    function onSubmit(values){
        //console.log(values)
        const todo = {
            id:id,
            username:username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        if(id == -1){
            addTodoAPI(username, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }else{
            updateTodoAPI(username, id, todo)
            .then(response => {
               navigate('/todos')
            })
            .catch(error => console.log(error))
        }
    }

    function validate(values){
        let errors={
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }
        if(values.description.length<5){
            errors.description='Enter at least 5 characters'
        }
        if(values.targetDate === null || values.targetDate===''){
            errors.targetDate='Enter a target date'
        }
        console.log(values)
        return errors
    }
    
    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{description, targetDate}}
                    enableReinitialize = {true}
                    onSubmit={onSubmit}
                    validate = {validate}
                    validateOnChange= {false}
                    validateOnBlur={false}
                >
                {
                        (props) =>(
                            <FormikForm>
                                <ErrorMessage 
                                    name="description" 
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <ErrorMessage 
                                    name="target" 
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label htmlFor="">Description</label>
                                    <FormikField className="form-control" type="text" name="description"></FormikField>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label htmlFor="">Target Date</label>
                                    <FormikField className="form-control" type="date" name="targetDate"></FormikField>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Submit</button>
                                </div>
                            </FormikForm>
                        )
                }
                </Formik>
            </div>
        </div>
    )
}
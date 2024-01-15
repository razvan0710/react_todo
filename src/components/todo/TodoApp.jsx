import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate, useParams, Link, Navigate } from 'react-router-dom'
import './TodoApp.css'

import LogoutComponent from '../todo/LogoutComponent'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import ListTodoComponent from './ListTodoComponent'
import WelcomeComponent from './WelcomeComponent'
import ErrorComponent from './ErrorComponent'
import AuthProvider from './security/AuthContext'
import LoginComponent from './LoginComponent'
import TodoComponent from './TodoComponent'
import {useAuth} from './security/AuthContext'

function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if(authContext.isAuthenticated)
        return children
    return <Navigate to="/"></Navigate>
}

export default function TodoApp(){
    return(
        <div className="TodoApp">
            <AuthProvider>
             <BrowserRouter>
               <HeaderComponent/>
               <Routes>
                <Route path='/' element={<LoginComponent/>}></Route>
                <Route path='/login' element={<LoginComponent/>}></Route>
                <Route path='/welcome/:username' element={
                   <AuthenticatedRoute>
                       <WelcomeComponent/>
                   </AuthenticatedRoute>}>
                </Route>
                <Route path='*' element={
                    <AuthenticatedRoute>
                        <ErrorComponent/>
                    </AuthenticatedRoute>}>
                </Route>
                <Route path='/todos' element={
                    <AuthenticatedRoute>
                       <ListTodoComponent/>
                    </AuthenticatedRoute>}>
                </Route>
                <Route path='/todo/:id' element={
                    <AuthenticatedRoute>
                       <TodoComponent/>
                    </AuthenticatedRoute>}>
                </Route>
                <Route path='/logout' element={
                    <AuthenticatedRoute>
                        <LogoutComponent/>
                 </AuthenticatedRoute>}>
                </Route>

               </Routes>
               <FooterComponent/>
             </BrowserRouter>
            </AuthProvider>
        </div>
    )
}







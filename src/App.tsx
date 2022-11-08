import React, { useState } from 'react'
import currentStyles from './App.module.scss'
import {
    createBrowserRouter,
    RouterProvider,
    Router
} from 'react-router-dom';
import Login from './pages/login/index';
import SignUp from "./pages/signUp";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Login />,
    },
    {
        path : 'signUp',
        element : <SignUp />
    }
])
function App() {

  return (
    <div className={currentStyles.App}>
        <RouterProvider router={router}/>
    </div>
  )
}

export default App

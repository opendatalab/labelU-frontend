import React, { useState } from 'react'
import currentStyles from './App.module.scss'
import {
    RouterProvider
} from 'react-router-dom';
import { router } from './router/index'
function App() {

  return (
    <div className={currentStyles.App}>
        <RouterProvider router={router}/>
    </div>
  )
}

export default App

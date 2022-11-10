import React from 'react';
import Login from '../pages/login/index';
import SignUp from "../pages/signUp";
import Homepage from '../pages/homepage';
import TaskList from "../pages/taskList";
import CreateTask from '../pages/createTask';
import NullTask from '../pages/nullTask';
import {
    createBrowserRouter
} from 'react-router-dom';
export const router = createBrowserRouter([
    {
        path : '/',
        element : <Login />,
    },
    {
        path : 'signUp',
        element : <SignUp />
    },
    {
        path : 'taskList',
        element : <Homepage />,
        children : [
            {
                path : '',
                element : <TaskList />
            },
            {
                path : 'createTask',
                element : <CreateTask />
            },
            {
                path : 'nullTask',
                element : <NullTask />
            }
        ]
    },
]);


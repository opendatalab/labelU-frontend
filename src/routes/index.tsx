import React, { lazy, FC } from 'react';
import LoginPage from '../pages/login';
import LayoutPage from '../pages/layout';
import { RouteObject } from 'react-router';
import WrapperRouteComponent from './config';
import { useRoutes } from 'react-router-dom';
import AnnotationPage from '../pages/annotation';
import AnnotationConfig from '../pages/annotationConfig';
import Login1 from '../pages/login1/index';
import SignUp from "../pages/signUp";
import Homepage from '../pages/homepage';
import TaskList from "../pages/taskList";
import CreateTask from '../pages/createTask';
import NullTask from '../pages/nullTask';
import InputInfoConfig from '../pages/inputInfoConfig';
import InputData from '../pages/inputData';
import TaskAnnotation from "../pages/annotation2";
import Samples from "../pages/samples";
import RootGuard, { action as RootAction } from "../pages/guards/rootGuard";
const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '../pages/404'));


const routeList: RouteObject[] = [
  // {
  //   path: '/login',
  //   element: <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />
  // },
  // {
  //   path: '/annotation',
  //   element: <WrapperRouteComponent element={<AnnotationPage />} titleId="title.annotation" />
  // },
  // {
  //   path: '/',
  //   element: <WrapperRouteComponent element={<AnnotationConfig />} titleId="title.annotationConfig" />
  // },



  // {
  //   path: '/',
  //   element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
  //   children: [
  //     {
  //       path: '*',
  //       element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />
  //     }
  //   ]
  // }



    // 定名词
    // 定路由

  {
    path : '/',
    element : <RootGuard />,
    // action : RootAction,
    children : [
      {
        path : '',
        element : <Homepage />,
        children : [
          {
            path : '',
            element : <TaskList />
          },
        ]
      },
      {
        path : 'tasks',
        element : <Homepage />,
        children : [
          {
            path : '',
            element : <TaskList />
          }
        ]
      },
      {
        path : 'tasks/:id',
        element : <Homepage />,
        children : [
          {
            path : '',
            element : <Samples />
          },
          {
            path : 'edit',
            element : <CreateTask />,
            children : [
              {
                path : 'basic',
                element : (<InputInfoConfig />)
              },
              {
                path : 'upload',
                element : (<InputData />)
              },
              {
                path : 'config',
                element : (<AnnotationConfig />)
              },
            ]
          },
          {
            path : 'samples/:sampleId',
            element: <TaskAnnotation />
          }
        ]
      }
    ]
  },
  {
    path : 'login',
    element : <Login1 />,
  },
  {
    path : 'register',
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
        element : <CreateTask />,
        children : [
          {
            path : '',
            element : <InputInfoConfig />
          },
          {
            path : 'inputInfoConfig',
            element : <InputInfoConfig />,
          },
          {
            path : 'inputData',
            element : <InputData />,
          },
          {
            path : 'annotationConfig',
            element : <AnnotationConfig />,
          },
        ]
      },
      {
        path : 'nullTask',
        element : <NullTask />
      },
      {
        path : 'task',
        element : (<div></div>),
        children : [
          {
            path : 'taskAnnotation',
            element : <TaskAnnotation/>
          }
        ]
      },
      {
        path : 'samples',
        element : <Samples />
      }
    ]
  },
  // {
  //   path : 'tasks',
  //   element : <TaskAnnotation/>
  // }





];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;

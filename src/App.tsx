import React, { useState} from 'react';
import './App.css';
import Login from './pages/login/index';
import commonController from "./utils/common";
import { data } from './utils/data';
import Family from './components/family';

import {
  createBrowserRouter,
  RouterProvider,
  Router
} from 'react-router-dom'

import Test from './components/test';

const router = createBrowserRouter([
  {
    path : '/',
    element : <Login />
  }
])

const App = ()=>{
  const [currentDatas, setCurrentDatas] = useState(data);
  const [nickname, setNickName] = useState('');
  // const [c, setC] = useState(0)
  const changeInput = (event : any)=>{
    let nickname = event.target.value;
    setNickName(nickname);
    // if (nickname === '') {
    //   console.log(1);
    // }else{
    //   console.log(2);
    // };
  }
  // useEffect(()=>{
  //
  // },[])
  const searchDatas = ()=>{
    // console.log(nickname)
    const result = commonController.dfs(nickname.trim() , data);
    if (result) {
      setCurrentDatas(result);
    }else{
      setCurrentDatas([]);
    }
  }

  const deleteBranch = (id  : number)=>{
    let newDatas = commonController.bfs(id , data);
    // console.log(newDatas)
    setCurrentDatas(newDatas);
    if (newDatas && newDatas.length > 0) {
      setCurrentDatas(Object.assign([],newDatas));
    }else{
      setCurrentDatas([]);
    }
  }
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

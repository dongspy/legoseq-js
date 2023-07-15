/* eslint-disable import/no-anonymous-default-export */
import {Navigate,useRoutes} from 'react-router-dom'
import PublicLayout from '../layout/index'
import Home from '../view/home'
import Login from '../view/login/login'
import {default as LegoSeq2}  from "../view/legoseq2"
import LegoSeq from "../view/legoseq"


const routes = [
  {
    path:'/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <PublicLayout />,
    children:[
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/legoseq',
        element: <LegoSeq />
      },
      {
        path: '/legoseq2',
        element: <LegoSeq2 />
      },
    ]
  },
  {
		path: "*",
		element: <Navigate to="/404" />
	}
]

const Router = () =>{
  const router = useRoutes(routes);
  return router
}

export default Router
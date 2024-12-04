import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Homepage } from './pages/Homepage'
import { Posts } from './pages/Posts'
import { AddEditPost } from './pages/AddEditPost'
import { Auth } from './pages/Auth'
import { PWreset } from './pages/PWreset'
import { Profile } from './pages/Profile'
import { Admin } from './pages/Admin'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Header } from './components/Header'
import { NotFound } from './pages/NotFound'

const router=createBrowserRouter([{
  element: <Header/>,
    children:
    [
    {path:'/',element:<Homepage/>},
    {path:'/posts',element:<Posts/>},
    {path:'/create',element:<AddEditPost/>},
    {path:'/update/:id',element:<AddEditPost/>},
    {path:'/auth/in',element:<Auth/>},
    {path:'/auth/up',element:<Auth/>},
    {path:'/pwreset',element:<PWreset/>},
    {path:'/profile',element:<Profile/>},
    {path:'/admin',element:<Admin/>},
    {path:'*',element:<NotFound/>}
  ]
  }],
  {
  
  
    future: {
  
  
      v7_relativeSplatPath: true,
  
  
      v7_normalizeFormMethod: true,
  
  
      v7_fetcherPersist: true,
  
  
      v7_partialHydration: true,
  
  
      v7_skipActionErrorRevalidation: true,
  
  
     
  
    }})

function App() {

  return (
    <RouterProvider router={router} future={{v7_startTransition:true}}/>
  )
}

export default App

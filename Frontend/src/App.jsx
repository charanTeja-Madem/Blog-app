import React from 'react'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import UserDashboard from './components/UserDashboard'
import AuthorDashboard from './components/AuthorDashboard'
import AdminDashboard from './components/AdminDashboard'
import ArticleByID from './components/ArticleByID'
import EditArticle from './components/EditArticle'
import WriteArticle from './components/WriteArticle'
import AuthorArticles from './components/AuthorArticles'
import Articles from './components/Articles'
import Footer from './components/Footer'
import {createBrowserRouter, RouterProvider} from 'react-router'
import RootLayout from './components/RootLayout'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import Unauthorized from './components/Unauthorized'

import { useAuth } from '../store/authStore'
import { useEffect } from 'react'

function App() {
  const checkSession = useAuth((state) => state.checkSession);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const routerobj=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/user-profile',
          element: <ProtectedRoute role={["USER","AUTHOR","ADMIN"]}><UserDashboard/></ProtectedRoute>,
          children: [
            {
              path: '',
              element: <Articles />
            }
          ]
        },{
          path:'/author-profile',
          element:<ProtectedRoute role={["AUTHOR"]}><AuthorDashboard/></ProtectedRoute>,
          children: [
            {
              path: 'articles',
              element: <AuthorArticles />
            },
            {
              path: 'write-article',
              element: <WriteArticle />
            }
          ]
        },{
          path:'/admin-profile',
          element:<AdminDashboard/>,
          children: [
            {
              path: 'users',
              element: <div>Users List Component</div>
            },
            {
              path: 'authors',
              element: <div>Authors List Component</div>
            }
          ]
        },{          path:'/articles',
          element:<Articles/>
        },{          path:'/article/:id',
          element:<ArticleByID/>
        },{
          path:'/edit-article/:id',
          element:<EditArticle/>
        }
        ,{
          path:'/Unauthorized',
          element:<Unauthorized/>
        },
      ]
    }
  ])
  return (
    <>{/* react fragment */}
    <Toaster position='top-center' reverseOrder={false}/>
    <RouterProvider router={routerobj}/>
    </>
  )
}

export default App
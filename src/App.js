import React from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/js/bootstrap'
import { createBrowserRouter , RouterProvider } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './pages/MyOrder';

function App() {

  const router = createBrowserRouter([
    {
path:'/',
element: <Home />
    },
    {
      path:'/login' , 
      element: <Login />
    },
    {
      path:'/createuser',
      element:<SignUp />
    },
    {
      path:'/myOrder',
      element:<MyOrder />
    }
  ])

  return (
    <CartProvider>
    <div className="App">
      <RouterProvider router={router} />
    </div>
    </CartProvider>
  );
}

export default App;

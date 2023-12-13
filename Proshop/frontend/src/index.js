import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,
createRoutesFromElements,
Route,RouterProvider} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import { Provider } from 'react-redux';
// import store from './store.js ';
import store from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoutes from './componets/PrivateRoutes';
import HomeScreens from './screens/HomeScreens.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen.js';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreens/>}/>
      <Route  path='/product/:id' element={<ProductScreen/>}/>
      <Route path='/cart' element = {<CartScreen/>}/>
      <Route path='/login' element = {<LoginScreen/>}/>
      <Route path='/register' element = {<RegisterScreen/>}/>

      <Route path='' element={<PrivateRoutes/>}>
      <Route path='/shipping' element = {<ShippingScreen/>}/> 

      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={store} >
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

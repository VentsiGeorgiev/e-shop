import { Routes, Route, useParams, useSearchParams } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Shipping from './pages/Shipping/Shipping';
import Payment from './pages/Payment/Payment';

function App() {
  return (
    <>
      <Header />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/cart/:id' element={<Cart />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/profile' element={<PrivateRoute />} >
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/shipping' element={<PrivateRoute />} >
            <Route path='/shipping' element={<Shipping />} />
          </Route>
          <Route path='/payment' element={<PrivateRoute />} >
            <Route path='/payment' element={<Payment />} />
          </Route>

        </Routes>

      </main>
    </>
  );
}

export default App;

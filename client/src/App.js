import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <>
      <Header />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<Product />} />
          <Route path='/cart/:id' element={<Cart />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='/sign-up' element={<Register />} />
        </Routes>

      </main>
    </>
  );
}

export default App;

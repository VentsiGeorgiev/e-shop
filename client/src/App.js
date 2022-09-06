import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';

function App() {
  return (
    <>
      <Header />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<Product />} />
          <Route path='/cart/:id' element={<Cart />} />
        </Routes>

      </main>
    </>
  );
}

export default App;

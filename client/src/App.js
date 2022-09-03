import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>

      </main>
    </>
  );
}

export default App;

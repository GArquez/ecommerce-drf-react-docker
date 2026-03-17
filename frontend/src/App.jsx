import { Navigation } from './Components/Navigation/Navigation';
import { Main } from './Components/Main/Main';
import { ProductsContainer } from './Components/ProductsContainer/ProductsContainer'
import { Checkout } from './Components/Checkout/Checkout';
import { Footer } from './Components/Footer/Footer'
import { CartProvider } from './Context/Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartModal } from './Components/CartModal/CartModal';
import './App.css';

function App() {

  return (
    
    <CartProvider>
      <BrowserRouter>
      <div className="layout-container">
        <Navigation />
        <CartModal />
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/products' element={<ProductsContainer />}/>
            <Route path='/category/:category' element={<ProductsContainer />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={<h1 style={{display: "flex", alignItems: "center", justifyContent: "center", height: "500px"}}>Error 404 Not Found</h1>} />
          </Routes>
          </main>
        <Footer />
      </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Categoria from './pages/Categoria';
import OrderDetails from './pages/OrderDetails';
import MealDetail from './pages/MealDetail';
import Cart from './pages/Cart';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
        <Header />
        <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/categoria/:cat" element={<Categoria />} />
          <Route path="/pedido/:id" element={<OrderDetails />} />
          <Route path="/pedido" element={<OrderDetails />} />
          <Route path="/plato/:id" element={<MealDetail />} />
          <Route path="/plato" element={<MealDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  )
}

export default App

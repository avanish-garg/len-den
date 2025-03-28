import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/login'
import Signup from './components/signup'
import ForgetPassword from './components/forgetpass'
import Success from './components/success'
import PasswordSuccess from './components/PasswordSuccess'
import Listings from './pages/Listings'
import About from './pages/About'
import Contact from './pages/Contact'
import Categories from './pages/Categories'
import CategoryListings from './pages/CategoryListings'
import Explore from './pages/Explore'
import AddItem from './pages/AddItem'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ItemDetail from './pages/ItemDetail'
import Orders from './pages/Orders'
import { UserProvider } from './context/UserContext'
import { ItemProvider } from './context/ItemContext'
import { LanguageProvider } from './context/LanguageContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'

export const App = () => {
  return (
    <UserProvider>
      <ItemProvider>
        <LanguageProvider>
          <CartProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gray-100">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgetpass" element={<ForgetPassword />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/password-success" element={<PasswordSuccess />} />
                  <Route path="/listings" element={<CategoryListings />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/add-item" element={<AddItem />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/item/:id" element={<ItemDetail />} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
              </div>
            </BrowserRouter>
          </CartProvider>
        </LanguageProvider>
      </ItemProvider>
    </UserProvider>
  )
}

import { Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import FormProduct from "./pages/FormProduct"
import ProductDetail from "./pages/ProductDetail"
import About from "./pages/About"
import Favorites from "./pages/Favorites"
import Navbar from "./components/NavBar"
import FormUser from "./pages/FormUser"

function App() {

  return (
    <>
      <div>
        <Navbar/>
        <h1>React Router</h1>
      </div>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/products/add" element={<FormProduct />} />
        <Route path="/products/:id/edit" element={<FormProduct />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/add" element={<FormUser />} />
         <Route path="/user/login" element={<FormUser />} />
      </Routes>
    </>
  )
}

export default App

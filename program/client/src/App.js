import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/authContext";
import { Loader } from "./components/Loader/loader";
import NavBar from "./components/menu/menu";
import ShopPage from "./pages/shopPage/shopPage";
import AdminPage from "./pages/adminPage/adminPage";
import AccauntPage from "./pages/accauntPage/accauntPage";
import ItemPage from "./pages/itemPage/itemPage";
import CartPage from "./pages/cartPage/cartPage";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthent = !!token;

  if (!ready) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthent }}>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/service" element={<AdminPage />} />
          <Route path="/profile" element={<AccauntPage />} />
          <Route path="/item:id" element={<ItemPage />} />
          <Route path="/shoplist" element={<CartPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;

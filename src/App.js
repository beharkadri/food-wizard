import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RecipeDetail from "./pages/RecipeDetail";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "react-hot-toast";
import FavoritesPage from "./pages/FavoritesPage";
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
function App() {
  return (
    <div className="bg-white">
      <Routes>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LogInPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="recipes/:id" element={<RecipeDetail />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;

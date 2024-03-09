import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/signInPage/SigninPage.jsx";
import SignUpPage from "./pages/signUpPage/SignUpPage.jsx";
import LoginHelpPage from "./pages/loginHelpPage/LoginHelpPage.jsx";
import ResetPwdPage from "./pages/resetPage/ResetPwdPage.jsx";
import MyListPage from "./pages/myListPage/MyListPage.jsx";
import ContentPage from "./pages/contentPage/ContentPage.jsx";
import SearchPage from "./pages/search/SearchPage.jsx";
import NavBar from "./components/Shared/NavBar/NavBar.jsx";
import { useEffect, useState } from "./imports.js";
import PlayPage from "./pages/playPage/PlayPage.jsx";

function App() {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])
  
  return (
    <BrowserRouter>
       <NavBar className={isScrolled ? 'navBarInHomePage scrolled' : 'navBarInHomePage'} />
      <Routes>
        <Route path="/" element={<ContentPage />} />
        <Route path="/series" element={<ContentPage />} />
        <Route path="/movies" element={<ContentPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotPwd" element={<LoginHelpPage />} />
        <Route path="/resetPwd" element={<ResetPwdPage />} />
        <Route path="/myList" element={<MyListPage />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="/play/:id" element={<PlayPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

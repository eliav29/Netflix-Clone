import './navBar.css'
import SearchBox from '../SearchBox/SearchBox.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../../Store';
import { USER_SIGNOUT } from '../../../reducers/actions';

const NavBar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState();
  const [isScrolled, setIsScrolled] = useState(false);

  function toggleDropdown() {
    const dropdownContent = document.getElementById("myDropdown");
    dropdownContent.style.display = dropdownContent.style.display === "inline-block" ? "none" : "inline-block";
  }

  useEffect(() => {
    const pathName = location.pathname.toLowerCase();
    const isSignInOrSignUpPage = pathName === "/signin" || pathName === "/signup" || pathName === "/resetpwd" || pathName === "/forgotpwd" || pathName.startsWith("/play");
    setShowNavBar(isSignInOrSignUpPage)
  }, [location])

  const signOutNetflix = () => {
    ctxDispatch({ type: USER_SIGNOUT });
    navigate('/signin');
  }

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


  if (showNavBar) {
    return null
  }

  return (
    <div id="mainDivNavBar" className={isScrolled ? 'navBarInHomePage scrolled' : 'navBarInHomePage'}>
      <ul className='ul-navBar'>
        <li>
          <a className='logoNavBar' href="/">
            <img src="Netflix-logo.png" width={100} height={50} alt="netflix logo" />
          </a>
        </li>

        <div className='pagesNavigateNavBar'>
          <li><a href='/'>Home Page</a></li>
          <li><a href='/series'>Series</a></li>
          <li><a href='/movies'>Movies</a></li>
          <li><a href='/myList'>My List</a></li>
        </div>

        <div className='icons-navBar'>
          <SearchBox></SearchBox>

          <li><a href='#'><i className="fa fa-bell" aria-hidden="true"></i></a></li>

          <div className='dropdown'>
            <button className='btnDropdown' onClick={() => toggleDropdown()}>
              <img className='imgDropdown' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='Avatar' />
            </button>

            <div id="myDropdown" className='dropdown-content'>
              <button className='dropDownBtn' onClick={signOutNetflix}>Sign out of Netflix</button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  )
}

export default NavBar
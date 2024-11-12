import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import { Col, Row } from "reactstrap";
import { CiDark, CiLight } from "react-icons/ci";  // Theme icons
import { HiMenuAlt1 } from "react-icons/hi";  // Menu icon
// import { FaEnvelopeOpenText, FaEnvelope } from "react-icons/fa";  
import { useSelector } from 'react-redux'; 
import LoginModal from './loginModal';
import SignupModal from './signUpModal';
import Sidebar from './sidebar';
// import { subscribeApi, unSubscribeApi, getSubscribeApi } from '../../APIs/subscription';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '../../store/credentialsSlice';

export default function Navbar({ page }) {
  
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.credentials.credentials);
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const navigate = useNavigate();
  const [path, setPath] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [theme, setTheme] = useState(document.body.getAttribute('data-theme'));
  const [tab, setTab] = useState(0);
  
  // Subscription state
  // const [isSubscribed, setIsSubscribed] = useState(false);

  // const getSubscriptionHandler = async () => {
  //   const { data, status } = await getSubscribeApi()
  //   setIsSubscribed(data);
  // }
  
  // useEffect(() => {

  //   if(page || credentials){
  //     getSubscriptionHandler()
  //   }
  // }, [page]);

  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);

  // Toggle Sidebar
  const handleSidebarToggle = () => {
    if (showSidebar) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsAnimatingOut(false);
        setShowSidebar(false);
      }, 500); // The timeout should match the duration of the slide-out animation
    } else {
      setShowSidebar(true);
    }
  }

  // Toggle Theme
  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute('data-theme');
    document.body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    setTheme(document.body.getAttribute('data-theme'));
  }
  
  // const handleSubscriptionToggle = async () => {
  //   if(isSubscribed){
  //     await unSubscribeApi()
  //   }else{
  //     await subscribeApi()
  //   }
  //   setIsSubscribed(!isSubscribed);
  // }

  return (
    <>
      <nav style={{ backgroundColor: 'black' }} className="navbar navbar-expand-md bg-inverse fixed-top scrolling-navbar">
        <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
        <SignupModal signupModal={signUpModal} setSignupModal={setSignUpModal} />

        <div style={{ height: '75px' }} className="container">
          <a className="navbar-brand">
            <img width={65} height={65} src="img/logo.png" alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <img src={"icons/menu.svg"} />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto w-100 justify-content-end">
              <li className="nav-item">
                <a className="nav-link page-scroll cursor-pointer" onClick={() => navigate('/')}>
                  Menu
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll cursor-pointer" onClick={() => navigate('/faq')}>
                  FAQ
                </a>
              </li>
              <li className="nav-item">
                {credentials?.role ?
                  <a onClick={() => {
                    dispatch(clearCredentials());
                    navigate('/');
                  }} className="btn btn-singin text-white">
                    Log Out
                  </a>
                  :
                  <a onClick={() => setLoginModal(true)} className="btn btn-singin text-white">
                    Log In
                  </a>
                }
              </li>
              <li className="nav-item">
                {credentials?.role ? null : 
                  <a onClick={() => setSignUpModal(true)} className="btn btn-singin text-white">
                    Sign Up
                  </a>
                }
              </li>

              {/* {credentials?.role && credentials?.role !== "Admin" ?
                <li className="nav-item">
                  <Button
                    onClick={handleSubscriptionToggle}
                    color={isSubscribed ? 'danger' : 'success'}
                    className="ml-2"
                  >
                    {isSubscribed ? (
                      <>
                        <FaEnvelopeOpenText style={{ marginRight: '5px' }} /> Unsubscribe
                      </>
                    ) : (
                      <>
                        <FaEnvelope style={{ marginRight: '5px' }} /> Subscribe
                      </>
                    )}
                  </Button>
                </li>
                : null
              } */}
              

              <li className="nav-item">
                <div onClick={toggleTheme} style={{ width: '40px', height: '40px', borderRadius: '100px' }} className='ml-2 cursor-pointer'>
                  {theme === 'dark' ?
                    <CiLight style={{ fontSize: '40px', color: 'white' }} />
                    : <CiDark style={{ fontSize: '40px', color: 'white' }} />
                  }
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav style={{ backgroundColor: 'black' }} className=" fixed-top navbar-mobile scrolling-navbar">
        <div style={{ height: '75px' }} className="container d-flex justify-content-between align-items-center">
          <div className='d-flex align-items-center'>
            <button onClick={handleSidebarToggle} className="navbar-toggler">
              <HiMenuAlt1 className='text-white' style={{ fontSize: '30px' }} />
            </button>
            <a>
              <img width={60} height={60} src="img/logo.png" alt="" />
            </a>
          </div>

          <div className="nav-item d-flex flex-row gap-2">
            {credentials?.role ?
              <a style={{
                background: '#fc724c',
                color: 'white',
                padding: '8px 10px',
                marginLeft: '30px',
                boxShadow: '0px 8px 9px 0px rgba(96, 94, 94, 0.17)'
              }} onClick={() => {
                dispatch(clearCredentials());
                navigate('/');
              }} className="btn">
                Log Out
              </a>
              :
              <>
                <a style={{
                  background: '#fc724c',
                  color: 'white',
                  padding: '8px 10px',
                  marginLeft: '30px',
                  boxShadow: '0px 8px 9px 0px rgba(96, 94, 94, 0.17)'
                }} onClick={() => setLoginModal(true)} className="btn">
                  Log In
                </a>
                <a onClick={() => setSignUpModal(true)} className="btn btn-singin text-white">
                  Sign Up
                </a>
              </>
            }

            {/* Subscribe/Unsubscribe button for mobile */}
            {/* {page &&
              <Button
                onClick={handleSubscriptionToggle}
                color={isSubscribed ? 'danger' : 'success'}
                className="ml-2"
              >
                {isSubscribed ? (
                  <>
                    <FaEnvelopeOpenText style={{ marginRight: '5px' }} /> Unsubscribe
                  </>
                ) : (
                  <>
                    <FaEnvelope style={{ marginRight: '5px' }} /> Subscribe
                  </>
                )}
              </Button>
            } */}

            <div onClick={toggleTheme} style={{ width: '40px', height: '40px', borderRadius: '100px' }} className='ml-2 cursor-pointer'>
              {theme === 'dark' ?
                <CiLight style={{ fontSize: '40px', color: 'white' }} />
                : <CiDark style={{ fontSize: '40px', color: 'white' }} />
              }
            </div>
          </div>
        </div>
      </nav>

      {showSidebar && 
        <Sidebar 
          showSidebar={showSidebar} 
          setShowSidebar={setShowSidebar} 
          handleSidebarToggle = {handleSidebarToggle}
          isAnimatingOut = {isAnimatingOut}
          page = {page}
          // handleSubscriptionToggle = {handleSubscriptionToggle}
          // isSubscribed = {isSubscribed}
          tab={tab}
          setTab={setTab}
        />
      }
    </>
  );
}

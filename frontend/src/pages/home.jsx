import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import Navbar from "../components/global/navbar";
import Menu from "../components/home/menu";
import Footer from "../components/global/footer";
import { useNavigate } from "react-router-dom";


export default function Home() {
 
  const credentials = useSelector((state) => state.credentials.credentials);
  const navigate = useNavigate()
  

  useEffect(() => {
    if (credentials?.role === 'Student') {
        navigate('/student')
    } 
    if (credentials?.role === 'Admin') {
      navigate('/admin')
    }  
    
  }, []);

  return (
    <>
      {/* Header Section Start */}
      <header id="home" className="hero-area">
        <div className="content-box">

          <div className="overlay">
            <span></span>
          </div>
          <Navbar />
          
        </div>
      </header>
      {/* Header Section End  */}
      <section id="features" className="section">
        
        <div className="container">
          <Menu />
        </div>
      </section>
    </>
  )
}

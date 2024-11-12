import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";
import { useNavigate } from "react-router-dom";

export default function FAQ() {
 
  const credentials = useSelector((state) => state.credentials.credentials);
  const navigate = useNavigate();

  useEffect(() => {
    if (credentials?.role === 'Student') {
        navigate('/student');
    } 
    if (credentials?.role === 'Admin') {
      navigate('/admin');
    }  
  }, [credentials, navigate]);

  return (
    <>
      <header id="faq" className="hero-area">
        <div className="content-box">
          <div className="overlay">
            <span></span>
          </div>
          <Navbar />
        </div>
      </header>
      {/* Main FAQ Content */}
      <section className="section">
        <div className="container">
          <h1 style={{ textAlign: 'center' }}>Frequently Asked Questions (FAQ)</h1>
          <div className="desc-text" color='black'>
              <p>
              Want to know what’s to eat? You’ve come to the right place. 
              <ul>
            <li>Bullet Point 1</li>
            <li>Bullet Point 2</li>
            <li>Bullet Point 3</li>
          </ul>
          <ol>
            <li>Step 1</li>
            <li>Step 2</li>
            <li>Step 3</li>
          </ol>
          <p>
            For more information, please visit our <a href="https://www.example.com">help page</a>.
          </p>
          </p>


            </div>
    
        </div>
      </section>
  
    </>
  );
}

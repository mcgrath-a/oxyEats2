import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
      <ToastContainer 
        position="top-right"   // Set position of the toasts
        autoClose={3000}       // Auto close after 3 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false}    // Newest toast appears at the bottom
        closeOnClick           // Allow closing on click
        pauseOnHover           // Pause auto-close on hover
        draggable              // Allow dragging to close
        theme="light"          // Theme (light/dark/colored)
      />
      <App />
    </Provider> 
  </React.StrictMode>,
)

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home";
import FAQ from "./pages/faq";
import Busy from "./pages/busy";
import { Toaster } from "react-hot-toast";
import Student from "./pages/student";
import Admin from "./pages/admin";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/credentialsSlice";
import "animate.css";

function App() {
  const dispatch = useDispatch();

  const getSession = async () => {
    try {
      const credentials =
        localStorage.getItem("credentials") &&
        JSON.parse(localStorage.getItem("credentials"));

      dispatch(
        setCredentials({
          newsEmail: credentials?.newsEmail,
          email: credentials?.email,
          role: credentials?.role,
          fullName: credentials?.fullName,
          _id: credentials?._id,
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/busy" element={<Busy />} />
        <Route path="/student" element={<Student />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;

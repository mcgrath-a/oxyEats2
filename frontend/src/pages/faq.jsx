import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/global/navbar";
import Menu from "../components/home/menu";
import Footer from "../components/global/footer";
import { useNavigate } from "react-router-dom";
import { setCurrentTab } from "../store/sidebarTabsSlice";

export default function FAQ() {
  const currentTab = useSelector((state) => state.sideBarTabs.currentTab);
  const credentials = useSelector((state) => state.credentials.credentials);

  const [studentItems, setStudentItems] = useState([
    "Student Dashboard",
    "Favorite Items",
    "User Preferences",
    "Newsletter",
    "Feedback Form",
  ]);

  const [userDetails, setUserDetails] = useState(null);
  const [tab, setTab] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (credentials?.role == "Student") {
      setStudentItems([
        "Student Dashboard",
        "Favorite Items",
        "User Preferences",
        "Newsletter",
        "Feedback Form",
      ]);
    }
    if (credentials?.role == "Admin") {
      setStudentItems([
        "Dashboard",
        "Rating Insights",
        "Favorite Insights",
        "Banner Timing",
        "Menus",
        "Add menu",
      ]);
    }
  }, [credentials]);

  useEffect(() => {
    setUserDetails(credentials);
    setTab(currentTab);
  }, [credentials, currentTab]);

  const redirectHandler = (index) => {
    dispatch(setCurrentTab({ tab: index }));

    if (credentials?.role == "Student") {
      navigate("/student");
    }
    if (credentials?.role == "Admin") {
      navigate("/admin");
    }
  };

  return (
    <>
      <header id="home" className="hero-area">
        <div className="content-box">
          <div className="overlay">
            <span></span>
          </div>
          <Navbar />
        </div>
      </header>
      <section className="section">
        <div className="container">
          <h1 style={{ textAlign: "center" }}>
            Frequently Asked Questions (FAQ)
            {/* // may change to 'Help' section */}
          </h1>
          {/* Embed YouTube Video */}
          <div
            className="video-container"
            style={{ textAlign: "center", padding: "20px" }}
          >
            <iframe
              style={{ width: "100%", height: "315px", maxWidth: "660px" }} // Responsive width and maximum width set test
              src="https://www.youtube.com/embed/jfKfPfyJRdk?si=j9wVli1GoZvXqR6Y"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowfullscreen
            ></iframe>
            <div style={{ marginTop: "20px" }}>
              <h3>Video Highlights</h3>
              <p>
                {" "}
                <i>
                  See below for timestamps of different actions and key moments
                  in the video that highlight specific features and
                  instructions.
                </i>{" "}
              </p>
              <br></br>
              <ul>
                <li>
                  <strong>0:36</strong> - See how to sign up for the service.
                </li>
                <li>
                  <strong>1:15</strong> - Overview of user dashboard features.
                </li>
                <li>
                  <strong>2:00</strong> - Instructions for setting user
                  preferences.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

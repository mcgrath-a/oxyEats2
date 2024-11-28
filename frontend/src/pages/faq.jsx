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
    "Newsletter",
    "Feedback Form",
    "User Preferences",
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
        "Newsletter",
        "Feedback Form",
        "User Preferences",
      ]);
    }
    if (credentials?.role == "Admin") {
      setStudentItems([
        "Dashboard",
        "Rating Insights",
        "Favorite Insights",
        "Banner Timing",
        "Menus",
        "Add Menu Item",
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
            Help / User Tutorial
            {/* // may change to 'Help' section */}
          </h1>
          {/* Embed YouTube Video */}
          <div
            className="video-container"
            style={{ textAlign: "center", padding: "20px" }}
          >
            <iframe
              style={{ width: "100%", height: "315px", maxWidth: "470px" }} // Responsive width and maximum width set test
              src="https://www.youtube.com/embed/LcDJfjP8R74?si=gaL4aPtQixkI4XQl"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowfullscreen
            ></iframe>
            <div style={{ marginTop: "20px" }}>
              <h5>Video Highlights</h5>
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
                  <strong>0:15</strong> - Landing page naviagtion
                </li>
                <li>
                  <strong>0:41</strong> - Expand/Collapse all sections
                </li>
                <li>
                  <strong>0:52</strong> - Search functionality & results
                </li>
                <li>
                  <strong>1:12</strong> - Download & print weekly menu
                </li>
                <li>
                  <strong>1:32</strong> - MP Hours status
                </li>
                <li>
                  <strong>1:42</strong> - Busyness: view crowdedness of MP at
                  current time
                </li>
                <li>
                  <strong>2:10</strong> - Logging In
                </li>
                <li>
                  <strong>2:24</strong> - Student Dashboard Landing page
                </li>
                <li>
                  <strong>2:38</strong> - Student Dashboard side panel tabs
                </li>
                <li>
                  <strong>2:57</strong> - Dark & Light mode
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

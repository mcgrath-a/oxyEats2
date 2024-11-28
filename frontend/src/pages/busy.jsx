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
            Busyness
            {/* // may change to 'Help' section */}
          </h1>
          {/* Embed YouTube Video */}
          <p>
            <p style={{ textAlign: "center", fontSize: "20px" }}>
              <span style={{ color: "red", fontWeight: "bold" }}>Red</span>{" "}
              indicates that the MP is very busy.{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                Yellow
              </span>{" "}
              indicates moderate activity.{" "}
              <span style={{ color: "green", fontWeight: "bold" }}>Green</span>{" "}
              signifies that the MP is less busy or has minimal activity.
            </p>
          </p>
          <div
            className="video-container"
            style={{ textAlign: "center", padding: "20px" }}
          >
            <iframe
              style={{ width: "100%", height: "875px", maxWidth: "1060px" }} // Responsive width and maximum width set test
              src="https://grafana.csc.oxy.edu/public-dashboards/eaa288a214ee454589632e228e58772d?orgId=1"
              title="YouTube video player"
              frameborder="0"
              scrol="no"
            ></iframe>
            <p>
              Dashboard thanks to Liv Gilber-Adler and Computer Science Club!
            </p>
            <div style={{ marginTop: "20px" }}></div>
          </div>
        </div>
      </section>
    </>
  );
}

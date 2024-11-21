import { useEffect, useState, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { FaEnvelopeOpenText, FaEnvelope } from "react-icons/fa";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "../../store/sidebarTabsSlice";
import { useNavigate } from "react-router-dom";

export default function Sidebar({
  showSidebar,
  isAnimatingOut,
  handleSidebarToggle,
  page,
  // handleSubscriptionToggle,
  // isSubscribed,
  tab,
  setTab,
}) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.credentials.credentials);
  const location = useLocation();
  const path = location.pathname;

  // Create a ref to track the sidebar element
  const sidebarRef = useRef(null);

  const menuItems = [
    { name: "Menu", route: "/" },
    { name: "FAQ", route: "/faq" },
    { name: "Traffic", route: "/busy" },
  ];
  const studentItems = [
    "Student Dashboard",
    "Favorite Items",
    "Newsletter",
    "Feedback Form",
    "User Preferences",
  ];
  const adminItems = [
    "Dashboard",
    "Rating Insights",
    "Favorite Insights",
    "Banner Timing",
    "Menu",
    "Add Menu Item",
    "Operating Hours",
  ];

  const currentTabHandler = (index) => {
    dispatch(setCurrentTab({ tab: index }));
    setTab(index);
    handleSidebarToggle();
  };

  // Effect to handle clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        handleSidebarToggle(); // Close sidebar if clicked outside
      }
    };

    // Attach event listener to detect outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleSidebarToggle]);

  return (
    <div
      ref={sidebarRef}
      style={{ width: "300px", height: "100vh", top: 0, zIndex: 10000 }}
      className={`bg-lightorange sidebar position-fixed left-0 p-1 py-3  
      ${
        showSidebar && !isAnimatingOut
          ? "animate__animated animate__slideInLeft animate__faster"
          : ""
      }
      ${
        isAnimatingOut
          ? "animate__animated animate__slideOutLeft animate__faster"
          : ""
      }`}
    >
      <div className="d-flex flex-col align-items-center mx-3">
        {path === "/" || path === "/faq" || path === "/busy" ? (
          <>
            <div
              style={{ fontSize: "22px" }}
              className="my-1 mb-3 cursor-pointer w-100 d-flex justify-content-between text text-black border-circular"
            >
              <a>
                <img width={60} height={60} src="img/logo.png" alt="" />
              </a>
              <IoCloseOutline onClick={handleSidebarToggle} />
            </div>
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.route)}
                className={`cursor-pointer w-100 p-2 ${
                  tab === index ? "bg-orange text-white" : "text-black"
                } text border-circular`}
              >
                ⦿ {item.name}
              </div>
            ))}
          </>
        ) : null}
        {path === "/student" && (
          <>
            <div
              style={{ fontSize: "22px", fontWeight: "bolder" }}
              className="my-1 mb-3 cursor-pointer w-100 d-flex justify-content-between text text-black border-circular"
            >
              Hi, {credentials.fullName} 😊
              <IoCloseOutline onClick={handleSidebarToggle} />
            </div>
            {studentItems.map((item, index) => (
              <div
                key={index}
                onClick={() => currentTabHandler(index)}
                style={{ fontWeight: "-moz-initial" }}
                className={`cursor-pointer w-100 p-2 mb-2 ${
                  tab === index ? "bg-orange text-white" : "text-black"
                } text border-circular`}
              >
                ⦿ {item}
              </div>
            ))}
            {/* {page && (
              <Button onClick={handleSubscriptionToggle} 
                color={isSubscribed ? 'danger' : 'success'} 
                className="w-100 navbar-mobile">
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
            )} */}
          </>
        )}
        {path === "/admin" && (
          <>
            <div
              style={{ fontSize: "22px" }}
              className="my-1 mb-3 cursor-pointer w-100 d-flex justify-content-between text text-black border-circular"
            >
              Admin Dashboard
              <IoCloseOutline onClick={handleSidebarToggle} />
            </div>
            {adminItems.map((item, index) => (
              <div
                key={index}
                onClick={() => currentTabHandler(index)}
                className={`cursor-pointer w-100 p-2 ${
                  tab === index ? "bg-orange text-white" : "text-black"
                } text border-circular`}
              >
                ⦿ {item}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

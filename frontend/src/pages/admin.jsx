import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/global/navbar";
import { useNavigate } from "react-router-dom";
import UserDetails from "./allUsers";
import { getAllUser } from "../APIs/users";
import RatingInsight from "./ratingInsight";
import { getCleanText } from "../utilities";
import BannerTime from "./banner";
import Menu from "../components/home/menu";
import MenuModal from "../components/global/menuModal";
import { fetchMenus, updateMenusApi } from "../store/menuSlice";
import AdminOperatingHours from "../components/global/operatingHours.jsx"; // Import the new component

export default function Admin() {
  const adminItems = [
    "Dashboard",
    "Rating Insights",
    "Favorite Insights",
    "Banner Timing",
    "Menu",
    "Add Menu Item",
    "Operating Hours", // Add this new tab
  ];
  const currentTab = useSelector((state) => state.sideBarTabs.currentTab);
  const credentials = useSelector((state) => state.credentials.credentials);
  const { loading, menus, error } = useSelector((state) => state.menus);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuUpdateModal, setMenuUpdateModal] = useState(false);
  const [tab, setTab] = useState(1);
  const [userDetails, setUserDetails] = useState(null);
  const [userRatings, setUserRatings] = useState(null);
  const [userFavorites, setUserFavorites] = useState(null);
  const [maxCount, setMaxCount] = useState(0);

  const favoriteInsightGroupAndCountHandler = (totalFavourites) => {
    const nameMap = {}; // Object to store the count of each name

    totalFavourites.forEach((item) => {
      const cleanedName = getCleanText(item.name); // Clean the name

      // If the name already exists, increment its count
      if (nameMap[cleanedName]) {
        nameMap[cleanedName].count += 1;
      } else {
        // If the name doesn't exist, initialize it with a count of 1 and store the object
        nameMap[cleanedName] = { count: 1, item: item };
      }
    });

    // Convert the nameMap object to an array to store each object along with its count
    const nameCountArray = Object.keys(nameMap).map((name) => ({
      name: name,
      count: nameMap[name].count,
      _id: nameMap[name].item._id,
    }));

    let maxCount = nameCountArray.reduce((maxItem, currentItem) => {
      return currentItem.count > maxItem.count ? currentItem : maxItem;
    }, nameCountArray[0]);
    setUserFavorites(nameCountArray);
    setMaxCount(maxCount.count);
  };

  const ratingInsightGroupAndAvgHandler = (totalRatings) => {
    if (totalRatings && totalRatings.length > 0) {
      const ratingMap = {}; // To store grouped items with their total and count
      let maxCount = 0;

      totalRatings.forEach((item) => {
        const cleanedName = getCleanText(item.name); // Clean special characters
        if (ratingMap[cleanedName]) {
          ratingMap[cleanedName].totalRating += item.rating;
          ratingMap[cleanedName].count += 1;
        } else {
          ratingMap[cleanedName] = { totalRating: item.rating, count: 1 };
        }
      });

      const data = [];

      Object.keys(ratingMap).forEach((key) => {
        const averageRating = ratingMap[key].totalRating / ratingMap[key].count;
        data.push({ name: key, rating: averageRating });
      });
      setUserRatings(data);
    }
  };

  const getAllUsers = async () => {
    try {
      const { data, status } = await getAllUser();
      let totalRatings = [];
      let totalFavorites = [];
      data.map((user) => {
        user.ratings?.map((ratingArray) => {
          totalRatings = [...totalRatings, ratingArray];
        });
        user.favorites?.map((favoriteArray) => {
          totalFavorites = [...totalFavorites, favoriteArray];
        });
      });
      ratingInsightGroupAndAvgHandler(totalRatings);
      favoriteInsightGroupAndCountHandler(totalFavorites);
      setUserDetails(data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    if (credentials?.role !== "Admin") {
      navigate("/");
    }
    getAllUsers();
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const backToTopButton = document.querySelector(".back-to-up");

      if (!backToTopButton) {
        console.warn("Element with class 'back-to-up' not found.");
        return;
      }

      if (scrollPosition > 300) {
        backToTopButton.style.display = "flex";
      } else {
        backToTopButton.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  useEffect(() => {
    setTab(currentTab);
  }, [currentTab]);

  const onUpdate = (updatedMenu) => {
    dispatch(updateMenusApi(updatedMenu));
    dispatch(fetchMenus());
  };

  return (
    <>
      {/* Header Section Start */}
      <header id="home" className="hero-area">
        <div className="content-box">
          <div className="overlay">
            <span></span>
          </div>
          <Navbar page={true} />
          {/* <MainSection /> */}
        </div>
      </header>
      {/* Header Section End  */}
      <section id="features" className="section">
        <div
          style={{ width: "300px", height: "100vh", top: 85, zIndex: 10 }}
          className="bg-lightorange sidebar sidebarPage position-fixed left-0 p-1 py-3"
        >
          <div className=" d-flex flex-col align-items-center mx-3">
            <div
              style={{
                fontSize: "22px",
              }}
              className=" my-1 mb-3 cursor-pointer w-100  text text-black border-circular"
            >
              Admin Dashboard
            </div>
            {adminItems.map((item, index) => (
              <div
                onClick={() => setTab(index)}
                style={{ fontWeight: "bold" }}
                className={`cursor-pointer w-100 p-2 ${
                  tab === index ? "bg-orange  text-white" : "text-black"
                }  text border-circular`}
              >
                ⦿ {item}
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "10px" }} className="menuForPages">
          {tab == 0 && <UserDetails userDetails={userDetails} />}
          {tab == 1 && <RatingInsight data={userRatings} />}
          {tab == 2 && (
            <RatingInsight data={userFavorites} maxCount={maxCount} />
          )}
          {tab == 3 && <BannerTime title={"Banner Timing"} />}
          {tab == 4 && <Menu adminLogin={true} />}
          {tab == 5 && (
            <MenuModal
              menuUpdateModal={menuUpdateModal}
              setMenuUpdateModal={setMenuUpdateModal}
              data={menus}
              onUpdate={onUpdate}
            />
          )}
          {tab == 6 && <AdminOperatingHours />}
        </div>
      </section>
    </>
  );
}

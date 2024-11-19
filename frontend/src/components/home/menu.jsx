import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  FaChevronDown,
  FaChevronUp,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
} from "react-icons/fa6"; // Import star icons
import dayjs from "dayjs";
import { toast } from "react-toastify";
import {
  addFavorite,
  getUserFavorite,
  removeFavorite,
} from "../../APIs/favourite";
import { getFoodNames } from "../../utilities";
import { getBannerTiming } from "../../APIs/banner";
import { scrapeMenus, fetchMenus, updateMenusApi } from "../../store/menuSlice";
import { Button } from "reactstrap";
import MenuModal from "../global/menuModal";
import { setCurrentTab } from "../../store/sidebarTabsSlice";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf"; // Import jsPDF
import { FaFilePdf } from "react-icons/fa6"; // Import the PDF icon

const dayToFetch = 0; // 0 is Sunday 6 is Saturday

export default function Menu({
  handleRating,
  ratings,
  getUserFavoriteAndRatingsHandler,
  adminLogin,
}) {
  const credentials = useSelector((state) => state.credentials.credentials);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, menus, error } = useSelector((state) => state.menus);

  const [menuUpdateModal, setMenuUpdateModal] = useState(false);
  const [duration, setDuration] = useState("day");
  const [dataIndex, setDataIndex] = useState(0);
  const [openMenu, setOpenMenu] = useState([0]);
  const [searchText, setSearchText] = useState("");
  const [searchedData, setSearchedData] = useState(null);
  const [searching, setSearching] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");
  const [timing, setTiming] = useState({
    startTimeOne: "",
    endTimeOne: "",
    startTimeTwo: "",
    endTimeTwo: "",
    startTimeText: "",
    endTimeText: "",
  });

  const gatBannerTimingHandler = async () => {
    const { data, status } = await getBannerTiming(null);
    setTiming(data);
  };

  const isWithinTimeRange = (startTime, endTime) => {
    const current = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    return current >= start && current <= end;
  };

  useEffect(() => {
    const checkTimeForBanner = () => {
      const isMorningBannerTime = isWithinTimeRange(
        timing.startTimeOne,
        timing.startTimeTwo
      );
      const isEveningBannerTime = isWithinTimeRange(
        timing.endTimeOne,
        timing.endTimeTwo
      );

      if (isMorningBannerTime) {
        if (!showBanner) {
          setShowBanner(true);
          setBannerMessage(timing.startTimeText);
        }
      } else if (isEveningBannerTime) {
        if (!showBanner) {
          setShowBanner(true);
          setBannerMessage(timing.endTimeText);
        }
      } else {
        if (showBanner) {
          setShowBanner(false);
        }
      }
    };

    // Initial check and set interval to check every minute

    let intervalId;
    if (timing.startTimeOne) {
      checkTimeForBanner();
      setInterval(checkTimeForBanner, 1000); // Check every minute
    } else {
      gatBannerTimingHandler();
    }

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [timing]);

  const handleNextDay = () => {
    setOpenMenu([0]);
    setDataIndex(dataIndex + 1);
  };

  const handlePreviousDay = () => {
    setOpenMenu([0]);
    setDataIndex(dataIndex - 1);
  };

  const toggleFavorite = async (food) => {
    try {
      if (favorites.includes(food)) {
        const { data, status } = await removeFavorite(food);
        if (status !== 200) {
          toast.error("Login failed. Try again.");
          return;
        }
        const foodNames = getFoodNames(data.favorites);
        setFavorites(foodNames);
      } else {
        const { data, status } = await addFavorite(food);
        if (status !== 200) {
          toast.error("Login failed. Try again.");
          return;
        }
        const foodNames = getFoodNames(data.favorites);
        setFavorites([...foodNames]);
      }
      getUserFavoriteAndRatingsHandler();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getUserFavoriteHandler = async () => {
    try {
      const { data, status } = await getUserFavorite();
      setFavorites(getFoodNames(data));
    } catch (error) {
      console.log("Error", error);
    }
  };

  const [allCollapsed, setAllCollapsed] = useState(true);

  const toggleAllMenus = () => {
    if (allCollapsed) {
      setOpenMenu(menus[dataIndex]?.data?.map((_, index) => index)); // Open all
    } else {
      setOpenMenu([]); // Collapse all
    }
    setAllCollapsed(!allCollapsed);
  };

  useEffect(() => {
    if (new Date().getDay() === dayToFetch) {
      dispatch(scrapeMenus());
    } else {
      dispatch(fetchMenus());
    }
  }, [dispatch]);

  useEffect(() => {
    const index = menus.findIndex(
      (obj) => new Date(obj.date).getDate() == new Date().getDate()
    );
    setDataIndex(index == -1 ? 6 : index);
  }, [menus]);

  useEffect(() => {
    if (credentials?.role === "Student") {
      setShowFavorites(true);
      getUserFavoriteHandler();
    }
    if (credentials?.role === "Admin") {
      navigate("/admin");
    }
  }, []);

  const applySearch = () => {
    if (searchText?.length > 0) {
      setSearching(true);
      setDuration("");
      const searchingData = [];

      menus?.slice(-7).forEach((mainobj) => {
        /* only last 7 days  */
        mainobj.data.forEach((mealObj) => {
          mealObj.foods.forEach((item) => {
            if (item.toLowerCase().includes(searchText?.toLowerCase())) {
              searchingData.push({
                date: mainobj.date + " | " + mainobj.day,
                meal: mealObj.meal,
                item: item,
              });
            }
          });
        });
      });

      setSearchedData(searchingData);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchText?.length > 0) {
        applySearch();
      }
    }
  };

  const onUpdate = (updatedMenu) => {
    dispatch(updateMenusApi(updatedMenu));
    dispatch(fetchMenus());
  };

  const decodeHtmlEntities = (str) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    const relevantMenus = menus.slice(-7); // Get the last 7 days
    const firstMenuDate = relevantMenus[0]?.date || "Start Date";
    const lastMenuDate =
      relevantMenus[relevantMenus.length - 1]?.date || "End Date";
    doc.setFont("helvetica", "bold"); // Set the font to bold
    doc.text(`Weekly Menu: ${firstMenuDate} to ${lastMenuDate}`, 10, 10); // Dynamic Title
    doc.setFont("helvetica", "normal"); // Reset the font to normal after the title

    let yPosition = 20; // Start below the title
    const pageWidth = 190; // Account for margins (210mm page width - 10mm x 2 margins)

    menus?.slice(-7)?.forEach((menu, menuIndex) => {
      doc.setFontSize(14);
      doc.text(`${menu.date} | ${menu.day}`, 10, yPosition);
      yPosition += 10; // Add spacing below the date/day

      menu.data.forEach((meal) => {
        doc.setFontSize(12);
        doc.text(`${meal.meal}:`, 10, yPosition);
        yPosition += 8; // Add spacing below the meal

        meal.foods.forEach((food) => {
          doc.setFontSize(10);

          // Decode HTML entities and split text to fit the page width
          const decodedFood = decodeHtmlEntities(food);
          const lines = doc.splitTextToSize(decodedFood, pageWidth);
          lines.forEach((line) => {
            doc.text(line, 15, yPosition);
            yPosition += 6; // Add spacing for each wrapped line
          });

          // Prevent writing beyond page limits
          if (yPosition > 280) {
            doc.addPage(); // Add new page
            yPosition = 20; // Reset yPosition for the new page
          }
        });
      });

      yPosition += 10; // Add extra spacing after each day's menu
    });

    // Convert the PDF to a Blob
    const pdfBlob = doc.output("blob");

    // Create a URL for the Blob and open it in a new tab
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  return (
    <>
      {/* {menuUpdateModal && !loading &&
        <MenuModal 
          menuUpdateModal={menuUpdateModal} 
          setMenuUpdateModal={setMenuUpdateModal} 
          data={menus}
          onUpdate={onUpdate}
        />
      } */}
      <div>
        {showBanner && (
          <div className="banner">
            <h2 className="banner-text">{bannerMessage}</h2>
          </div>
        )}
        <div className="features-text section-header text-center">
          <div>
            <h2 className="section-title">Marketplace Menu</h2>
            <div className="desc-text">
              <p>Want to know what’s to eat? You’ve come to the right place.</p>
            </div>
          </div>
        </div>

        {menus ? (
          <>
            <div className=" w-100 d-flex flex-col gap-2 border  p-2 border-circular">
              <div className="d-flex justify-content-end mt-2 mb-4 w-100">
                <div className="w-100 d-flex justify-content-end my-2"></div>

               
                <button
                  onClick={generatePDF}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "20px",
                    marginRight: "10px",
                  }}
                  title="Download Weekly Menu"
                >
                  <FaFilePdf style={{ color: "grey" }} />
                </button>
               

                <input
                  onKeyDown={handleKeyDown}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="searchInput border-circular"
                  placeholder="Search here"
                  type="text"
                />
              </div>
              <div
                style={{ gap: "20px" }}
                className="w-100 d-flex justify-content-center align-items-center flex-row"
              >
                <div
                  onClick={() => {
                    setDuration("day");
                    setSearchText("");
                    setSearching(false);
                    setSearchedData(null);
                  }}
                  className={`p-2 text-center dayWeek-option ${
                    duration === "day" ? "dayWeek-selected" : ""
                  } border-circular`}
                >
                  DAY
                </div>
                <div
                  onClick={() => {
                    setDuration("week");
                    setSearching(false);
                    setSearchedData(null);
                    setSearchText("");
                  }}
                  className={` p-2 text-center  ${
                    duration === "week" ? "dayWeek-selected" : ""
                  } dayWeek-option border-circular`}
                >
                  WEEK
                </div>
                <div className="d-flex justify-content-center my-2"></div>
              </div>

              {searching && (
                <>
                  {searchedData ? (
                    <>
                      {searchedData.length > 0 ? (
                        <div
                          style={{ gap: "5px" }}
                          className="w-100 d-flex my-4 flex-col"
                        >
                          {searchedData?.map((data, index) => (
                            <div
                              key={index}
                              className="border-circular w-100 bg-lightorange p-2 d-flex flex-col "
                            >
                              <p
                                className="fs-17 my-1"
                                dangerouslySetInnerHTML={{
                                  __html: `○ <b>${data.item.split("-")[0]}</b>${
                                    data.item.split("-")[1]
                                      ? ` - ${data.item.split("-")[1]}`
                                      : ""
                                  }${
                                    data.item.split("-")[2]
                                      ? ` - ${data.item.split("-")[2]}`
                                      : ""
                                  }${
                                    data.item.split("-")[3]
                                      ? ` - ${data.item.split("-")[3]}`
                                      : ""
                                  }${
                                    data.item.split("-")[4]
                                      ? ` - ${data.item.split("-")[4]}`
                                      : ""
                                  }`,
                                }}
                              ></p>
                              <div className="w-100 d-flex justify-content-end ">
                                <div
                                  style={{ width: "250px" }}
                                  className=" fs-14 bg-orange p-1 border-circular text-white"
                                >
                                  {data.date}
                                  <br /> {data.meal}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p
                          className="text text-center my-4"
                          style={{ color: "rgba(252,114,76,255)" }}
                        >
                          Food item not found!
                          {/* "No any found item found"  */}
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <p
                        className="text text-center my-4"
                        style={{ color: "rgba(252,114,76,255)" }}
                      >
                        Searching...
                      </p>
                    </>
                  )}
                </>
              )}

              {duration === "day" && (
                <>
                  <div
                    style={{ gap: "10px", maxWidth: "400px" }}
                    className="w-100 mx-auto mt-5 d-flex justify-content-center align-items-center flex-row"
                  >
                    {dataIndex > 0 && (
                      <div
                        onClick={handlePreviousDay}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "100%",
                        }}
                        className=" bg-orange d-flex justify-content-center align-items-center cursor-pointer "
                      >
                        <FiChevronLeft
                          style={{ fontSize: "25px" }}
                          className="text-white"
                        />
                      </div>
                    )}
                    <div
                      className="theme-color"
                      style={{
                        minWidth: "70%",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      {menus[dataIndex]?.date} | {menus[dataIndex]?.day}
                    </div>
                    {dataIndex < menus.length - 1 && (
                      <div
                        onClick={handleNextDay}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "100%",
                        }}
                        className=" bg-orange d-flex justify-content-center align-items-center cursor-pointer "
                      >
                        <FiChevronRight
                          style={{ fontSize: "25px" }}
                          className="text-white"
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className="d-flex justify-content-center"
                    style={{ marginBottom: "1px" }} // Reduce margin below the button
                  >
                    <button
                      onClick={toggleAllMenus}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "grey",
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontSize: "14px",
                        marginBottom: "-40px",
                        marginTop: "10px",
                      }}
                    >
                      {allCollapsed ? "Expand All" : "Collapse All"}
                    </button>
                  </div>

                  <div
                    style={{ maxWidth: "700px", width: "100%" }}
                    className=" my-5 text text-black mx-auto"
                  >
                    {menus[dataIndex]?.data?.map((foodInfo, index) => (
                      <>
                        <div
                          key={index}
                          onClick={() =>
                            openMenu.includes(index)
                              ? setOpenMenu((prevOpenMenu) =>
                                  prevOpenMenu.filter((item) => item !== index)
                                )
                              : setOpenMenu((prevStat) => [...prevStat, index])
                          }
                          className={`w-100 d-flex cursor-pointer justify-content-between border-circular ${
                            openMenu.includes(index)
                              ? "bg-orange text-white"
                              : "bg-lightdark text-black"
                          } align-items-center p-2 border-bottom border-secondary`}
                        >
                          <p
                            className={`${
                              openMenu.includes(index)
                                ? "text-white fs-20"
                                : "text-black"
                            } text `}
                          >
                            {foodInfo.meal}
                          </p>

                          {openMenu.includes(index) ? (
                            <FaChevronUp className="cursor-pointer" />
                          ) : (
                            <FaChevronDown className="cursor-pointer" />
                          )}
                        </div>
                        {openMenu.includes(index) && (
                          <ul
                            className="bg-lightorange p-3 border-circular"
                            style={{
                              paddingLeft: "20px",
                              marginBottom: "15px",
                            }}
                          >
                            {foodInfo.foods?.map((food, foodIndex) => (
                              <li
                                key={foodIndex}
                                style={{
                                  fontSize: "16px",
                                  display: "flex !important",
                                  alignItems: "start !important",
                                }}
                                className="d-flex align-items-center justify-content-between"
                              >
                                <span
                                  style={
                                    showFavorites
                                      ? { width: "60%" }
                                      : { width: "100%" }
                                  }
                                  dangerouslySetInnerHTML={{
                                    __html: `○ <b>${food.split("-")[0]}</b>${
                                      food.split("-")[1]
                                        ? ` - ${food.split("-")[1]}`
                                        : ""
                                    }`,
                                  }}
                                ></span>
                                {/* Rating System */}
                                <div className="rating-system d-flex">
                                  {/* Favorite Icon */}
                                  {showFavorites ? (
                                    favorites.includes(food) ? (
                                      <FaHeart
                                        onClick={() => toggleFavorite(food)}
                                        style={{
                                          color: "red",
                                          cursor: "pointer",
                                        }}
                                      />
                                    ) : (
                                      <FaRegHeart
                                        onClick={() => toggleFavorite(food)}
                                        style={{ cursor: "pointer" }}
                                      />
                                      
                                    )
                                  ) : null}
                                  <div className="ml-3">
                                    {showFavorites &&
                                      [1, 2, 3, 4, 5].map((star) =>
                                        ratings[food] >= star ? (
                                          <FaStar
                                            key={star}
                                            onClick={() =>
                                              handleRating(food, star)
                                            }
                                            style={{
                                              color: "gold",
                                              cursor: "pointer",
                                            }}
                                          />
                                        ) : (
                                          <FaRegStar
                                            key={star}
                                            onClick={() =>
                                              handleRating(food, star)
                                            }
                                            style={{ cursor: "pointer" }}
                                          />
                                        )
                                      )}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ))}
                  </div>
                </>
              )}

              {duration === "week" && (
                <>
                  {/* Display the date of the selected day */}
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "20px",
                      marginTop: "40px",
                      marginBottom: "-20px",
                    }}
                    className="theme-color"
                  >
                    {menus[dataIndex]?.date} | {menus[dataIndex]?.day}
                  </div>

                  <div
                    style={{
                      gap: "20px",
                    }}
                    className="w-100 mt-5 d-flex justify-content-center flex-wrap align-items-center flex-row"
                  >
                    {menus
                      ?.slice(-7) // last 7 days
                      .map((obj, index) => (
                        <div
                          key={index}
                          style={{ borderRadius: "40px" }}
                          onClick={() => {
                            setOpenMenu([0]);
                            setDataIndex(menus.length - 7 + index); // asjust index based on slicing
                          }}
                          className={`p-2 text-center day-option ${
                            dataIndex === menus.length - 7 + index
                              ? "dayWeek-selected"
                              : ""
                          } `}
                        >
                          {obj.day}
                        </div>
                      ))}
                  </div>
                  <div
                    className="d-flex justify-content-center"
                    style={{ marginBottom: "1px" }} // Reduce margin below the button
                  >
                    <button
                      onClick={toggleAllMenus}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "grey",
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontSize: "14px",
                        marginBottom: "-40px",
                        marginTop: "10px",
                      }}
                    >
                      {allCollapsed ? "Expand All" : "Collapse All"}
                    </button>
                  </div>
                  <div
                    style={{ maxWidth: "700px", width: "100%" }}
                    className="my-5 text text-black mx-auto"
                  >
                    {menus[dataIndex]?.data?.map((foodInfo, index) => (
                      <>
                        <div
                          key={index}
                          onClick={() => {
                            openMenu.includes(index)
                              ? setOpenMenu((prevOpenMenu) =>
                                  prevOpenMenu.filter((item) => item !== index)
                                )
                              : setOpenMenu((prevStat) => [...prevStat, index]);
                          }}
                          className={`w-100 d-flex cursor-pointer justify-content-between border-circular ${
                            openMenu.includes(index)
                              ? "bg-orange text-white"
                              : "bg-lightdark text-black"
                          } align-items-center p-2 border-bottom border-secondary`}
                        >
                          <p
                            className={`${
                              openMenu.includes(index)
                                ? "text-white"
                                : "text-black"
                            } text `}
                          >
                            {foodInfo.meal}
                          </p>

                          {openMenu.includes(index) ? (
                            <FaChevronUp className="cursor-pointer" />
                          ) : (
                            <FaChevronDown className="cursor-pointer" />
                          )}
                        </div>
                        {openMenu.includes(index) && (
                          <ul
                            className="bg-lightorange p-3 border-circular"
                            style={{
                              paddingLeft: "20px",
                              marginBottom: "15px",
                            }}
                          >
                            {foodInfo.foods?.map((food, foodIndex) => (
                              <li
                                key={foodIndex}
                                style={{
                                  fontSize: "16px",
                                  display: "flex !important",
                                  alignItems: "start !important",
                                }}
                                className="d-flex align-items-center justify-content-between"
                              >
                                <span
                                  style={
                                    showFavorites
                                      ? { width: "60%" }
                                      : { width: "100%" }
                                  }
                                  dangerouslySetInnerHTML={{
                                    __html: `○ <b>${food.split("-")[0]}</b>${
                                      food.split("-")[1]
                                        ? ` - ${food.split("-")[1]}`
                                        : ""
                                    }`,
                                  }}
                                />
                                {/* Rating System */}
                                <div className="rating-system d-flex">
                                  {/* Favorite Icon */}
                                  {showFavorites ? (
                                    favorites.includes(food) ? (
                                      <FaHeart
                                        onClick={() => toggleFavorite(food)}
                                        style={{
                                          color: "red",
                                          cursor: "pointer",
                                        }}
                                      />
                                    ) : (
                                      <FaRegHeart
                                        onClick={() => toggleFavorite(food)}
                                        style={{ cursor: "pointer" }}
                                      />
                                    )
                                  ) : null}
                                  <div className="ml-3">
                                    {showFavorites &&
                                      [1, 2, 3, 4, 5].map((star) =>
                                        ratings[food] >= star ? (
                                          <FaStar
                                            key={star}
                                            onClick={() =>
                                              handleRating(food, star)
                                            }
                                            style={{
                                              color: "gold",
                                              cursor: "pointer",
                                            }}
                                          />
                                        ) : (
                                          <FaRegStar
                                            key={star}
                                            onClick={() =>
                                              handleRating(food, star)
                                            }
                                            style={{ cursor: "pointer" }}
                                          />
                                        )
                                      )}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <p
            className="text text-center"
            style={{ color: "rgba(252,114,76,255)" }}
          >
            Loading...
          </p>
        )}
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'; 
import Navbar from "../components/global/navbar";
import Menu from "../components/home/menu";
import { useNavigate } from "react-router-dom";
import FavoriteTab from "./favorite";
import { getRatingsObj } from "../utilities";
import { getUserRatings, updateRating } from "../APIs/ratings";
import UserUpdateModal from "../components/global/userDetailsUpdateModal";
import UserPreference from "./userPreference";
import Newsletter from "./newsletter";
import UserFeedback from "./userFeedback";

export default function Student() {
    
    const studentItems = ['Student Dashboard', "Favorite Items", "Newsletter", "Feedback Form",  "User Preferences"];
    const currentTab = useSelector((state) => state.sideBarTabs.currentTab);
    const credentials = useSelector((state) => state.credentials.credentials);
    const navigate = useNavigate()
    const [ratings, setRatings] = useState({});  // State to store ratings for food items
    const [tab , setTab] = useState(0)
    const [userDetails , setUserDetails] = useState(null)
    const [updateModal , setUpdateModal] = useState(false)
    
    const getUserFavoriteAndRatingsHandler = async () => {
        try {
          console.log("getUserFavoriteAndRatingsHandler")
          let ratings = await getUserRatings();
          setRatings(getRatingsObj(ratings.data))
        } catch (error) {
          console.log("Error", error);
        }
      };
    
    const handleRating = async (food, rating) => {

    try {
        
        if(ratings[food] == rating){
            const { data, status } = await updateRating(food, 0)
            setRatings(getRatingsObj(data.ratings));
        }else{
            const { data, status } = await updateRating(food, rating)
            setRatings(getRatingsObj(data.ratings));
        }
        
    } catch (error) {
        console.log("Error", error)     
    }
    
    };


    useEffect(() => {
        if (credentials?.role !== 'Student') {
            navigate('/')
        } 
        getUserFavoriteAndRatingsHandler();

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const backToTopButton = document.querySelector(".back-to-up");
           
            if (scrollPosition > 300) {
                // Adjust the scroll threshold as needed
                if(backToTopButton){
                    backToTopButton.style.display = "flex";
                }
            } else {
                if(backToTopButton){
                    backToTopButton.style.display = "none";
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => { setUserDetails(credentials); setTab(currentTab)}, [credentials, currentTab])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
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
                </div>
            </header>
            {/* Header Section End  */}
            <section id="features" className="section">
                <div style={{ width: '300px', height: '100vh', top: 85, zIndex: 10 }} className="bg-lightorange sidebar sidebarPage position-fixed left-0 p-1 py-3">
                    <div className=" d-flex flex-col align-items-center mx-3">
                        <div style={{
                            fontSize : '22px'
                        }} className=" my-1 mb-3 cursor-pointer w-100  text text-black border-circular"
                            onClick={() => setUpdateModal(true)}
                        >
                            Hi, <strong>{userDetails?.fullName}</strong>
                        </div>
                        {studentItems.map((item, index) => 
                            <div onClick={()=> setTab(index)} style={{ fontWeight: "bold" }} className={`cursor-pointer  w-100 p-2 ${tab === index ? 'bg-orange  text-white' : 'text-black'}  text border-circular`}>
                            ⦿ {item}
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ padding: '10px' }} className="menuForPages">
                    {updateModal && <UserUpdateModal updateModal={updateModal} setUpdateModal={setUpdateModal}/> }
                    {tab == 0 && <Menu handleRating={handleRating} ratings={ratings} getUserFavoriteAndRatingsHandler={getUserFavoriteAndRatingsHandler}/>}
                    {tab == 1 && <FavoriteTab ratings={ratings}/>}
                    {tab == 2 && <Newsletter/>}
                    {tab == 3 && <UserFeedback/>}
                    {tab == 4 && <UserPreference/>}
                </div>
            </section>
        </>
    )
}

export default function MainSection() {
  return (
    <>
      <div className="container" style={{ backgroundImage : 'url()'}}>
        <div className="row ">
          <div className="col-lg-8 col-md-12 col-xs-12">
            <div className="contents">
              <h2 className="head-title">
              Welcome to Restaurant, Where Flavor Meets Tradition!
              </h2>
              <p>
              At Restaurant, we pride ourselves on crafting delicious, mouth-watering dishes made from the freshest ingredients. Whether you're craving a classic burger, authentic shawarma, or a hearty breakfast (nashta), our diverse menu has something for everyone. Join us for a memorable dining experience where every bite tells a story of flavor, tradition, and passion. Visit us today and indulge in a culinary journey like no other!
              </p>
              {/* <div className="header-button">
                <a
                  // href="/sign-in"
                  rel="nofollow"
                  className="btn btn-border-filled"
                >
                  Log In
                </a>
              </div> */}
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-xs-12 p-0">
            <div className="intro-img">
              {/* <img src={"img/banner.jpg"} alt="" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

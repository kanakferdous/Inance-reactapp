import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menus, setMenus] = useState([]);
  const [topBar, setTopBar] = useState({ phone: "", email: "" });
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => setMenus(res.data))
      .catch((err) => console.error("Failed to load header menus", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/topbar")
      .then((res) => {
        if (res.data) {
          setTopBar(res.data);
        }
      })
      .catch((err) => console.error("Failed to load top bar", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hero")
      .then((res) => setHeroData(res.data))
      .catch((err) => console.error("Failed to load hero section", err));
  }, []);

  return (
    <>
      <div class="hero_area">
        <header class="header_section">
          {/* Header Top */}
          <div class="header_top">
            <div class="container-fluid">
              <div class="contact_nav">
                {topBar.phone && (
                  <a href={`tel:${topBar.phone}`}>
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <span>Call : {topBar.phone}</span>
                  </a>
                )}
                {topBar.email && (
                  <a href={`mailto:${topBar.email}`}>
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <span>Email : {topBar.email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Header Bottom */}
          <div class="header_bottom">
            <div class="container-fluid">
              <nav class="navbar navbar-expand-lg custom_nav-container">
                <Link class="navbar-brand" to="/">
                  <span>Inance</span>
                </Link>

                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class=""></span>
                </button>

                <div
                  class="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    {menus.map((menu) => (
                      <li key={menu._id} className="nav-item">
                        <Link className="nav-link" to={menu.url}>
                          {menu.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>

        {isHome && (
          <section className="slider_section ">
            <div className="container ">
              <div className="row">
                <div className="col-md-6 ">
                  <div className="detail-box">
                    <h1>{heroData?.heading}</h1>
                    <p>{heroData?.content}</p>
                    {heroData?.buttonText && heroData?.buttonUrl && (
                      <a href={heroData.buttonUrl}>{heroData.buttonText}</a>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="img-box">
                    {heroData?.image && (
                      <img
                        src={`http://localhost:5000${heroData.image}`}
                        alt="Hero"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default Header;

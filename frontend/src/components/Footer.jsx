import { useEffect, useState } from "react";
import axios from "axios";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState({
    address: "",
    phone: "",
    email: "",
    facebook: "",
    twitter: "",
    youtube: "",
    instagram: "",
    copyright: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/footer")
      .then((res) => {
        if (res.data) {
          setFooterData(res.data);
        }
      })
      .catch((err) => {
        console.error("Error loading footer content", err);
      });
  }, []);

  return (
    <>
      <section className="info_section">
        <div className="container">
          <h4>Get In Touch</h4>
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="info_items">
                <div className="row">
                  <div className="col-md-4">
                    <a href="#">
                      <div className="item">
                        <div className="img-box">
                          <i
                            className="fa fa-map-marker"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <p>{footerData.address}</p>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href={`tel:${footerData.phone}`}>
                      <div className="item">
                        <div className="img-box">
                          <i className="fa fa-phone" aria-hidden="true"></i>
                        </div>
                        <p>{footerData.phone}</p>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href={`mailto:${footerData.email}`}>
                      <div className="item">
                        <div className="img-box">
                          <i className="fa fa-envelope" aria-hidden="true"></i>
                        </div>
                        <p>{footerData.email}</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="social-box">
          <h4>Follow Us</h4>
          <div className="box">
            <a href={footerData.facebook || "#"}>
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a href={footerData.twitter || "#"}>
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a href={footerData.youtube || "#"}>
              <i className="fa fa-youtube" aria-hidden="true"></i>
            </a>
            <a href={footerData.instagram || "#"}>
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer_section">
        <div className="container">
          <p>
            &copy; <span>{currentYear}</span>{" "}
            {footerData.copyright
              ? footerData.copyright
              : "All Rights Reserved By Meet Kanak"}
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;

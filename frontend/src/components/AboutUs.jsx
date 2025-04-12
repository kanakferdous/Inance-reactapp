import { useEffect, useState } from "react";
import axios from "axios";

function AboutUs() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/about")
      .then((res) => {
        setAbout(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load About Us data", err);
        setLoading(false);
      });
  }, []);


  if (loading) return null;

  return (
    <section className="about_section layout_padding-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="detail-box">
              <h2>{about.title || "About Us"}</h2>
              <p>{about.content}</p>
              {about.buttonText && about.buttonUrl && (
                <a href={about.buttonUrl}>{about.buttonText}</a>
              )}
            </div>
          </div>
          <div className="col-lg-7 col-md-6">
            <div className="img-box">
              {about.image ? (
                <img
                  src={`http://localhost:5000${about.image}`}
                  alt={about.title}
                />
              ) : (
                <p>No image uploaded</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

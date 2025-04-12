import { useEffect, useState } from "react";
import axios from "axios";

function Service() {
  const [sectionTitle, setSectionTitle] = useState("Our Services");
  const [buttonText, setButtonText] = useState("View More");
  const [buttonUrl, setButtonUrl] = useState("#");
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/service-section")
      .then((res) => {
        const data = res.data;
        setSectionTitle(data.sectionTitle || "Our Services");
        setButtonText(data.buttonText || "View More");
        setButtonUrl(data.buttonUrl || "#");
        setItems(data.items || []);
      })
      .catch((err) => console.error("Failed to load service section", err));
  }, []);

  return (
    <section className="service_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>{sectionTitle}</h2>
        </div>
        <div className="row">
          {items.map((item, index) => (
            <div key={index} className="col-sm-6 col-md-4 mx-auto">
              <div className="box">
                <div className="img-box">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="detail-box">
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="btn-box">
          <a href={buttonUrl}>{buttonText}</a>
        </div>
      </div>
    </section>
  );
}

export default Service;

import { useEffect, useState } from "react";
import axios from "axios";

function Features() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/feature")
      .then((res) => setFeatures(res.data))
      .catch((err) => console.error("Failed to load features", err));
  }, []);

  return (
    <section className="feature_section">
      <div className="container">
        <div className="feature_container">
          {features.map((feature, index) => (
            <div
              key={feature._id}
              className={`box ${index === 1 ? "active" : ""}`}
            >
              <div className="img-box">
                <img
                  src={`http://localhost:5000${feature.icon}`}
                  alt={feature.title}
                />
              </div>
              <h5 className="name">{feature.title}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;

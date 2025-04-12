import { useEffect, useState } from "react";
import axios from "axios";

function Professional() {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/professional")
      .then((res) => {
        const data = res.data; // If your response is wrapped like { professional: {...} }, use res.data.professional instead
        setHeading(data.heading || "");
        setContent(data.content || "");
        setButtonText(data.buttonText || "");
        setButtonUrl(data.buttonUrl || "");
        if (data.image) {
          setImage(`http://localhost:5000${data.image}`);
        }
      })
      .catch((err) => {
        console.error("Failed to load Professional section", err);
      });
  }, []);

  return (
    <section className="professional_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="img-box">
              {image && <img src={image} alt="Professional" />}
            </div>
          </div>
          <div className="col-md-6">
            <div className="detail-box">
              <h2 dangerouslySetInnerHTML={{ __html: heading }} />
              <p>{content}</p>
              {buttonText && <a href={buttonUrl || "#"}>{buttonText}</a>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Professional;

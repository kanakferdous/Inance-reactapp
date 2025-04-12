import { useEffect, useState } from "react";
import axios from "axios";

function Contact() {
  const [sectionTitle, setSectionTitle] = useState("Contact Us");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const initMap = () => {
      const mapProp = {
        center: { lat: 40.712775, lng: -74.005973 },
        zoom: 18,
      };
      new window.google.maps.Map(document.getElementById("googleMap"), mapProp);
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCh39n5U-4IoWpsVGUHWdqB6puEkhRLdmI&callback=initMap";
      script.async = true;
      window.initMap = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }

    // Load section title
    axios
      .get("http://localhost:5000/api/contact-section")
      .then((res) => setSectionTitle(res.data.sectionTitle || "Contact Us"))
      .catch(() => setSectionTitle("Contact Us"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!name || !phone || !email || !message) {
      setErrorMsg("All fields are required.");
      return;
    }

    axios
      .post("http://localhost:5000/api/contacts", {
        name,
        phone,
        email,
        message,
      })
      .then(() => {
        setSuccessMsg("Message submitted successfully ✅");
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
        setTimeout(() => setSuccessMsg(""), 4000);
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.message || "Failed to submit message");
        setTimeout(() => setErrorMsg(""), 4000);
      });
  };

  return (
    <section className="contact_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>{sectionTitle}</h2>
        </div>

        {successMsg && (
          <div className="alert alert-success" role="alert">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}

        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="message-box"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="d-flex">
                <button type="submit">SEND</button>
              </div>
            </form>
          </div>

          <div className="col-md-6">
            <div className="map_container">
              <div className="map">
                <div
                  id="googleMap"
                  style={{ width: "100%", height: "100%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

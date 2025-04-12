import { useEffect } from "react";

function ContactPage() {
  useEffect(() => {
    const initMap = () => {
      const mapProp = {
        center: { lat: 40.712775, lng: -74.005973 },
        zoom: 18,
      };

      new window.google.maps.Map(document.getElementById("googleMap"), mapProp);
    };

    const existingScript = document.getElementById("googleMapsScript");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY";
      script.id = "googleMapsScript";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        initMap(); // Call after map script fully loaded
      };

      document.body.appendChild(script);
    } else {
      initMap(); // If already loaded
    }
  }, []);

  return (
    <section className="contact_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>Contact Uss</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form>
              <div>
                <input type="text" placeholder="Name" />
              </div>
              <div>
                <input type="text" placeholder="Phone Number" />
              </div>
              <div>
                <input type="email" placeholder="Email" />
              </div>
              <div>
                <input
                  type="text"
                  className="message-box"
                  placeholder="Message"
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

export default ContactPage;

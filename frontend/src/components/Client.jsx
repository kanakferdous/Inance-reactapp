import { useEffect, useState } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";

function Client() {
  const [sectionTitle, setSectionTitle] = useState("What Our Clients Say");
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/testimonials")
      .then((res) => {
        setSectionTitle(res.data.sectionTitle || "What Our Clients Say");
        setItems(res.data.items || []);
      })
      .catch((err) => console.error("Failed to load testimonials", err));
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: [
      '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
      '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>',
    ],
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1000: { items: 2 },
    },
  };

  return (
    <section className="client_section">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>{sectionTitle}</h2>
        </div>
        <div className="carousel-wrap layout_padding2-top">
          <OwlCarousel className="owl-theme" {...options}>
            {items.map((item, index) => (
              <div className="item" key={index}>
                <div className="box">
                  <div className="client_id">
                    <div className="img-box">
                      <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.name}
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="client_detail">
                      <div className="client_info">
                        <h6>{item.name}</h6>
                        <div>
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <i
                              key={idx}
                              className={
                                idx + 1 <= Math.round(item.rating)
                                  ? "fa fa-star"
                                  : "fa fa-star-o"
                              }
                              aria-hidden="true"
                            ></i>
                          ))}
                        </div>
                      </div>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="client_text">
                    <p>{item.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
}

export default Client;
